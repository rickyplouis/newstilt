/**
* @method getTilt returns tilt value (-infinity, +infinity)
* @param { Node = {rightCount: Number, leftCount: Number, ...}}
* @returns {Number}
*/

export function getTilt(node = {leftCount: 0, rightCount: 0}){
  return (node.rightCount && node.leftCount) ? node.rightCount - node.leftCount : 0;
}

/**
* @method getSum get sum of the tilt values for all nodes in the array
* @param {Array[Node]}
* @return {Number}
*/
export function getSum(nodeList = []){
  return nodeList.reduce( (sum, value) => {
    return sum += getTilt(value);
  }, 0)
}

/**
* @method getMean gets mean of the tilt values for all nodes in the array
* @param {Array[Node]}
* @return {Number}
*/
export function getMean(nodeList){
  return (getSum(nodeList) / nodeList.length)
}

/**
* @method getStdev gets standard deviation of the tilt values for all nodes in the array
* @param {Array[Node]}
* @return {Number}
*/
export function getStdev(nodeList = []){
  let mean = getMean(nodeList),
      listLength = nodeList.length > 1 ? nodeList.length - 1 : 1;

  let sumOfSquareDiff = nodeList.reduce( (sum, value) => {
    return sum + Math.pow(getTilt(value) - mean, 2);
  }, 0);
  var variance = (sumOfSquareDiff / listLength);
  return Math.sqrt(variance);
}

/**
* @method makeQuartile creates upper and lower quartile limits
* @param {Array[Node], number}
* @return {Array[lowerQuartile, upperQuartile]}
*/

export function getQuartileLimits(nodeList = [], tilt = 0){
      let stdev = nodeList.length > 0 ? getStdev(nodeList) : 1;
      switch (tilt) {
        case -2:
          return [-3 * stdev, -2 * stdev];
        case -1:
          return [-2 * stdev, -1 * stdev];
        case 0:
          return [-1 * stdev, stdev];
        case 1:
          return [stdev, stdev * 2];
        case 2:
          return [2 * stdev, std * 3];
      }
}

export function getQuartile(nodeList = [], tilt){
  return new Promise(function(resolve, reject) {
    let quartile = getQuartileLimits(nodeList, tilt);
    for (let node of nodeList){
      if (quartile[0] <= getTilt(node) && getTilt(node) <= quartile[1] ){
        nodesInQuartile.push(node);
      }
    }
    resolve(nodesInQuartile);
  });
}
