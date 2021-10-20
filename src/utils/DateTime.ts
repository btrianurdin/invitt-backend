import Config from "../config";

export const nextDayTime = (day: number): Date | string => {
  const dateTZ = new Date().toLocaleString('en-US', { timeZone: Config.timeZone });
  
  const date = new Date(dateTZ);
  date.setDate(date.getDate() + day);
  
  return date.toISOString();
}

export const dateNow = (): Date | string => {
  const dateTZ = new Date().toLocaleString('en-US', { timeZone: Config.timeZone });

  return new Date(dateTZ).toISOString();
}

export const timeNow = (): number => {
  const dateTZ = new Date().toLocaleString('en-US', { timeZone: Config.timeZone });

  return new Date(dateTZ).getTime();
}