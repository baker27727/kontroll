import * as dotenv from 'dotenv'
import * as path from 'path'
import { fileURLToPath } from 'url'

import fs from 'fs'
import Handlebars from 'handlebars'


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({
    path: path.join(__dirname, './.env')
})

export const jwt_secret_key = process.env.JWT_SECRET_KEY.trim()
export const port = process.env.PORT.trim()
export const host = process.env.HOST.trim()
export const node_env = process.env.NODE_ENV.trim()
export const is_development = node_env == 'development'

export const mongodb_connection_string = process.env.MONGODB_CONNECTION
export const static_files_host = process.env.STATIC_FILES_HOST
export const static_absolute_files_host = process.env.ABSOLUTE_STATIC_FILES_HOST
export const autosys_api_key = process.env.AUTOSYS_API_KEY

// payment data
export const account_number = process.env.ACCOUNT_NUMBER
export const swift_code = process.env.SWIFT_CODE
export const iban_numner = process.env.IBAN_NUMBER
export const kid_number = process.env.KID_NUMBER

// precompiled templates

// Read the template file synchronously
const violationTemplateSource = fs.readFileSync('app_templates/violation.html', 'utf-8');

// Precompile the template
export const compiledViolationTemplate = Handlebars.compile(violationTemplateSource);

const paymentReportTemplateSource = fs.readFileSync('app_templates/complete_payment_report_template.html', 'utf-8');
export const compiledPaymentReportTemplate = Handlebars.compile(paymentReportTemplateSource);

// Read the template file synchronously
const reportTemplateSource = fs.readFileSync('app_templates/violation.html', 'utf-8');

// Precompile the template
export const compiledReportTemplate = Handlebars.compile(reportTemplateSource);

// Read the template file synchronously
const apartmentRequestTemplateSource = fs.readFileSync('app_templates/apartment_request_received_template.html', 'utf-8');

// Precompile the template
export const compiledApartmentRequestTemplate = Handlebars.compile(apartmentRequestTemplateSource);

// Read the template file synchronously
const apartmentRequestAcceptedTemplateSource = fs.readFileSync('app_templates/apartment_request_accepted_template.html', 'utf-8');

// Precompile the template
export const compiledApartmentRequestAcceptedTemplate = Handlebars.compile(apartmentRequestAcceptedTemplateSource);

export const webPushPublicKey = process.env.WEB_PUSH_PUBLIC_KEY
export const webPushPrivateKey = process.env.WEB_PUSH_PRIVATE_KEY


export const residential_link = is_development ? process.env.DEV_BASE_RESIDENTIAL_URL : process.env.PROD_BASE_RESIDENTIAL_URL


// payment gateway
export const stripe_secret_key = process.env.STRIPE_SECRET_KEY

export const stripe_webhook_endpoint_secret = process.env.STRIPE_WEBHOOK_ENDPOINT_SECRET