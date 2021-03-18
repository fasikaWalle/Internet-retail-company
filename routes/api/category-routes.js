const router = require('express').Router();
const { Category, Product, Tag } = require('../../models');
const sequelize=require('../../config/connection')
// The `/api/categories` endpoint

router.get('/', (req, res) => {
 // find all categories
  //be sure to include its associated Products
  Category.findAll({
    include:{
      model:Product
    }
  }).then(data=>{``
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
      model:Product
    }
  }).then(dbCategory=>{
    if(!dbCategory){
      res.status(404).json({message:'there is no catagory by this id'})
      return;
    }
    res.json(dbCategory)
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
  Category.update(req.body,{
    where:{
      id:req.params.id
    }
  }).then(dbCatagory=>{
    if(!dbCatagory){res.status(404).json({message:'id not found'})
    return;
  }
  res.json(dbCatagory)
  }).catch(err=>{res.status(500).json(err)})
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where:{
      id:req.params.id
    }
  }).then(dbCatagory=>{
    if(!dbCatagory){res.status(404).json({message:'id not found'})
    return;
  }
    res.json(dbCatagory)
  }).catch(err=>{
    res.json(err)
  })
});

module.exports = router;
