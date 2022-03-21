import { getLocation, getLocations } from '../../src/services/locations.service';

jest.mock('../../src/data/locations', () => ({
  locationsList: {
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
  },
}));

describe('LOCATIONS SERVICE >>', () => {
  test('City found', async () => {
    expect(getLocation('FAKE_CITY')?.description).toEqual('-- Mock City --');
  });

  test('City not found', async () => {
    // If city isn't mapped, then function returns null
    // assert for null return
    expect(getLocation('ANOTHER_FAKE_CITY')).toEqual(null);
  });

  test('Cities list', async () => {
    // If city isn't mapped, then function returns null
    // assert for null return
    expect(getLocations()).toEqual({
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
