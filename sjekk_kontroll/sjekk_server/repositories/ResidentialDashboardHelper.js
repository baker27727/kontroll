import moment from "moment";
import promiseAsyncWrapper from "../middlewares/promise_async_wrapper.js";
import fs from 'fs'
import qr from 'qr-image'
import { fileURLToPath } from 'url'
import path from "path"
import { residential_link } from "../config.js";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

class ResidentialDashboardHelper {
    /**
     * Generates a QR code for apartment registration based on the provided residential quarter ID.
     *
     * @param {{residential_quarter_id: string}} params - An object containing the residential quarter ID.
     * @param {string} params.residential_quarter_id - The ID of the residential quarter.
     * @return {Promise<{apartment_registration_qrcode: string, qrcode_link: string}>} A promise resolving to an object containing the path to the generated QR code and the encoded data.
     */
    static generateTicketQRCode({residential_quarter_id}){
        return new Promise(
            promiseAsyncWrapper(
                async (resolve, reject) => {
                    try{
                        const data = `${residential_link}/quarters/${residential_quarter_id}/apartments/registration` // URL or any data you want to encode
                        const qrCode = qr.image(data, { type: 'png', size: 10 });
                
                        // Generate a unique filename
                        const filename = `${residential_quarter_id}_${moment().format('DD.MM.YY')}.png`;
                        const filePath = `public/qrcodes/${filename}`;
                
                        const qrStream = qrCode.pipe(fs.createWriteStream(filePath));
                
                        qrStream.on('finish', () => {
                            console.log(`QR Code saved as ${filename}`);
                        });

                        return resolve({
                            apartment_registration_qrcode: `qrcodes/${filename}`,
                            qrcode_link: data
                        })
                    }catch(err){
                        reject(err.message)
                    }
                }
            )
        )
    }
}

export default ResidentialDashboardHelper