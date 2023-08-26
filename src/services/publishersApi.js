import axios from "axios";

export const getPublishers = async () => {
  try {
    const response = await axios.get("http://localhost:3003/api/v1/publishers");
    return response.data;
  } catch (error) {
    console.error(error.message);
  }
}
