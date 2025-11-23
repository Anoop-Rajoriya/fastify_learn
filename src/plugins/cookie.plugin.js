const fp = require("fastify-plugin");

/**
 * @param {import("fastify").FastifyInstance} fastify
 * @param {object} options
 */

async function setupCookie(fastify, options) {
  fastify.register(require("@fastify/cookie"), {
    secret: fastify.config.COOKIE_SECERET,
  });
}

module.exports = fp(setupCookie);
