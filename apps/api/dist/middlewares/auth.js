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

// src/middlewares/auth.ts
var auth_exports = {};
__export(auth_exports, {
  auth: () => auth,
  isSuperAdmin: () => isSuperAdmin
});
module.exports = __toCommonJS(auth_exports);
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));

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

// src/middlewares/auth.ts
var auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader ? authHeader.split(" ")[1] : null;
  if (token == null) {
    return res.sendStatus(401);
  }
  return import_jsonwebtoken.default.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => __async(void 0, null, function* () {
    if (err)
      return res.sendStatus(403);
    req.email = decoded.email;
    req.userId = decoded.userId;
    const user = yield users_default.findById(decoded.userId);
    req.isSuperAdmin = user.isSuperAdmin || false;
    return next();
  }));
};
var isSuperAdmin = (req, res, next) => __async(void 0, null, function* () {
  try {
    const { userId } = req;
    const user = yield users_default.findById(userId);
    if (!user)
      return res.status(404).send("USER_NOT_FOUND");
    if (user.isSuperAdmin)
      return next();
    return res.status(401).send("NOT_SUPER_ADMIN");
  } catch (error) {
    return next(error);
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  auth,
  isSuperAdmin
});
