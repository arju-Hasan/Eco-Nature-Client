import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";

const axiosInstance = axios.create({
  // baseURL: "https://server-ivory-phi.vercel.app",
  baseURL: "http://localhost:3000",
});

const useAxios = () => {
  const { user, logOut } = useAuth();

  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      async (config) => {
        if (user) {
          try {
            const token = await user.getIdToken(true);
            config.headers.Authorization = `Bearer ${token}`;
          } catch (err) {
            console.error("Failed to get Firebase token:", err);
          }
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          console.warn("Unauthorized or forbidden. Logging out...");
          await logOut();
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [user, logOut]);

  return axiosInstance;
};

export default useAxios;
