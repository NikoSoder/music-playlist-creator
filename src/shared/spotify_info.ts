import { generateRandomString } from "./generate_random_string";

export const PUBLIC_CLIENT_ID = "3744b0e6009e48cd8c427ddd26c25271";
const SCOPE = "user-read-private user-read-email";
const REDIRECT_URI = "http://localhost:5173/callback";
const state = generateRandomString(16);
export const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${PUBLIC_CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}&state=${state}&show_dialog=true`;
