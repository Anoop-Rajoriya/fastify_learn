const Fastify = require("fastify");
const fsSensible = require("@fastify/sensible");
const env = require("./src/plugins/env.plugin");
const db = require("./src/plugins/db.plugin");
const jwt = require("./src/plugins/jwt.plugin");
const cookie = require("./src/plugins/cookie.plugin");
const health = require("./src/features/health");
const auth = require("./src/features/auth");

async function server() {
  const fastify = Fastify({
    logger: true,
    ajv: {
      customOptions: {
        allErrors: true,
      },
      plugins: [require("ajv-errors"), require("ajv-formats")],
    },
  });
  try {
    await fastify.register(fsSensible);
    await fastify.register(env);
    await fastify.register(db);
    await fastify.register(cookie);
    await fastify.register(jwt);
    await fastify.register(health, { prefix: "/api/health" });
    await fastify.register(auth, { prefix: "/api/auth" });

    await fastify.listen({ port: fastify.config.PORT });
    fastify.log.info(`server running on ${fastify.config.PORT}`);
  } catch (error) {
    fastify.log.error(`server running error ${error}`);
    process.exit(1);
  }
}

server();
