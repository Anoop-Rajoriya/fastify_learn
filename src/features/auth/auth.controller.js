const AuthService = require("./auth.service");

/**
 * @param {import("fastify").FastifyRequest} request
 * @param {import("fastify").FastifyReply} reply
 */

async function handleSignup(request, reply) {
  const auth = new AuthService(this);
  const id = await auth.signup({ ...request.body });
  return reply.code(201).send({ message: "User created", userId: id });
}

async function handleLogin(request, reply) {
  const auth = new AuthService(this);
  const { accessToken, refreshToken } = await auth.login({ ...request.body });

  reply.setCookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 24, // 1day
  });

  return reply.code(200).send({ accessToken });
}

async function handleTokenRefreshing(request, reply) {
  const auth = new AuthService(this);
  const token = request.cookies.refreshToken;
  const { refreshToken, accessToken } = await auth.refreshToken({ token });
  reply.setCookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24, // 1day
  });

  return reply.code(200).send({ accessToken });
}

async function handleLogout(request, reply) {
  reply.clearCookie("refreshToken");
  return { message: "Logged out successfully" };
}

module.exports = {
  handleSignup,
  handleLogin,
  handleTokenRefreshing,
  handleLogout,
};
