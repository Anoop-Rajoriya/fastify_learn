const userResponse = {
  type: "object",
  properties: {
    userId: {
      type: "string",
    },
    message: {
      type: "string",
    },
  },
};

const tokenResponse = {
  type: "object",
  properties: {
    accessToken: {
      type: "string",
    },
  },
};

const signupSchema = {
  body: {
    type: "object",
    required: ["name", "email", "password"],
    properties: {
      name: {
        type: "string",
        pattern: "^[a-zA-Z]+\\s[a-zA-Z]+$",
        errorMessage: {
          pattern: 'Name must be in "First Last" format (e.g. "Jhon Doe").',
        },
      },
      email: {
        type: "string",
        format: "email",
        errorMessage: {
          formate: "Please provide a valid email address.",
        },
      },
      password: {
        type: "string",
        minLength: 6,
        maxLength: 12,
        pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\\W_]).{6,12}$",
        errorMessage: {
          minLength: "Password must be at least 6 characters long.",
          maxLength: "Password cannot exceed 12 characters.",
          pattern: "Password must a-z, A-Z, 1-0, and 1 special character.",
        },
      },
    },
    errorMessage: {
      required: {
        name: "Name is required.",
        email: "Email is required.",
        password: "Password is required.",
      },
    },
  },
  response: {
    201: userResponse,
  },
};

const loginSchema = {
  body: {
    type: "object",
    required: ["email", "password"],
    properties: {
      email: {
        type: "string",
        format: "email",
        errorMessage: {
          formate: "Please provide a valid email address.",
        },
      },
      password: {
        type: "string",
        minLength: 6,
        maxLength: 12,
        pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\\W_]).{6,12}$",
        errorMessage: {
          minLength: "Password must be at least 6 characters long.",
          maxLength: "Password cannot exceed 12 characters.",
          pattern: "Password must a-z, A-Z, 1-0, and 1 special character.",
        },
      },
    },
    errorMessage: {
      required: {
        email: "Email is required.",
        password: "Password is required.",
      },
    },
  },
  response: {
    200: tokenResponse,
  },
};

const logoutSchema = {
  type: "object",
  response: {
    200: {
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
  },
};

const refreshTokenSchema = {
  type: "object",
  response: {
    200: tokenResponse,
  },
};

module.exports = {
  signupSchema,
  loginSchema,
  logoutSchema,
  refreshTokenSchema,
};
