const fp = require("fastify-plugin");

/**
 * @param {import("fastify").FastifyInstance} fastify
 * @param {object} options
 */

async function setupJWT(fastify, options) {
  fastify.register(require("@fastify/jwt"), {
    secret: fastify.config.JWT_SECERET,
  });
}

module.exports = fp(setupJWT);
