const envConfig = require("./src/configs");
const Fastify = require("fastify");

async function server() {
  const fastify = Fastify({ logger: true });

  await fastify.register(envConfig);

  try {
    await fastify.listen({ port: fastify.config.PORT });
    fastify.log.info(`server running on ${fastify.config.PORT}`);
  } catch (error) {
    fastify.log.error(`server running error ${error}`);
    process.exit(1);
  }
}

server();
