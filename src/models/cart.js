const mongoose = require('mongoose')

const Schema = mongoose.Schema
const cartSchema = new Schema ({

    createdAt: {
        type: Date,
        require: true
    },
    updatedAt: {
        type: Date,
        require: true
    },
    userId: {
        type: Number,
        require: false
    },
}, 
)

module.exports = mongoose.model('Cart', cartSchema)