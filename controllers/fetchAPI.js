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
        "title": article.title,
        "author": article.author,
        "image": article.urlToImage,
        "url": article.url,
        "_p_influencer": article._p_influencer,
        "description": article.description,
        "publishedAt": article.publishedAt

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


export function getArticles(sourceIndex){
    return new Promise(function(resolve, reject) {
      let url = 'https://newsapi.org/v1/articles?source=' + sourceIndex + '&apiKey=' + newsAPIKey
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

/**
* Posts Article to NewsTiltAPI.com
* @param {Object} articleObject
* @return {Promise} resolve/reject
*/

export function postArticle(article){

  var postOptions = {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "publishedAt": article.publishedAt,
      "author": article.author,
      "description": article.description,
      "title": article.title,
      "url": article.url,
      "urlToImage": article.urlToImage,
      "_p_influencer": article._p_influencer,
      "_created_at": new Date(),
      "_updated_at": new Date()
    })
  }

  return new Promise(function(resolve, reject) {
    let url = apiURL + '/api/articles'
    fetchRequest(url, postOptions).then( (response) => {
      resolve(response)
    })
  });
}

/**
* Posts Tilt to NewsTiltAPI.com
* @param {Object} tiltObject
* @return {Promise} resolve/reject
*/

export function postTilt(tilt){

  var postOptions = {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "left": tilt.left,
      "right": tilt.right,
      "up": tilt.up,
      "down": tilt.down,
      "_p_article": tilt._p_article,
      "_p_user": tilt._p_user,
      "_p_influencer": tilt._p_influencer,
      "_created_at": new Date(),
      "_updated_at": new Date()
    })
  }

  return new Promise(function(resolve, reject) {
    let url = apiURL + '/api/tilts'
    fetchRequest(url, postOptions).then( (response) => {
      resolve(response)
    })
  });
}

export function putInfluencer(sourceIndex, swipeDirection){
  var putOptions = {
    method: 'put',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }

  return new Promise(function(resolve, reject) {
    //Sample URL:
    //https://newstiltapi.com/api/influencers/sourceIndex=buzzfeed&leftCount=true
    let url = apiURL + '/api/influencers?sourceIndex=' + sourceIndex + '&' + swipeDirection + 'Count=true'
    fetchRequest(url, putOptions).then( (response) => {
      resolve(response)
    })
  });
}
