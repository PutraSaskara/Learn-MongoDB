const mongoose = require('mongoose')

const Schema = mongoose.Schema
const userSchema = new Schema({
    name: {
        type: String,
        require: false
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    cart: {
        items: [
            {
                productId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Product',
                    require: true
                },
                quantity: {type: Number, require:true}
            }
        ]
    }
})

userSchema.methods.addToCart = function(product) {
    
    // cek existing product
    const cartProductIndex = this.cart.items.findIndex(cp => {
        return cp.productId.toString() === product._id.toString()
    })

    let newQuantity = 1
    // copy dari keranjang yang ada
    const updatedCartItems = [...this.cart.items]

    if (cartProductIndex >= 0) {
        // produk ada di keranjang
        newQuantity = this.cart.items[cartProductIndex].quantity + 1
        updatedCartItems[cartProductIndex].quantity = newQuantity
    } else {
        // product baru tidak ada
        updatedCartItems.push({
            productId: product._id,
            quantity: newQuantity
        })
    }

    const updatedCart = {
        items: updatedCartItems
    }

    this.cart = updatedCart
    return this.save()
}

module.exports = mongoose.model('User', userSchema)