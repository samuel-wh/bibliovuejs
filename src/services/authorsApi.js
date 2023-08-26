import axios from "axios";

export const getAuthors = async () => {
  try {
    const response = await axios.get("http://localhost:3003/api/v1/authors");
    return response.data;
  } catch (error) {
    console.error(error.message);
  }
}
