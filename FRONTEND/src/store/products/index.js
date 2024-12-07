// import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
// import { api } from '../../api'


// export const fetchProducts = createAsyncThunk('fetchProdcuts',async()=>{

// })
// export const addProduct = createAsyncThunk('addProdcut',async(payload)=>{

// })
// export const updateProduct = createAsyncThunk('updateProdcut',async(payload)=>{
// try
//      {
//       const {data} = await api.put(`/products/${payload.id}`,payload.values)
       
//       return data.data
//      }catch(error){
//       console.log(error)
//     return {status:error.status,message:error.response.data.message}
//      }
// })

// export const productsSlice = createSlice({
//   name: 'products',
//   initialState: {
//     productsList: [],
//     errors:[],
//     loading:false
//   },
//   extraReducers: (builder)=>{
//       builder.addCase(fetchProducts.pending,(state)=>{
//     state.loading = true
//    })
//    builder.addCase(fetchProducts.fulfilled,(state,action)=>{
//       if(action.payload.status == 404 || action.payload.status == 500){
//      state.errors.push(action.payload?.message)
//      return
//     }
//     state.productsList = action.payload
//     state.errors = []
//      state.loading = false
//    })
 
//    builder.addCase(addProduct.pending,(state)=>{
//     state.loading = true
//    })
//    builder.addCase(addProduct.fulfilled,(state,action)=>{
//     state.errors = []
//     state.loading = false
//     if(action.payload.status == 404 || action.payload.status == 500){
//      state.errors.push(action.payload?.message)
//      return
//     }
//       state.productsList.push(action.payload)
     
      
//    })
//      builder.addCase(updateProduct.pending,(state)=>{
//     state.loading = true
//    })
//    builder.addCase(updateProduct.fulfilled,(state,action)=>{
//      state.loading = false
//      state.errors = []
//    if(action.payload.status == 404 || action.payload.status == 500){
//      state.errors.push(action.payload?.message)
    
//      return
//     }
//       state.productsList = state.productsList.map((prod)=>{
//           if(prod._id == action.payload._id ){
           
//             for(let x in prod){
//             prod[x] = action.payload[x]
       
//             }
//           }
//           return prod
//      })
//     console.log(state.productsList)
//    })
//   }
// })

// // Action creators are generated for each case reducer function
// export default productsSlice.reducer