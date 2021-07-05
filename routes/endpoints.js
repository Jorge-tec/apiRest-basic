const router = require('express').Router();
const unirest = require('unirest');


router.get('/listcoin',async (req, res) => {
    unirest.get('https://api.coingecko.com/api/v3/coins/list')
      .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
      .then((response) => {
        res.json(response.body);
      })
})

router.get('/coin',async (req, res) => {
  unirest.get('https://api.coingecko.com/api/v3/coins/list')
    .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
    .then((response) => {
      res.json(response.body);
    })
})



module.exports = router;