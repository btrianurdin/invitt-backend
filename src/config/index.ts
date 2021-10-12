import "dotenv/config";

const Config = {
  baseUrl: process.env.BASE_URL || "http://localhost:5000",
  apiPrefix: process.env.API_PREFIX || "api",
  database: {
    url: `${process.env.DB_SERVER_URL}` || "",
  },
  jwtTokenKey: process.env.JWT_TOKEN || "",
  cloudinary: {
    name: process.env.CLOUDINARY_NAME || "default",
    api_key: process.env.CLOUDINARY_API_KEY || "123",
    api_secret: process.env.CLOUDINARY_API_SECRET || "123",
  },
  maxImageSize: process.env.MAX_IMAGE_SIZE || 5000,
};

export default Config;
