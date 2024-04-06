import axios from "../../axios/axiosInstance.js";

export const getCarData = async () => {
  try {
    const response = await axios.post("/getCarData");
    return response.data;
  } catch (err) {
    console.log("Hiba az adatok lekérdezésénél.", err);
    return [];
  }
};
