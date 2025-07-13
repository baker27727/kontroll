import puppeteer from "puppeteer";
import CustomError from "../interfaces/custom_error_class.js";
import fs from "fs"
import { INTERNAL_SERVER } from "../constants/status_codes.js";
import Handlebars from "handlebars"
import promiseAsyncWrapper from "../middlewares/promise_async_wrapper.js";
import randomstring from "randomstring";
import moment from "moment";
import { static_files_host } from "../config.js";


class ShiftHelper{
    static generateReport(logins, start_date, end_date){
        return new Promise(promiseAsyncWrapper(
            async (resolve, reject) => {
                const browser = await puppeteer.launch({
                    headless: 'new',
                    args:['--no-sandbox'],
                    defaultViewport:{
                        width: 800,
                        height: 600,
                        deviceScaleFactor: 2
                    }
                });
                try{
                    const page = await browser.newPage();
            
                    let template = fs.readFileSync('app_templates/locations_logins_report.html', 'utf-8')
                    
                
                
                    const templateData = {
                        logins: logins ?? [],
                        location: logins[0].place,
                        start_date: start_date,
                        end_date: end_date,
                        report_creation_date: moment().format('DD.MM.YY HH:mm'),
                        host: static_files_host
                    }
                
                    let compiled = Handlebars.compile(template)
                    let parsed = compiled(templateData)
                
                    await page.setContent(parsed)
                    let name = randomstring.generate(10)
                    let date = moment().format('YYY.MM.DD')
                    let path = static_files_host + `reports/${name}_${date}.pdf`
                    let filePath = `./public/reports/${name}_${date}.pdf`

                    await page.pdf({
                        path: filePath,
                        printBackground: true,
                        format: 'A3'
                    })

                    new Promise(r => setTimeout(r, 1000));

                    await browser.close();


                    return resolve({
                        path: path,
                        name: `${name}_${date}.pdf`
                    })
                }catch(error){
                    await browser.close()
                    let generate_logins_report_error = new CustomError(
                        error.message,
                        INTERNAL_SERVER
                    );

                    return reject(generate_logins_report_error)
                }
            }
        ));
    }
}

export default ShiftHelper