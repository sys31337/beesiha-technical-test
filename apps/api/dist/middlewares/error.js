"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
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

// src/middlewares/error.ts
var error_exports = {};
__export(error_exports, {
  errorHandler: () => errorHandler,
  notFound: () => notFound
});
module.exports = __toCommonJS(error_exports);
var notFound = (req, res, next) => {
  const error = new Error(`NOT FOUND - ${req.originalUrl}`);
  req.originalUrl === "/" ? res.status(404) : res.status(401);
  next(error);
};
var errorHandler = (error, req, res, next) => {
  const status = res.statusCode === 200 ? 400 : res.statusCode;
  res.status(status);
  let message;
  if (error.error) {
    message = error.error.isJoi ? error.error.toString() : `${error.result}`;
  } else {
    message = error.message;
  }
  console.log(__spreadValues({ message }, process.env.NODE_ENV === "development" && { stack: error.stack }));
  res.json(__spreadValues({ message }, process.env.NODE_ENV === "development" && { stack: error.stack }));
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  errorHandler,
  notFound
});
