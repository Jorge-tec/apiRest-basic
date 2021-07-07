const router = require('express').Router();
const User = require('../models/User');
const Coin = require('../models/Coin');
const coins = require('../functions/coins.js');

router.get('/', (req, res) => {
    res.json({
        error: null,
        data: {
            title: 'mi ruta protegida',
            user: req.user
        }
    })
})

const unirest = require('unirest');


router.get('/listcoin',async (req, res) => { 
    const user = await User.findOne({ _id: req.user.id }, 'favorite_currency');
    const ListCoins = await coins.ListCoins(user.favorite_currency);
    res.json(ListCoins);
})

router.post('/coin',async (req, res) => {
    const Coins = await coins.coin(req.body.Id_coin);
    
    const user = await User.findOne({ _id: req.user.id });
    if (!user) return res.status(400).json({ error: 'Usuario no encontrado' });
   // const moneda = new Coin(Coins);

   await User.updateOne(
    {_id: req.user.id}, 
    {$push: {coins: [Coins]}},
    {new: true, upsert: true }).exec();

    const userupdate = await User.findOne({ _id: req.user.id });
    res.json(userupdate);

    
})


module.exports = router