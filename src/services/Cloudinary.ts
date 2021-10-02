import * as cloudinary from 'cloudinary';
import Config from '../config';

const Cloudinary = cloudinary.v2;
Cloudinary.config({
  cloud_name: Config.cloudinary.name,
  api_key: Config.cloudinary.api_key,
  api_secret: Config.cloudinary.api_secret,
});

export default Cloudinary;