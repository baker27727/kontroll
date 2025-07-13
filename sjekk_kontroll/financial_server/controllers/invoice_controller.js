import { OK } from "../constants/status_codes.js";
import asyncWrapper from "../middlewares/async_wrapper.js";
import InvoiceRepository from "../repositories/Invoice.js";
import InvoiceHelperRepository from "../repositories/InvoiceHelper.js";
import ValidatorRepository from "../repositories/Validator.js";

export const createInvoice = asyncWrapper(
    async (req,res) => {
        const {
            kid,
            control_number,
            total_charge,
            rules
        } = req.body


        const new_invoice = await InvoiceRepository.createInvoice({
            kid,
            control_number,
            total_charge,
            rules,
            invoice_file
        })

        res.status(OK).json(new_invoice)
    }
)

export const getInvoices = asyncWrapper(
    async (req,res) => {
        const invoices = await InvoiceRepository.getInvoices()
        res.status(OK).json(invoices)
    }
)

export const changeInvoiceStatus = asyncWrapper(
    async (req,res) => {
        const { id, status } = req.body

        await ValidatorRepository.isMemberOf({
            list: ['pending', 'collected'],
            value: status
        })

        const invoice = await InvoiceRepository.changeInvoiceStatus({
            id,
            status
        })
        res.status(OK).json(invoice)
    }
)