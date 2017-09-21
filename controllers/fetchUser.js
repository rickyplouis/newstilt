import { apiURL } from '../config/index';

/**
* Creates cards from newsAPI
* @param {object} userObject
* @param {Number} tilt (-2, 2)
* @return {Promise} resolve/reject(arrayOfCards)
*/


export function updateTilt(user, tilt){

  return new Promise(function(resolve, reject) {
    var postOptions = {
      method: 'put',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
    fetch( apiURL + '/api/users?id=' + user._id + '&tilt=' + tilt, postOptions).then( (response) => {
      if (response.status == 200){
        response.json().then( (val) => {
          resolve(val);
        })
      } else {
        response.json().then( (val) => {
          const err = val.description[0];
          reject(err);
        })
      }
    })
  })
}

/**
* Converts array to csv
* @param {array} indexArray
* @return {Promise}
*/


function convertToCSV(indexArray){
  let influencerCSV = "";
  return new Promise(function(resolve, reject) {
    for (let x = 0; x < indexArray.length; x++){
      if (x == indexArray.length -1){
        influencerCSV += indexArray[x]
      } else {
        influencerCSV += indexArray[x] + ','
      }
    }
    resolve(influencerCSV)
  });
}

/**
* Creates cards from newsAPI
* @param {object} userObject
* @param {object} indexArray array of influencer.sourceIndex
* @return {Promise} resolve/reject(arrayOfCards)
*/

export function updateInfluencers(user, indexArray){
  return new Promise(function(resolve, reject) {
    var postOptions = {
      method: 'put',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
    convertToCSV(indexArray).then( (influencerCSV) => {
      fetch( apiURL + '/api/users?id=' + user._id + '&influencers=' + influencerCSV, postOptions).then( (response) => {
        if (response.status == 200){
          response.json().then( (val) => {
            resolve(val);
          })
        } else {
          response.json().then( (val) => {
            reject(val);
          })
        }
      })
    })
  })
}
