import express from 'express'
import {getCategories,deleteCategory,updateCategory,addCategory} from '../controller/category.controller.js'
const router = express.Router()

router.get('/',getCategories)
router.post('/',addCategory)
router.put('/:id',updateCategory)
router.delete('/:id',deleteCategory)

export default router