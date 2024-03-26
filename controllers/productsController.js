const {Product} = require('../models/Product')
const mongoose = require('mongoose')

exports.Create_Product = async (req,res) => {
    try{
        if(!req.body.name){
            return res.status(422).json({err:"Name filed is required"})
        }
        if(!req.body.description){
            return res.status(422).json({err:"Description filed is required"})
        }
        if(!req.body.price){
            return res.status(422).json({err:"Price filed is required"})
        }
        if(!req.body.category){
            return res.status(422).json({err:"category filed is required"})
        }else if(!Product.schema.path('category').enumValues.includes(req.body.category)){
            return res.status(422).json({err:`category must be of options ${Product.schema.path('category').enumValues.join(', ')}`})
        }
    const newProd = await Product.create(req.body)
    return res.status(201).json({msg:"Product  created",data:newProd})
    }catch(err){
        return res.status(500).json({err:"Product did not created"})
    }
}

exports.Get_ALL_PRODUCTS = async (req, res) => {
    try {
      let query = {};
      
      // Filtering by title
      if (req.query.title) {
        query.name = { $regex: req.query.title, $options: 'i' };
      }
      
      // Filtering by category
      if (req.query.category) {
        query.category = req.query.category;
      }
      
      // Sorting by title
      let sortQuery = {};
      if (req.query.sortBy === 'title') {
        sortQuery = { name: 1 };
      }
      
      // Pagination
      let page = parseInt(req.query.page) || 1;
      let limit = parseInt(req.query.limit) || 7;
      let skip = (page - 1) * limit;
  
      let getAllProducts = await Product.find(query).sort(sortQuery).skip(skip).limit(limit);
      return res.status(200).json({ msg: "Products displayed successfully", data: getAllProducts });
    } catch (err) {
      return res.status(500).json({ err: "Products failed to fetch" });
    }
  }

exports.GET_PROD_BY_ID = async (req,res) => {
    try{
        if(!mongoose.isValidObjectId(req.params.id)){
            return res.status(404).json({err:"paramater is not a valid id"})
        }
    const getSingleProd = await Product.findById(req.params.id)
    if(!getSingleProd){
        return res.status(404).json({err:"Product did not created"})
    }
    return res.status(200).json({msg:"Product fetched",data:getSingleProd})
    }catch(err){
        return res.status(500).json({err:"Products did not fetched"})
    }
}

exports.UPDATE_PRODUCT = async (req,res) => {
    try{
        if(!mongoose.isValidObjectId(req.params.id)){
            return res.status(404).json({err:"paramater is not a valid id"})
        }
        if(! await Product.exists({_id:req.params.id})){
            return res.status(404).json({err:"Product did not created"})
        }
    const UpdateSingleProd = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true})
    return res.status(200).json({msg:"Product Updated",data:UpdateSingleProd})
    }catch(err){
        return res.status(500).json({err:"Product did not updated"})
    }
}

exports.DELETE_PRODUCT = async (req,res) => {
    try{
        if(!mongoose.isValidObjectId(req.params.id)){
            return res.status(404).json({err:"paramater is not a valid id"})
        }
        if(! await Product.exists({_id:req.params.id})){
            return res.status(404).json({err:"Product did not created"})
        }
    const deleteprod = await Product.deleteOne({_id:req.params.id})
    const remainingProds = await Product.find()
    return res.status(200).json({msg:"Product deleted succesfully",data:remainingProds})
    }catch(err){
        return res.status(500).json({err:"Product did not deleted"})
    }
}