const mongoose = require('mongoose');

const coinsSchema = mongoose.Schema({
    Id_coin:{
        type:String,
        min:1
    },
    symbol: {
        type: String,
        min: 6,
        max: 50
    },
    Price: {
        type: Number,
        min: 6,
        max: 255
    },
    name: {
        type: String,
        min: 6,
        max: 255
    },
    Image: {
        type: String,
        min: 6,
        max: 255
    },
    Ultima_Actualizacion: {
        type: Date,
    },
})

module.exports = mongoose.model('Coins', coinsSchema);    