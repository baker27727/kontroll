import promiseAsyncWrapepr from "../middlewares/promise_async_wrapper.js";
import Brand from "../models/Brand.js";

class BrandRepository{
    static getAllBrands(){
        return new Promise(
            promiseAsyncWrapepr(
                async (resolve, reject) => {
                    const brands = await Brand.find()
                    return resolve(brands)
                }
            )
        )
    }

    static createBrand(brand){
        return new Promise(
            promiseAsyncWrapepr(
                async (resolve) => {
                    const newBrand = await Brand.create({
                        value: brand
                    })

                    return resolve(newBrand != null)
                }
            )
        )
    }
    
    static deleteBrand(id) {
        return new Promise(
            promiseAsyncWrapepr(
                async (resolve, reject) => {
                    let result = await Brand.deleteOne({
                        _id: id
                    })

                    return resolve(result.deletedCount > 0)
                }
            )
        )
    }
}

export default BrandRepository