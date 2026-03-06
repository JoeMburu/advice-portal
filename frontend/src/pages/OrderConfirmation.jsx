import React from 'react'
import { useOrders } from '../order/orderContext.jsx'

export const OrderConfirmation = () => {
  const { placedOrder } = useOrders();

  return (
    <>
    <div>OrderConfirmation</div>
    <div>Order Number: {placedOrder?.order_number}</div>
    <div>Status: {placedOrder?.status}</div>
    { placedOrder}
    </>
  )
}
