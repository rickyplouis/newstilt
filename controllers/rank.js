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
  let sum = getSum(nodeList);
  return (getSum(nodeList) / nodeList.length)
}

/**
* @method getStdev gets standard deviation of the tilt values for all nodes in the array
* @param {Array[Node]}
* @return {Number}
*/
export function getStdev(nodeList){
  let mean = getMean(nodeList)

  let sumOfSquareDiff = nodeList.reduce( (sum, value) => {
    return sum + Math.pow(getTilt(value) - mean, 2);
  }, 0)

  //NOTE: Returns to three fixed decimal points because of floating point arithmetic in Math.pow
  var variance = (Math.abs(sumOfSquareDiff / nodeList.length -1)).toFixed(3);
  return Math.pow(variance, 0.5);
}
/**
* @method makeQuartile creates upper and lower quartile limits
* @param {Array[Node], number}
* @return {Array[lowerQuartile, upperQuartile]}
*/

export function getQuartileLimits(nodeList, tilt){
      let stdev = getStdev(nodeList);
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

export function getQuartile(nodeList, tilt){
  return new Promise(function(resolve, reject) {
    let nodesInQuartile = [],
        mean = getMean(nodeList),
        stdev = getStdev(nodeList, mean),
        upperLimit,
        lowerLimit;
    switch (tilt) {
      case -2:
        lowerLimit = -3 * stdev;
        upperLimit = -2 * stdev;
        break;
      case -1:
        lowerLimit = -2 * stdev;
        upperLimit = -1 * stdev;
        break;
      case 0:
        lowerLimit = -1 * stdev;
        upperLimit = stdev;
        break;
      case 1:
        lowerLimit = stdev;
        upperLimit = stdev * 2;
      case 2:
        lowerLimit = stdev * 2;
        upperLimit = stdev * 3
        break;
    }
    for (let node of nodeList){
      if (upperLimit >= getTilt(node) && getTilt(node) >= lowerLimit){
        nodesInQuartile.push(node);
      }
    }
    resolve(nodesInQuartile);
  });
}
