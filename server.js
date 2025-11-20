const Fastify = require("fastify");
const envConfig = require("./src/configs");
const HealthCheckRoutes = require("./src/features/health");

async function server() {
  const fastify = Fastify({ logger: true });

  await fastify.register(envConfig);
  await fastify.register(HealthCheckRoutes, { prefix: "/api/health" });

  try {
    await fastify.listen({ port: fastify.config.PORT });
    fastify.log.info(`server running on ${fastify.config.PORT}`);
  } catch (error) {
    fastify.log.error(`server running error ${error}`);
    process.exit(1);
  }
}

server();
