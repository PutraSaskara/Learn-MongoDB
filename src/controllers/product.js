const Product = require('../models/product')
const { where } = require('../models/user')
const {validationResult} = require('express-validator')

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title
    const price = req.body.price
    const description = req.body.description
    // const imageUrl = req.body.imageUrl

//     const errors = validationResult(req)
//     if(!errors.isEmpty()) {
//     const error = new Error("Validasi gagal karena input data salah")
//     error.statusCode = (422)
//     res.send(error)
// }

    if(!req.file){
        const error = new Error('Image belum lengkap')
        error.statusCode = 422
        throw error
    }

    const imagePath = req.file.path.replace("\\", "/")

    const product = new Product({
        title: title,
        price: price,
        description: description,
        imageUrl: imagePath,
        userId: req.user
    })
    product
        .save()
        .then(result => {
            // console.log(result)
            console.log('Created Product')
            res.json(result)
        })
        .catch(err => {
            console.log(err)
        })
}
// bisa untuk assigment moongose
// exports.getProducts = (req, res, next) => {
//     const search = req.query.search

//     if(search) {
//         Product.find({title: {$regex: search}}, 'title price')
//         .then( results => {
//             res.json(results)
//             }).catch(err => console.log())
//     } else{
//         Product.find().then( results => {
//             res.json(results)
//         }).catch(err => console.log(err))
//     }
// }

exports.getProducts = (req, res, next) => {
    const search = req.query.search
    const price = req.query.price

let myquery = Product.find().select('title price -_id')

    if(search) {
        // Product.find({title: {$regex: search}}, 'title price')
        console.log('search')
        myquery.where('title').equals({$regex: search})
        // where => yang mana
    }
    if(price){
        myquery.where('price').gt(price)
    }
    myquery
    .populate('userId', 'name email -_id')
    .then( results => {
        res.json(results)
        }).catch(err => console.log())
    }

exports.fillterProduct = (req, res, next) => {
    const title = req.query.title
    const price = req.query.price
    // const category = req.query.category

    Product.find({title, price}).then(prod => {
        res.json(prod)
    }).catch(err => console.log(err))
}