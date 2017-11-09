import { getArticles, getInfluencers} from './fetchAPI'
import { getQuartile } from './rank'

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
        "publishedAt": article.publishedAt,
        "left": false,
        "right": false,
        "flagged": false
      })
    }
    resolve(cardData);
  });
}


export function createCardArray(user){
  return new Promise(function(resolve, reject) {
    getInfluencers().then( (influencerArray) => {
      getQuartile(influencerArray, user.tilt).then( (influencerList) => {
        for (let influencer of influencerList){
          getArticles(influencer.sourceIndex).then( (articleArray) => {
            createCards(articleArray).then( (cardArray) => {
              resolve(cardArray);
            })
          })
        }
      })
    })
  })
}
