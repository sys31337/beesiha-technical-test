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

// src/functions/accessToken.ts
var accessToken_exports = {};
__export(accessToken_exports, {
  checkRefreshToken: () => checkRefreshToken,
  signToken: () => signToken
});
module.exports = __toCommonJS(accessToken_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  checkRefreshToken,
  signToken
});
