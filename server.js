const Fastify = require("fastify");
const env = require("./src/plugins/env.plugin");
const db = require("./src/plugins/db.plugin");
const health = require("./src/features/health");

async function server() {
  const fastify = Fastify({ logger: true });
  try {
    await fastify.register(env);
    await fastify.register(db);
    await fastify.register(health, { prefix: "/api/health" });

    await fastify.listen({ port: fastify.config.PORT });
    fastify.log.info(`server running on ${fastify.config.PORT}`);
  } catch (error) {
    fastify.log.error(`server running error ${error}`);
    process.exit(1);
  }
}

server();
