import axios from "axios";


const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000",
});

export async function analyzeSkincare({ profile, uploads }) {
  const formData = new FormData();
  formData.append("name", profile.name);
  formData.append("age", profile.age);
  formData.append("sensitive_skin", String(profile.sensitiveSkin));
  formData.append("sleep_duration", profile.sleepDuration);

  Object.entries(uploads).forEach(([key, entry]) => {
    formData.append(key, entry.file);
  });

  const response = await api.post("/api/v1/analyze", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}

export default api;
