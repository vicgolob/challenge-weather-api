import Fastify, { FastifyPluginCallback } from 'fastify';
import fp from 'fastify-plugin';
import App from '../src/server';

const build = (plugins?: FastifyPluginCallback<any>[] | undefined) => {
  const app = Fastify();

  beforeAll(async () => {
    app.register(fp(App));
    plugins?.forEach((plugin) => app.register(fp(plugin)));
    await app.ready();
  });

  afterAll(() => app.close());

  return app;
};

export default build;
