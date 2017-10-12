const assert = require('chai').assert;

import { getTilt, getSum, getStdev } from '../controllers/rank';


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

describe('RankController::', () => {
  describe('getQuartile(node)', () => {
    it('should return correct tilt value', () => {
      assert.equal(-5, getTilt(mockData[0]));
    });
    it('should handle string inputs', () => {
      assert.equal(-3, getTilt(mockData[1]));
    });
    it('should handle null values by returning 0', () => {
      assert.equal(0, getTilt(mockData[2]));
    });
    it('should handle empty inputs by returning 0', () => {
      assert.equal(0, getTilt({}));
    });
  });

  describe('getSum(nodeList)', () => {
    it('should properly return sum of nodes', () => {
      assert.equal(-8, getSum([mockData[0], mockData[1]]));
    })
    it('should properly return sum of one node', () => {
      assert.equal(-5, getSum([mockData[0]]));
    })
    it('should handle empty arrays', () => {
      assert.equal(0, getSum([]));
    })
  })

  describe('getStdev(nodeList)', () => {
    it('should properly return standard deviation of nodes', () => {
      assert.equal(1.4142135623730951, getStdev([mockData[0], mockData[1]]))
    })
    it('should properly return standard deviation of nodes', () => {
      assert.equal(6.9857, getStdev([mockData[0], mockData[1], mockData[3], mockData[4], mockData[5]]))
    })
    it('should handle stdev of one node', () => {
      assert.equal(0, getStdev([mockData[0]]))
    })
    it('should handle stdev of empty array', () => {
      assert.equal(0, getStdev([]))
    })
  })
});
