import ValidatorRepository from "./Validator.js"
import promiseAsyncWrapper from "../middlewares/promise_async_wrapper.js"
import { createTransport } from 'nodemailer';
import { smtp_host, smtp_pass, smtp_port, smtp_user } from "../config.js";
import logger from "../utils/logger.js";
import TimeRepository from "./Time.js";
import { PrismaClient } from "@prisma/client";

class EmailRepository{
    static transporter
    static prisma = new PrismaClient()

    static getTransporter(){
        if(!this.transporter){
            this.transporter = createTransport({
                host: smtp_host, // Hostinger SMTP server
                port: smtp_port, // Port for sending mail
                secure: true, // Use SSL (false for TLS)
                auth: {
                  user: smtp_user, // Your email address
                  pass: smtp_pass, 
                },
              });
        }
        
        return this.transporter
    }

    static async storeEmail({ subject, content, sender, receiver }) {
        return new Promise(
            promiseAsyncWrapper(async (resolve) => {
                await ValidatorRepository.isEmail(receiver)
                
                const sent_at = await TimeRepository.getCurrentTime()
                await this.prisma.email.create({
                    data: {
                        subject, content, sender, receiver, sent_at
                    }
                })
                return resolve(email)
            })
        )
    }

    static sendMail({ subject, to, text, html}){
        return new Promise(
            promiseAsyncWrapper(async (resolve) => {
                const mailOptions = {
                    from: smtp_user, // Sender address
                    to: to, // Recipient address
                    subject: subject,
                    text: text,
                    html: html
                }
        
                const transporter = this.getTransporter()

                await transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                      logger.error('Error sending email:', error);
                    } else {
                      logger.info('Email sent:', info.response);
                    }
                  })


                return resolve(true)
                
            })
        )
    }
} 

export default EmailRepository