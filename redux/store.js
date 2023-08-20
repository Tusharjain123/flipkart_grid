import { configureStore } from '@reduxjs/toolkit'
import { addCart } from './addcart'
import {recommendData} from './RecommendData'

export default configureStore({
  reducer: {
    recommendData: recommendData.reducer
  }
})
