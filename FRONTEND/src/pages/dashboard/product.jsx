import { Breadcrumbs, Typography } from "@mui/material"
import { Link } from "react-router-dom"





const Product = () => {
  return (
    <>
    <Breadcrumbs aria-label="breadcrumb">
  <Link underline="hover" color="inherit" href="/dashboard">
    Dashboard
  </Link>

  <Typography sx={{ color: 'text.primary' }}>Products</Typography>
</Breadcrumbs>
      Product
    </>
  )
}

export default Product