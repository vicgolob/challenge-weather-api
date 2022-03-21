import build from '../helper';
import cachePlugin from '../../src/plugins/cache.plugin';

jest.mock('node-cache', () => function () {
  return { get: jest.fn().mockReturnValue('--response from cache--') };
});

const app = build([cachePlugin]);

describe('CACHE PLUGIN >>', () => {
  test('Response from Cache', async () => {
    const res = await app.inject({
      url: '/current?location=FAKE_CITY&tempReference=22&comparison=lt',
    });
    expect(res.payload).toBe('--response from cache--');
  });
});
