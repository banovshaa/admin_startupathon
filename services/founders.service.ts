import { FounderType } from "@/interfaces/dashboard.interfaces";
import axios, { AxiosResponse } from "axios";

export const getAllFoundersRequest = async (): Promise<
  AxiosResponse<{ founders: FounderType[] }>
> => {
  try {
    return await axios.get<{ founders: FounderType[] }>("/api/founders");
  } catch (error) {
    console.error("Error fetching founders:", error);
    throw error;
  }
};
export const createFounderRequest = async (formData: FormData) => {
  try {
    return await axios.post("/api/founders/", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error creating founder:", error);
    throw error;
  }
};
