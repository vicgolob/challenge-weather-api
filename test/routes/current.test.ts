import build from '../helper';
import * as get from '../../src/services/request.service';

const app = build();

const mockGet = jest.spyOn(get, 'default');

jest.mock('../../src/services/locations.service', () => ({
  getLocation: jest.fn()
    .mockReturnValueOnce(null)
    .mockReturnValue({
      description: 'FAKE CITY',
      lat: -31.416668,
      long: -64.183334,
    }),
}));

describe('CURRENT >>', () => {
  test('City not found', async () => {
    const res = await app.inject({
      url: '/current?location=FAKE_NON_EXIST&tempReference=22&comparison=lt',
    });
    // When user requests a non mapped city
    // we expect the response to be a Not Found status code
    expect(res.statusCode).toEqual(404);
  });

  test('City\'s temperature is greater than reference value', async () => {
    mockGet.mockReturnValueOnce(Promise.resolve({
      current: {
        temp: '25',
      },
    }));

    const res = await app.inject({
      url: '/current?location=FAKE_CITY&tempReference=20&comparison=gt',
    });
    // We expect the response to be true
    // as the current temperature is 25 and we want to know
    // if 25 is greater than tempReference (20)
    expect(res.json()).toEqual(true);
  });

  test('City\'s temperature is less than reference value', async () => {
    mockGet.mockReturnValueOnce(Promise.resolve({
      current: {
        temp: '20',
      },
    }));

    const res = await app.inject({
      url: '/current?location=FAKE_CITY&tempReference=25&comparison=lt',
    });
    // We expect the response to be true
    // as the current temperature is 20 and we want to know
    // if 20 is less than tempReference (25)
    expect(res.json()).toEqual(true);
  });

  test('City\'s temperature is equal than reference value', async () => {
    mockGet.mockReturnValueOnce(Promise.resolve({
      current: {
        temp: '20',
      },
    }));

    const res = await app.inject({
      url: '/current?location=FAKE_CITY&tempReference=20&comparison=eq',
    });
    // We expect the response to be true
    // as the current temperature is 20 and we want to know
    // if 20 is equal than tempReference (20)
    expect(res.json()).toEqual(true);
  });

  test('Bad Request', async () => {
    // Required query parameters not ok
    const res = await app.inject({
      url: '/current?location=ARG_COR&comparison=lt',
    });

    // When queries parameters are not the required ones,
    // we expect the response to be a Bad Request status code
    expect(res.json().statusCode).toEqual(400);
  });
});
