import { Alert, Box, Breadcrumbs, Button, CircularProgress, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormHelperText, IconButton, InputLabel, MenuItem, Select, Stack, TextField, Typography, useTheme } from "@mui/material"
import { FiPlus } from "react-icons/fi"
import { Link } from "react-router-dom"
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { FiEdit2 } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import {   useCallback, useEffect, useMemo, useState } from "react";
import Dialog from '@mui/material/Dialog';
import { useFormik } from 'formik';
import { productSchema } from "../../validation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { api } from "../../api";
const VISIBLE_FIELDS = ['name', 'price','category','createdAt','Action'];
const Product = () => {
  const palette = useTheme().palette
  const [productsList,setPoductsList] = useState([])
  const [categoryList,setCategoryList] = useState([])
  const [errors,setErrors] = useState([])
  const [loading,setLoading] = useState(false)
  const [idProduct,setIdProduct] = useState("")
  const [open,setOpen] = useState(false)
  const [openPopup,setOpenPopup] = useState(false)
//  const  getRowId = useCallback((row)=>{
//     console.log(row._id)
   
//   },[])
  const formik = useFormik({
    initialValues: {
      name: '',
      price: 0,
      image:'',
      category:''
    },
    validationSchema: productSchema,
    onSubmit: async (values) => {
      // console.log(isEdit == '')
     
      setLoading(true)
      if(idProduct == ''){
       
      try
     {
   
      const {data} = await api.post('/products',values)
  
      setPoductsList([...productsList,data.data])
      setOpen(false)
          toast.success("Product Added successfuly",{
           position: "top-right"
         });
     }catch(error){
        setErrors([...errors,error.response.data.message])
     }
       }else{
         try
         {
           const {data} = await api.put(`/products/${idProduct}`,values)
           
          setPoductsList(productsList.map((prod)=>{
          if(prod._id == data.data._id ){
           
            for(let x in prod){
            prod[x] = data.data[x]
       
            }
          }
          return prod
     }))
     setOpen(false)
       toast.success("Product Update successfuly",{
           position: "top-right"
         });
          }catch(error){
             setErrors([...errors,error.response.data.message])
          }
          
        }
        setLoading(false)

   
    },
    enableReinitialze: true,
  });

  const handleEdit = useMemo(()=>((id)=>{ 
    if(id){
      const pro = productsList.find((prod)=> {
        return prod._id == id
      })
      if(pro){
      //    const cat = categoryList.find((category)=> {
      //   return category._id == id
      // })

        formik.setValues({name:pro.name,price:pro.price,image:pro.image,category:pro.category._id})
        setIdProduct(id)
         setOpen(true)
            setErrors([])
      }
    }

  }),[productsList,formik])
  const hanleAddProduct = ()=>{
    setIdProduct('')
    setOpen(true)
    setErrors([])
    formik.resetForm()
  }
   const handleDelete= useCallback(async()=>{
    
    try{
        const res = await api.delete(`/products/${idProduct}`)
        console.log(res)
          toast.success("Deleted successfully", {
           position: "top-right"
         });
         setPoductsList(productsList.filter((pro)=>{
          return pro._id != idProduct
         }))
        console.log(idProduct,productsList)
         setOpenPopup(false)

    }catch(error){
         toast.error(error.response.data.message, {
           position: "top-right"
         });
    }
  },[idProduct,productsList])
 
  const deletePopup = (id)=>{
    setIdProduct(id)
    setOpenPopup(true)
  }
  const columnsData = useMemo(()=>([
    {
      field:"name",
      type:'string',
       headerAlign :'left',
       minWidth:200,
      flex:1
  },
 {
      field:"price",
      type:'number',
        headerAlign :'center',
              width:150
  },
 {
      field:"category",
      type:'string',
        headerAlign :'center',
              width:150,
                valueGetter: (value) => {
   
        return value?.name;

    }
  },
  {
    field:'createdAt',
    type:'datetime',
    width:200,
        headerAlign :'left',
         valueFormatter: (value) => {
          const date = new Date(value)

      return `${date.toDateString()}`;
    },
  },{
    field:'Action',
    renderCell: ({row})=> (

       <Box>
         <IconButton onClick={()=> handleEdit(row._id)}>
          <FiEdit2/>
         </IconButton>
         <IconButton onClick={()=>deletePopup(row._id)}>
          <MdOutlineDelete/>
         </IconButton>

      </Box>
    )
  }
]),[handleEdit])
   const columns =useMemo(
    () => columnsData.filter((column) => VISIBLE_FIELDS.includes(column.field)),
    [columnsData],
  );

   
    useEffect(()=>{
      
      async  function  fetchCategories(){
   try
   {
   const {data} = await api.get('/categories')
 
   setCategoryList(data.data)
   }catch(error){
   console.log(error)
   }
   }
   fetchCategories()
   async  function  fetchProducts(){
   try
     {
      const {data} = await api.get('/products')
      setPoductsList(data.data)
     }catch(error){
      console.log(error)
     }
      }
      fetchProducts()
  },[])

 
  return (
    <>
    <Breadcrumbs aria-label="breadcrumb">
  <Link style={{textDecoration:"none",display:"block",color:palette.text.main}} underline="hover" color="inherit" href="/dashboard">
    Dashboard
  </Link>
  <Typography sx={{ color: 'text.primary' }}>Products</Typography>
</Breadcrumbs>
  <Box sx={{paddingBlock:'20px',display:'flex',justifyContent:'end'}}>
   <Button variant="contained" onClick={hanleAddProduct}   startIcon={<FiPlus/>} sx={{padding:"5px 12px",backgroundColor:palette.primary.main}}>
   <Typography>{'Add Product'}</Typography>
   </Button>
  </Box> 
    <Dialog
  open={open}
  onClose={()=>setOpen(false)}
  fullWidth
>
  <DialogTitle variant="h2">
   {idProduct ? "Edit Product" : "Add Product" } 
  </DialogTitle>
  {
    errors.length>0 && <Alert severity="error">{errors[0]}</Alert>
  }
  <DialogContent>    
 <form onSubmit={formik.handleSubmit}>
   <Stack spacing={5} sx={{paddingBlock:"20px"}}>
    <TextField
          fullWidth
          id="name"
          type="text"
          name="name"
          label="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={!!formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
   <TextField
          fullWidth
          id="price"
          name="price"
          label="Price"
          type="text"
          value={formik.values.price}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={!!formik.touched.price && Boolean(formik.errors.price)}
          helperText={formik.touched.price && formik.errors.price}
        />
   <TextField
          fullWidth
          id="image"
          name="image"
          label="Image"
          value={formik.values.image}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={!!formik.touched.image && Boolean(formik.errors.image)}
          helperText={formik.touched.image && formik.errors.image}
          
        />
        <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Category</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={formik.values.category}
    label="Category"
    name="category"
   onChange={formik.handleChange}
    error={formik.touched.category && Boolean(formik.errors.category)}
  >
   {
     categoryList && categoryList.map((cat)=>(
        <MenuItem key={cat._id} value={cat._id}>{cat.name}</MenuItem>
      ))
    } 

  </Select>
     {formik.touched.category && (
                  <FormHelperText sx={{ color: 'error.main' }}>{formik.errors.category}</FormHelperText>
               )}
</FormControl>
        <Box>
        <Button type="submit" sx={{bgcolor:palette.primary.main,color:palette.white.main,paddingBlock:"10px",marginRight:'20px'}} ><Typography variant="h5">Submit</Typography></Button>
         {loading && <CircularProgress size="20px" /> }
        </Box>

   </Stack>
  
 </form>
  </DialogContent>


</Dialog>
<Dialog
        open={openPopup}
        onClose={()=>setOpenPopup(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Product"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this Product ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{ setOpenPopup(false)}}>No</Button>
          <Button onClick={handleDelete}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
 <Box  sx={{ width: '100%',
  '.css-128fb87-MuiDataGrid-toolbarContainer':{
  padding:'20px'
  }
  }}>
  <DataGrid    disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        columns={columns}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }} getRowId={(row)=> row._id}  rows={productsList}/>
  </Box>

        <ToastContainer />
    </>
  )
}

export default Product