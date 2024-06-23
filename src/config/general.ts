export const PORT = process.env.NODE_PORT;
export const COOKIE_SECRET = process.env.NODE_COOKIE_SECRET;
export const JWT_SECRET = process.env.NODE_JWT_SECRET as string;
export const PG_DB = process.env.NODE_POSTGRES_DB;
export const PG_USER = process.env.NODE_POSTGRES_USER;
export const PG_PASSWORD = process.env.NODE_POSTGRES_PASSWORD;
export const PG_HOST = process.env.NODE_POSTGRES_HOST;
export const PG_PORT = process.env.NODE_POSTGRES_PORT;
export const PG_SSL = process.env.NODE_POSTGRES_SSL;
export const PG_CLIENT_MIN_MSG = process.env.NODE_POSTGRES_CLIENT_MIN_MESSAGES;
export const MODE = process.env.NODE_MODE

export const SMTP_IAM=process.env.NODE_SMTP_IAM_USER
export const SMTP_USER=process.env.NODE_SMTP_USER
export const SMTP_PASS=process.env.NODE_SMTP_PASS
export const SMTP_ENDPOINT=process.env.NODE_SMTP_ENDPOINT
export const SMTP_PORT=process.env.NODE_SMTP_PORT
export const SMTP_EMAIL=process.env.NODE_SMTP_EMAIL