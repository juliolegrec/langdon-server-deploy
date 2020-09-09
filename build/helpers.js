"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.randomNum = randomNum;
exports.pictureUpload = exports.addLeadingZeros = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

require('dotenv').config();

var cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

var addLeadingZeros = function addLeadingZeros(num, size) {
  var diff = size - num.toString().length;

  if (diff < 0) {
    return num;
  }

  for (var i = 0; i < diff; i++) {
    num = '0' + num;
  }

  return num;
};

exports.addLeadingZeros = addLeadingZeros;

function randomNum(x) {
  var uid = '';

  for (var i = 0; i < x; i++) {
    var rand = Math.floor(Math.random() * 10);
    uid = uid + rand;
  }

  return uid;
}

var pictureUpload = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(file, id, profileType) {
    var _yield$file, createReadStream, result;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return file;

          case 2:
            _yield$file = _context.sent;
            createReadStream = _yield$file.createReadStream;
            _context.prev = 4;
            _context.next = 7;
            return new Promise(function (resolve, reject) {
              createReadStream().pipe(cloudinary.uploader.upload_stream({
                folder: "".concat(profileType, "_profile_pic/"),
                tags: id
              }, function (error, result) {
                if (error) {
                  // reject(error);
                  console.log(error);
                }

                resolve(result);
              }));
            });

          case 7:
            result = _context.sent;
            return _context.abrupt("return", cloudinary.url(result.public_id, {
              gravity: 'face',
              height: 200,
              width: 150,
              crop: 'fill'
            }));

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](4);
            console.log(_context.t0);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[4, 11]]);
  }));

  return function pictureUpload(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.pictureUpload = pictureUpload;