import "dotenv/config";

const Config = {
  kbbiUrl: "https://kbbi.kemdikbud.go.id/entri",
  baseUrl: process.env.BASE_URL || "http://localhost:5000",
  apiPrefix: process.env.API_PREFIX || "api",
  database: {
    url: `${process.env.DB_SERVER_URL}` || "",
  },
  jwt: {
    access_token_key: process.env.ACCESS_TOKEN_KEY || "test11",
    refresh_token_key: process.env.REFRESH_TOKEN_KEY || "test11",
  },
  cloudinary: {
    name: process.env.CLOUDINARY_NAME || "default",
    api_key: process.env.CLOUDINARY_API_KEY || "123",
    api_secret: process.env.CLOUDINARY_API_SECRET || "123",
  },
};

export default Config;
