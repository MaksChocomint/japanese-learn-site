import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const addContact = async (
  name: string,
  email: string,
  receiveNotifications: boolean
) => {
  try {
    const response = await axios.post(`${baseURL}/contacts`, {
      name,
      email,
      receiveNotifications,
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при добавлении контакта:", error);
    throw error;
  }
};

// Другие функции для работы с контактами
