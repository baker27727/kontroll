import express from 'express'
import { port } from './configs.js'

import cors from 'cors'
import bodyParser from 'body-parser'
import ErrorHandlerMiddleware from './middlewares/error_handler.js'


const app = express()

app.use(cors({
    origin: '*'
}))

import { fileURLToPath } from 'url'
import path from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use('/public',express.static(path.join(__dirname, './public')))


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

import ComplaintsRoute from './routes/complaints_route.js'
import ComplaintManagerRoute from './routes/complaint_manager_route.js'
import ClientRoute from './routes/client_route.js'

import { NOT_FOUND } from './constants/status_codes.js'
import ValidateApiToken from './middlewares/validate_api_token.js'
// app.use(ValidateApiToken)
app.use('/api', ComplaintsRoute, ComplaintManagerRoute, ClientRoute)

app.use(ErrorHandlerMiddleware)


app.get('*', (req, res) => {
    return res.status(NOT_FOUND).json({
        error: '404 Not Found',
        url: req.url,
        status_code: NOT_FOUND
    })
})


const main = async () => {
    try{
        app.listen(port, '0.0.0.0', () => console.log(`[server] listening on ${port}`))
    }catch(err){
        logger.error(err.message)
    }
}
main()