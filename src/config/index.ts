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
  invitationExpiredTime: Number(process.env.INVITATION_EXPIRED_TIME) || 1,
  timeZone: process.env.TIME_ZONE || 'Asia/Jakarta',
  maxGallery: Number(process.env.MAX_GALLERY) || 6,
  mail: {
    host: process.env.MAIL_HOST || "mail.gmail.com",
    port: Number(process.env.MAIL_PORT) || 2525,
    user: process.env.MAIL_USER || "test",
    pass: process.env.MAIL_PASS || "test",
  },
  resetPassworUrl: process.env.RESET_PW_URL || 'https://contoh.com'
};

export default Config;
