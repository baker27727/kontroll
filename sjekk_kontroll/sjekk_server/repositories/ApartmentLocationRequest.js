import promiseAsyncWrapper from "../middlewares/promise_async_wrapper.js";
import PrismaClientService from "../utils/prisma_client.js";

class ApartmentLocationRequestRepository {
    static prisma = PrismaClientService.instance

    static getAllApartmentLocationRequests = async () => new Promise(
        promiseAsyncWrapper((resolve,reject) => {
            
        })
    )

    static createApartmentLocationRequest = async () => new Promise(
        promiseAsyncWrapper((resolve,reject) => {
            
        })
    )
}

export default ApartmentLocationRequestRepository