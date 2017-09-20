import { newsAPIKey, apiURL } from '../config/index';

/**
* Make Fetch Request
* @param {url} APIendpoint
* @param {object} fetchOptions
* @return {Promise}
*/

function fetchRequest(url, options){
  return new Promise(function(resolve, reject) {
    fetch(url, options).then( (response) => {
      if (response.status == 200){
        response.json().then( (res) => {
          resolve(res)
        })
      } else {
        resolve([])
      }
    })
  });
}

var getOptions = {
  method: 'get',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
}

/**
* Creates arrayOfCards
* @param {Array} arrayOfArticles
* @return {Promise}
*/


export function createCards(articles) {
  let cardData = [];
  return new Promise(function(resolve, reject) {
    for (let article of articles){
      cardData.push({
        "header": article.title,
        "author": article.author,
        "image": article.urlToImage
      })
    }
    resolve(cardData);
  });
}

/**
* Gets articles by sourceIndex
* @param {String} sourceIndex uniqueID for source
* @return {Promise} resolve/reject(arrayOfCards)
*/


export function getArticles(influencer){
    return new Promise(function(resolve, reject) {
      let url = 'https://newsapi.org/v1/articles?source=' + influencer.sourceIndex + '&apiKey=' + newsAPIKey
      fetchRequest(url, getOptions).then( (response) => {
        resolve(response.articles);
      })
    });
  }

/**
* Gets news sources from NewsAPI
* @return {Promise} resolve/reject(array of objects)
*/

export function getInfluencers(){
  return new Promise(function(resolve, reject) {
    let url = apiURL + '/api/influencers'
    fetchRequest(url, getOptions).then( (response) => {
      resolve(response);
    })
  });
}
