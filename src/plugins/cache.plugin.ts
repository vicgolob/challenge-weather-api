import { FastifyPluginCallback } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import * as NodeCache from 'node-cache';

import { CACHE_EXPIRATION } from '../config';

const cachePlg: FastifyPluginCallback<NodeCache.Options> = (fastify, options, next) => {
  const cache = new NodeCache();

  fastify.addHook('onRequest', async (request, reply) => {
    const response = cache.get(request.url);
    if (response !== undefined) {
      reply.send(response);
    }
  });

  fastify.addHook('onSend', (request, reply, payload, done) => {
    const response = cache.get(request.url);
    if (response === undefined) {
      cache.set(request.url, payload, CACHE_EXPIRATION);
    }
    done();
  });
  next();
};

export default fastifyPlugin(cachePlg);
