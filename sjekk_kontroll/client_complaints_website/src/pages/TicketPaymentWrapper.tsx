import TicketPayment from './TicketPayment'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { useEffect } from 'react';
import { getPayment } from '../redux/features/payment_feature';

const TicketPaymentWrapper = () => {
    const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
    const dispatch = useAppDispatch()

    const { payment, loading, error } = useAppSelector(state => state.payment_feature)
    const { ticket } = useAppSelector(state => state.client_auth)

    useEffect(() => {
        dispatch(getPayment(ticket.id))
    }, [dispatch, ticket])

    if(loading) return <p>Loading...</p>
    if(error) return <p>{error}</p>
    console.log(payment);
    
    if(!payment) return <p>Payment not found</p>
    
  return (
    <Elements stripe={(async () => await stripePromise)()} options={{
        clientSecret: payment.payment_intent_client_secret,
      }}>
        <TicketPayment />
      </Elements>
  )
}

export default TicketPaymentWrapper