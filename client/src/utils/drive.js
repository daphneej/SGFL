import { google } from "googleapis";

export const auth = new google.auth.GoogleAuth({
  keyFile: KEY_FILE,
  scopes: process.env.SCOPES,
});
