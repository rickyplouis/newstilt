function getTilt(node){
  return (node.rightCount - node.leftCount)
}

function getSum(nodeList){
  let acc = 0;
  for (let node of nodeList){
    acc += getTilt(node);
  }
  return acc;
}

function getMean(nodeList){
  let sum = getSum(nodeList);
  return (getSum(nodeList) / nodeList.length)
}

function getStdev(nodeList, mean){
  var sumOfSquareDiff = 0;
  for (let node of nodeList){
    sumOfSquareDiff += Math.pow(getTilt(node) - mean, 2)
  }
  var variance = (sumOfSquareDiff / nodeList.length -1)
  var fixedVariance = Math.abs(variance.toFixed(3))
  var stdev = Math.pow(fixedVariance, 0.5);
  return stdev;
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
