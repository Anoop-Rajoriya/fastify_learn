const authControllers = require("./auth.controller");
const authSchemas = require("./auth.schema");

/**
 * @param {import("fastify").FastifyInstance} fastify
 * @param {object} options
 */

async function authRoutes(fastify, options) {
  fastify.post(
    "/signup",
    { schema: authSchemas.signupSchema },
    authControllers.handleSignup
  );

  fastify.post(
    "/login",
    { schema: authSchemas.loginSchema },
    authControllers.handleLogin
  );

  fastify.get(
    "/logout",
    { schema: authSchemas.logoutSchema },
    authControllers.handleLogout
  );

  fastify.get(
    "/refresh",
    { schema: authSchemas.refreshTokenSchema },
    authControllers.handleTokenRefreshing
  );
}

module.exports = authRoutes;
