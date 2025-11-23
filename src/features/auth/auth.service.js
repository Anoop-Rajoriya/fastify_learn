const crypto = require("crypto");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;
const { ObjectId } = require("@fastify/mongodb");

class AuthService {
  /**
   * @param {import("fastify").FastifyInstance} fastify
   */
  constructor(fastify) {
    this.db = fastify.mongo.db;
    this.jwt = fastify.jwt;
    this.httpErrors = fastify.httpErrors;
  }

  async signup({ name, email, password }) {
    const Users = this.db.collection("users");
    const existing = await Users.findOne({ name, email });

    if (existing) {
      throw this.httpErrors.conflict("User already exist.");
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    const result = await Users.insertOne({
      name,
      email,
      password: passwordHash,
    });

    return result.insertedId;
  }

  async login({ email, password }) {
    const User = this.db.collection("users");

    const user = await User.findOne({ email });

    if (!user) {
      throw this.httpErrors.notFound("User not found");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      throw this.httpErrors.unauthorized("Email or Password not registred");
    }

    const refreshToken = crypto.randomUUID();
    const refreshTokenExpiry = new Date();
    refreshTokenExpiry.setDate(refreshTokenExpiry.getDate() + 1);
    const accessToken = this.jwt.sign(
      { userId: user._id },
      { expiresIn: "15m" }
    );

    await User.updateOne(
      {
        _id: new ObjectId(user._id),
      },
      {
        $set: {
          refreshToken: {
            token: refreshToken,
            expiresAt: refreshTokenExpiry,
          },
          lastLogin: new Date(),
        },
      }
    );

    return { refreshToken, accessToken };
  }

  async refreshToken({ token }) {
    const User = this.db.collection("users");
    const user = await User.findOne({
      "refreshToken.token": token,
    });
    if (!user) {
      throw this.httpErrors.unauthorized(
        "Invalid session. Please login again."
      );
    }

    const now = new Date();
    const TokenExpiry = new Date(user.refreshToken.expiresAt);

    if (now > TokenExpiry) {
      throw this.httpErrors.unauthorized("Session expired. Please login again");
    }

    const newRefreshToken = crypto.randomUUID();
    const refreshTokenExpiry = new Date();
    refreshTokenExpiry.setDate(refreshTokenExpiry.getDate() + 1);
    const newAccessToken = this.jwt.sign(
      { userId: user._id },
      { expiresIn: "15m" }
    );

    await User.updateOne(
      {
        _id: new ObjectId(user._id),
      },
      {
        $set: {
          refreshToken: {
            token: newRefreshToken,
            expiresAt: refreshTokenExpiry,
          },
          lastLogin: new Date(),
        },
      }
    );

    return { refreshToken: newRefreshToken, accessToken: newAccessToken };
  }
}

module.exports = AuthService;
