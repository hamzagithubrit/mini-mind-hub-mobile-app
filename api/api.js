import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: "http://192.168.100.16:7000/mini",
});

(async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
  } catch (error) {
    console.error("Failed to retrieve token from AsyncStorage:", error);
  }
})();

export default api;
