import dotenv from "dotenv"
dotenv.config()

export const PORT =process.env.PORT
export const MYSQL_HOST=process.env.MYSQL_HOST
export const MYSQL_USER=process.env.MYSQL_USER
export const MYSQL_PASSWORD=process.env.MYSQL_PASSWORD
export const MYSQL_DBNAME=process.env.MYSQL_DBNAME
export const JWT_SEC=process.env.JWT_SEC