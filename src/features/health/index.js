/**
 * Health Check Routes
 * @param {import("fastify").FastifyInstance} fastify
 * @param {object} options
 */

async function HealthCheckRoutes(fastify, options) {
  fastify.get("/server", (request, reply) => {
    reply.send({ status: "active", message: "server is active" });
  });
  fastify.get("/db", async (request, reply) => {
    try {
      const db = request.server.mongo.db;
      await db.command({ ping: 1 });
      reply.send({
        status: "active",
        message: "database is active",
      });
    } catch (error) {
      console.error(error);
      reply.send({
        status: "inactive",
        message: "database is inactive",
      });
    }
  });
}

module.exports = HealthCheckRoutes;
