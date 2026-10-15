const mongoose = require("mongoose")

const CartSchema = new mongoose.Schema({
    ProductId : {
        type : Number,
        unique : true
    },
    ProductName : String,
    ProductPrice : Number,
})

module.exports = mongoose.model("Cart", CartSchema)
