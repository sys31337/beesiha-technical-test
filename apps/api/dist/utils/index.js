"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/utils/index.ts
var utils_exports = {};
__export(utils_exports, {
  log: () => log,
  logError: () => logError,
  parseJwt: () => parseJwt
});
module.exports = __toCommonJS(utils_exports);
var log = (message, ...params) => console.log(message, ...params);
var logError = (message, ...error) => console.error(message, ...error);
var parseJwt = (token) => JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  log,
  logError,
  parseJwt
});
