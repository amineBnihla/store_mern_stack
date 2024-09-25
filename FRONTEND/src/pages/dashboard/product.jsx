import { Breadcrumbs, Typography, useTheme } from "@mui/material"
import { Link } from "react-router-dom"





const Product = () => {
  const palette = useTheme().palette
  return (
    <>
    <Breadcrumbs aria-label="breadcrumb">
  <Link style={{textDecoration:"none",display:"block",color:palette.text.main}} underline="hover" color="inherit" href="/dashboard">
    Dashboard
  </Link>

  <Typography sx={{ color: 'text.primary' }}>Products</Typography>
</Breadcrumbs>
      Product
    </>
  )
}

export default Product