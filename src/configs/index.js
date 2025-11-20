const fp = require("fastify-plugin");
const fastifyEnv = require("@fastify/env");

/**
 * Environment configs
 * @param {import("fastify").FastifyInstance} fastify
 * @param {object} options
 */

function envConfig(fastify, options) {
  const schema = {
    type: "object",
    required: ["PORT", "DB_URI"],
    properties: {
      PORT: {
        type: "string",
        default: 3000,
      },
      DB_URI: {
        type: "string",
      },
      NODE_ENV: {
        type: "string",
        default: "development",
      },
    },
  };

  fastify.register(fastifyEnv, {
    confKey: "config",
    schema,
    dotenv: true,
  });
}

module.exports = fp(envConfig);
