"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/controllers/users.ts
var users_exports = {};
__export(users_exports, {
  getCurrentUser: () => getCurrentUser,
  login: () => login,
  refreshUserToken: () => refreshUserToken
});
module.exports = __toCommonJS(users_exports);
var import_bcrypt = __toESM(require("bcrypt"));
var import_jsonwebtoken2 = __toESM(require("jsonwebtoken"));

// src/models/users.ts
var import_mongoose = require("mongoose");
var usersSchema = new import_mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  profilePicture: {
    type: String,
    required: true,
    default: "default.png"
  },
  isSuperAdmin: {
    type: Boolean,
    default: false
  },
  password: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  },
  refreshToken: String
}, { timestamps: true });
var User = (0, import_mongoose.model)("User", usersSchema);
var users_default = User;

// src/functions/accessToken.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));

// src/utils/index.ts
var parseJwt = (token) => JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());

// src/functions/accessToken.ts
var signToken = ({ userId, fullname, profilePicture, email, secret, expiresIn }) => import_jsonwebtoken.default.sign({
  userId,
  fullname,
  profilePicture,
  email
}, secret, {
  expiresIn
});
var checkRefreshToken = (currentRefreshToken, user) => {
  const { _id: userId, fullname, profilePicture, email } = user;
  if (currentRefreshToken) {
    const { exp } = parseJwt(currentRefreshToken);
    const curTime = Math.ceil(Date.now() / 1e3);
    if (curTime < exp)
      return currentRefreshToken;
  }
  return signToken({ userId, fullname, profilePicture, email, expiresIn: "90d", secret: process.env.REFRESH_TOKEN_SECRET });
};

// src/controllers/users.ts
var login = (req, res, next) => __async(void 0, null, function* () {
  try {
    const { email, password } = req.body;
    const user = yield users_default.findOne({ email: { $regex: `^${email}$`, $options: "i" } });
    if (!user)
      return res.sendStatus(404);
    const match = yield import_bcrypt.default.compare(password, user.password);
    if (!match) {
      return res.status(400).send({ message: "Wrong Password" });
    }
    const {
      _id: userId,
      fullname,
      profilePicture,
      refreshToken: currentRefreshToken
    } = user;
    const accessToken = import_jsonwebtoken2.default.sign({
      userId,
      fullname,
      profilePicture,
      email
    }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1d"
    });
    const refreshToken = checkRefreshToken(currentRefreshToken, user);
    yield users_default.findByIdAndUpdate(userId, { refreshToken });
    return res.status(200).send({ refreshToken, accessToken });
  } catch (error) {
    return next(error);
  }
});
var refreshUserToken = (req, res, next) => __async(void 0, null, function* () {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken)
      return res.sendStatus(401);
    const user = yield users_default.findOne({ refreshToken });
    if (!user)
      return res.status(403).send("USERNOTALLOWED");
    return import_jsonwebtoken2.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err) => __async(void 0, null, function* () {
      if (err)
        res.sendStatus(403);
      const { _id: userId, fullname, profilePicture, email } = user;
      const accessToken = signToken({ userId, fullname, profilePicture, email, expiresIn: "1d", secret: process.env.ACCESS_TOKEN_SECRET });
      const newRefreshToken = signToken({ userId, fullname, profilePicture, email, expiresIn: "90d", secret: process.env.REFRESH_TOKEN_SECRET });
      yield users_default.findByIdAndUpdate(userId, { refreshToken: newRefreshToken });
      return res.status(200).send({ refreshToken: newRefreshToken, accessToken });
    }));
  } catch (error) {
    return next(error);
  }
});
var getCurrentUser = (req, res, next) => __async(void 0, null, function* () {
  try {
    const { userId } = req;
    const user = yield users_default.findById(userId).select("-refreshToken -password -salt");
    return res.status(200).send(user);
  } catch (error) {
    return next(error);
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getCurrentUser,
  login,
  refreshUserToken
});
