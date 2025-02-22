import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export interface DataItem {
  id: number;
  name: string;
  value: number;
}

export const fetchData = async (): Promise<DataItem[]> => {
  try {
    const response = await axios.get<DataItem[]>(`${API_URL}/data`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
