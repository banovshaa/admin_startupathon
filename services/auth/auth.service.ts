import axios from "axios";

export const loginRequest = async (formData: FormData) => {
  try {
    return await axios.post("/api/login/", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

export const registerRequest = async (formData: FormData) => {
  try {
    return await axios.post("/api/register/", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error during register:", error);
    throw error;
  }
};

export const checkUserRequest = async (formData: FormData) => {
  try {
    return await axios.post("/api/userExists/", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error during checking:", error);
    throw error;
  }
};

export const checkCookieRequest = async (token: string) => {
  try {
    return await axios.get(`/api/userExists/?token=${token}`);
  } catch (error) {
    console.error("Error during checking:", error);
    throw error;
  }
};
