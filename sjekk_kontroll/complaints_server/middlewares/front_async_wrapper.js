import CustomError from "../interfaces/custom_error_class.js";
import { INTERNAL_SERVER } from "../constants/status_codes.js";

const uiAsyncWrapper = (fn) =>{
    return async (req, res) =>{
        try{
            await fn(req,res);
        }catch(error){            
            return res.status(INTERNAL_SERVER).render('errors/500',{
                error: error.message
            })
        }
    }
}

export default uiAsyncWrapper