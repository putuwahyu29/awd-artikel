import {
  mediaHandlerConfig,
  createMediaHandler,
} from "next-tinacms-cloudinary/dist/handlers";

export const config = mediaHandlerConfig;

export default createMediaHandler({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  authorized: async (req, _res) => {
    try {
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  },
});
