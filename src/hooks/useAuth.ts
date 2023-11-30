import { useEffect, useState } from "react";
import axios from "axios";
const BASEURL = import.meta.env.VITE_API_URL;

export default function useAuth(code: string | null) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  useEffect(() => {
    const getAuth = async () => {
      if (!code) return;
      console.log(code);
      try {
        const response = await axios.post(`${BASEURL}/login`, { code });
        setAccessToken(response.data.accessToken);
        setRefreshToken(response.data.refreshToken);
        setExpiresIn(response.data.expiresIn);
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        localStorage.setItem("expiresIn", response.data.expiresIn);
        // When you use window.history.pushState, it adds a new entry to the browser's session history. This can be useful in single-page applications (SPAs) where you want to update the URL without triggering a full page reload.
        window.history.pushState({}, "", "/");
      } catch (e) {
        console.error(e);
        window.location.href = "/";
      }
    };
    getAuth();
  }, [code]);
