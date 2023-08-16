import { configureStore } from '@reduxjs/toolkit'
import { addCart } from './addcart'


export default configureStore({
  reducer: {
    addCart
  }
})
