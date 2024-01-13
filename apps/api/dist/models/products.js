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

// src/models/products.ts
var products_exports = {};
__export(products_exports, {
  default: () => products_default
});
module.exports = __toCommonJS(products_exports);
var import_mongoose = require("mongoose");
var productsSchema = new import_mongoose.Schema({
  productName: {
    type: String,
    required: true
  },
  category: {
    type: import_mongoose.Schema.Types.ObjectId,
    ref: "Category"
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  discounts: [{
    type: ["AMOUNT", "PERCENTAGE"],
    amount: Number
  }]
}, { timestamps: true });
var Products = (0, import_mongoose.model)("Product", productsSchema);
var products_default = Products;
