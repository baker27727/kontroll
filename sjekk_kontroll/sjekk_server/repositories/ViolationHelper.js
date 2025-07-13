import randomstring from "randomstring";
import promiseAsyncWrapper from "../middlewares/promise_async_wrapper.js";
import puppeteer from "puppeteer"
import Handlebars from "handlebars"
import qr from 'qr-image'
import fs from "fs"
import CustomError from "../interfaces/custom_error_class.js";
import { INTERNAL_SERVER } from "../constants/status_codes.js";
import moment from "moment";
import path from "path"
import { fileURLToPath } from 'url'
import JsBarcode from 'jsbarcode';



const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

import { createCanvas, loadImage } from 'canvas'


import { compiledViolationTemplate, static_absolute_files_host, static_files_host } from "../config.js";

class ViolationHelperRepository{
    static generateTicketNumber(){
        let generated = randomstring.generate({
            length: 7,
            charset: 'numeric'
        })
        return generated
    }

    static generateRandomString(){
        return randomstring.generate(12)
    }

    static generateTicketQRCode(ticket_number, plate_number){
        return new Promise(
            promiseAsyncWrapper(
                async (resolve, reject) => {
                    try{
                        const data = `https://client.gensolv.no?auto_login=true&plate_number=${plate_number}&ticket_number=${ticket_number}` // URL or any data you want to encode
                        const qrCode = qr.image(data, { type: 'png', size: 10 });
                        let randomstring = this.generateRandomString()
                
                        // Generate a unique filename
                        const filename = `${randomstring}_${moment().format('DD.MM.YY')}.png`;
                        const filePath = `public/qrcodes/${filename}`;
                
                        const qrStream = qrCode.pipe(fs.createWriteStream(filePath));
                
                        qrStream.on('finish', () => {
                            console.log(`QR Code saved as ${filename}`);
                        });

                        return resolve(`qrcodes/${filename}`)
                    }catch(err){
                        reject(err.message)
                    }
                }
            )
        )
    }

    static generateRealSerialNumber(length = 10) {
        const generateRandomNumber = (min, max) => Math.floor(min + Math.random() * (max - min + 1));
        const generateUniqueSignature = () => Math.random().toString(36).substr(2, 5).toUpperCase(); // You can adjust the length as needed
      
        // Generating a simple unique identifier consisting only of numbers
        const uniqueIdentifier = Array.from({ length }, () => generateRandomNumber(0, 9)).join('');
      
        // Generate a unique signature
        const signature = generateUniqueSignature();
      
        // Concatenate product type, unique identifier, and signature
        return `VL-${uniqueIdentifier}-${signature}`;
      }

    static generateTicketBarcode(value,options = {}, width = 4, height = 200){
        return new Promise(promiseAsyncWrapper(async (resolve, reject) => {
            const canvas = createCanvas(width * 100, height * 100);
      const ctx = canvas.getContext('2d');
      

      // Generate a barcode with JsBarcode
      JsBarcode(canvas, value, {
        format: options.format || 'CODE128',
        width: options.width || 4,
        height: options.height || 200,
        displayValue: options.displayValue || true,
        background: '#ffffff00',
      });

      // Generate a unique filename for the barcode image
      const fileName = `${value}.png`;
      const filePath = `public/barcodes/${fileName}`;

      // Save the canvas to a file
      const out = fs.createWriteStream(filePath);
      const stream = canvas.createPNGStream();
      stream.pipe(out);

      out.on('finish', () => {
        console.log(`Barcode created: ${filePath}`);
        resolve(static_files_host + `barcodes/${fileName}`);
    });
        }))
    }

    static generateTicketImage(name,barcode_image ,data = {}){
        return new Promise(promiseAsyncWrapper(
            async (resolve, reject) => {
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
                    const page = await browser.newPage();
                    let qrcode_image = await this.generateTicketQRCode(data.ticket_number, data.car_info.plate_number)
                    
                    
                    console.log(data.rules);
                
                    const templateData = {
                        ...data,
                        qrcode_image: qrcode_image,
                        barcode_image: barcode_image,
                        host: static_files_host,
                    }
                
                    let parsed = compiledViolationTemplate(templateData)
                
                    await page.waitForNetworkIdle()
                    await page.setContent(parsed)
                    const container = await page.$('.container')

                    

                    await container.screenshot({
                        path: `./public/tickets/${name}.jpg`,
                        quality: 100,
                    })
                
                    await browser.close();
                    let path = static_files_host + `tickets/${name}.jpg`

                    return resolve({ 
                        qrcode_link: `https://client.gensolv.no?auto_login=true&plate_number=${data.car_info.plate_number}&ticket_number=${data.ticket_number}`, 
                        ticket_link: path
                    })
                }catch(error){
                    await browser.close()
                    let generate_ticket_image_error = new CustomError(
                        error.message,
                        INTERNAL_SERVER
                    );

                    return reject(generate_ticket_image_error)
                }
            }
        ));
    }

    static addDateWatermarkToImage(imagePath,originalName, date){
        return new Promise(promiseAsyncWrapper(
            async (resolve, reject) => {
                try {
                    // Load the image using canvas
                    const image = await loadImage(imagePath);
                    console.log('image is loaded successfully');
                    const canvas = createCanvas(image.width, image.height);
                    const ctx = canvas.getContext('2d');
            
                    // Draw the original image
                    ctx.drawImage(image, 0, 0);
            
                    // Set font and color for the timestamp
                    const fontSize = 20;
                    ctx.font = `${fontSize}px Arial`;
                    ctx.fillStyle = 'white';
            
                    // Format the date as a string
            
                    // Measure the width of the text to determine the box size
                    const textWidth = ctx.measureText(date).width;
                    const boxPadding = 10;
            
                    // Draw a gray box at the bottom right corner
                    ctx.fillStyle = 'rgba(128, 128, 128, 0.7)';
                    ctx.fillRect(image.width - textWidth - boxPadding * 2, image.height - fontSize - boxPadding * 2, textWidth + boxPadding * 2, fontSize + boxPadding * 2);
            
                    // Draw the timestamp inside the box
                    ctx.fillStyle = 'white';
                    ctx.fillText(date, image.width - textWidth - boxPadding, image.height - boxPadding);
            
                    // Save the modified image
                    const modifiedImagePath = path.join(__dirname, '../','public', 'images', 'cars', originalName)
                    const modifiedImageStream = fs.createWriteStream(modifiedImagePath);
                    const modifiedImageBuffer = canvas.toBuffer('image/jpeg');
                    modifiedImageStream.write(modifiedImageBuffer);
                    modifiedImageStream.end();
            
                    console.log('Date embedded successfully.');
        
                    return resolve('images/cars/' + originalName)
                } catch (error) {
                    console.error('Error embedding date:', error);
                    return reject(error.message)
                }
            }
        ))
    }
}

export default ViolationHelperRepository