const assert = require('chai').assert;

import { getTilt } from '../controllers/rank';

var mockData = {
  'leftCount': 10,
  'rightCount': 5
}

describe('Array', () => {
  describe('#indexOf()', () => {
    it('should return -5 tilt of getTilt function', () => {
      assert.equal(-5, getTilt(mockData));
    });
  });
});
