import { countNissansFromCk, car } from './nissanfromCK.js';
import assert from 'assert';

describe('countNissansFromCk', () => {
  beforeEach(() => {
    // Prepare the sample car data before each test
    car.push({ color: 'blue', make: 'Nissan', model: 'Micra', reg_number: 'CK 12345' });
    car.push({ color: 'silver', make: 'Nissan', model: 'Qashqai', reg_number: 'CK 67890' });
    car.push({ color: 'red', make: 'Toyota', model: 'Corolla', reg_number: 'CA 54321' });
  });

  afterEach(() => {
    // Clean up the sample data after each test
    car.splice(0, car.length);
  });

  it('should return the correct count of Nissans from Malmesbury', () => {
    const nissanCount = countNissansFromCk();
    assert.strictEqual(nissanCount, 2);
  });
});
