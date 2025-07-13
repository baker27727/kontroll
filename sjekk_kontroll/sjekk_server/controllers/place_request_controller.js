import { OK, CREATED, BAD_REQUEST, NOT_FOUND } from "../constants/status_codes.js";
import asyncWrapper from "../middlewares/async_wrapper.js";
import PlaceRequestRepository from "../repositories/PlaceRequest.js";
import ValidatorRepository from "../repositories/Validator.js";

// Create a new place request
export const createPlaceRequest = asyncWrapper(
    async (req, res) => {
        const { request_type, location, policy, code, requested_by_id, place_id } = req.body;
        console.log(req.body);
        await ValidatorRepository.validateNotNull({ request_type, requested_by_id })
        
        const placeRequest = await PlaceRequestRepository.createPlaceRequest({ request_type, location, policy, code, requested_by_id, place_id });
        return res.status(CREATED).json(placeRequest);
    }
);

// Get a place request by ID
export const getPlaceRequestById = asyncWrapper(
    async (req, res) => {
        const { id } = req.params;
        const placeRequest = await PlaceRequestRepository.getPlaceRequestById({ place_request_id: id });

        if (!placeRequest) {
            return res.status(NOT_FOUND).json({ error: 'Place request not found' });
        }

        return res.status(OK).json(placeRequest);
    }
);

export const getAllPartnerPlaceRequests = asyncWrapper(
    async (req, res) => {
        const { id: partner_id } = req.params;
        const placeRequests = await PlaceRequestRepository.getAllPartnerPlaceRequests({ partner_id });
        return res.status(OK).json(placeRequests);
    }
)

// Get all place requests
export const getAllPlaceRequests = asyncWrapper(
    async (req, res) => {
        const placeRequests = await PlaceRequestRepository.getAllPlaceRequests();
        return res.status(OK).json(placeRequests);
    }
);

// Update a place request status
export const updatePlaceRequestStatus = asyncWrapper(
    async (req, res) => {
        const { id } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(BAD_REQUEST).json({ error: 'Status is required' });
        }

        const placeRequest = await PlaceRequestRepository.updatePlaceRequestStatus({ place_request_id: id, status });

        if (!placeRequest) {
            return res.status(NOT_FOUND).json({ error: 'Place request not found' });
        }

        return res.status(OK).json(placeRequest);
    }
);

// Approve a place request
export const approvePlaceRequest = asyncWrapper(
    async (req, res) => {
        const { id: place_request_id } = req.params;

        const approval = await PlaceRequestRepository.approvePlaceRequest({ place_request_id });
        return res.status(CREATED).json(approval);
    }
);

// Delete a place request
export const deletePlaceRequest = asyncWrapper(
    async (req, res) => {
        const { id: place_request_id } = req.params;

        const deletedRequest = await PlaceRequestRepository.deletePlaceRequest({ place_request_id });

        if (!deletedRequest) {
            return res.status(NOT_FOUND).json({ error: 'Place request not found' });
        }

        return res.status(OK).json(deletedRequest);
    }
);
