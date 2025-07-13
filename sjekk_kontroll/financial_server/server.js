import express from 'express'
import path from 'path'
import compression from 'compression'
import cors from 'cors'
import bodyParser from 'body-parser'
import { NOT_FOUND } from './constants/status_codes.js'
import ErrorHandlerMiddleware from './middlewares/error_handler.js'
import { fileURLToPath } from 'url'
import logger from './utils/logger.js'

import { Server } from 'socket.io'
import http from 'http'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

const server = http.createServer(app)
export const io = new Server(server,{
    cors: {
        origin: '*'
    }
})


io.on('connection', (socket) => {
    console.log(`a new connection and count is: ${socket.id}`)

    
    socket.on('disconnect', () => {
        console.log(`User disconnected and count is: ${socket.id}`);
    });
})


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(
    cors()
)

app.use(compression())
app.use('/storage',express.static(path.join(__dirname, './storage')))



import ValidateApiToken from './middlewares/validate_api_token.js'
import InvoiceRoute from './routes/invoice_route.js'
import SanctionRoute from './routes/sanction_route.js'
import ManagerRoute from './routes/manager_route.js'
import StatisticsRoute from './routes/statistics_route.js'
import ReportRoute from './routes/report_route.js'

import { port } from './configs/env_configs.js'


// public routes
// app.use(
//     '/api',
//     AuthRoute,
// )

// routes requires a valid api token
app.use(
    '/api',
    // ValidateApiToken,
    InvoiceRoute,
    SanctionRoute,
    ManagerRoute,
    StatisticsRoute,
    ReportRoute,
)

app.use(ErrorHandlerMiddleware)


app.get('*', (req, res) => {
    return res.status(NOT_FOUND).json({
        error: '404 Not Found',
        url: req.url
    })
})

const main = async () => {
    try{
        server.listen(port, () => console.log(`[server] listening on ${port}`))
    }catch(err){
        logger.error(err.message)
    }
}

main()

