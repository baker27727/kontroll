import promiseAsyncWrapepr from "../middlewares/promise_async_wrapper.js"
import axios from "axios"
import querystring from "querystring"
import { autosys_api_key } from "../config.js"
import CustomError from "../interfaces/custom_error_class.js"
import { INTERNAL_SERVER } from "../constants/status_codes.js"

class AutosysRepository{
    /**
     * Retrieves information about a car based on its plate number.
     *
     * @param {Object} options - The options for retrieving the plate information.
     * @param {string} options.plate_number - The plate number of the car.
     * @return {Promise<{
     *     car_type: string,
     *     car_color: string,
     *     car_brand: string,
     *     car_model: string,
     *     car_description: string,
     *     manufacture_year: number,
     *     plate_number: string
     * }>} A promise that resolves to an object containing information about the car.
     * @throws {CustomError} If there is an error retrieving the plate information from the Autosys server.
     */
    static  getPlateInformation({ plate_number }){
        return new Promise(promiseAsyncWrapepr(
            async (resolve, reject) => {
                try{
                    const apiUrl = `https://www.vegvesen.no/ws/no/vegvesen/kjoretoy/felles/datautlevering/enkeltoppslag/kjoretoydata?kjennemerke=${plate_number}`
                    let response = await axios.get(apiUrl, {
                        headers:{
                            'SVV-Authorization': `Apikey ${autosys_api_key}`
                        }
                    })
    
                    let data = response.data

                    if(response.status != 200){
                        let status_error = new CustomError('Autosys server error', response.status)
                        return reject(status_error)
                    }
                    
                    return resolve({
                        car_type: data?.kjoretoydataListe[0]?.kjennemerke[0]?.kjennemerkekategori,
                        plate_number: data?.kjoretoydataListe[0]?.kjoretoyId?.kjennemerke.toUpperCase().replace(/\s/g, ''),
                        manufacture_year: data?.kjoretoydataListe[0]?.godkjenning?.tekniskGodkjenning?.kjoretoyklassifisering?.nasjonalGodkjenning?.nasjonaltGodkjenningsAr,
                        car_description: data?.kjoretoydataListe[0]?.godkjenning?.tekniskGodkjenning?.kjoretoyklassifisering?.beskrivelse,
                        car_model: data?.kjoretoydataListe[0]?.godkjenning?.tekniskGodkjenning?.tekniskeData?.generelt?.merke[0]?.merke,
                        car_color: data?.kjoretoydataListe[0]?.godkjenning?.tekniskGodkjenning?.tekniskeData?.karosseriOgLasteplan?.rFarge[0]?.kodeNavn
                    })
                }catch(error){
                    let autosys_server_error = new CustomError(error.message, INTERNAL_SERVER)
                    return reject(autosys_server_error)
                }
            }
        ))
    }
}

export default AutosysRepository