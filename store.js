import { configureStore } from '@reduxjs/toolkit'
import { addCart } from './redux/addcart'

export default configureStore({
  reducer: {
    cart: addCart
  }
})
