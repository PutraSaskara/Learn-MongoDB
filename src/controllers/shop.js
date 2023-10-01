const Product = require('../models/product')
const axios = require('axios')

exports.postItemCart = (req, res, next) => {
    const prodId = req.body.productId
    Product.findById(prodId).then( resProduct => {
        return req.user.addToCart(resProduct)
    }).then(resultAdd => {
        res.json(resultAdd)
    }).catch(err => console.log(err))
}


// fetch data menggunakan axios
exports.getCategories = (req, res, next) => {
    axios.get('https://63cdf885d2e8c29a9bced636.mockapi.io/api/v1/categories')
    .then(response => {

        // mengambil semua data
        res.json(response.data)

        // mengambil data secara spesifik
        // let result = response.data
        // res.json(result[0].name)
    })
    .catch(err => console.log(err))


    // contoh memanggil fungtion async wait
    // getCategories().then(response => {
    //     res.json(response.data)
    // }).catch(err => console.log(err))
}

// menggunakan async await

// async function getCategories() {
//     try{
//         const resp = await axios.get('https://63cdf885d2e8c29a9bced636.mockapi.io/api/v1/categories')
//         return resp
//     }catch(error){
//         console.log(error)
//     }
// }