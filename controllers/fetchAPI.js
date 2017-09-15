import { newsAPIKey, apiURL } from '../config/index';

/**
* Creates cards from newsAPI
* @param {String} sourceIndex uniqueID for source
* @return {Promise} resolve/reject(arrayOfCards)
*/

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
          response.json().then( (res) => {
            for (let article of res.articles){

              cardData.push({
                "header": article.title,
                "author": article.author,
                "image": article.urlToImage
              })
            }
            resolve(cardData);
          })
        } else {
          reject(cardData)
        }
      })
    });
  }

/**
* Gets news sources from NewsAPI
* @return {Promise} resolve/reject(array of objects)
*/

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
          reject(cardData)
        }
      })
    });
  }
