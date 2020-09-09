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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function login(_x, _x2) {
  return _login.apply(this, arguments);
}

function _login() {
  _login = _asyncToGenerator(function* (parent, args) {
    try {
      var user = yield _User.default.findOne({
        username: args.username
      });
      if (!user) throw new Error('Username/Password Incorrect');
      var passwordIsValid = yield _bcryptjs.default.compareSync(args.password, user.password);
      if (!passwordIsValid) throw new Error('Username/Password Incorrect'); // const token = jwt.sign({ id: user._id }, 'mysecret');

      return _objectSpread({
        password: null
      }, user._doc);
    } catch (error) {
      throw error;
    }
  });
  return _login.apply(this, arguments);
}

function teacherFromId(_x3, _x4) {
  return _teacherFromId.apply(this, arguments);
}

function _teacherFromId() {
  _teacherFromId = _asyncToGenerator(function* (parent, args) {
    try {
      var teacher = yield _Teacher.default.findOne({
        _id: args._id
      });
      return teacher;
    } catch (error) {
      throw error;
    }
  });
  return _teacherFromId.apply(this, arguments);
}

function studentFromId(_x5, _x6) {
  return _studentFromId.apply(this, arguments);
}

function _studentFromId() {
  _studentFromId = _asyncToGenerator(function* (parent, args) {
    try {
      var student = yield _Student.default.findOne({
        _id: args._id
      });
      return student;
    } catch (error) {
      throw error;
    }
  });
  return _studentFromId.apply(this, arguments);
}

function staffFromId(_x7, _x8) {
  return _staffFromId.apply(this, arguments);
}

function _staffFromId() {
  _staffFromId = _asyncToGenerator(function* (parent, args) {
    try {
      var staff = yield _Staff.default.findOne({
        _id: args._id
      });
      return staff;
    } catch (error) {
      throw error;
    }
  });
  return _staffFromId.apply(this, arguments);
}

function classFromId(_x9, _x10) {
  return _classFromId.apply(this, arguments);
}

function _classFromId() {
  _classFromId = _asyncToGenerator(function* (parent, args) {
    try {
      var gradeClass = yield _GradeClass.default.findOne({
        _id: args._id
      });
      return gradeClass;
    } catch (error) {
      throw error;
    }
  });
  return _classFromId.apply(this, arguments);
}

function studentFromClassID(_x11, _x12) {
  return _studentFromClassID.apply(this, arguments);
}

function _studentFromClassID() {
  _studentFromClassID = _asyncToGenerator(function* (parent, args) {
    try {
      var studentsFromClassID = yield _Student.default.find({
        classID: args.classID
      });
      return studentsFromClassID;
    } catch (error) {
      throw error;
    }
  });
  return _studentFromClassID.apply(this, arguments);
}

function assessmentFromId(_x13, _x14) {
  return _assessmentFromId.apply(this, arguments);
}

function _assessmentFromId() {
  _assessmentFromId = _asyncToGenerator(function* (parent, args) {
    try {
      var assessment = yield _Assessment.default.findOne({
        _id: args._id
      });
      return assessment;
    } catch (error) {
      throw error;
    }
  });
  return _assessmentFromId.apply(this, arguments);
}

function examFromId(_x15, _x16) {
  return _examFromId.apply(this, arguments);
}

function _examFromId() {
  _examFromId = _asyncToGenerator(function* (parent, args) {
    try {
      var exam = yield _Exam.default.findOne({
        _id: args._id
      });
      return exam;
    } catch (error) {
      throw error;
    }
  });
  return _examFromId.apply(this, arguments);
}

function markingsFromAssessmentID(_x17, _x18) {
  return _markingsFromAssessmentID.apply(this, arguments);
}

function _markingsFromAssessmentID() {
  _markingsFromAssessmentID = _asyncToGenerator(function* (parent, args) {
    try {
      var markings = yield _AssessmentMark.default.findOne({
        assessmentID: args.assessmentID
      });
      return markings;
    } catch (error) {
      throw error;
    }
  });
  return _markingsFromAssessmentID.apply(this, arguments);
}

function markingsFromExamID(_x19, _x20) {
  return _markingsFromExamID.apply(this, arguments);
}

function _markingsFromExamID() {
  _markingsFromExamID = _asyncToGenerator(function* (parent, args) {
    try {
      var markings = yield _ExamMark.default.findOne({
        examID: args.examID
      });
      return markings;
    } catch (error) {
      throw error;
    }
  });
  return _markingsFromExamID.apply(this, arguments);
}

function totalStudents() {
  return _totalStudents.apply(this, arguments);
}

function _totalStudents() {
  _totalStudents = _asyncToGenerator(function* () {
    try {
      var studentCount = yield _Student.default.countDocuments();
      return studentCount;
    } catch (error) {
      throw error;
    }
  });
  return _totalStudents.apply(this, arguments);
}

function totalTeachers() {
  return _totalTeachers.apply(this, arguments);
}

function _totalTeachers() {
  _totalTeachers = _asyncToGenerator(function* () {
    try {
      var teacherCount = yield _Teacher.default.countDocuments();
      return teacherCount;
    } catch (error) {
      throw error;
    }
  });
  return _totalTeachers.apply(this, arguments);
}

function studentGuardianDetails(_x21, _x22) {
  return _studentGuardianDetails.apply(this, arguments);
}

function _studentGuardianDetails() {
  _studentGuardianDetails = _asyncToGenerator(function* (parent, args) {
    try {
      var guardiansDetails = yield _Guardian.default.findOne({
        studentID: args.studentID
      });
      return guardiansDetails;
    } catch (error) {
      throw error;
    }
  });
  return _studentGuardianDetails.apply(this, arguments);
}

function studentAttendanceFromDate(_x23, _x24) {
  return _studentAttendanceFromDate.apply(this, arguments);
}

function _studentAttendanceFromDate() {
  _studentAttendanceFromDate = _asyncToGenerator(function* (parent, args) {
    try {
      var studentAttendance = yield _StudentAttendance.default.findOne({
        dateOfAttendance: new Date(args.date).toISOString()
      });

      if (!studentAttendance) {
        return 'No Records for that date';
      }

      return studentAttendance;
    } catch (error) {
      throw error;
    }
  });
  return _studentAttendanceFromDate.apply(this, arguments);
}

function totalStudentAttendanceRecordedOnDate(_x25, _x26) {
  return _totalStudentAttendanceRecordedOnDate.apply(this, arguments);
}

function _totalStudentAttendanceRecordedOnDate() {
  _totalStudentAttendanceRecordedOnDate = _asyncToGenerator(function* (parent, args) {
    try {
      var dateRecordered = yield _StudentAttendance.default.findOne({
        dateOfAttendance: new Date(args.date).toISOString()
      });

      if (dateRecordered) {
        return dateRecordered.attendance.length;
      }

      return 0;
    } catch (error) {
      throw error;
    }
  });
  return _totalStudentAttendanceRecordedOnDate.apply(this, arguments);
}

function totalStudentPresentOnDate(_x27, _x28) {
  return _totalStudentPresentOnDate.apply(this, arguments);
}

function _totalStudentPresentOnDate() {
  _totalStudentPresentOnDate = _asyncToGenerator(function* (parent, args) {
    try {
      var dateRecordered = yield _StudentAttendance.default.findOne({
        dateOfAttendance: new Date(args.date).toISOString()
      });

      if (dateRecordered) {
        var studentsPresent = dateRecordered.attendance.filter(student => student.status === 'PRESENT');
        return studentsPresent.length;
      }

      return 0;
    } catch (error) {
      throw error;
    }
  });
  return _totalStudentPresentOnDate.apply(this, arguments);
}

function teacherAttendanceFromDate(_x29, _x30) {
  return _teacherAttendanceFromDate.apply(this, arguments);
}

function _teacherAttendanceFromDate() {
  _teacherAttendanceFromDate = _asyncToGenerator(function* (parent, args) {
    try {
      var teacherAttendance = yield _TeacherAttendance.default.findOne({
        dateOfAttendance: new Date(args.date).toISOString()
      });

      if (!teacherAttendance) {
        return 'No Records for that date';
      }

      return teacherAttendance;
    } catch (error) {
      throw error;
    }
  });
  return _teacherAttendanceFromDate.apply(this, arguments);
}

function totalTeacherAttendanceRecordedOnDate(_x31, _x32) {
  return _totalTeacherAttendanceRecordedOnDate.apply(this, arguments);
}

function _totalTeacherAttendanceRecordedOnDate() {
  _totalTeacherAttendanceRecordedOnDate = _asyncToGenerator(function* (parent, args) {
    try {
      var dateRecordered = yield _TeacherAttendance.default.findOne({
        dateOfAttendance: new Date(args.date).toISOString()
      });

      if (dateRecordered) {
        return dateRecordered.attendance.length;
      }

      return 0;
    } catch (error) {
      throw error;
    }
  });
  return _totalTeacherAttendanceRecordedOnDate.apply(this, arguments);
}

function totalTeacherPresentOnDate(_x33, _x34) {
  return _totalTeacherPresentOnDate.apply(this, arguments);
}

function _totalTeacherPresentOnDate() {
  _totalTeacherPresentOnDate = _asyncToGenerator(function* (parent, args) {
    try {
      var dateRecordered = yield _TeacherAttendance.default.findOne({
        dateOfAttendance: new Date(args.date).toISOString()
      });

      if (dateRecordered) {
        var teachersPresent = dateRecordered.attendance.filter(teacher => teacher.status === 'PRESENT');
        return teachersPresent.length;
      }

      return 0;
    } catch (error) {
      throw error;
    }
  });
  return _totalTeacherPresentOnDate.apply(this, arguments);
}

function timetableFromClassID(_x35, _x36) {
  return _timetableFromClassID.apply(this, arguments);
}

function _timetableFromClassID() {
  _timetableFromClassID = _asyncToGenerator(function* (parent, args) {
    try {
      var timetable = yield _Timetable.default.findOne({
        classID: args.classID
      });

      if (!timetable) {
        return 'No Records for that class..';
      }

      return timetable;
    } catch (error) {
      throw error;
    }
  });
  return _timetableFromClassID.apply(this, arguments);
}

function studentAttendance5days(_x37, _x38) {
  return _studentAttendance5days.apply(this, arguments);
}

function _studentAttendance5days() {
  _studentAttendance5days = _asyncToGenerator(function* (parent, args) {
    function getPreviousWorkday() {
      var previousDays = [];

      for (var i = 0; i < 8; i++) {
        var day = (0, _moment.default)().subtract(i, 'days').format('YYYY-MM-DD');

        if ((0, _moment.default)(day).day() !== 0 && (0, _moment.default)(day).day() !== 6) {
          previousDays.push(day);
        }
      }

      return previousDays;
    }

    try {
      var {
        studentID
      } = args;
      var last5Days = getPreviousWorkday();
      var attendances = [];

      for (var i = 0; i < last5Days.length; i++) {
        var attendance = yield _StudentAttendance.default.findOne({
          dateOfAttendance: last5Days[i]
        });

        if (attendance === null) {
          var missingInfo = {
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
      }

      var agregateData = [];
      attendances.forEach(attendance => {
        agregateData.push({
          dateOfAttendance: attendance.dateOfAttendance,
          attendance: attendance.attendance.find(element => element.studentID === studentID) || {
            studentID: 'NOT RECORDED',
            status: 'NOT RECORDED'
          }
        });
      });
      return agregateData;
    } catch (error) {
      console.log(error);
    }
  });
  return _studentAttendance5days.apply(this, arguments);
}

function teacherAttendance5days(_x39, _x40) {
  return _teacherAttendance5days.apply(this, arguments);
}

function _teacherAttendance5days() {
  _teacherAttendance5days = _asyncToGenerator(function* (parent, args) {
    function getPreviousWorkday() {
      var previousDays = [];

      for (var i = 0; i < 8; i++) {
        var day = (0, _moment.default)().subtract(i, 'days').format('YYYY-MM-DD');

        if ((0, _moment.default)(day).day() !== 0 && (0, _moment.default)(day).day() !== 6) {
          previousDays.push(day);
        }
      }

      return previousDays;
    }

    try {
      var {
        teacherID
      } = args;
      var last5Days = getPreviousWorkday();
      var attendances = [];

      for (var i = 0; i < last5Days.length; i++) {
        var attendance = yield _TeacherAttendance.default.findOne({
          dateOfAttendance: last5Days[i]
        });

        if (attendance === null) {
          var missingInfo = {
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
      }

      var agregateData = [];
      attendances.forEach(attendance => {
        agregateData.push({
          dateOfAttendance: attendance.dateOfAttendance,
          attendance: attendance.attendance.find(element => element.teacherID === teacherID) || {
            teacherID: 'NOT RECORDED',
            status: 'NOT RECORDED'
          }
        });
      });
      return agregateData;
    } catch (error) {
      console.log(error);
    }
  });
  return _teacherAttendance5days.apply(this, arguments);
}

function getSubjectFromID(_x41, _x42) {
  return _getSubjectFromID.apply(this, arguments);
}

function _getSubjectFromID() {
  _getSubjectFromID = _asyncToGenerator(function* (parent, args) {
    try {
      var subject = yield _Subject.default.findOne({
        _id: args._id
      });

      if (!subject) {
        return 'No Records for that subject..';
      }

      return subject;
    } catch (error) {
      throw error;
    }
  });
  return _getSubjectFromID.apply(this, arguments);
}