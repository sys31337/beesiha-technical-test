"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
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

// src/bin/www.ts
var www_exports = {};
__export(www_exports, {
  default: () => www_default
});
module.exports = __toCommonJS(www_exports);
var import_http = __toESM(require("http"));

// src/utils/index.ts
var log = (message, ...params) => console.log(message, ...params);
var logError = (message, ...error) => console.error(message, ...error);

// src/app.ts
var import_express4 = __toESM(require("express"));
var import_path2 = __toESM(require("path"));
var import_morgan = __toESM(require("morgan"));
var import_cors = __toESM(require("cors"));
var import_cookie_parser = __toESM(require("cookie-parser"));
var import_helmet = __toESM(require("helmet"));
var import_dotenv2 = __toESM(require("dotenv"));

// src/routes/index.ts
var import_express3 = __toESM(require("express"));

// src/routes/v1/index.ts
var import_express2 = __toESM(require("express"));

// src/routes/v1/helpers/payments.ts
var import_express = __toESM(require("express"));
var router = import_express.default.Router();
router.route("/").get((req, res, next) => res.sendStatus(200));
var payments_default = router;

// src/routes/v1/index.ts
var router2 = import_express2.default.Router();
router2.use("/payments", payments_default);
var v1_default = router2;

// src/routes/index.ts
var router3 = import_express3.default.Router();
router3.use("/v1", v1_default);
var routes_default = router3;

// src/middlewares/error.ts
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

// src/config/mongoose.ts
var import_mongoose = __toESM(require("mongoose"));
var import_dotenv = __toESM(require("dotenv"));
var import_path = __toESM(require("path"));
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

// src/app.ts
import_dotenv2.default.config({ path: import_path2.default.join(__dirname, "../.env") });
var app = (0, import_express4.default)();
app.set("views", import_path2.default.join(__dirname, "views"));
app.set("view engine", "hbs");
var _a;
var devOrigins = (_a = process.env.CORS_FRONTEND_DEV_DOMAINS) == null ? void 0 : _a.split(" ");
var _a2;
var prodOrigins = (_a2 = process.env.CORS_FRONTEND_PROD_DOMAINS) == null ? void 0 : _a2.split(" ");
var origin = (thisOrigin, callback) => {
  const envOrigins = (process == null ? void 0 : process.env.NODE_ENV) === "development" ? devOrigins : prodOrigins;
  const list = [...envOrigins, thisOrigin];
  callback(null, list);
};
app.use((0, import_helmet.default)());
app.use((0, import_cors.default)({
  origin,
  optionsSuccessStatus: 200,
  credentials: true
}));
app.use((0, import_morgan.default)("dev"));
app.use(import_express4.default.json());
app.use(import_express4.default.urlencoded({ extended: false }));
app.use((0, import_cookie_parser.default)());
connectDB();
app.use("/api", routes_default);
app.use(notFound);
app.use(errorHandler);
var app_default = app;

// src/bin/www.ts
function normalizePort(val) {
  const port = parseInt(val, 10);
  if (Number.isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return 3e3;
}
var PORT = normalizePort(process.env.PORT || "3000");
app_default.set("port", PORT);
var server = import_http.default.createServer(app_default);
var onError = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof PORT === "string" ? `Pipe ${PORT}` : `Port ${PORT}`;
  switch (error.code) {
    case "EACCES":
      logError(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      logError(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};
var onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? `Pipe ${addr}` : `Port ${PORT}`;
  log(`Listening on ${bind}`);
};
server.listen(PORT);
server.on("error", onError);
server.on("listening", onListening);
var www_default = server;
