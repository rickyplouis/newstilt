const assert = require('chai').assert;

import { getTilt } from '../controllers/rank';


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
  }
]

describe('RankController::', () => {
  describe('getQuartile()', () => {
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
});
