import { createSlice } from '@reduxjs/toolkit'

export const addCart = createSlice({
  name: 'cart',
  initialState: {
    value: 0
  },
  reducers: {
    increment: state => {
      state.value += 1
    },
    decrement: state => {
      state.value -= 1
    }
  }
})

export const { increment, decrement} = addCart.actions

export default addCart.reducer