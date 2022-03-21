import { FastifyPluginAsync } from 'fastify';

import { getLocations } from '../../services/locations.service';

const current: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', async (request, reply) => getLocations());
};

export default current;
