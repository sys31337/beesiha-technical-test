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

// src/models/categories.ts
var categories_exports = {};
__export(categories_exports, {
  default: () => categories_default
});
module.exports = __toCommonJS(categories_exports);
var import_mongoose = require("mongoose");
var categoriesSchema = new import_mongoose.Schema({
  categoryName: {
    type: String,
    required: true
  },
  products: [{
    type: import_mongoose.Schema.Types.ObjectId,
    ref: "Product"
  }],
  price: {
    type: Number,
    required: true
  }
}, { timestamps: true });
var Categories = (0, import_mongoose.model)("Category", categoriesSchema);
var categories_default = Categories;
