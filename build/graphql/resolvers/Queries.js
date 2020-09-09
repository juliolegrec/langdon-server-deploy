"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = login;
exports.teacherFromId = teacherFromId;
exports.studentFromId = studentFromId;
exports.staffFromId = staffFromId;
exports.classFromId = classFromId;
exports.studentFromClassID = studentFromClassID;
exports.assessmentFromId = assessmentFromId;
exports.examFromId = examFromId;
exports.markingsFromAssessmentID = markingsFromAssessmentID;
exports.markingsFromExamID = markingsFromExamID;
exports.totalStudents = totalStudents;
exports.totalTeachers = totalTeachers;
exports.studentGuardianDetails = studentGuardianDetails;
exports.studentAttendanceFromDate = studentAttendanceFromDate;
exports.totalStudentAttendanceRecordedOnDate = totalStudentAttendanceRecordedOnDate;
exports.totalStudentPresentOnDate = totalStudentPresentOnDate;
exports.teacherAttendanceFromDate = teacherAttendanceFromDate;
exports.totalTeacherAttendanceRecordedOnDate = totalTeacherAttendanceRecordedOnDate;
exports.totalTeacherPresentOnDate = totalTeacherPresentOnDate;
exports.timetableFromClassID = timetableFromClassID;
exports.studentAttendance5days = studentAttendance5days;
exports.teacherAttendance5days = teacherAttendance5days;
exports.getSubjectFromID = getSubjectFromID;

var _User = _interopRequireDefault(require("../../model/User"));

var _Student = _interopRequireDefault(require("../../model/Student"));

var _Guardian = _interopRequireDefault(require("../../model/Guardian"));

var _Teacher = _interopRequireDefault(require("../../model/Teacher"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _GradeClass = _interopRequireDefault(require("../../model/GradeClass"));

var _StudentAttendance = _interopRequireDefault(require("../../model/StudentAttendance"));

var _TeacherAttendance = _interopRequireDefault(require("../../model/TeacherAttendance"));

var _Assessment = _interopRequireDefault(require("../../model/Assessment"));

var _Exam = _interopRequireDefault(require("../../model/Exam"));

var _AssessmentMark = _interopRequireDefault(require("../../model/AssessmentMark"));

var _ExamMark = _interopRequireDefault(require("../../model/ExamMark"));

var _Timetable = _interopRequireDefault(require("../../model/Timetable"));

var _Subject = _interopRequireDefault(require("../../model/Subject"));

var _moment = _interopRequireDefault(require("moment"));

var _Staff = _interopRequireDefault(require("../../model/Staff"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function login(_x, _x2) {
  return _login.apply(this, arguments);
}

function _login() {
  _login = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(parent, args) {
    var user, passwordIsValid;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _User["default"].findOne({
              username: args.username
            });

          case 3:
            user = _context.sent;

            if (user) {
              _context.next = 6;
              break;
            }

            throw new Error('Username/Password Incorrect');

          case 6:
            _context.next = 8;
            return _bcryptjs["default"].compareSync(args.password, user.password);

          case 8:
            passwordIsValid = _context.sent;

            if (passwordIsValid) {
              _context.next = 11;
              break;
            }

            throw new Error('Username/Password Incorrect');

          case 11:
            return _context.abrupt("return", _objectSpread({
              password: null
            }, user._doc));

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](0);
            throw _context.t0;

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 14]]);
  }));
  return _login.apply(this, arguments);
}

function teacherFromId(_x3, _x4) {
  return _teacherFromId.apply(this, arguments);
}

function _teacherFromId() {
  _teacherFromId = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(parent, args) {
    var teacher;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _Teacher["default"].findOne({
              _id: args._id
            });

          case 3:
            teacher = _context2.sent;
            return _context2.abrupt("return", teacher);

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            throw _context2.t0;

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 7]]);
  }));
  return _teacherFromId.apply(this, arguments);
}

function studentFromId(_x5, _x6) {
  return _studentFromId.apply(this, arguments);
}

function _studentFromId() {
  _studentFromId = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(parent, args) {
    var student;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _Student["default"].findOne({
              _id: args._id
            });

          case 3:
            student = _context3.sent;
            return _context3.abrupt("return", student);

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);
            throw _context3.t0;

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 7]]);
  }));
  return _studentFromId.apply(this, arguments);
}

function staffFromId(_x7, _x8) {
  return _staffFromId.apply(this, arguments);
}

function _staffFromId() {
  _staffFromId = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(parent, args) {
    var staff;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _Staff["default"].findOne({
              _id: args._id
            });

          case 3:
            staff = _context4.sent;
            return _context4.abrupt("return", staff);

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);
            throw _context4.t0;

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 7]]);
  }));
  return _staffFromId.apply(this, arguments);
}

function classFromId(_x9, _x10) {
  return _classFromId.apply(this, arguments);
}

function _classFromId() {
  _classFromId = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(parent, args) {
    var gradeClass;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return _GradeClass["default"].findOne({
              _id: args._id
            });

          case 3:
            gradeClass = _context5.sent;
            return _context5.abrupt("return", gradeClass);

          case 7:
            _context5.prev = 7;
            _context5.t0 = _context5["catch"](0);
            throw _context5.t0;

          case 10:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 7]]);
  }));
  return _classFromId.apply(this, arguments);
}

function studentFromClassID(_x11, _x12) {
  return _studentFromClassID.apply(this, arguments);
}

function _studentFromClassID() {
  _studentFromClassID = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(parent, args) {
    var studentsFromClassID;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return _Student["default"].find({
              classID: args.classID
            });

          case 3:
            studentsFromClassID = _context6.sent;
            return _context6.abrupt("return", studentsFromClassID);

          case 7:
            _context6.prev = 7;
            _context6.t0 = _context6["catch"](0);
            throw _context6.t0;

          case 10:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 7]]);
  }));
  return _studentFromClassID.apply(this, arguments);
}

function assessmentFromId(_x13, _x14) {
  return _assessmentFromId.apply(this, arguments);
}

function _assessmentFromId() {
  _assessmentFromId = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(parent, args) {
    var assessment;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return _Assessment["default"].findOne({
              _id: args._id
            });

          case 3:
            assessment = _context7.sent;
            return _context7.abrupt("return", assessment);

          case 7:
            _context7.prev = 7;
            _context7.t0 = _context7["catch"](0);
            throw _context7.t0;

          case 10:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 7]]);
  }));
  return _assessmentFromId.apply(this, arguments);
}

function examFromId(_x15, _x16) {
  return _examFromId.apply(this, arguments);
}

function _examFromId() {
  _examFromId = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(parent, args) {
    var exam;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            _context8.next = 3;
            return _Exam["default"].findOne({
              _id: args._id
            });

          case 3:
            exam = _context8.sent;
            return _context8.abrupt("return", exam);

          case 7:
            _context8.prev = 7;
            _context8.t0 = _context8["catch"](0);
            throw _context8.t0;

          case 10:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[0, 7]]);
  }));
  return _examFromId.apply(this, arguments);
}

function markingsFromAssessmentID(_x17, _x18) {
  return _markingsFromAssessmentID.apply(this, arguments);
}

function _markingsFromAssessmentID() {
  _markingsFromAssessmentID = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(parent, args) {
    var markings;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            _context9.next = 3;
            return _AssessmentMark["default"].findOne({
              assessmentID: args.assessmentID
            });

          case 3:
            markings = _context9.sent;
            return _context9.abrupt("return", markings);

          case 7:
            _context9.prev = 7;
            _context9.t0 = _context9["catch"](0);
            throw _context9.t0;

          case 10:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[0, 7]]);
  }));
  return _markingsFromAssessmentID.apply(this, arguments);
}

function markingsFromExamID(_x19, _x20) {
  return _markingsFromExamID.apply(this, arguments);
}

function _markingsFromExamID() {
  _markingsFromExamID = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(parent, args) {
    var markings;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
            _context10.next = 3;
            return _ExamMark["default"].findOne({
              examID: args.examID
            });

          case 3:
            markings = _context10.sent;
            return _context10.abrupt("return", markings);

          case 7:
            _context10.prev = 7;
            _context10.t0 = _context10["catch"](0);
            throw _context10.t0;

          case 10:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[0, 7]]);
  }));
  return _markingsFromExamID.apply(this, arguments);
}

function totalStudents() {
  return _totalStudents.apply(this, arguments);
}

function _totalStudents() {
  _totalStudents = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
    var studentCount;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.prev = 0;
            _context11.next = 3;
            return _Student["default"].countDocuments();

          case 3:
            studentCount = _context11.sent;
            return _context11.abrupt("return", studentCount);

          case 7:
            _context11.prev = 7;
            _context11.t0 = _context11["catch"](0);
            throw _context11.t0;

          case 10:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, null, [[0, 7]]);
  }));
  return _totalStudents.apply(this, arguments);
}

function totalTeachers() {
  return _totalTeachers.apply(this, arguments);
}

function _totalTeachers() {
  _totalTeachers = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
    var teacherCount;
    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.prev = 0;
            _context12.next = 3;
            return _Teacher["default"].countDocuments();

          case 3:
            teacherCount = _context12.sent;
            return _context12.abrupt("return", teacherCount);

          case 7:
            _context12.prev = 7;
            _context12.t0 = _context12["catch"](0);
            throw _context12.t0;

          case 10:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12, null, [[0, 7]]);
  }));
  return _totalTeachers.apply(this, arguments);
}

function studentGuardianDetails(_x21, _x22) {
  return _studentGuardianDetails.apply(this, arguments);
}

function _studentGuardianDetails() {
  _studentGuardianDetails = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(parent, args) {
    var guardiansDetails;
    return regeneratorRuntime.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.prev = 0;
            _context13.next = 3;
            return _Guardian["default"].findOne({
              studentID: args.studentID
            });

          case 3:
            guardiansDetails = _context13.sent;
            return _context13.abrupt("return", guardiansDetails);

          case 7:
            _context13.prev = 7;
            _context13.t0 = _context13["catch"](0);
            throw _context13.t0;

          case 10:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13, null, [[0, 7]]);
  }));
  return _studentGuardianDetails.apply(this, arguments);
}

function studentAttendanceFromDate(_x23, _x24) {
  return _studentAttendanceFromDate.apply(this, arguments);
}

function _studentAttendanceFromDate() {
  _studentAttendanceFromDate = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(parent, args) {
    var studentAttendance;
    return regeneratorRuntime.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.prev = 0;
            _context14.next = 3;
            return _StudentAttendance["default"].findOne({
              dateOfAttendance: new Date(args.date).toISOString()
            });

          case 3:
            studentAttendance = _context14.sent;

            if (studentAttendance) {
              _context14.next = 6;
              break;
            }

            return _context14.abrupt("return", 'No Records for that date');

          case 6:
            return _context14.abrupt("return", studentAttendance);

          case 9:
            _context14.prev = 9;
            _context14.t0 = _context14["catch"](0);
            throw _context14.t0;

          case 12:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14, null, [[0, 9]]);
  }));
  return _studentAttendanceFromDate.apply(this, arguments);
}

function totalStudentAttendanceRecordedOnDate(_x25, _x26) {
  return _totalStudentAttendanceRecordedOnDate.apply(this, arguments);
}

function _totalStudentAttendanceRecordedOnDate() {
  _totalStudentAttendanceRecordedOnDate = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(parent, args) {
    var dateRecordered;
    return regeneratorRuntime.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            _context15.prev = 0;
            _context15.next = 3;
            return _StudentAttendance["default"].findOne({
              dateOfAttendance: new Date(args.date).toISOString()
            });

          case 3:
            dateRecordered = _context15.sent;

            if (!dateRecordered) {
              _context15.next = 6;
              break;
            }

            return _context15.abrupt("return", dateRecordered.attendance.length);

          case 6:
            return _context15.abrupt("return", 0);

          case 9:
            _context15.prev = 9;
            _context15.t0 = _context15["catch"](0);
            throw _context15.t0;

          case 12:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15, null, [[0, 9]]);
  }));
  return _totalStudentAttendanceRecordedOnDate.apply(this, arguments);
}

function totalStudentPresentOnDate(_x27, _x28) {
  return _totalStudentPresentOnDate.apply(this, arguments);
}

function _totalStudentPresentOnDate() {
  _totalStudentPresentOnDate = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(parent, args) {
    var dateRecordered, studentsPresent;
    return regeneratorRuntime.wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            _context16.prev = 0;
            _context16.next = 3;
            return _StudentAttendance["default"].findOne({
              dateOfAttendance: new Date(args.date).toISOString()
            });

          case 3:
            dateRecordered = _context16.sent;

            if (!dateRecordered) {
              _context16.next = 7;
              break;
            }

            studentsPresent = dateRecordered.attendance.filter(function (student) {
              return student.status === 'PRESENT';
            });
            return _context16.abrupt("return", studentsPresent.length);

          case 7:
            return _context16.abrupt("return", 0);

          case 10:
            _context16.prev = 10;
            _context16.t0 = _context16["catch"](0);
            throw _context16.t0;

          case 13:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee16, null, [[0, 10]]);
  }));
  return _totalStudentPresentOnDate.apply(this, arguments);
}

function teacherAttendanceFromDate(_x29, _x30) {
  return _teacherAttendanceFromDate.apply(this, arguments);
}

function _teacherAttendanceFromDate() {
  _teacherAttendanceFromDate = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17(parent, args) {
    var teacherAttendance;
    return regeneratorRuntime.wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            _context17.prev = 0;
            _context17.next = 3;
            return _TeacherAttendance["default"].findOne({
              dateOfAttendance: new Date(args.date).toISOString()
            });

          case 3:
            teacherAttendance = _context17.sent;

            if (teacherAttendance) {
              _context17.next = 6;
              break;
            }

            return _context17.abrupt("return", 'No Records for that date');

          case 6:
            return _context17.abrupt("return", teacherAttendance);

          case 9:
            _context17.prev = 9;
            _context17.t0 = _context17["catch"](0);
            throw _context17.t0;

          case 12:
          case "end":
            return _context17.stop();
        }
      }
    }, _callee17, null, [[0, 9]]);
  }));
  return _teacherAttendanceFromDate.apply(this, arguments);
}

function totalTeacherAttendanceRecordedOnDate(_x31, _x32) {
  return _totalTeacherAttendanceRecordedOnDate.apply(this, arguments);
}

function _totalTeacherAttendanceRecordedOnDate() {
  _totalTeacherAttendanceRecordedOnDate = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18(parent, args) {
    var dateRecordered;
    return regeneratorRuntime.wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            _context18.prev = 0;
            _context18.next = 3;
            return _TeacherAttendance["default"].findOne({
              dateOfAttendance: new Date(args.date).toISOString()
            });

          case 3:
            dateRecordered = _context18.sent;

            if (!dateRecordered) {
              _context18.next = 6;
              break;
            }

            return _context18.abrupt("return", dateRecordered.attendance.length);

          case 6:
            return _context18.abrupt("return", 0);

          case 9:
            _context18.prev = 9;
            _context18.t0 = _context18["catch"](0);
            throw _context18.t0;

          case 12:
          case "end":
            return _context18.stop();
        }
      }
    }, _callee18, null, [[0, 9]]);
  }));
  return _totalTeacherAttendanceRecordedOnDate.apply(this, arguments);
}

function totalTeacherPresentOnDate(_x33, _x34) {
  return _totalTeacherPresentOnDate.apply(this, arguments);
}

function _totalTeacherPresentOnDate() {
  _totalTeacherPresentOnDate = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19(parent, args) {
    var dateRecordered, teachersPresent;
    return regeneratorRuntime.wrap(function _callee19$(_context19) {
      while (1) {
        switch (_context19.prev = _context19.next) {
          case 0:
            _context19.prev = 0;
            _context19.next = 3;
            return _TeacherAttendance["default"].findOne({
              dateOfAttendance: new Date(args.date).toISOString()
            });

          case 3:
            dateRecordered = _context19.sent;

            if (!dateRecordered) {
              _context19.next = 7;
              break;
            }

            teachersPresent = dateRecordered.attendance.filter(function (teacher) {
              return teacher.status === 'PRESENT';
            });
            return _context19.abrupt("return", teachersPresent.length);

          case 7:
            return _context19.abrupt("return", 0);

          case 10:
            _context19.prev = 10;
            _context19.t0 = _context19["catch"](0);
            throw _context19.t0;

          case 13:
          case "end":
            return _context19.stop();
        }
      }
    }, _callee19, null, [[0, 10]]);
  }));
  return _totalTeacherPresentOnDate.apply(this, arguments);
}

function timetableFromClassID(_x35, _x36) {
  return _timetableFromClassID.apply(this, arguments);
}

function _timetableFromClassID() {
  _timetableFromClassID = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee20(parent, args) {
    var timetable;
    return regeneratorRuntime.wrap(function _callee20$(_context20) {
      while (1) {
        switch (_context20.prev = _context20.next) {
          case 0:
            _context20.prev = 0;
            _context20.next = 3;
            return _Timetable["default"].findOne({
              classID: args.classID
            });

          case 3:
            timetable = _context20.sent;

            if (timetable) {
              _context20.next = 6;
              break;
            }

            return _context20.abrupt("return", 'No Records for that class..');

          case 6:
            return _context20.abrupt("return", timetable);

          case 9:
            _context20.prev = 9;
            _context20.t0 = _context20["catch"](0);
            throw _context20.t0;

          case 12:
          case "end":
            return _context20.stop();
        }
      }
    }, _callee20, null, [[0, 9]]);
  }));
  return _timetableFromClassID.apply(this, arguments);
}

function studentAttendance5days(_x37, _x38) {
  return _studentAttendance5days.apply(this, arguments);
}

function _studentAttendance5days() {
  _studentAttendance5days = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee21(parent, args) {
    var getPreviousWorkday, studentID, last5Days, attendances, i, attendance, missingInfo, agregateData;
    return regeneratorRuntime.wrap(function _callee21$(_context21) {
      while (1) {
        switch (_context21.prev = _context21.next) {
          case 0:
            getPreviousWorkday = function _getPreviousWorkday() {
              var previousDays = [];

              for (var i = 0; i < 8; i++) {
                var day = (0, _moment["default"])().subtract(i, 'days').format('YYYY-MM-DD');

                if ((0, _moment["default"])(day).day() !== 0 && (0, _moment["default"])(day).day() !== 6) {
                  previousDays.push(day);
                }
              }

              return previousDays;
            };

            _context21.prev = 1;
            studentID = args.studentID;
            last5Days = getPreviousWorkday();
            attendances = [];
            i = 0;

          case 6:
            if (!(i < last5Days.length)) {
              _context21.next = 14;
              break;
            }

            _context21.next = 9;
            return _StudentAttendance["default"].findOne({
              dateOfAttendance: last5Days[i]
            });

          case 9:
            attendance = _context21.sent;

            if (attendance === null) {
              missingInfo = {
                attendance: [{
                  studentID: studentID
                }, {
                  status: 'NOT RECORDED'
                }],
                dateOfAttendance: last5Days[i]
              };
              attendances.push(missingInfo);
            } else {
              attendances.push(attendance);
            }

          case 11:
            i++;
            _context21.next = 6;
            break;

          case 14:
            agregateData = [];
            attendances.forEach(function (attendance) {
              agregateData.push({
                dateOfAttendance: attendance.dateOfAttendance,
                attendance: attendance.attendance.find(function (element) {
                  return element.studentID === studentID;
                }) || {
                  studentID: 'NOT RECORDED',
                  status: 'NOT RECORDED'
                }
              });
            });
            return _context21.abrupt("return", agregateData);

          case 19:
            _context21.prev = 19;
            _context21.t0 = _context21["catch"](1);
            console.log(_context21.t0);

          case 22:
          case "end":
            return _context21.stop();
        }
      }
    }, _callee21, null, [[1, 19]]);
  }));
  return _studentAttendance5days.apply(this, arguments);
}

function teacherAttendance5days(_x39, _x40) {
  return _teacherAttendance5days.apply(this, arguments);
}

function _teacherAttendance5days() {
  _teacherAttendance5days = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee22(parent, args) {
    var getPreviousWorkday, teacherID, last5Days, attendances, i, attendance, missingInfo, agregateData;
    return regeneratorRuntime.wrap(function _callee22$(_context22) {
      while (1) {
        switch (_context22.prev = _context22.next) {
          case 0:
            getPreviousWorkday = function _getPreviousWorkday2() {
              var previousDays = [];

              for (var i = 0; i < 8; i++) {
                var day = (0, _moment["default"])().subtract(i, 'days').format('YYYY-MM-DD');

                if ((0, _moment["default"])(day).day() !== 0 && (0, _moment["default"])(day).day() !== 6) {
                  previousDays.push(day);
                }
              }

              return previousDays;
            };

            _context22.prev = 1;
            teacherID = args.teacherID;
            last5Days = getPreviousWorkday();
            attendances = [];
            i = 0;

          case 6:
            if (!(i < last5Days.length)) {
              _context22.next = 14;
              break;
            }

            _context22.next = 9;
            return _TeacherAttendance["default"].findOne({
              dateOfAttendance: last5Days[i]
            });

          case 9:
            attendance = _context22.sent;

            if (attendance === null) {
              missingInfo = {
                attendance: [{
                  teacherID: teacherID
                }, {
                  status: 'NOT RECORDED'
                }],
                dateOfAttendance: last5Days[i]
              };
              attendances.push(missingInfo);
            } else {
              attendances.push(attendance);
            }

          case 11:
            i++;
            _context22.next = 6;
            break;

          case 14:
            agregateData = [];
            attendances.forEach(function (attendance) {
              agregateData.push({
                dateOfAttendance: attendance.dateOfAttendance,
                attendance: attendance.attendance.find(function (element) {
                  return element.teacherID === teacherID;
                }) || {
                  teacherID: 'NOT RECORDED',
                  status: 'NOT RECORDED'
                }
              });
            });
            return _context22.abrupt("return", agregateData);

          case 19:
            _context22.prev = 19;
            _context22.t0 = _context22["catch"](1);
            console.log(_context22.t0);

          case 22:
          case "end":
            return _context22.stop();
        }
      }
    }, _callee22, null, [[1, 19]]);
  }));
  return _teacherAttendance5days.apply(this, arguments);
}

function getSubjectFromID(_x41, _x42) {
  return _getSubjectFromID.apply(this, arguments);
}

function _getSubjectFromID() {
  _getSubjectFromID = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee23(parent, args) {
    var subject;
    return regeneratorRuntime.wrap(function _callee23$(_context23) {
      while (1) {
        switch (_context23.prev = _context23.next) {
          case 0:
            _context23.prev = 0;
            _context23.next = 3;
            return _Subject["default"].findOne({
              _id: args._id
            });

          case 3:
            subject = _context23.sent;

            if (subject) {
              _context23.next = 6;
              break;
            }

            return _context23.abrupt("return", 'No Records for that subject..');

          case 6:
            return _context23.abrupt("return", subject);

          case 9:
            _context23.prev = 9;
            _context23.t0 = _context23["catch"](0);
            throw _context23.t0;

          case 12:
          case "end":
            return _context23.stop();
        }
      }
    }, _callee23, null, [[0, 9]]);
  }));
  return _getSubjectFromID.apply(this, arguments);
}