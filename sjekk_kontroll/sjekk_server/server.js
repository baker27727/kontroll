import express from 'express'
import path from 'path'
import compression from 'compression'
import cors from 'cors'
import bodyParser from 'body-parser'
import { port, stripe_secret_key, stripe_webhook_endpoint_secret } from './config.js'
import { NOT_FOUND } from './constants/status_codes.js'
import ErrorHandlerMiddleware from './middlewares/error_handler.js'
import { fileURLToPath } from 'url'
import logger from './utils/logger.js'

import { Server } from 'socket.io'
import http from 'http'

import './utils/cron_jobs.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

const server = http.createServer(app)
export const io = new Server(server,{
    cors: {
        origin: '*'
    }
})


app.set('io', io)


io.on('connection', (socket) => {
    console.log(`a new connection and count is: ${socket.client.conn.server.clientsCount}`)

    socket.on('register-residential', (id) => {
        socket.join(id)

        io.to(id).emit('fm-message', {
            message: 'hello from server'
        })
    })

    socket.on('unregister-residential', (id) => {
        socket.leave(id)
    })
    
    socket.on('disconnect', () => {
        console.log(`User disconnected and count is: ${socket.client.conn.server.clientsCount}`);
    });
})


const stripe = new Stripe(stripe_secret_key);


const handleUpdatePayment = async (charge) => {
    const kid = charge.metadata.kid;
    console.log(kid);
    console.log(charge);
    

    const payment = await PrismaClientService.instance.payment.update({
        where: {
            kid_number: kid
        },
        data: {
            status: 'completed',
            metadata: {
                create: {
                    paid_at: TimeRepository.getCurrentTime(),
                    card_holder_details: {
                        create: {
                            full_name: charge.billing_details.name ?? 'No name',
                            card_number: '**** **** **** ' + charge.payment_method_details.card.last4,
                            country: charge.billing_details.address.country,
                            email: charge.billing_details.email
                        }
                    },
                    charge_id: charge.id,
                    payment_intent_id: charge.payment_intent,
                    receipt_link: charge.receipt_url,
                    payment_method: charge.payment_method_details.type,
                }
            }
        }
    })

    await PaymentRepository.stroePaymentLog({
        action: 'payment success',
        details: `Payment for kid ${kid} was successful at ${TimeRepository.getCurrentTime()}`,
        log_level: 'info'
    })

    await axios.post(`https://finance.gensolv.no/api/sanctions/kid/${kid}`)
}


app.post('/api/webhook', bodyParser.raw({ type: 'application/json' }), (request, response) => {
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, stripe_webhook_endpoint_secret);
    
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  console.log(event.type);
    console.log(event.data.object);

  // Handle the event
  switch (event.type) {
    
    case 'payment_intent.succeeded':
    //   const paymentIntentSucceeded = event.data.object;
    //   console.log(paymentIntentSucceeded);
      
      break;
    case 'charge.succeeded':
        console.warn("charge succeeded");
        
      const chargeSucceeded = event.data.object;
      handleUpdatePayment(chargeSucceeded);
      

    
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// app.use(express.raw({ type: 'application/json' }))

app.use(
    cors()
)

app.use(compression())
app.use('/public',express.static(path.join(__dirname, './public')))



import ValidateApiToken from './middlewares/validate_api_token.js'
import UserRoute from './routes/user_route.js'
import AuthRoute from './routes/auth_route.js'
import PlaceRoute from './routes/place_route.js'
import ViolationApi from './routes/violation_route.js'
import ShiftApi from './routes/shift_route.js'
import RuleApi from './routes/rule_route.js'
import AutosysApi from './routes/autosys_route.js'
import CarApi from './routes/car_route.js'
import ColorApi from './routes/color_route.js'
import BrandApi from './routes/brand_route.js'
import StatisticsApi from './routes/statistics_route.js'
import PartnerApi from './routes/partner_route.js'
import CarLogApi from './routes/car_log_route.js'
import RequestApi from './routes/place_requests.js'

import NormalPlaceApi from './routes/normal_place_route.js'
import ResidentialQuarterApi from './routes/residential_place_route.js'
import ApartmentApi from './routes/apartment_route.js'

import ResidentialCarApi from './routes/residential_car_route.js'

import ResidentialDashboardApi from './routes/residential_dashboard_route.js'
import ApartmentRequestApi from './routes/apartment_request_route.js'
import ApartmentLocationRequestApi from './routes/apartment_location_request_route.js'

import NotificationSubscriptionApi from './routes/notification_subscription_router.js'
import SystemNotificationComponentApi from './routes/system_notification_component_route.js'
import ManagerApi from './routes/manager_route.js'
import NotificationAnalyticsApi from './routes/notification_analytics_route.js'

import PaymentApi from './routes/payment_route.js'
import Stripe from 'stripe'
import PrismaClientService from './utils/prisma_client.js'
import TimeRepository from './repositories/Time.js'

import PaymentReportApi from './routes/payment_report_route.js'
import axios from 'axios'
import PaymentRepository from './repositories/Payment.js'


// public routes
app.use(
    '/api',
    AuthRoute,
)

// routes requires a valid api token
app.use(
    '/api',
    // ValidateApiToken,
    UserRoute,
    ManagerApi,
    NotificationSubscriptionApi,
    SystemNotificationComponentApi,
    NotificationAnalyticsApi,
    PlaceRoute,
    ViolationApi,
    ShiftApi,
    RuleApi,
    AutosysApi,
    CarApi,
    ColorApi,
    BrandApi,
    StatisticsApi,
    PartnerApi,
    CarLogApi,
    RequestApi,

    NormalPlaceApi,
    ResidentialQuarterApi,
    ApartmentApi,

    ResidentialCarApi,
    ResidentialDashboardApi,
    ApartmentRequestApi,
    ApartmentLocationRequestApi,

    PaymentApi,
    PaymentReportApi
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

