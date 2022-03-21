import { ILocation, ILocationsEnum, locationsList } from '../data/locations';

export interface ILocationData {
  description: string,
  lat: number,
  long: number,
}

export const getLocation = (location: keyof ILocationsEnum): (ILocation | null) => locationsList[location] || null;

export const getLocations = () => locationsList;
