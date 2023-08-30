import { configureStore } from '@reduxjs/toolkit'
import {recommendData} from './RecommendData'

export default configureStore({
  reducer: {
    recommendData: recommendData.reducer
  }
})
