import { FastifyPluginAsync } from 'fastify';

import schema from './schema';
import get from '../../services/request.service';
import { getLocation } from '../../services/locations.service';

interface ICurrentQuery {
  location: string,
  tempReference: string,
  comparison: string,
}

const current: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', { schema }, async (request, reply) => {
    const { location, tempReference, comparison } = request.query as ICurrentQuery;
    const tempReferenceFixed = Number.parseFloat(tempReference).toFixed(2);

    const locationData = getLocation(location);
    if (locationData === null) {
      return reply.callNotFound();
    }

    const { lat, long } = locationData;
    const req = `lat=${lat}&lon=${long}&exclude=minutely,hourly,daily,alerts&units=metric`;
    try {
      let response;
      const axiosResponse = await get(req);

      const { temp } = axiosResponse.current;
      const tempFixed = Number.parseFloat(temp).toFixed(2);

      switch (comparison) {
        case 'gt':
          response = tempFixed > tempReferenceFixed;
          break;
        case 'lt':
          response = tempFixed < tempReferenceFixed;
          break;
        case 'eq':
          response = tempFixed === tempReferenceFixed;
          break;
        default:
          break;
      }
      return response;
    } catch (error) {
      return error;
    }
  });
};

export default current;
