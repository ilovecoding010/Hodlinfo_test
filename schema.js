const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const request = require('request');

const dataSchema = new Schema({
  base_unit:{
      type: String,
      required: true
  },
  name:{
      type: String,
      required: true
  },
  last:{
      type: String,
      required: true
  },
  buy:{
      type: String,
      required: true
  },
  sell:{
      type: String,
      required: true
  },
  volume:{
      type: String,
      required: true
  }

})

const Data = mongoose.model('Data', dataSchema);
function doRequest(url) {
  return new Promise(function (resolve, reject) {
    request(url, function (error, res, body) {
      if (!error && res.statusCode === 200) {
        resolve(JSON.parse(body));
      } else {
        reject(error);
      }
    });
  });
}
async function main() {
  try {
    let res = await doRequest("https://api.wazirx.com/api/v2/tickers");//response
    let count=0;
      for(let items in res){
              if(count === 10) break;
              var obj = res[items];
              const data  = new Data({

                  base_unit : obj.base_unit,
                  name: obj.name,
                  last: obj.last,
                  buy: obj.buy,
                  sell:obj.sell,
                  volume:obj.volume
              })
              await data.save();
              //console.log(data);
              count++;
      }
  } catch (error) {
    console.error(error); // `error` will be whatever you passed to `reject()` at the top
  }
}

main();
module.exports = Data;