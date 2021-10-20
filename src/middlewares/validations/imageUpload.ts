import Config from "../../config";
import { PictureInvitationKey } from "../../interfaces";

export const uploadContent = (value: string) => {
  if(value === undefined || value?.trim()?.length < 1) return Promise.reject("content is empty");

  const base64decode = Buffer.byteLength(value.split('base64,')[1], 'base64');
  
  if ((base64decode / 1000) > Config.maxImageSize) {
    return Promise.reject(`maximum content size is ${Config.maxImageSize}KB`);
  }
  return Promise.resolve();
}

export const uploadPictureField = (value: string) => {
  if(!PictureInvitationKey.includes(value)) return Promise.reject("field is not valid");
  return Promise.resolve();
}