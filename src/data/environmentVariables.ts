import dotenv from 'dotenv';
dotenv.config();

export const MONGODB_URL = process.env.MONGODB_URL as string;
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;
export const JWT_SECRET_KEY_VAULT = process.env.JWT_SECRET_KEY_VAULT as string;
export const ADMIN_CHANGE_PASSWORD_JWT_SECRET_KEY = process.env
  .ADMIN_CHANGE_PASSWORD_JWT_SECRET_KEY as string;
export const SECRET_KEY_OF_CHANGING_PASSWORD_TOKEN = process.env
  .SECRET_KEY_OF_CHANGING_PASSWORD_TOKEN as string;
export const FRONTEND_ADDRESS = process.env.FRONTEND_ADDRESS as string;
export const PORT = process.env.PORT as string;
export const STRIPE_PUBLISHABLE_KEY = process.env
  .STRIPE_PUBLISHABLE_KEY as string;
export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY as string;
export const RAW_ENCRYPTION_KEY = process.env.RAW_ENCRYPTION_KEY as string;
export const CHAT_GPT_API_KEY = process.env.CHAT_GPT_API_KEY as string;
export const NODEMAILER_SERVICE = process.env.NODEMAILER_SERVICE as string;
export const NODEMAILER_USER = process.env.NODEMAILER_USER as string;
export const NODEMAILER_PASSWORD = process.env.NODEMAILER_PASSWORD as string;
export const jwtSecretKey = JWT_SECRET_KEY;
export const jwtSecretKeyOfVault = JWT_SECRET_KEY_VAULT;
export const adminChangingPasswordJwtSecretKey =
  ADMIN_CHANGE_PASSWORD_JWT_SECRET_KEY;
export const encryptionSecretKey = Buffer.from(RAW_ENCRYPTION_KEY, 'hex');
export const frontendAddress = FRONTEND_ADDRESS;
export const secretKeyOfChangingPasswordToken =
  SECRET_KEY_OF_CHANGING_PASSWORD_TOKEN;
