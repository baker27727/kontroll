import * as dotenv from 'dotenv'
import * as path from 'path'
import { fileURLToPath } from 'url'

import fs from 'fs'
import Handlebars from 'handlebars'


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({
    path: path.join(__dirname, '../.env')
})

export const port = process.env.PORT.trim()
export const node_env = process.env.NODE_ENV.trim()
export const is_development = node_env == 'development'

export const static_files_host = process.env.STATIC_FILES_HOST
export const jwt_secret_key = process.env.JWT_SECRET_KEY.trim()

const InvoiceTemplateSource = fs.readFileSync('templates/invoice_template.html', 'utf-8');
export const compiledInvoiceTemplate = Handlebars.compile(InvoiceTemplateSource);

const ReportTemplateSource = fs.readFileSync('templates/report_template.html', 'utf-8');
export const compiledReportTemplate = Handlebars.compile(ReportTemplateSource);