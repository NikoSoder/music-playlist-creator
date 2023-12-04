import { useEffect, useState } from "react";
import { MusicalNoteIcon } from "@heroicons/react/24/outline";
import useAuth from "../hooks/useAuth";
import SpotifyWebApi from "spotify-web-api-node";
import { PUBLIC_CLIENT_ID } from "../shared/spotify_info";
import axios from "axios";
import Avatar from "./Avatar";
import SpotifyAuthLink from "./SpotifyAuthLink";
const BASEURL = import.meta.env.VITE_API_URL;

const spotifyApi = new SpotifyWebApi({
  clientId: PUBLIC_CLIENT_ID,
});

interface ChildPropsHeader {
  code: string | null;
  accessDenied: string | null;
}

const Header = ({ code, accessDenied }: ChildPropsHeader) => {
  const [userProfile, setUserProfile] = useState<{
    name?: string;
    image?: string;
  }>();
  const auth = useAuth(code, accessDenied);

  useEffect(() => {
    if (!auth.accessToken) return;
    spotifyApi.setAccessToken(auth.accessToken);
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
  }, [auth.accessToken]);

  useEffect(() => {
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
          refreshToken(refreshTokenLocalstorage);
        });
    };
    getRefreshToken();
  }, []);

  const refreshToken = async (refreshTokenLocalstorage: string) => {
    try {
      const response = await axios.post(`${BASEURL}/refresh`, {
        refreshTokenLocalstorage,
      });
      auth.setAccessToken(response.data.accessToken);
      localStorage.setItem("accessToken", response.data.accessToken);
      spotifyApi.setAccessToken(response.data.accessToken);
    } catch (e) {
      // remove tokens if wrong refreshToken
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      console.error(e);
    }
  };

  return (
    <section className="container mx-auto border-b border-b-zinc-700">
      {/* nav */}
      <nav className="flex items-center justify-between gap-2 text-white">
        <div className="flex items-center gap-2">
          <MusicalNoteIcon className="h-6 w-6" />
          <h1 className="text-lg md:text-2xl">Playlist creator</h1>
        </div>
        {/* connect to spotify */}
        {userProfile ? <Avatar {...userProfile} /> : <SpotifyAuthLink />}
      </nav>
      {/* hero section */}
      <section className="py-20 text-center">
        <h1 className="mb-2 text-2xl text-white">
          Create your playlist with ease
        </h1>
        <h2 className="text-xl">
          Select your tags to define your musical taste,
          <br className="hidden sm:block" /> then press 'Create' to generate
          your playlist.
        </h2>
      </section>
    </section>
  );
};

export default Header;
