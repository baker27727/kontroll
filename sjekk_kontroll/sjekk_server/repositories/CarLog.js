import puppeteer from "puppeteer"
import promiseAsyncWrapper from "../middlewares/promise_async_wrapper.js"
import CarLogModel from "../models/CarLogs.js"
import { INTERNAL_SERVER } from "../constants/status_codes.js"
import CustomError from "../interfaces/custom_error_class.js"
import fs from 'fs'
import Handlebars from 'handlebars'
import moment from "moment"
import { static_absolute_files_host } from "../config.js"
import ReportModel from "../models/Report.js"

import { PrismaClient } from "@prisma/client"

class CarLogRepository{
    static prisma = new PrismaClient()
    static getAllLogs(){
        return new Promise(promiseAsyncWrapper(
            async (resolve) =>{
                const logs = await this.prisma.carLog.findMany({
                    orderBy: {
                        created_at: 'desc'
                    }
                })
                return resolve(logs)
            }
        ))
    }

    static getAllPlaceLogs({ place_id }){
        return new Promise(promiseAsyncWrapper(
            async (resolve) =>{
                const logs = await this.prisma.carLog.findMany({
                    where: {
                        place_id: +place_id
                    },
                    orderBy: {
                        created_at: 'desc'
                    }
                })
                return resolve(logs)
            }
        ))
    }

    static getAllPlaceCarLogsCount({ place_id }){
        return new Promise(promiseAsyncWrapper(
            async (resolve) =>{
                const logs = await this.prisma.carLog.count({
                    where: {
                        place_id: +place_id
                    }
                })
                return resolve(logs)
            }
        ))
    }

    static getAllPlaceCarLogsAvgTime(place_id){
        return new Promise(promiseAsyncWrapper(
            async (resolve, reject) =>{
                const logs = await this.prisma.carLog.aggregate({
                    where: {
                        place_id: +place_id
                    },

                    _avg: {
                        
                    }
                })
                
                return resolve(logs)
            }
        ))
    }

    static generateCarLogsReport(logs){
        return new Promise(promiseAsyncWrapper(
            async (resolve, reject) =>{
                let parsed_logs = [...logs]
                const browser = await puppeteer.launch({
                    headless: 'true',
                    args:['--no-sandbox'],
                    // defaultViewport:{
                    //     width: 800,
                    //     height: 600,
                    //     deviceScaleFactor: 2
                    // }
                });

                try{
                    const page = await browser.newPage();

                    let totalParkingTime = 0

                    for(let log of parsed_logs){
                        const startMoment = moment(log.start_date, 'DD.MM.YY HH:mm');
                        const endMoment = moment(log.end_date, 'DD.MM.YY HH:mm');

                        const hoursDifference = endMoment.diff(startMoment, 'hours');
                        totalParkingTime += +hoursDifference
                    }

                    let grouped_by_date = parsed_logs.reduce((acc, obj) => {
                        // Convert start_date to moment object and format as YYYY-MM-DD for the key
                        const dayKey = moment(obj.start_date, 'DD.MM.YY HH:mm').format('DD.MM.YY');
                    
                        // If the key doesn't exist, initialize it with an empty array
                        if (!acc[dayKey]) {
                          acc[dayKey] = [];
                        }
                    
                        // Push the current object to the array for this key
                        acc[dayKey].push(obj);
                    
                        return acc;
                      }, {})

                      let line_chart_data = {
                        labels: [],
                        values: []
                      }

                      let pie_chart_data = {
                        labels: ['Normal', 'Electric'],
                        values: [0,0]
                      }

                    for(let group_member of Object.keys(grouped_by_date)){
                        line_chart_data.labels.push(group_member)
                        let group_member_total_parking_time = grouped_by_date[group_member].reduce((sum, acc) => {
                            const startMoment = moment(acc.start_date, 'DD.MM.YY HH:mm');
                            const endMoment = moment(acc.end_date, 'DD.MM.YY HH:mm');
    
                            const hoursDifference = endMoment.diff(startMoment, 'hours');
                            sum += hoursDifference
                            
                            return sum
                        },0)

                        line_chart_data.values.push(group_member_total_parking_time)

                        for(let item of grouped_by_date[group_member]){
                            if(item.plate_number.startsWith('E') || item.plate_number.startsWith('e')){
                                pie_chart_data.values[1] = pie_chart_data.values[1] + 1
                            }else{
                                pie_chart_data.values[0] = pie_chart_data.values[0] + 1
                            }
                        }
                    }
                
                    const templateData = {
                        pie_chart : {
                            labels: pie_chart_data.labels,
                            values: pie_chart_data.values
                        },

                        line_chart: {
                            labels: line_chart_data.labels,
                            values: line_chart_data.values
                        },

                        date: moment().format('DD.MM.YY HH:mm'),
                        total_parkings: parsed_logs.length,
                        total_parking_time: totalParkingTime,
                        average_parking_time: totalParkingTime / parsed_logs.length,

                        host: static_absolute_files_host
                    }
                    const carLogTemplateSource = fs.readFileSync('app_templates/car_logs_template.html', 'utf-8');
                    Handlebars.registerHelper('json', function(obj) {
                        return JSON.stringify(obj);
                      });

                    // Precompile the template
                    const compiledCarLogTemplate = Handlebars.compile(carLogTemplateSource);
                    let parsed = compiledCarLogTemplate(templateData)
                
                    await page.waitForNetworkIdle()
                    await page.setContent(parsed, {
                        waitUntil: 'load'
                    })
                    

                    setTimeout(async () => {
                        let filename = `${Date.now().toString()}_${moment().format('DD_MM_YY_HH_MM')}`
                        await page.pdf({
                            path: `./public/car_log_reports/${filename}.pdf`,
                            format: 'A4'
                        })

                        await ReportModel.create({
                            filename: filename,
                            filetype: 'car_log',
                            link: `${static_absolute_files_host}public/car_log_reports/${filename}.pdf`,
                            created_at: moment().format('DD.MM.YY HH:mm'),
                            notes: 'some note',
                            report_inner_details:{
                                total_parking_time: +templateData.total_parking_time,
                                total_parkings: +templateData.total_parkings,
                                average_parking_time: +templateData.average_parking_time,
                                revenue: 12000
                            }
                        })
    
                        await page.close()
                        await browser.close();
                    }, 3000)

                    return resolve(true)
                }catch(error){
                    await browser.close()
                    let generate_car_logs_error = new CustomError(
                        error.message,
                        INTERNAL_SERVER
                    );

                    return reject(generate_car_logs_error)
                }
            }
        ))
    }

    
    static getAllCarLogsReports(){
        return new Promise(promiseAsyncWrapper(
            async (resolve, reject) =>{
                let reports = await this.prisma.carLogReport.findMany()
                
                return resolve(reports)
            }
        ))
    }
}

export default CarLogRepository