const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { prisma } = require("./index");

// Регистрация пользователя
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Хешируем пароль
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создаем пользователя в базе данных
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: "Пользователь зарегистрирован" });
  } catch (error) {
    console.error("Ошибка при регистрации:", error);
    res.status(500).json({ message: "Ошибка при регистрации пользователя" });
  }
});

// Вход пользователя
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Находим пользователя в базе данных
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    // Если пользователь не найден или пароль неверный, возвращаем ошибку
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(401)
        .json({ message: "Неверное имя пользователя или пароль" });
    }

    // Генерируем JWT токен
    const token = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error("Ошибка при входе:", error);
    res.status(500).json({ message: "Ошибка при входе пользователя" });
  }
});

module.exports = router;
