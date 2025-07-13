import PaymentRepository from "./repositories/Payment.js";

const charges = await PaymentRepository.createPaymentIntent()

console.log(charges);
