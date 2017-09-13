export function getCardsByInfluencer(influencer){
    return new Promise(function(resolve, reject) {
      var getOptions = {
        method: 'get',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
      fetch('https://newsapi.org/v1/articles?source=' + influencer +'&apiKey=0a2950e0875d42a2ae1adc0c038200db', getOptions).then( (response) => {

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
