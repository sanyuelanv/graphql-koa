'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const sessionConfig = {
  key: 'sanyue',
  maxAge: 86400000,
  overwrite: true,
  httpOnly: true,
  signed: true
};
exports.default = sessionConfig;