import { CompleterType } from "@/interfaces/dashboard.interfaces";
import axios, { AxiosResponse } from "axios";

export const getAllCompletersRequest = async (): Promise<
  AxiosResponse<{ completers: CompleterType[] }>
> => {
  try {
    return await axios.get<{ completers: CompleterType[] }>("/api/completers");
  } catch (error) {
    console.error("Error fetching completers:", error);
    throw error;
  }
};
export const createCompleterRequest = async (formData: FormData) => {
  try {
    return await axios.post("/api/completers/", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error creating completer:", error);
    throw error;
  }
};
