import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { jwt_secret_key } from '../configs.js'
import promiseAsyncWrapper from "../middlewares/promise_async_wrapper.js";


class Auth{
    static encryptPassword(password){
        return new Promise(promiseAsyncWrapper(
            async (resolve) =>{
                let hashedPassword = await bcrypt.hash(password,10)
                return resolve(hashedPassword)
            }
        ))
    }

    static decryptAndCheckPasswordMatch({ plain, encrypted }){
        return new Promise(promiseAsyncWrapper(
            async (resolve) =>{
                let isMatch = await bcrypt.compare(plain,encrypted)    
                return resolve(isMatch)
            }
        ))
    }

    static generateToken(data, expiresIn = '30d'){
        return new Promise(promiseAsyncWrapper(
            async (resolve) =>{
                let token = jwt.sign(
                    data,
                    jwt_secret_key,
                    {expiresIn}
                )
                return resolve(token)
            }
        ))
    }

    static verifyToken(token){
        return new Promise(promiseAsyncWrapper(
            async (resolve) =>{
                let decoded = jwt.verify(token,jwt_secret_key)
                return resolve(decoded)
            }
        ))
    }
}

export default Auth