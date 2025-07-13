import promiseAsyncWrapepr from "../middlewares/promise_async_wrapper.js";
import { PrismaClient } from "@prisma/client"

class ColorRepository{
    static prisma = new PrismaClient()
    static getAllColors(){
        return new Promise(
            promiseAsyncWrapepr(
                async (resolve, reject) => {
                    const colors = await this.prisma.color.findMany({})
                    return resolve(colors)
                }
            )
        )
    }

    static createColor({ color }){
        return new Promise(
            promiseAsyncWrapepr(
                async (resolve, reject) => {
                    const new_color = await this.prisma.color.create({ 
                        data: {
                            value: color
                        }
                    })

                    return resolve(new_color)
                }
            )
        )
    }
    
    static deleteColor(id) {
        return new Promise(
            promiseAsyncWrapepr(
                async (resolve, reject) => {
                    const result = await this.prisma.color.delete({
                        where: {
                            _id: id
                        }
                    })

                    return resolve(result)
                }
            )
        )
    }
}

export default ColorRepository