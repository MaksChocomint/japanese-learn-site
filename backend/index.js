const fs = require("fs");
const path = require("path");
const os = require("os");
const { v4: uuidv4 } = require("uuid");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const auth = require("./auth");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Set the destination directory
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname); // Set the filename
  },
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

const express = require("express");
const { PrismaClient } = require("@prisma/client");
const axios = require("axios");

const prisma = new PrismaClient();

const app = express();

//json
app.use(express.json());

//cors
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use("/api/v1/auth", auth);

// Add a new route to handle AI requests
app.post("/api/v1/ai", async (req, res) => {
  try {
    // Get the userPrompt from the request body
    const userPrompt = req.body.userPrompt;

    // Create the data object with the userPrompt
    let data = {
      messages: [
        {
          content:
            "(Ты чат-бот Мамору на сайте по изучению японского. Отвечай всегда на русском, используй другие языки только при необходимости, например тебе часто могут задать вопрос по переводу с японского) вот запрос пользователя: " +
            userPrompt,
          role: "user",
        },
      ],
      model: "deepseek-chat",
      frequency_penalty: 0,
      max_tokens: 2048,
      presence_penalty: 0,
      stop: null,
      stream: false,
      temperature: 0.1,
      top_p: 1,
    };

    // Configure the Axios request
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api.deepseek.com/v1/chat/completions",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + process.env.DEEPSEEK_API_KEY,
      },
      data: data,
    };

    // Make the Axios request
    const response = await axios(config);

    // Send the response from the AI service back to the frontend
    res.status(200).json(response.data.choices[0].message.content);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

//test api
app.get("/api/v1/test", (req, res) => {
  try {
    res.status(200).json({ message: "API is working" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get contacts
app.get("/api/v1/contacts", async (req, res) => {
  try {
    const contacts = await prisma.contact.findMany();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//create contact
app.post("/api/v1/contacts", async (req, res) => {
  try {
    const contact = await prisma.contact.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        receiveNotifications: req.body.receiveNotifications,
      },
    });
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get lessons
app.get("/api/v1/lessons", async (req, res) => {
  try {
    const lessons = await prisma.lesson.findMany();
    res.status(200).json(lessons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get 4 lessons
app.get("/api/v1/lessons", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Получаем номер страницы из запроса
    const perPage = 4; // Количество элементов на странице

    const lessons = await prisma.lesson.findMany({
      skip: (page - 1) * perPage,
      take: perPage,
    });

    res.status(200).json(lessons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//create lesson
app.post(
  "/api/v1/lessons",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const result = await uploadForm(req, res);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

//get lesson by id
app.get("/api/v1/lessons/:id", async (req, res) => {
  const lessonId = parseInt(req.params.id);

  try {
    const lesson = await prisma.lesson.findUnique({
      where: {
        id: lessonId,
      },
    });
    if (!lesson) {
      return res
        .status(404)
        .json({ message: `Урок с id=${lessonId} не найден` });
    }
    res.status(200).json(lesson);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

async function saveFileToLocal(fileOrFiles, type) {
  try {
    let files = Array.isArray(fileOrFiles) ? fileOrFiles : [fileOrFiles];
    let savedFiles = [];

    for (const file of files) {
      if (!file || !file.path) {
        throw new Error("File data is missing or undefined.");
      }

      const buffer = fs.readFileSync(file.path);
      const name = uuidv4();
      const ext = path.extname(file.originalname);

      const tempdir = os.tmpdir();
      const uploadDir = path.join(tempdir, `${name}${ext}`);
      fs.writeFileSync(uploadDir, buffer);

      savedFiles.push({
        filepath: uploadDir,
        filename: file.originalname,
        id: type === "image" ? 0 : 1,
      });
    }

    return savedFiles;
  } catch (error) {
    throw new Error(
      "Failed to save file(s) to local storage: " + error.message
    );
  }
}
async function uploadFilesToCloudinary(newFiles) {
  const multipleFilesPromise = newFiles.map((file) => {
    if (file) {
      if (file[0].id === 0) {
        return cloudinary.uploader.upload(file[0].filepath, {
          folder: "jp-lessons/images",
          resource_type: "image",
        });
      } else if (file[0].id === 1) {
        return cloudinary.uploader.upload(file[0].filepath, {
          folder: "jp-lessons/videos",
          resource_type: "video",
        });
      }
    }
  });
  return await Promise.all(multipleFilesPromise);
}

async function uploadForm(req, res) {
  try {
    let newFiles = [];

    // Save image and video files locally
    const imageFile = req.files.image[0];
    const videoFile = req.files.video[0];

    // Check if files exist
    if (imageFile) {
      const imageData = await saveFileToLocal(imageFile, "image");
      newFiles.push(imageData);
    }
    if (videoFile) {
      const videoData = await saveFileToLocal(videoFile, "video");
      newFiles.push(videoData);
    }

    console.log("New Files:", newFiles);

    // Upload files to Cloudinary
    const cloudFiles = await uploadFilesToCloudinary(newFiles);

    console.log("Cloud Files:", cloudFiles);

    // Clean up local files
    newFiles.forEach((file) => fs.unlinkSync(file[0].filepath));

    // Extract secure URLs for image and video
    const imageCloudFile = cloudFiles.find(
      (file) => file.resource_type === "image"
    );
    const videoCloudFile = cloudFiles.find(
      (file) => file.resource_type === "video"
    );

    console.log(imageCloudFile);
    // Create lesson entry in the database
    const lesson = await prisma.lesson.create({
      data: {
        title: req.body.title,
        text: req.body.text,
        imageUrl: imageCloudFile ? imageCloudFile.secure_url : undefined,
        videoUrl: videoCloudFile ? videoCloudFile.secure_url : undefined,
      },
    });

    res.status(201).json(lesson);
  } catch (error) {
    console.error("Error in uploadForm:", error);
    res.status(500).json({ message: error.message });
  }
}

//start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

exports.prisma = { prisma };
