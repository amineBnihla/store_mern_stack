 import * as Yup from 'yup';
 
 export const productSchema = Yup.object({
   name: Yup.string()
     .min(2, 'Too Short!')
     .max(50, 'Too Long!')
     .required('Name is Required'),
   price: Yup.number('price must be a number')
     .required('Required'),
   image: Yup.string().required(),
   category:Yup.string().required('Choose category')
 });
 export const categorySchema = Yup.object({
   name: Yup.string()
     .min(2, 'Too Short!')
     .max(50, 'Too Long!')
     .required('Name is Required'),
   description: Yup.string().required('Description is Required'),
 });
 