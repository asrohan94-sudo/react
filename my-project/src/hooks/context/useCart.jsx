import CartItemsContext from '../../context/CartItemsContect'
import React, { useContext } from 'react'

const useCart = () => {
  return useContext(CartItemsContext)
}

export default useCart