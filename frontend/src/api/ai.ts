import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const askBot = async (userPrompt: string) => {
  try {
    const response = await axios.post(`${baseURL}/ai`, {
      userPrompt,
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при отправлении запроса чат-боту:", error);
    throw error;
  }
};
