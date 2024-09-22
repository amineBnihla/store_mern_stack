import { configureStore } from '@reduxjs/toolkit'
import productsSlice from './products/index.js'
export default configureStore({
  reducer: {
    products:productsSlice
  }
})