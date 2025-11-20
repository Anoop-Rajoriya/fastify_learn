/**
 * Health Check Routes
 * @param {import("fastify").FastifyInstance} fastify
 * @param {object} options
 */

async function HealthCheckRoutes(fastify, options) {
  fastify.get("/server", (request, reply) => {
    reply.send({ status: "active", message: "server is active" });
  });
  fastify.get("/db", (request, reply) => {
    reply.send({ status: "active", message: "database is active" });
  });
}

module.exports = HealthCheckRoutes;
