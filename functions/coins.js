const unirest = require('unirest');
const coins = {};

async function listcoins(favorite_currency){
    var data;
    await unirest.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${favorite_currency}&order=market_cap_desc&page=1&sparkline=false`)
      .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
      .then((response) => {
        data = response.body.map(function(coins) {

            var coin = {
                Id:coins.id,
                Symbol: coins.symbol,
                Price: coins.current_price,
                Nombre: coins.name,
                Image: coins.image.large,
                Ultima_Actualizacion: coins.last_updated

            };
            return coin;
         });
    })

    return data;
}

async function coin(Id_coin){
    var data;
    await unirest.get(`https://api.coingecko.com/api/v3/coins/${Id_coin}`)
      .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
      .then((response) => {
        data = {
            Id_coin: response.body.id ,
            symbol: response.body.symbol,
            Price: response.body.current_price,
            Nombre: response.body.name,
            Image: response.body.image.large,
            Ultima_Actualizacion: response.body.last_updated
        }

      })
      return data;
}

coins.ListCoins = listcoins;
coins.coin = coin;
module.exports = coins;