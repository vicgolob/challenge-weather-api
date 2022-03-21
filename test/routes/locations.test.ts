import build from '../helper';

const app = build();

jest.mock('../../src/services/locations.service', () => ({
  getLocations: jest.fn()
    .mockReturnValueOnce({
      FAKE_CITY: {
        description: '-- Mock City --',
        lat: 0,
        long: 0,
      },
      OTHER_CITY: {
        description: '-- Mock Other City --',
        lat: 1,
        long: 1,
      },
    }),
}));

describe('LOCATIONS >>', () => {
  test(' Cities list', async () => {
    const res = await app.inject({
      url: '/locations',
    });

    expect(res.json()).toEqual({
      FAKE_CITY: {
        description: '-- Mock City --',
        lat: 0,
        long: 0,
      },
      OTHER_CITY: {
        description: '-- Mock Other City --',
        lat: 1,
        long: 1,
      },
    });
  });
});
