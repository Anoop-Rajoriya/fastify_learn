// *************** Starting *******************
// require("dotenv").config();
// const fastify = require("fastify")({
//   logger: true,
// });

// fastify.get("/", function (request, reply) {
//   reply.send({ message: "hello world!" });
// });

// function start() {
//   fastify.listen({ port: process.env.PORT }, function (err, address) {
//     if (err) {
//       fastify.log.error(`server starting error: ${err}`);
//       process.exit(1);
//     }

//     fastify.log.info(`server running on http://localhost:${process.env.PORT}`);
//   });
// }

// start();

// ************* With async await ***********

// require("dotenv").config();
// const fastify = require("fastify")({
//   logger: true,
// });

// fastify.get("/", async function (request, reply) {
//   reply.send({ message: "hello world!" });
// });

// async function start() {
//   try {
//     await fastify.listen({ port: process.env.PORT });
//     fastify.log.info(`server running on http://localhost:${process.env.PORT}`);
//   } catch (error) {
//     fastify.log.error(`server starting error: ${err}`);
//     process.exit(1);
//   }
// }

// start();

// ************* With env plugin ***********

const fastify = require("fastify")({
  logger: true,
});

const schema = {
  type: "object",
  required: ["PORT"],
  properties: {
    PORT: {
      type: "string",
      default: 3000,
    },
  },
};

const options = {
  schema,
};

fastify.register(require("@fastify/env"), options);

fastify.get("/", function (req, rep) {
  rep.send({ message: "hello world!" });
});

async function start() {
  try {
    await fastify.after();
    await fastify.listen({ port: fastify.config.PORT });
    fastify.log.info(
      `server listining on http://localhost:${fastify.config.PORT}`
    );
  } catch (error) {
    fastify.log.error(`server listening error: ${error}`);
    process.exit(1);
  }
}

start();
