## Invitation Website: Invitt Frontend
Invitt is a simple invitation website for wedding event. Invitt offers easy and fast creation of an invitation website. Invitt provides templates that can be directly used by user.

**Repository**:
- Backend: [https://github.com/btrianurdin/invitt-backend/](https://github.com/btrianurdin/invitt-backend/)
- Frontend: [https://github.com/btrianurdin/invitt/](https://github.com/btrianurdin/invitt/)

**Backend Library and Framework**:
- [x] Built with Express and NodeJS
- [x] Full Typescipt
- [x] Authentication with JWT (sign in and sign up)
- [x] Database MongoDB
- [x] Reset Password send via email with [nodemailer](https://nodemailer.com/)
- [x] Upload image to Cloudinary
- [x] Backend Validation with Express Validator
- [x] Nodemon for development

**Environment Variabel**:
| Name | Required | Description |
| ---- | -------- | ----------- |
| NODE_ENV | Yes | nodejs environment |
| PORT | Yes | Port of node js app |
| BASE_URL | Yes | url of your website |
| API_PREFIX | Yes | prefix api. ex: yourwebiste[.]com/api/route |
| DB_SERVER_URL | Yes | mongodb connector url |
| JWT_TOKEN | Yes | your jwt token (jwt key) |
| CLOUDINARY_NAME | Yes | your cloudinary name for upload image |
| CLOUDINARY_API_KEY | Yes | cloudinary api key |
| CLOUDINARY_API_SECRET | Yes | cloudinary api secret key |
| MAX_IMAGE_SIZE | Yes | maximum size of image a user can upload |
| TIME_ZONE | Yes | time zone |
| MAIL_HOST | Yes | your mail host. Used for reset password. |
| MAIL_USER | Yes | your mail username |
| MAIL_PASS | Yes | your mail password |


*note:*
- *Invitt may not be ready for production*
- *Backend documentation will be published soon*

**Happy coding for you guys ❤️**