const mongoose = require('mongoose')

const Schema = mongoose.Schema

const cartItemSchema = new Schema({
    quantity: {
        type: Number,
        require: true
    },
    createdAt: {
        type: Date,
        require: true
    },
    updatedAt: {
        type: Date,
        require: true
    },
    cartId: {
        type: Date,
        require: true
    },
    productId: {
        type: Sequelize.INTEGER,
        require: true
    },
    prod_name: {
        type: Sequelize.STRING,
        require: true
    },
    color: {
        type: Sequelize.STRING,
        require: true
    },
    price: {
        type: Sequelize.INTEGER,
        require: true
    }
}) 

module.exports = mongoose.model('cartItem', cartItemSchema)  