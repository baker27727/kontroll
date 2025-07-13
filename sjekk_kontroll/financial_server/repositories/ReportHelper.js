import puppeteer from "puppeteer";
import { compiledReportTemplate } from "../configs/env_configs.js";
import { INTERNAL_SERVER } from "../constants/status_codes.js";
import CustomError from "../interfaces/custom_error_class.js";
import promiseAsyncWrapper from "../middlewares/promise_async_wrapper.js"
import Randomstring from "randomstring"

class ReportHelperRepository {
    /**
     * 
     * @param {{sanctions: Array<import("@prisma/client").Sanction>}} param0 
     * @param {{report_title: string}} param1
     * @returns {Promise<string>}
     */
    static generateReport = async ({
        sanctions,
        report_title
    }) => new Promise(
        promiseAsyncWrapper(async (resolve, reject) => {
            console.log('Into generate report');
            const browser = await puppeteer.launch({
                headless: 'true',
                args:['--no-sandbox'],
            });

            try{
                const page = await browser.newPage()

                const template_data = {
                    company_name: 'My Company',
                    total_sanctions: sanctions.length,
                    sanctions,
                    report_title
                }

                const parsed = compiledReportTemplate(template_data)

                await page.waitForNetworkIdle()
                await page.setContent(parsed)

                const report_name = Randomstring.generate(10)

                await page.pdf({
                    path: `./storage/reports/report_${report_name}.pdf`,
                    printBackground: true, 
                    format: 'A3' 
                })

                await browser.close();
                const path = `reports/report_${report_name}.pdf`

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

export default ReportHelperRepository