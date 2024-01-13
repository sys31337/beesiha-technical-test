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

// src/validations/users.ts
var users_exports = {};
__export(users_exports, {
  createAccountValidator: () => createAccountValidator,
  createOneByAdminValidator: () => createOneByAdminValidator,
  createSubUserValidator: () => createSubUserValidator,
  getResetCodeInfoValidator: () => getResetCodeInfoValidator,
  increaseSubAccountsValidator: () => increaseSubAccountsValidator,
  resetPasswordValidator: () => resetPasswordValidator,
  setMonthlyLimitValidator: () => setMonthlyLimitValidator,
  setNewPasswordValidator: () => setNewPasswordValidator,
  updateUserValidator: () => updateUserValidator,
  userIdValidator: () => userIdValidator
});
module.exports = __toCommonJS(users_exports);
var import_joi2 = __toESM(require("joi"));
var import_express_joi_validation = __toESM(require("express-joi-validation"));

// src/validations/schema.ts
var import_joi = __toESM(require("joi"));
var import_joi_objectid = __toESM(require("joi-objectid"));
var mongooseObjectId = (0, import_joi_objectid.default)(import_joi.default);
var mongooseId = mongooseObjectId();
var string = import_joi.default.string();
var number = import_joi.default.number();
var boolean = import_joi.default.bool();
var date = import_joi.default.date();
var uri = import_joi.default.string().uri();
var array = import_joi.default.array();
var object = import_joi.default.object();

// src/validations/users.ts
var validator = import_express_joi_validation.default.createValidator({ passError: true });
var createAccountSchema = import_joi2.default.object({
  firstname: string.required(),
  lastname: string.required(),
  email: string.required(),
  password: string
});
var updateUserSchema = import_joi2.default.object({
  email: string,
  fullname: string,
  profile_picture: string,
  business_name: string,
  username: string,
  password: string
});
var resetPasswordSchema = import_joi2.default.object({ email: string.required() });
var setNewPasswordSchema = import_joi2.default.object({
  email: string.required(),
  password: string.required()
});
var getResetCodeInfoSchema = import_joi2.default.object({
  token: string.required(),
  code: string.required()
});
var userIdSchema = import_joi2.default.object({ id: mongooseId.required() });
var increaseSubAccountsSchema = import_joi2.default.object({ subAccountsRemaining: number.required() });
var setMonthlyLimitSchema = import_joi2.default.object({ monthlyLimit: number.required() });
var createSubUserSchema = import_joi2.default.object({
  firstname: string.required(),
  lastname: string.required(),
  email: string.required(),
  password: string.required()
});
var createOneByAdminSchema = import_joi2.default.object({
  firstname: string.required(),
  lastname: string.required(),
  email: string.required(),
  botsAvailable: number.required(),
  password: string.required()
});
var createAccountValidator = validator.body(createAccountSchema);
var updateUserValidator = validator.body(updateUserSchema);
var resetPasswordValidator = validator.body(resetPasswordSchema);
var setNewPasswordValidator = validator.body(setNewPasswordSchema);
var createSubUserValidator = validator.body(createSubUserSchema);
var createOneByAdminValidator = validator.body(createOneByAdminSchema);
var increaseSubAccountsValidator = validator.body(increaseSubAccountsSchema);
var setMonthlyLimitValidator = validator.body(setMonthlyLimitSchema);
var getResetCodeInfoValidator = validator.params(getResetCodeInfoSchema);
var userIdValidator = validator.params(userIdSchema);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createAccountValidator,
  createOneByAdminValidator,
  createSubUserValidator,
  getResetCodeInfoValidator,
  increaseSubAccountsValidator,
  resetPasswordValidator,
  setMonthlyLimitValidator,
  setNewPasswordValidator,
  updateUserValidator,
  userIdValidator
});
