import { ChallengeType } from "@/interfaces/dashboard.interfaces";
import axios, { AxiosResponse } from "axios";

export const getAllChallengesRequest = async (): Promise<
  AxiosResponse<{ challenges: ChallengeType[] }>
> => {
  try {
    return await axios.get<{ challenges: ChallengeType[] }>("/api/challenges");
  } catch (error) {
    console.error("Error fetching challenges:", error);
    throw error;
  }
};
export const createChallengeRequest = async (formData: FormData) => {
  try {
    return await axios.post("/api/challenges/", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error creating challenge:", error);
    throw error;
  }
};
