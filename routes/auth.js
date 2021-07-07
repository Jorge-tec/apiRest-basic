const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');


//contraseña
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {

    //validate email
    const isUserNameExist = await User.findOne({ username: req.body.username });
    if (isUserNameExist) {
        return res.status(400).json({error: 'El nombre de usuario ya esta registrado'})
    }

    // hash contraseña
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        lastname: req.body.lastname,
        username: req.body.username,
        favorite_currency: req.body.favorite_currency,
        password: password
    });

    try {
        const savedUser = await user.save();
        res.json({
            error: null,
            data: savedUser
        })
    } catch (error) {
        res.status(400).json({error})
    }
})

router.post('/login', async (req, res) => {
    
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(400).json({ error: 'Usuario no encontrado' });

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).json({ error: 'contraseña no válida' });

    // create token
    const token = jwt.sign({
        username: user.username,
        id: user._id,
        session_code:Math.random()
    }, process.env.TOKEN_SECRET,{expiresIn: (process.env.EXPIRE_TOKEN_SESSION * 60)})
    
    res.header('auth-token', token).json({
        error: null,
        data: {token}
    })
})

module.exports = router;