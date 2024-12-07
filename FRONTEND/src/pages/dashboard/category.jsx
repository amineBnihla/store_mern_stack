import { Alert, Box, Breadcrumbs, Button, CircularProgress, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Stack, TextField, Typography, useTheme } from "@mui/material"
import { FiPlus } from "react-icons/fi"
import { Link } from "react-router-dom"
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { FiEdit2 } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import {   useCallback, useEffect, useMemo, useState } from "react";
import Dialog from '@mui/material/Dialog';
import { useFormik } from 'formik';
import { categorySchema } from "../../validation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { api } from "../../api";
const VISIBLE_FIELDS = ['name','description','createdAt','Action'];
const Category = () => {
  const palette = useTheme().palette
  const [categoryList,setCategoryList] = useState()
  const [errors,setErrors] = useState([])
  const [loading,setLoading] = useState(false)
  const [idCategory,setIdCategory] = useState("")
  const [open,setOpen] = useState(false)
  const [openPopup,setOpenPopup] = useState(false)
//  const  getRowId = useCallback((row)=>{
//     console.log(row._id)
   
//   },[])
  const formik = useFormik({
    initialValues: {
      name: '',
      description:''
    },
    validationSchema: categorySchema,
    onSubmit: async (values) => {
      // console.log(isEdit == '')
      console.log(idCategory)
      setLoading(true)
      if(idCategory == ''){
      try
     {
   
      const {data} = await api.post('/categories',values)
  
      setCategoryList([...categoryList,data.data])
      setOpen(false)
          toast.success("Category Added successfuly",{
           position: "top-right"
         });
     }catch(error){
        setErrors([...errors,error.response.data.message])
     }
       }else{
         try
         {
           const {data} = await api.put(`/categories/${idCategory}`,values)
           
          setCategoryList(categoryList.map((prod)=>{
          if(prod._id == data.data._id ){
           
            for(let x in prod){
            prod[x] = data.data[x]
       
            }
          }
          return prod
     }))
     setOpen(false)
       toast.success("Category Update successfuly",{
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
      const cat = categoryList.find((category)=> {
        return category._id == id
      })
      if(cat){
        formik.setValues({name:cat.name,description:cat.description})
        setIdCategory(id)
         setOpen(true)
            setErrors([])
      }
    }

  }),[categoryList,formik])
  const hanleAddCategory = ()=>{
    setIdCategory('')
    setOpen(true)
    setErrors([])
    formik.resetForm()
    console.log('heloo')
  }
   const handleDelete= useCallback(async()=>{
    
    try{
        const res = await api.delete(`/categories/${idCategory}`)
        console.log(res)
          toast.success("Deleted successfully", {
           position: "top-right"
         });
         setCategoryList(categoryList.filter((pro)=>{
          return pro._id != idCategory
         }))
        console.log(idCategory,categoryList)
         setOpenPopup(false)

    }catch(error){
         toast.error(error.response.data.message, {
           position: "top-right"
         });
    }
  },[idCategory,categoryList])
 
  const deletePopup = (id)=>{
    setIdCategory(id)
    setOpenPopup(true)
  }
  const columnsData = useMemo(()=>([
    {
      field:"name",
      type:'string',
      headerName:'Name',
       headerAlign :'left',
       minWidth:200,
      flex:1
  },
 {
      field:"description",
      type:'string',
      headerName:'Description',
      headerAlign :'left',
       minWidth:200,
      flex:1
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
      console.log(data)
      setCategoryList(data.data)
     }catch(error){
      console.log(error)
     }
      }
      fetchCategories()
  },[])

 
  return (
    <>
    <Breadcrumbs aria-label="breadcrumb">
  <Link style={{textDecoration:"none",display:"block",color:palette.text.main}} underline="hover" color="inherit" href="/dashboard">
    Dashboard
  </Link>
  <Typography sx={{ color: 'text.primary' }}>Category</Typography>
</Breadcrumbs>
  <Box sx={{paddingBlock:'20px',display:'flex',justifyContent:'end'}}>
   <Button variant="contained" onClick={hanleAddCategory}   startIcon={<FiPlus/>} sx={{padding:"5px 12px",backgroundColor:palette.primary.main}}>
   <Typography>{'Add Category'}</Typography>
   </Button>
  </Box> 
    <Dialog
  open={open}
  onClose={()=>setOpen(false)}
  fullWidth
>
  <DialogTitle variant="h2">
   {idCategory ? "Edit Category" : "Add Category" } 
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
          id="description"
          name="description"
          label="Description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={!!formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
        />
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
          {"Delete Category"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this Category ?
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
        }} getRowId={(row)=> row._id}  rows={categoryList}/>
  </Box>

        <ToastContainer />
    </>
  )
}

export default Category