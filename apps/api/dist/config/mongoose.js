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

// src/config/mongoose.ts
var mongoose_exports = {};
__export(mongoose_exports, {
  closeDB: () => closeDB,
  connectDB: () => connectDB,
  db: () => db
});
module.exports = __toCommonJS(mongoose_exports);
var import_mongoose = __toESM(require("mongoose"));
var import_dotenv = __toESM(require("dotenv"));
var import_path = __toESM(require("path"));

// src/utils/index.ts
var log = (message, ...params) => console.log(message, ...params);
var logError = (message, ...error) => console.error(message, ...error);

// src/config/mongoose.ts
import_dotenv.default.config({ path: import_path.default.join(__dirname, "../../.env") });
var { DATABASEURI } = process.env;
import_mongoose.default.set("strictQuery", true);
import_mongoose.default.connect(DATABASEURI);
var db = import_mongoose.default.connection;
var connectDB = () => __async(void 0, null, function* () {
  db.once("open", () => {
    log("Database Connected");
  });
  db.on("error", (error) => {
    logError("Database Connection error:", error);
  });
  return db;
});
var closeDB = () => __async(void 0, null, function* () {
  db.close();
  db.once("disconnected", () => {
    log("Database Disconnected");
  });
  db.once("disconnected", () => {
    log("Database Connection Closed");
  });
  db.on("error", (error) => {
    logError("Database Connection error:", error);
  });
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  closeDB,
  connectDB,
  db
});
