export interface ILocation {
  description: string;
  lat: number;
  long: number;
}

export interface ILocationsEnum {
  [key: string]: ILocation;
}

export const locationsList: ILocationsEnum = {
  ARG_COR: {
    description: 'Ciudad de Córdoba, Córdoba',
    lat: -31.416668,
    long: -64.183334,
  },
  ARG_BUE: {
    description: 'Ciudad de Buenos Aires, Buenos Aires',
    lat: -34.603683,
    long: -58.381557,
  },
  ARG_ROS: {
    description: 'Ciudad de Rosario, Rosario',
    lat: -32.95924,
    long: -60.68348,
  },
};
