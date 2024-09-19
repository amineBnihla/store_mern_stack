import express from 'express'
import {getProducts,deleteProducts,updateProducts,addProducts} from '../controller/product.controller.js'
const router = express.Router()

router.get('/',getProducts)
router.post('/',addProducts)
router.put('/:id',updateProducts)
router.delete('/:id',deleteProducts)

export default router