const Fastify = require("fastify");
const envConfig = require("./src/configs");
const dbConnector = require("./src/plugins/db.plugin");
const HealthCheckRoutes = require("./src/features/health");

async function server() {
  try {
    const fastify = Fastify({ logger: true });

    await fastify.register(envConfig);
    await fastify.register(dbConnector);
    await fastify.register(HealthCheckRoutes, { prefix: "/api/health" });

    await fastify.listen({ port: fastify.config.PORT });
    fastify.log.info(`server running on ${fastify.config.PORT}`);
  } catch (error) {
    fastify.log.error(`server running error ${error}`);
    process.exit(1);
  }
}

server();
