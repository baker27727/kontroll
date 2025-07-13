import * as dotenv from 'dotenv'
import * as path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({
    path: path.join(__dirname, './.env')
})

export const port = process.env.PORT
export const mongodb_connection_string = process.env.MONGODB_CONNECTION_STRING
export const static_files_host = process.env.STATIC_FILES_HOST
export const is_development = process.env.ENVIRONMENT.trim() == 'development'

export const smtp_host = process.env.SMTP_HOST
export const smtp_port = process.env.SMTP_PORT
export const smtp_user = process.env.SMTP_USER
export const smtp_pass = process.env.SMTP_PASS
export const smtp = process.env.SMTP_HOST

export const jwt_secret_key = process.env.JWT_SECRET_KEY

export const sjekk_api_url = process.env.SJEKK_API_URL