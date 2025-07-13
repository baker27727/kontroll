import { connect } from 'mongoose';
import { mongodb_connection_string } from '../config.js';


export default new Promise(async (resolve, reject) => {
    try{
        await connect(mongodb_connection_string).then(() => console.log('connected to mongodb'))
        return resolve(true) 
    }catch(e){
        return reject (new Error('Connection Error: ' + e.message))
    }
})