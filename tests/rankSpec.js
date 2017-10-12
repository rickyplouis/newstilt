const assert = require('chai').assert;

import { getTilt, getSum, getMean, getStdev, getQuartile, getQuartileLimits } from '../controllers/rank';


let mockData = [
  {
    'leftCount': 10,
    'rightCount': 5
  },
  {
    'leftCount': '5',
    'rightCount': '2'
  },
  {
    'leftCount': null,
    'rightCount': 10
  },
  {
    'leftCount': 1,
    'rightCount': 3
  },
  {
    'leftCount': 0,
    'rightCount': -5
  },
  {
    'leftCount': 20,
    'rightCount': 3
  },
]

let alsoMock = [
  {
    'leftCount': 0,
    'rightCount': 1
  },
  {
    'leftCount': 0,
    'rightCount': 2
  },
  {
    'leftCount': 0,
    'rightCount': 3
  },
  {
    'leftCount': 0,
    'rightCount': 4
  },
  {
    'leftCount': 0,
    'rightCount': 5
  },
]

describe('RankController::', () => {
  describe('getQuartile(node)', () => {
    it('should return correct tilt value', () => {
      assert.equal(-5, getTilt(mockData[0]));
    });
    it('should handle string inputs', () => {
      assert.equal(-3, getTilt(mockData[1]));
    });
    it('should handle null values', () => {
      assert.equal(10, getTilt(mockData[2]));
    });
    it('should handle empty inputs by returning 0', () => {
      assert.equal(0, getTilt({}));
    });
  });

  describe('getSum(nodeList)', () => {
    it('should properly return sum of nodes', () => {
      assert.equal(15, getSum(alsoMock));
    })
    it('should properly return sum of one node', () => {
      assert.equal(-5, getSum([mockData[0]]));
    })
    it('should handle empty arrays', () => {
      assert.equal(0, getSum([]));
    })
  })

  describe('getMean(nodeList)', () => {
    it('should properly return mean of nodes', () => {
      assert.equal(3, getMean(alsoMock))
    })
    it('should handle no inputs', () => {
      assert.equal(0, getMean())
    })
    it('should handle empty inputs', () => {
      assert.equal(0, getMean([]))
    })
    it('should properly return the mean of null values ', () => {
      assert.equal(10, getMean([mockData[2]]))
    })
  })

  describe('getStdev(nodeList)', () => {
    it('should properly return stdev of nodes', () => {
      assert.equal(1.5811, getStdev(alsoMock))
    })
    it('should properly return stdev of nodes with diff dataset', () => {
      assert.equal(3.6056, getStdev([mockData[0], mockData[1], mockData[3]]))
    })
    it('should handle stdev of empty array', () => {
      assert.equal(0, getStdev([]))
    })
    it('should handle stdev of no inputs', () => {
      assert.equal(0, getStdev())
    })
  })

  describe('getQuartileLimits(nodeList)', () => {
    it('should properly return upper and lower quartiles', () => {
      assert.deepEqual([1.5811, 2 * 1.5811], getQuartileLimits(alsoMock, 1))
    })
    it('should handle quartiles of empty array', () => {
      assert.deepEqual([-1, 1], getQuartileLimits([], 0))
    })
    it('should handle quartiles of no tilt input', () => {
      assert.deepEqual([-1, 1], getQuartileLimits([]))
    })
  })

});
