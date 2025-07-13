import { PrismaClient} from "@prisma/client";
import promiseAsyncWrapper from "../middlewares/promise_async_wrapper.js";
import TimeRepository from "./Time.js";

class PlaceRequestRepository {
    static prisma = new PrismaClient();

    // Create a new place request
    static async createPlaceRequest({ request_type, location, policy, code, requested_by_id, place_id }) {
        return new Promise(
            promiseAsyncWrapper(async (resolve) => {
                const created_at = await TimeRepository.getCurrentTime();
                const place_request = await this.prisma.placeRequest.create({
                    data: {
                        request_type,
                        location,
                        policy,
                        code,
                        place_id,
                        requested_by_id,
                        created_at
                    }
                });
                return resolve(place_request);
            })
        )
    }

    static async getPlaceRequestById({ place_request_id }) {
        return new Promise(
            promiseAsyncWrapper(async (resolve) => {
                const place_request = await this.prisma.placeRequest.findUnique({
                    where: {
                        id: +place_request_id,
                        deleted_at: null
                    },
                    include: {
                        approval: true,
                        requested_by: true
                    }
                });
                return resolve(place_request);
            })
        )
    }

    static async getAllPlaceRequests() {
        return new Promise(
            promiseAsyncWrapper(async (resolve) => {
                const place_requests = await this.prisma.placeRequest.findMany({
                    where: {
                        deleted_at: null,
                        status: 'pending'
                    },
                    include: {
                        approval: true,
                        requested_by: true
                    }
                });
                return resolve(place_requests);
            })
        )
    }

    static async getAllPartnerPlaceRequests({ partner_id }) {
        return new Promise(
            promiseAsyncWrapper(async (resolve) => {
                const place_requests = await this.prisma.placeRequest.findMany({
                    where: {
                        requested_by_id: +partner_id,
                        deleted_at: null,
                        status: 'pending'
                    },
                    include: {
                        approval: true,
                        requested_by: true
                    }
                });
                return resolve(place_requests);
            })
        )
    }

    // Update a place request status
    static async updatePlaceRequestStatus({ place_request_id, status }) {
        return new Promise(
            promiseAsyncWrapper(async (resolve) => {
                const updated_at = await TimeRepository.getCurrentTime();
                const place_request = await this.prisma.placeRequest.update({
                    where: {
                        id: +place_request_id
                    },
                    data: {
                        status,
                        updated_at
                    }
                });
                return resolve(place_request);
            })
        )
    }

    // Create an approval for a place request
    static async approvePlaceRequest({ place_request_id }) {
        return new Promise(
            promiseAsyncWrapper(async (resolve) => {
                const current_date = await TimeRepository.getCurrentTime();
    
                const updated_place_request = await this.prisma.placeRequest.update({
                    where: {
                        id: +place_request_id
                    },
                    data: {
                        status: 'approved',
                        updated_at: current_date
                    }
                });

                if(updated_place_request.request_type == 'creation') {
                    await this.prisma.place.create({
                        data: {
                            location: updated_place_request.location,
                            policy: updated_place_request.policy,
                            code: updated_place_request.code,
                            created_at: current_date,

                            normal_place: {
                                create: {
                                    place_type: '',
                                    location: updated_place_request.location,
                                    policy: updated_place_request.policy,
                                    code: updated_place_request.code,
                                    partner_id: updated_place_request.requested_by_id,
                                }
                            },
                            place_type: 'normal'
                        }
                    })
                }else if(updated_place_request.request_type == 'deletion'){
                    const updated = await this.prisma.place.update({
                        where: {
                            id: +updated_place_request.place_id
                        },
                        data: {
                            deleted_at: current_date
                        }
                    })

                    if(updated.place_type == 'normal'){
                        await this.prisma.normalPlace.update({
                            where: {
                                id: +updated_place_request.place_id
                            },
                            data: {
                                deleted_at: current_date
                            }
                        })
                    } else if(updated.place_type == 'residential'){
                        await this.prisma.residentialQuarter.update({
                            where: {
                                id: +updated_place_request.place_id
                            },
                            data: {
                                deleted_at: current_date
                            }
                        })
                    }
                }
    
                return resolve(true);
            })
        )
    }

    // Delete a place request
    static async deletePlaceRequest({ place_request_id }) {
        return new Promise(
            promiseAsyncWrapper(async (resolve) => {
                const deleted_at = await TimeRepository.getCurrentTime();
                
                const deleted = await this.prisma.placeRequest.update({
                    where: {
                        id: +place_request_id
                    },
                    data: {
                        deleted_at,
                        status: 'rejected'
                    }
                });
                return resolve(deleted);
            })
        )
    }
}

export default PlaceRequestRepository;
