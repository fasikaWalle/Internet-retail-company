const router = require('express').Router();
const { Category, Product } = require('../../models');
const sequelize=require('../../config/connection')
// The `/api/categories` endpoint

router.get('/', (req, res) => {
 // find all categories
  //be sure to include its associated Products
  Category.findAll({
    include:{
      model:Product
    }
  }).then(data=>{
    res.json(data)
  })
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where:{
      id:req.params.id
    },
    include:{
      model:Product,
      attriboutes:[]
    }
  }).then(data=>{
    if(!data){
      res.status(404).json({message:'there is no catagory by this id'})
    }
  }).catch(err=>{
    res.status(500).json(err)
  })
  
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name:req.body.category_name
  }).then(data=>{
    res.json(data)
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  
});

module.exports = router;
