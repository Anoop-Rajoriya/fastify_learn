const fp = require("fastify-plugin");

/**
 *
 * @param {import("fastify").FastifyInstance} fastify
 * @param {object} options
 */

async function dbConnector(fastify, options) {
  fastify.register(require("@fastify/mongodb"), {
    forceClose: true,
    url: fastify.config.DB_URI,
  });
}

module.exports = fp(dbConnector);
