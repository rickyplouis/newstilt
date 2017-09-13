import { newsAPIKey, apiURL } from '../config/index';


export function getCardData(sourceIndex){
    return new Promise(function(resolve, reject) {
      var getOptions = {
        method: 'get',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
      fetch('https://newsapi.org/v1/articles?source=' + sourceIndex + '&apiKey=' + newsAPIKey, getOptions).then( (response) => {
        var cardData = [];
        if (response.status == 200){
          response.json().then( (val) => {
            for (let article of val.articles){

              cardData.push({
                "header": article.title,
                "author": article.author,
                "image": article.urlToImage
              })
            }
            resolve(cardData);
          })
        } else {
          response.json().then( (val) => {
            console.log('val is', val);
            const err = val.description[0];
            reject([])
          })
        }
      })
    });
  }

export function getInfluencers(){
    return new Promise(function(resolve, reject) {
      var getOptions = {
        method: 'get',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
      fetch(apiURL + '/api/influencers', getOptions).then( (response) => {
        var cardData = [];
        if (response.status == 200){
          response.json().then( (res) => {
            resolve(res);
          })
        } else {
          response.json().then( (val) => {
            const err = val.description[0];
            reject([])
          })
        }
      })
    });
  }
