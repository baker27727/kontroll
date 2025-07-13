import CustomError from "../interfaces/custom_error_class.js";
import { INTERNAL_SERVER } from "../constants/status_codes.js";
import logger from "../utils/logger.js";

const promiseAsyncWrapper = (fn) =>{
    return async (resolve, reject) =>{
        try{
            await fn(resolve,reject);
        }catch(error){            
            logger.error(error.message);

            if(error instanceof CustomError){
                return reject(error);
            }
            
            let custom_error = new CustomError(error.message, INTERNAL_SERVER)
            return reject(custom_error);
        }
    }
}

export default promiseAsyncWrapper