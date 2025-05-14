import dotenv from 'dotenv';
dotenv.config();
const allowedOrigins = process.env.ALLOWED_ORIGINS;
const refinedData = allowedOrigins?.split(' ');

export const arrayOfAllowedOrigins: any = refinedData;
