import puppeteer from "puppeteer";
import { compiledInvoiceTemplate } from "../configs/env_configs.js";
import { INTERNAL_SERVER } from "../constants/status_codes.js";
import CustomError from "../interfaces/custom_error_class.js";
import promiseAsyncWrapper from "../middlewares/promise_async_wrapper.js"
import Randomstring from "randomstring"

class InvoiceHelperRepository {
    static generateInvoiceFile = async ({}) => new Promise(
        promiseAsyncWrapper(async (resolve, reject) => {
            const browser = await puppeteer.launch({
                headless: 'true',
                args:['--no-sandbox'],
                defaultViewport:{
                    width: 800,
                    height: 600,
                    deviceScaleFactor: 2
                }
            });

            try{
                const page = await browser.newPage()

                const template_data = {

                }

                const parsed = compiledInvoiceTemplate(template_data)

                await page.waitForNetworkIdle()
                await page.setContent(parsed)
                const container = await page.$('.invoice-box')

                const invoice_name = Randomstring.generate(10)

                await container.screenshot({
                    path: `./storage/invoices/invoice_${invoice_name}.jpg`,
                    quality: 100,
                })

                await browser.close();
                const path = `invoices/${invoice_name}.jpg`

                return resolve(path)
            }catch(error){
                await browser.close()
                let generate_invoice_error = new CustomError(
                    error.message,
                    INTERNAL_SERVER
                );

                return reject(generate_invoice_error)
            }
        })
    )
}

export default InvoiceHelperRepository