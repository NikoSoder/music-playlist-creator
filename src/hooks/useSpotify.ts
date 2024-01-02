import { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import { PUBLIC_CLIENT_ID } from "../shared/spotify_info";
import axios from "axios";
const BASEURL = import.meta.env.VITE_API_URL;

const code = new URLSearchParams(window.location.search).get("code");
const accessDenied = new URLSearchParams(window.location.search).get("error");

const spotifyApi = new SpotifyWebApi({
  clientId: PUBLIC_CLIENT_ID,
});

export default function useSpotify() {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [userProfile, setUserProfile] = useState<{
    name?: string;
    image?: string;
  }>();

  useEffect(() => {
    if (accessToken) {
      getProfile(accessToken);
    }
  }, [accessToken]);

  useEffect(() => {
    getRefreshToken();
  }, []);

  useEffect(() => {
    const getAuth = async () => {
      if (!code) return;
      try {
        const response = await axios.post(`${BASEURL}/login`, { code });
        setAccessToken(response.data.accessToken);
        setRefreshToken(response.data.refreshToken);
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        // When you use window.history.pushState, it adds a new entry to the browser's session history. This can be useful in single-page applications (SPAs) where you want to update the URL without triggering a full page reload.
        window.history.pushState({}, "", "/");
      } catch (e) {
        window.location.href = "/";
        console.error(e);
      }
    };
    getAuth();
  }, [code]);

  useEffect(() => {
    window.history.pushState({}, "", "/");
  }, [accessDenied]);

  const getProfile = (accessToken: string) => {
    spotifyApi.setAccessToken(accessToken);
    // Get the authenticated user
    spotifyApi
      .getMe()
      .then((data) => {
        const image =
          data.body.images && data.body.images.length > 0
            ? data.body.images[0].url
            : undefined;
        setUserProfile({
          name: data.body.display_name,
          image: image,
        });
      })
      .catch((err) => {
        console.log("Something went wrong!", err);
      });
  };

  const getRefreshToken = async () => {
    const accessTokenLocalstorage = localStorage.getItem("accessToken");
    // set access token to spotifyApi so we can call .getMe() function
    if (accessTokenLocalstorage) {
      spotifyApi.setAccessToken(accessTokenLocalstorage);
    }

    const refreshTokenLocalstorage = localStorage.getItem("refreshToken");
    if (!refreshTokenLocalstorage) {
      return;
    }

    spotifyApi
      .getMe()
      .then((data) => {
        const image =
          data.body.images && data.body.images.length > 0
            ? data.body.images[0].url
            : undefined;
        setUserProfile({
          name: data.body.display_name,
          image: image,
        });
      })
      .catch((err) => {
        console.log("Invalid access token", err);
        // if accesstoken old then get new access token
        fetchNewRefreshToken(refreshTokenLocalstorage);
      });
  };

  const fetchNewRefreshToken = async (refreshTokenLocalstorage: string) => {
    try {
      const response = await axios.post(`${BASEURL}/refresh`, {
        refreshTokenLocalstorage,
      });
      setAccessToken(response.data.accessToken);
      localStorage.setItem("accessToken", response.data.accessToken);
      spotifyApi.setAccessToken(response.data.accessToken);
    } catch (e) {
      // remove tokens if wrong refreshToken
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      console.error(e);
    }
  };

  return {
    getProfile,
    getRefreshToken,
    userProfile,
    accessToken,
    setAccessToken,
    setRefreshToken,
  };
}
