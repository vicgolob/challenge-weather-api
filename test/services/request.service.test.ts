/**
 * NOT WORKING TEST
 */

import axios from 'axios';
import get from '../../src/services/request.service';

jest.mock('axios');

describe('REQUEST SERVICE >>', () => {
  test('Get Request', async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: '--mocked-response--' });

    const actual = await get('some-fake-url');
    expect(actual).toBe('--mocked-response--');
  });
});
