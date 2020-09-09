"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSchool = createSchool;
exports.createUser = createUser;
exports.createStaff = createStaff;
exports.createGuardian = createGuardian;
exports.createTeacher = createTeacher;
exports.registerStudent = registerStudent;
exports.createSchoolTerm = createSchoolTerm;
exports.createClassHour = createClassHour;
exports.createGradeClass = createGradeClass;
exports.createSubject = createSubject;
exports.registerStudentAttendance = registerStudentAttendance;
exports.registerTeacherAttendance = registerTeacherAttendance;
exports.registerAssessment = registerAssessment;
exports.registerExam = registerExam;
exports.registerAssessmentMark = registerAssessmentMark;
exports.registerExamMark = registerExamMark;
exports.registerTimetable = registerTimetable;
exports.updateTeacherPersoInfo = updateTeacherPersoInfo;
exports.updateTeacherProfilePic = updateTeacherProfilePic;
exports.updateStudentPersoInfo = updateStudentPersoInfo;
exports.updateStudentProfilePic = updateStudentProfilePic;
exports.updateStudentClassInfo = updateStudentClassInfo;
exports.updateStudentGuardianInfo = updateStudentGuardianInfo;
exports.updateSchoolInfo = updateSchoolInfo;
exports.updateAssessment = updateAssessment;
exports.updateExam = updateExam;
exports.updateClass = updateClass;
exports.updateSubject = updateSubject;
exports.updateSchoolLogo = updateSchoolLogo;
exports.updateStaffPersoInfo = updateStaffPersoInfo;
exports.updateStaffProfilePic = updateStaffProfilePic;
exports.updateUserPassword = updateUserPassword;
exports.deleteSchoolTerm = deleteSchoolTerm;
exports.deleteClassHour = deleteClassHour;
exports.deleteGradeClass = deleteGradeClass;
exports.deleteAssessment = deleteAssessment;
exports.deleteExam = deleteExam;
exports.deleteSubject = deleteSubject;
exports.deleteStaff = deleteStaff;

var _User = _interopRequireDefault(require("../../model/User"));

var _Staff = _interopRequireDefault(require("../../model/Staff"));

var _Student = _interopRequireDefault(require("../../model/Student"));

var _Guardian = _interopRequireDefault(require("../../model/Guardian"));

var _Teacher = _interopRequireDefault(require("../../model/Teacher"));

var _School = _interopRequireDefault(require("../../model/School"));

var _SchoolTerm = _interopRequireDefault(require("../../model/SchoolTerm"));

var _ClassHour = _interopRequireDefault(require("../../model/ClassHour"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _GradeClass = _interopRequireDefault(require("../../model/GradeClass"));

var _Subject = _interopRequireDefault(require("../../model/Subject"));

var _StudentAttendance = _interopRequireDefault(require("../../model/StudentAttendance"));

var _TeacherAttendance = _interopRequireDefault(require("../../model/TeacherAttendance"));

var _Assessment = _interopRequireDefault(require("../../model/Assessment"));

var _Exam = _interopRequireDefault(require("../../model/Exam"));

var _AssessmentMark = _interopRequireDefault(require("../../model/AssessmentMark"));

var _ExamMark = _interopRequireDefault(require("../../model/ExamMark"));

var _Timetable = _interopRequireDefault(require("../../model/Timetable"));

var _helpers = require("../../helpers");

var _generatePassword = _interopRequireDefault(require("generate-password"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

require('dotenv').config();

var cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});
/********* GENERATING USERNAME *********/

function usernameCreator(firstName, lastName) {
  return (firstName.substring(0, 3).toUpperCase() + lastName.substring(0, 3).toUpperCase()).normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function createSchool(_x, _x2) {
  return _createSchool.apply(this, arguments);
}

function _createSchool() {
  _createSchool = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(parent, args) {
    var _args$schoolInput, logo, name, streetAddress, telephoneNumber, emailAddress, website, markingSystem, existingSchool, school;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _args$schoolInput = args.schoolInput, logo = _args$schoolInput.logo, name = _args$schoolInput.name, streetAddress = _args$schoolInput.streetAddress, telephoneNumber = _args$schoolInput.telephoneNumber, emailAddress = _args$schoolInput.emailAddress, website = _args$schoolInput.website, markingSystem = _args$schoolInput.markingSystem;
            _context.next = 4;
            return _School["default"].find();

          case 4:
            existingSchool = _context.sent;

            if (!existingSchool) {
              _context.next = 7;
              break;
            }

            throw new Error("School info already exist. Can't create newone.");

          case 7:
            school = new _School["default"]({
              logo: logo,
              name: name,
              streetAddress: streetAddress,
              telephoneNumber: telephoneNumber,
              emailAddress: emailAddress,
              website: website,
              markingSystem: markingSystem
            }, function (err) {
              if (err) throw err;
            });
            school.save();
            return _context.abrupt("return", _objectSpread({}, school._doc));

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](0);
            throw _context.t0;

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 12]]);
  }));
  return _createSchool.apply(this, arguments);
}

function createUser(_x3, _x4) {
  return _createUser.apply(this, arguments);
}

function _createUser() {
  _createUser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(parent, args) {
    var _args$userInput, username, password, role, existingUser, hashedPassword, user;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _args$userInput = args.userInput, username = _args$userInput.username, password = _args$userInput.password, role = _args$userInput.role;
            _context2.next = 4;
            return _User["default"].findOne({
              username: username
            });

          case 4:
            existingUser = _context2.sent;

            if (!existingUser) {
              _context2.next = 7;
              break;
            }

            throw new Error('Username already used. Choose another one.');

          case 7:
            _context2.next = 9;
            return _bcryptjs["default"].hash(password, 10);

          case 9:
            hashedPassword = _context2.sent;
            user = new _User["default"]({
              username: username,
              password: hashedPassword,
              role: role
            }, function (err) {
              if (err) throw err;
            });
            user.save();
            return _context2.abrupt("return", _objectSpread({
              password: null
            }, user._doc));

          case 15:
            _context2.prev = 15;
            _context2.t0 = _context2["catch"](0);
            throw _context2.t0;

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 15]]);
  }));
  return _createUser.apply(this, arguments);
}

function createStaff(_x5, _x6) {
  return _createStaff.apply(this, arguments);
}

function _createStaff() {
  _createStaff = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(parent, args) {
    var _args$staffInput, firstName, lastName, gender, dob, streetAddress, city, zipCode, telephoneNumber, emailAddress, profilePic, currentYear, currentMonth, regexp, staffCount, staffID, username, existingUserName, _profilePicLink, staff, defaultPassword, hashedPassword, user;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _args$staffInput = args.staffInput, firstName = _args$staffInput.firstName, lastName = _args$staffInput.lastName, gender = _args$staffInput.gender, dob = _args$staffInput.dob, streetAddress = _args$staffInput.streetAddress, city = _args$staffInput.city, zipCode = _args$staffInput.zipCode, telephoneNumber = _args$staffInput.telephoneNumber, emailAddress = _args$staffInput.emailAddress;
            profilePic = args.staffInput.profilePic;
            /********* GENERATING STAFFID *********/

            currentYear = new Date().getFullYear();
            currentMonth = "".concat(new Date().getMonth() + 1);

            if (currentMonth < 10) {
              currentMonth = "0".concat(currentMonth);
            }

            regexp = new RegExp('^' + "STA".concat(currentYear).concat(currentMonth));
            _context3.next = 9;
            return _Staff["default"].countDocuments({
              staffID: regexp
            }).exec();

          case 9:
            staffCount = _context3.sent;
            staffID = "STA".concat(currentYear).concat((0, _helpers.addLeadingZeros)(currentMonth, 2)).concat((0, _helpers.addLeadingZeros)(staffCount + 1, 3));
            /********* END GENERATING STAFFID *********/

            username = usernameCreator(firstName, lastName);
            _context3.next = 14;
            return _User["default"].findOne({
              username: username
            });

          case 14:
            existingUserName = _context3.sent;

            if (!profilePic) {
              _context3.next = 19;
              break;
            }

            _context3.next = 18;
            return (0, _helpers.pictureUpload)(profilePic, staffID, 'staff');

          case 18:
            _profilePicLink = _context3.sent;

          case 19:
            if (existingUserName) {
              _context3.next = 29;
              break;
            }

            staff = new _Staff["default"]({
              staffID: staffID,
              firstName: firstName,
              lastName: lastName,
              gender: gender,
              dob: dob,
              username: username,
              streetAddress: streetAddress,
              city: city,
              zipCode: zipCode,
              telephoneNumber: telephoneNumber,
              emailAddress: emailAddress,
              profilePic: profilePic ? profilePicLink : null
            });
            defaultPassword = _generatePassword["default"].generate({
              length: 6,
              numbers: true
            });
            _context3.next = 24;
            return _bcryptjs["default"].hash(defaultPassword, 10);

          case 24:
            hashedPassword = _context3.sent;
            user = new _User["default"]({
              username: username,
              defaultPassword: defaultPassword,
              password: hashedPassword,
              role: 'STAFF'
            });
            staff.save();
            user.save();
            return _context3.abrupt("return", _objectSpread(_objectSpread({
              password: null
            }, staff._doc), user._doc));

          case 29:
            _context3.next = 34;
            break;

          case 31:
            _context3.prev = 31;
            _context3.t0 = _context3["catch"](0);
            throw _context3.t0;

          case 34:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 31]]);
  }));
  return _createStaff.apply(this, arguments);
}

function createGuardian(_x7, _x8) {
  return _createGuardian.apply(this, arguments);
}

function _createGuardian() {
  _createGuardian = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(parent, args) {
    var _args$guardianInput, firstName, lastName, relationship, mobilePhone, workPhone, emailAddress, studentID, existingGuardian, guardian;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _args$guardianInput = args.guardianInput, firstName = _args$guardianInput.firstName, lastName = _args$guardianInput.lastName, relationship = _args$guardianInput.relationship, mobilePhone = _args$guardianInput.mobilePhone, workPhone = _args$guardianInput.workPhone, emailAddress = _args$guardianInput.emailAddress, studentID = _args$guardianInput.studentID;
            _context4.next = 4;
            return _Guardian["default"].find({
              studentID: studentID
            });

          case 4:
            existingGuardian = _context4.sent;

            if (!(Object.keys(existingGuardian).length >= 2)) {
              _context4.next = 7;
              break;
            }

            throw new Error('This student already has 2 guardian details.');

          case 7:
            guardian = new _Guardian["default"]({
              firstName: firstName,
              lastName: lastName,
              relationship: relationship,
              mobilePhone: mobilePhone,
              workPhone: workPhone,
              emailAddress: emailAddress,
              studentID: studentID
            });
            guardian.save();
            return _context4.abrupt("return", _objectSpread({}, guardian._doc));

          case 12:
            _context4.prev = 12;
            _context4.t0 = _context4["catch"](0);
            throw _context4.t0;

          case 15:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 12]]);
  }));
  return _createGuardian.apply(this, arguments);
}

function createTeacher(_x9, _x10) {
  return _createTeacher.apply(this, arguments);
}

function _createTeacher() {
  _createTeacher = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(parent, args) {
    var _args$teacherInput, firstName, lastName, gender, dob, streetAddress, city, zipCode, telephoneNumber, emailAddress, enrollmentDate, _yield$args$teacherIn, profilePic, currentYear, currentMonth, regexp, teacherCount, teacherID, _profilePicLink2, teacher;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _args$teacherInput = args.teacherInput, firstName = _args$teacherInput.firstName, lastName = _args$teacherInput.lastName, gender = _args$teacherInput.gender, dob = _args$teacherInput.dob, streetAddress = _args$teacherInput.streetAddress, city = _args$teacherInput.city, zipCode = _args$teacherInput.zipCode, telephoneNumber = _args$teacherInput.telephoneNumber, emailAddress = _args$teacherInput.emailAddress, enrollmentDate = _args$teacherInput.enrollmentDate;
            _context5.next = 4;
            return args.teacherInput;

          case 4:
            _yield$args$teacherIn = _context5.sent;
            profilePic = _yield$args$teacherIn.profilePic;
            // const { createReadStream } = await profilePic;

            /********* GENERATING TEACHERID *********/
            currentYear = new Date().getFullYear();
            currentMonth = "".concat(new Date().getMonth() + 1);

            if (currentMonth < 10) {
              currentMonth = "0".concat(currentMonth);
            }

            regexp = new RegExp('^' + "T".concat(currentYear).concat(currentMonth));
            _context5.next = 12;
            return _Teacher["default"].countDocuments({
              teacherID: regexp
            }).exec();

          case 12:
            teacherCount = _context5.sent;
            teacherID = "T".concat(currentYear).concat((0, _helpers.addLeadingZeros)(currentMonth, 2)).concat((0, _helpers.addLeadingZeros)(teacherCount + 1, 3)); // Dealing with profile pic upload

            _context5.next = 16;
            return (0, _helpers.pictureUpload)(profilePic, teacherID, 'teacher');

          case 16:
            _profilePicLink2 = _context5.sent;
            teacher = new _Teacher["default"]({
              teacherID: teacherID,
              firstName: firstName,
              lastName: lastName,
              gender: gender,
              dob: dob,
              username: usernameCreator(firstName, lastName),
              streetAddress: streetAddress,
              city: city,
              zipCode: zipCode,
              telephoneNumber: telephoneNumber,
              emailAddress: emailAddress,
              profilePic: _profilePicLink2,
              enrollmentDate: enrollmentDate
            });
            teacher.save();
            return _context5.abrupt("return", _objectSpread({}, teacher._doc));

          case 22:
            _context5.prev = 22;
            _context5.t0 = _context5["catch"](0);
            console.log(_context5.t0);

          case 25:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 22]]);
  }));
  return _createTeacher.apply(this, arguments);
}

function registerStudent(_x11, _x12) {
  return _registerStudent.apply(this, arguments);
}

function _registerStudent() {
  _registerStudent = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(parent, args) {
    var _args$studentInput, firstName, lastName, gender, dob, classID, streetAddress, city, zipCode, telephoneNumber, emailAddress, enrollmentDate, profilePic, currentYear, currentMonth, regexp, studentCount, studentID, _profilePicLink3, student, _args$guardianInput2, guardianFirstName, guardianLastName, guardianRelationship, guardianMobilePhone, guardianWorkPhone, guardianEmailAddress, guardian;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _args$studentInput = args.studentInput, firstName = _args$studentInput.firstName, lastName = _args$studentInput.lastName, gender = _args$studentInput.gender, dob = _args$studentInput.dob, classID = _args$studentInput.classID, streetAddress = _args$studentInput.streetAddress, city = _args$studentInput.city, zipCode = _args$studentInput.zipCode, telephoneNumber = _args$studentInput.telephoneNumber, emailAddress = _args$studentInput.emailAddress, enrollmentDate = _args$studentInput.enrollmentDate;
            profilePic = args.studentInput.profilePic; // const { createReadStream } = await profilePic;

            /********* GENERATING STUDENTID *********/

            currentYear = new Date().getFullYear();
            currentMonth = "".concat(new Date().getMonth() + 1);

            if (currentMonth < 10) {
              currentMonth = "0".concat(currentMonth);
            }

            regexp = new RegExp('^' + "".concat(currentYear).concat(currentMonth));
            _context6.next = 9;
            return _Student["default"].countDocuments({
              studentID: regexp
            }).exec();

          case 9:
            studentCount = _context6.sent;
            studentID = "".concat(currentYear).concat((0, _helpers.addLeadingZeros)(currentMonth, 2)).concat((0, _helpers.addLeadingZeros)(studentCount + 1, 3));
            _context6.next = 13;
            return (0, _helpers.pictureUpload)(profilePic, studentID, 'student');

          case 13:
            _profilePicLink3 = _context6.sent;
            student = new _Student["default"]({
              studentID: studentID,
              firstName: firstName,
              lastName: lastName,
              gender: gender,
              dob: dob,
              // grade,
              classID: classID,
              username: usernameCreator(firstName, lastName),
              streetAddress: streetAddress,
              city: city,
              zipCode: zipCode,
              telephoneNumber: telephoneNumber,
              emailAddress: emailAddress,
              profilePic: _profilePicLink3,
              enrollmentDate: enrollmentDate
            });
            /**************** GUARDIAN INFO ****************/

            _args$guardianInput2 = args.guardianInput, guardianFirstName = _args$guardianInput2.guardianFirstName, guardianLastName = _args$guardianInput2.guardianLastName, guardianRelationship = _args$guardianInput2.guardianRelationship, guardianMobilePhone = _args$guardianInput2.guardianMobilePhone, guardianWorkPhone = _args$guardianInput2.guardianWorkPhone, guardianEmailAddress = _args$guardianInput2.guardianEmailAddress;
            guardian = new _Guardian["default"]({
              firstName: guardianFirstName,
              lastName: guardianLastName,
              relationship: guardianRelationship,
              mobilePhone: guardianMobilePhone,
              workPhone: guardianWorkPhone,
              emailAddress: guardianEmailAddress,
              studentID: studentID
            });
            student.save();
            guardian.save();
            return _context6.abrupt("return", _objectSpread(_objectSpread({}, student._doc), guardian._doc));

          case 22:
            _context6.prev = 22;
            _context6.t0 = _context6["catch"](0);
            console.log(_context6.t0);

          case 25:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 22]]);
  }));
  return _registerStudent.apply(this, arguments);
}

function createSchoolTerm(_x13, _x14) {
  return _createSchoolTerm.apply(this, arguments);
}

function _createSchoolTerm() {
  _createSchoolTerm = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(parent, args) {
    var _args$schoolTermInput, termName, beginDate, endDate, schoolTerm;

    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _args$schoolTermInput = args.schoolTermInput, termName = _args$schoolTermInput.termName, beginDate = _args$schoolTermInput.beginDate, endDate = _args$schoolTermInput.endDate;
            schoolTerm = new _SchoolTerm["default"]({
              termName: termName,
              beginDate: beginDate,
              endDate: endDate
            });
            schoolTerm.save();
            return _context7.abrupt("return", _objectSpread({}, schoolTerm._doc));

          case 4:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return _createSchoolTerm.apply(this, arguments);
}

function createClassHour(_x15, _x16) {
  return _createClassHour.apply(this, arguments);
}

function _createClassHour() {
  _createClassHour = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(parent, args) {
    var _args$classHourInput, hourName, beginTime, endTime, type, classHour;

    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _args$classHourInput = args.classHourInput, hourName = _args$classHourInput.hourName, beginTime = _args$classHourInput.beginTime, endTime = _args$classHourInput.endTime, type = _args$classHourInput.type;
            classHour = new _ClassHour["default"]({
              hourName: hourName,
              beginTime: beginTime,
              endTime: endTime,
              type: type
            });
            classHour.save();
            return _context8.abrupt("return", _objectSpread({}, classHour._doc));

          case 4:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));
  return _createClassHour.apply(this, arguments);
}

function createGradeClass(_x17, _x18) {
  return _createGradeClass.apply(this, arguments);
}

function _createGradeClass() {
  _createGradeClass = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(parent, args) {
    var _args$gradeClassInput, className, grade, capacity, teacherID, classID, existingClass, gradeClass;

    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _args$gradeClassInput = args.gradeClassInput, className = _args$gradeClassInput.className, grade = _args$gradeClassInput.grade, capacity = _args$gradeClassInput.capacity, teacherID = _args$gradeClassInput.teacherID;
            classID = "".concat(grade).concat(className.slice(0, 3).toUpperCase());
            _context9.next = 4;
            return _GradeClass["default"].findOne({
              classID: classID
            });

          case 4:
            existingClass = _context9.sent;

            if (!existingClass) {
              _context9.next = 7;
              break;
            }

            throw new Error('Class & Grade already registered. Choose a new one.');

          case 7:
            gradeClass = new _GradeClass["default"]({
              classID: classID,
              className: className,
              grade: grade,
              capacity: capacity,
              teacherID: teacherID,
              numberOfStudents: 34
            });
            gradeClass.save();
            return _context9.abrupt("return", _objectSpread({}, gradeClass._doc));

          case 10:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));
  return _createGradeClass.apply(this, arguments);
}

function createSubject(_x19, _x20) {
  return _createSubject.apply(this, arguments);
}

function _createSubject() {
  _createSubject = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(parent, args) {
    var _args$subjectInput, subjectName, teacherID, subjectID, existingSubject, subject;

    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _args$subjectInput = args.subjectInput, subjectName = _args$subjectInput.subjectName, teacherID = _args$subjectInput.teacherID;
            subjectID = "".concat(subjectName.slice(0, 3).toUpperCase()).concat(new Date().getFullYear());
            _context10.next = 4;
            return _Subject["default"].findOne({
              subjectID: subjectID
            });

          case 4:
            existingSubject = _context10.sent;

            if (!existingSubject) {
              _context10.next = 7;
              break;
            }

            throw new Error('Subject already registered. Choose a new one.');

          case 7:
            subject = new _Subject["default"]({
              subjectID: subjectID,
              subjectName: subjectName,
              teacherID: teacherID
            });
            subject.save();
            return _context10.abrupt("return", _objectSpread({}, subject._doc));

          case 10:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));
  return _createSubject.apply(this, arguments);
}

function registerStudentAttendance(_x21, _x22) {
  return _registerStudentAttendance.apply(this, arguments);
}

function _registerStudentAttendance() {
  _registerStudentAttendance = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(parent, args) {
    var _args$studentAttendan, dateOfAttendance, attendance, studentIDs, studentAttendanceStatus, existingAttendanceEntry, attendanceStatus, i, existingStatus, _attendanceStatus;

    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _args$studentAttendan = args.studentAttendanceInput, dateOfAttendance = _args$studentAttendan.dateOfAttendance, attendance = _args$studentAttendan.attendance;
            studentIDs = attendance.map(function (student) {
              return student.studentID;
            });
            studentAttendanceStatus = attendance.map(function (student) {
              return student.status;
            });
            _context11.next = 5;
            return _StudentAttendance["default"].findOne({
              dateOfAttendance: dateOfAttendance
            });

          case 5:
            existingAttendanceEntry = _context11.sent;

            if (!existingAttendanceEntry) {
              _context11.next = 29;
              break;
            }

            i = 0;

          case 8:
            if (!(i < studentIDs.length)) {
              _context11.next = 26;
              break;
            }

            _context11.next = 11;
            return _StudentAttendance["default"].findOne({
              dateOfAttendance: existingAttendanceEntry.dateOfAttendance,
              attendance: {
                $elemMatch: {
                  studentID: studentIDs[i]
                }
              }
            });

          case 11:
            existingStatus = _context11.sent;
            console.log(existingStatus);

            if (existingStatus) {
              _context11.next = 19;
              break;
            }

            _context11.next = 16;
            return _StudentAttendance["default"].findOneAndUpdate({
              dateOfAttendance: existingAttendanceEntry.dateOfAttendance
            }, {
              $addToSet: {
                attendance: {
                  studentID: studentIDs[i],
                  status: studentAttendanceStatus[i]
                }
              }
            });

          case 16:
            attendanceStatus = _context11.sent;
            _context11.next = 23;
            break;

          case 19:
            if (!existingStatus) {
              _context11.next = 23;
              break;
            }

            _context11.next = 22;
            return _StudentAttendance["default"].findOneAndUpdate({
              dateOfAttendance: existingAttendanceEntry.dateOfAttendance,
              attendance: {
                $elemMatch: {
                  studentID: studentIDs[i]
                }
              }
            }, {
              $set: {
                'attendance.$.status': studentAttendanceStatus[i]
              }
            });

          case 22:
            attendanceStatus = _context11.sent;

          case 23:
            i++;
            _context11.next = 8;
            break;

          case 26:
            return _context11.abrupt("return", attendanceStatus);

          case 29:
            _attendanceStatus = new _StudentAttendance["default"]({
              dateOfAttendance: dateOfAttendance,
              attendance: attendance
            });

            _attendanceStatus.save();

            return _context11.abrupt("return", _objectSpread({}, _attendanceStatus._doc));

          case 32:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  }));
  return _registerStudentAttendance.apply(this, arguments);
}

function registerTeacherAttendance(_x23, _x24) {
  return _registerTeacherAttendance.apply(this, arguments);
}

function _registerTeacherAttendance() {
  _registerTeacherAttendance = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(parent, args) {
    var _args$teacherAttendan, dateOfAttendance, attendance, teacherIDs, teacherAttendanceStatus, existingAttendanceEntry, attendanceStatus, i, existingStatus, _attendanceStatus2;

    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _args$teacherAttendan = args.teacherAttendanceInput, dateOfAttendance = _args$teacherAttendan.dateOfAttendance, attendance = _args$teacherAttendan.attendance;
            teacherIDs = attendance.map(function (teacher) {
              return teacher.teacherID;
            });
            teacherAttendanceStatus = attendance.map(function (teacher) {
              return teacher.status;
            });
            _context12.next = 5;
            return _TeacherAttendance["default"].findOne({
              dateOfAttendance: dateOfAttendance
            });

          case 5:
            existingAttendanceEntry = _context12.sent;

            if (!existingAttendanceEntry) {
              _context12.next = 28;
              break;
            }

            i = 0;

          case 8:
            if (!(i < teacherIDs.length)) {
              _context12.next = 25;
              break;
            }

            _context12.next = 11;
            return _TeacherAttendance["default"].findOne({
              dateOfAttendance: existingAttendanceEntry.dateOfAttendance,
              attendance: {
                $elemMatch: {
                  teacherID: teacherIDs[i]
                }
              }
            });

          case 11:
            existingStatus = _context12.sent;

            if (existingStatus) {
              _context12.next = 18;
              break;
            }

            _context12.next = 15;
            return _TeacherAttendance["default"].findOneAndUpdate({
              dateOfAttendance: existingAttendanceEntry.dateOfAttendance
            }, {
              $addToSet: {
                attendance: {
                  teacherID: teacherIDs[i],
                  status: teacherAttendanceStatus[i]
                }
              }
            });

          case 15:
            attendanceStatus = _context12.sent;
            _context12.next = 22;
            break;

          case 18:
            if (!existingStatus) {
              _context12.next = 22;
              break;
            }

            _context12.next = 21;
            return _TeacherAttendance["default"].findOneAndUpdate({
              dateOfAttendance: existingAttendanceEntry.dateOfAttendance,
              attendance: {
                $elemMatch: {
                  teacherID: teacherIDs[i]
                }
              }
            }, {
              $set: {
                'attendance.$.status': teacherAttendanceStatus[i]
              }
            });

          case 21:
            attendanceStatus = _context12.sent;

          case 22:
            i++;
            _context12.next = 8;
            break;

          case 25:
            return _context12.abrupt("return", attendanceStatus);

          case 28:
            _attendanceStatus2 = new _TeacherAttendance["default"]({
              dateOfAttendance: dateOfAttendance,
              attendance: attendance
            });

            _attendanceStatus2.save();

            return _context12.abrupt("return", _objectSpread({}, _attendanceStatus2._doc));

          case 31:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12);
  }));
  return _registerTeacherAttendance.apply(this, arguments);
}

function registerAssessment(_x25, _x26) {
  return _registerAssessment.apply(this, arguments);
}

function _registerAssessment() {
  _registerAssessment = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(parent, args) {
    var _args$assessmentInput, assessmentDate, period, subject, gradeClass, markings, term, assessmentID, existingID, assessment;

    return regeneratorRuntime.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.prev = 0;
            _args$assessmentInput = args.assessmentInput, assessmentDate = _args$assessmentInput.assessmentDate, period = _args$assessmentInput.period, subject = _args$assessmentInput.subject, gradeClass = _args$assessmentInput.gradeClass, markings = _args$assessmentInput.markings, term = _args$assessmentInput.term;

          case 2:
            assessmentID = "A".concat((0, _helpers.randomNum)(6));
            _context13.next = 5;
            return _Assessment["default"].findOne({
              assessmentID: assessmentID
            });

          case 5:
            existingID = _context13.sent;

          case 6:
            if (existingID) {
              _context13.next = 2;
              break;
            }

          case 7:
            assessment = new _Assessment["default"]({
              assessmentID: assessmentID,
              assessmentDate: assessmentDate,
              period: period,
              subject: subject,
              gradeClass: gradeClass,
              markings: markings,
              term: term
            });
            assessment.save();
            return _context13.abrupt("return", _objectSpread({}, assessment._doc));

          case 12:
            _context13.prev = 12;
            _context13.t0 = _context13["catch"](0);
            throw _context13.t0;

          case 15:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13, null, [[0, 12]]);
  }));
  return _registerAssessment.apply(this, arguments);
}

function registerExam(_x27, _x28) {
  return _registerExam.apply(this, arguments);
}

function _registerExam() {
  _registerExam = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(parent, args) {
    var _args$examInput, examDate, startTime, duration, subject, gradeClass, markings, term, examID, existingID, exam;

    return regeneratorRuntime.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.prev = 0;
            _args$examInput = args.examInput, examDate = _args$examInput.examDate, startTime = _args$examInput.startTime, duration = _args$examInput.duration, subject = _args$examInput.subject, gradeClass = _args$examInput.gradeClass, markings = _args$examInput.markings, term = _args$examInput.term;

          case 2:
            examID = "E".concat((0, _helpers.randomNum)(6));
            _context14.next = 5;
            return _Exam["default"].findOne({
              examID: examID
            });

          case 5:
            existingID = _context14.sent;

          case 6:
            if (existingID) {
              _context14.next = 2;
              break;
            }

          case 7:
            exam = new _Exam["default"]({
              examID: examID,
              examDate: examDate,
              startTime: startTime,
              duration: duration,
              subject: subject,
              gradeClass: gradeClass,
              markings: markings,
              term: term
            });
            exam.save();
            return _context14.abrupt("return", _objectSpread({}, exam._doc));

          case 12:
            _context14.prev = 12;
            _context14.t0 = _context14["catch"](0);
            throw _context14.t0;

          case 15:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14, null, [[0, 12]]);
  }));
  return _registerExam.apply(this, arguments);
}

function registerAssessmentMark(_x29, _x30) {
  return _registerAssessmentMark.apply(this, arguments);
}

function _registerAssessmentMark() {
  _registerAssessmentMark = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(parent, args) {
    var _args$assessmentMarkI, assessmentID, studentMarks, studentIDs, studentMarkings, assessmentRecorded, _assessmentMark, i, existingMarks, _assessmentMark2;

    return regeneratorRuntime.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            _context15.prev = 0;
            _args$assessmentMarkI = args.assessmentMarkInput, assessmentID = _args$assessmentMarkI.assessmentID, studentMarks = _args$assessmentMarkI.studentMarks;
            studentIDs = studentMarks.map(function (student) {
              return student.studentID;
            });
            studentMarkings = studentMarks.map(function (student) {
              return student.markings;
            }); // console.log(studentMarks);

            _context15.next = 6;
            return _AssessmentMark["default"].findOne({
              assessmentID: assessmentID
            });

          case 6:
            assessmentRecorded = _context15.sent;

            if (!assessmentRecorded) {
              _context15.next = 29;
              break;
            }

            i = 0;

          case 9:
            if (!(i < studentIDs.length)) {
              _context15.next = 26;
              break;
            }

            _context15.next = 12;
            return _AssessmentMark["default"].findOne({
              assessmentID: assessmentRecorded.assessmentID,
              studentMarks: {
                $elemMatch: {
                  studentID: studentIDs[i]
                }
              }
            });

          case 12:
            existingMarks = _context15.sent;

            if (existingMarks) {
              _context15.next = 19;
              break;
            }

            _context15.next = 16;
            return _AssessmentMark["default"].findOneAndUpdate({
              assessmentID: assessmentRecorded.assessmentID
            }, {
              $addToSet: {
                studentMarks: {
                  studentID: studentIDs[i],
                  markings: studentMarkings[i]
                }
              }
            });

          case 16:
            _assessmentMark = _context15.sent;
            _context15.next = 23;
            break;

          case 19:
            if (!existingMarks) {
              _context15.next = 23;
              break;
            }

            _context15.next = 22;
            return _AssessmentMark["default"].findOneAndUpdate({
              assessmentID: assessmentRecorded.assessmentID,
              studentMarks: {
                $elemMatch: {
                  studentID: studentIDs[i]
                }
              }
            }, {
              $set: {
                'studentMarks.$.markings': studentMarkings[i]
              }
            });

          case 22:
            _assessmentMark = _context15.sent;

          case 23:
            i++;
            _context15.next = 9;
            break;

          case 26:
            return _context15.abrupt("return", _assessmentMark);

          case 29:
            _assessmentMark2 = new _AssessmentMark["default"]({
              assessmentID: assessmentID,
              studentMarks: studentMarks
            });

            _assessmentMark2.save();

          case 31:
            return _context15.abrupt("return", _objectSpread({}, assessmentMark._doc));

          case 34:
            _context15.prev = 34;
            _context15.t0 = _context15["catch"](0);
            console.log(_context15.t0);

          case 37:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15, null, [[0, 34]]);
  }));
  return _registerAssessmentMark.apply(this, arguments);
}

function registerExamMark(_x31, _x32) {
  return _registerExamMark.apply(this, arguments);
}

function _registerExamMark() {
  _registerExamMark = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(parent, args) {
    var _args$examMarkInput, examID, studentMarks, studentIDs, studentMarkings, examRecorded, examMark, i, existingMarks, _examMark;

    return regeneratorRuntime.wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            _context16.prev = 0;
            _args$examMarkInput = args.examMarkInput, examID = _args$examMarkInput.examID, studentMarks = _args$examMarkInput.studentMarks;
            studentIDs = studentMarks.map(function (student) {
              return student.studentID;
            });
            studentMarkings = studentMarks.map(function (student) {
              return student.markings;
            }); // console.log(studentMarks);

            _context16.next = 6;
            return _ExamMark["default"].findOne({
              examID: examID
            });

          case 6:
            examRecorded = _context16.sent;

            if (!examRecorded) {
              _context16.next = 29;
              break;
            }

            i = 0;

          case 9:
            if (!(i < studentIDs.length)) {
              _context16.next = 26;
              break;
            }

            _context16.next = 12;
            return _ExamMark["default"].findOne({
              examID: examRecorded.examID,
              studentMarks: {
                $elemMatch: {
                  studentID: studentIDs[i]
                }
              }
            });

          case 12:
            existingMarks = _context16.sent;

            if (existingMarks) {
              _context16.next = 19;
              break;
            }

            _context16.next = 16;
            return _ExamMark["default"].findOneAndUpdate({
              examID: examRecorded.examID
            }, {
              $addToSet: {
                studentMarks: {
                  studentID: studentIDs[i],
                  markings: studentMarkings[i]
                }
              }
            });

          case 16:
            examMark = _context16.sent;
            _context16.next = 23;
            break;

          case 19:
            if (!existingMarks) {
              _context16.next = 23;
              break;
            }

            _context16.next = 22;
            return _ExamMark["default"].findOneAndUpdate({
              examID: examRecorded.examID,
              studentMarks: {
                $elemMatch: {
                  studentID: studentIDs[i]
                }
              }
            }, {
              $set: {
                'studentMarks.$.markings': studentMarkings[i]
              }
            });

          case 22:
            examMark = _context16.sent;

          case 23:
            i++;
            _context16.next = 9;
            break;

          case 26:
            return _context16.abrupt("return", examMark);

          case 29:
            _examMark = new _ExamMark["default"]({
              examID: examID,
              studentMarks: studentMarks
            });

            _examMark.save();

            return _context16.abrupt("return", _objectSpread({}, _examMark._doc));

          case 32:
            _context16.next = 37;
            break;

          case 34:
            _context16.prev = 34;
            _context16.t0 = _context16["catch"](0);
            console.log(_context16.t0);

          case 37:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee16, null, [[0, 34]]);
  }));
  return _registerExamMark.apply(this, arguments);
}

function registerTimetable(_x33, _x34) {
  return _registerTimetable.apply(this, arguments);
}
/**************** UPDATES ****************/


function _registerTimetable() {
  _registerTimetable = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17(parent, args) {
    var _args$timetableInput, classID, slots, slotTags, subjects, classRecorded, timeSlot, i, existingSlots, _timeSlot;

    return regeneratorRuntime.wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            _context17.prev = 0;
            _args$timetableInput = args.timetableInput, classID = _args$timetableInput.classID, slots = _args$timetableInput.slots;
            slotTags = slots.map(function (slotTag) {
              return slotTag.slotTag;
            });
            subjects = slots.map(function (subject) {
              return subject.subjectID;
            });
            _context17.next = 6;
            return _Timetable["default"].findOne({
              classID: classID
            });

          case 6:
            classRecorded = _context17.sent;

            if (!classRecorded) {
              _context17.next = 29;
              break;
            }

            i = 0;

          case 9:
            if (!(i < slotTags.length)) {
              _context17.next = 26;
              break;
            }

            _context17.next = 12;
            return _Timetable["default"].findOne({
              classID: classRecorded.classID,
              slots: {
                $elemMatch: {
                  slotTag: slotTags[i]
                }
              }
            });

          case 12:
            existingSlots = _context17.sent;

            if (existingSlots) {
              _context17.next = 19;
              break;
            }

            _context17.next = 16;
            return _Timetable["default"].findOneAndUpdate({
              classID: classRecorded.classID
            }, {
              $addToSet: {
                slots: {
                  slotTag: slotTags[i],
                  subjectID: subjects[i]
                }
              }
            });

          case 16:
            timeSlot = _context17.sent;
            _context17.next = 23;
            break;

          case 19:
            if (!existingSlots) {
              _context17.next = 23;
              break;
            }

            _context17.next = 22;
            return _Timetable["default"].findOneAndUpdate({
              classID: classRecorded.classID,
              slots: {
                $elemMatch: {
                  slotTag: slotTags[i]
                }
              }
            }, {
              $set: {
                'slots.$.subjectID': subjects[i]
              }
            });

          case 22:
            timeSlot = _context17.sent;

          case 23:
            i++;
            _context17.next = 9;
            break;

          case 26:
            return _context17.abrupt("return", timeSlot);

          case 29:
            _timeSlot = new _Timetable["default"]({
              classID: classID,
              slots: slots
            });

            _timeSlot.save();

            return _context17.abrupt("return", _objectSpread({}, _timeSlot._doc));

          case 32:
            _context17.next = 37;
            break;

          case 34:
            _context17.prev = 34;
            _context17.t0 = _context17["catch"](0);
            console.log(_context17.t0);

          case 37:
          case "end":
            return _context17.stop();
        }
      }
    }, _callee17, null, [[0, 34]]);
  }));
  return _registerTimetable.apply(this, arguments);
}

function updateTeacherPersoInfo(_x35, _x36) {
  return _updateTeacherPersoInfo.apply(this, arguments);
}

function _updateTeacherPersoInfo() {
  _updateTeacherPersoInfo = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18(parent, args) {
    var _id, firstName, lastName, gender, dob, streetAddress, city, zipCode, telephoneNumber, emailAddress, teacher, query;

    return regeneratorRuntime.wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            _id = args._id, firstName = args.firstName, lastName = args.lastName, gender = args.gender, dob = args.dob, streetAddress = args.streetAddress, city = args.city, zipCode = args.zipCode, telephoneNumber = args.telephoneNumber, emailAddress = args.emailAddress;
            query = {
              _id: _id
            };

            if (!(firstName !== undefined)) {
              _context18.next = 6;
              break;
            }

            _context18.next = 5;
            return _Teacher["default"].findOneAndUpdate(query, {
              firstName: firstName
            });

          case 5:
            teacher = _context18.sent;

          case 6:
            if (!(lastName !== undefined)) {
              _context18.next = 10;
              break;
            }

            _context18.next = 9;
            return _Teacher["default"].findOneAndUpdate(query, {
              lastName: lastName
            });

          case 9:
            teacher = _context18.sent;

          case 10:
            if (!(gender !== undefined)) {
              _context18.next = 14;
              break;
            }

            _context18.next = 13;
            return _Teacher["default"].findOneAndUpdate(query, {
              gender: gender
            });

          case 13:
            teacher = _context18.sent;

          case 14:
            if (!(dob !== undefined)) {
              _context18.next = 18;
              break;
            }

            _context18.next = 17;
            return _Teacher["default"].findOneAndUpdate(query, {
              dob: dob
            });

          case 17:
            teacher = _context18.sent;

          case 18:
            if (!(streetAddress !== undefined)) {
              _context18.next = 22;
              break;
            }

            _context18.next = 21;
            return _Teacher["default"].findOneAndUpdate(query, {
              streetAddress: streetAddress
            });

          case 21:
            teacher = _context18.sent;

          case 22:
            if (!(city !== undefined)) {
              _context18.next = 26;
              break;
            }

            _context18.next = 25;
            return _Teacher["default"].findOneAndUpdate(query, {
              city: city
            });

          case 25:
            teacher = _context18.sent;

          case 26:
            if (!(zipCode !== undefined)) {
              _context18.next = 30;
              break;
            }

            _context18.next = 29;
            return _Teacher["default"].findOneAndUpdate(query, {
              zipCode: zipCode
            });

          case 29:
            teacher = _context18.sent;

          case 30:
            if (!(telephoneNumber !== undefined)) {
              _context18.next = 34;
              break;
            }

            _context18.next = 33;
            return _Teacher["default"].findOneAndUpdate(query, {
              telephoneNumber: telephoneNumber
            });

          case 33:
            teacher = _context18.sent;

          case 34:
            if (!(emailAddress !== undefined)) {
              _context18.next = 38;
              break;
            }

            _context18.next = 37;
            return _Teacher["default"].findOneAndUpdate(query, {
              emailAddress: emailAddress
            });

          case 37:
            teacher = _context18.sent;

          case 38:
            return _context18.abrupt("return", teacher);

          case 39:
          case "end":
            return _context18.stop();
        }
      }
    }, _callee18);
  }));
  return _updateTeacherPersoInfo.apply(this, arguments);
}

function updateTeacherProfilePic(_x37, _x38) {
  return _updateTeacherProfilePic.apply(this, arguments);
}

function _updateTeacherProfilePic() {
  _updateTeacherProfilePic = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19(parent, args) {
    var _id, photoID, profilePic, _yield$profilePic, createReadStream, result, profilePicLink, teacher, query;

    return regeneratorRuntime.wrap(function _callee19$(_context19) {
      while (1) {
        switch (_context19.prev = _context19.next) {
          case 0:
            _id = args._id, photoID = args.photoID;
            profilePic = args.profilePic;
            _context19.next = 4;
            return profilePic;

          case 4:
            _yield$profilePic = _context19.sent;
            createReadStream = _yield$profilePic.createReadStream;
            _context19.prev = 6;
            _context19.next = 9;
            return new Promise(function (resolve, reject) {
              createReadStream().pipe(cloudinary.uploader.upload_stream({
                folder: 'teacher_profile_pic/',
                public_id: photoID
              }, function (error, result) {
                if (error) {
                  reject(error);
                }

                resolve(result);
              }));
            });

          case 9:
            result = _context19.sent;
            profilePicLink = cloudinary.url(result.public_id, {
              version: result.version,
              gravity: 'face',
              height: 200,
              width: 150,
              crop: 'fill'
            });
            _context19.next = 16;
            break;

          case 13:
            _context19.prev = 13;
            _context19.t0 = _context19["catch"](6);
            console.log(_context19.t0);

          case 16:
            query = {
              _id: _id
            };

            if (!(profilePic !== undefined)) {
              _context19.next = 21;
              break;
            }

            _context19.next = 20;
            return _Teacher["default"].findOneAndUpdate(query, {
              profilePic: profilePicLink
            });

          case 20:
            teacher = _context19.sent;

          case 21:
            return _context19.abrupt("return", teacher);

          case 22:
          case "end":
            return _context19.stop();
        }
      }
    }, _callee19, null, [[6, 13]]);
  }));
  return _updateTeacherProfilePic.apply(this, arguments);
}

function updateStudentPersoInfo(_x39, _x40) {
  return _updateStudentPersoInfo.apply(this, arguments);
}

function _updateStudentPersoInfo() {
  _updateStudentPersoInfo = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee20(parent, args) {
    var _id, firstName, lastName, gender, dob, streetAddress, city, zipCode, telephoneNumber, emailAddress, student, query;

    return regeneratorRuntime.wrap(function _callee20$(_context20) {
      while (1) {
        switch (_context20.prev = _context20.next) {
          case 0:
            _id = args._id, firstName = args.firstName, lastName = args.lastName, gender = args.gender, dob = args.dob, streetAddress = args.streetAddress, city = args.city, zipCode = args.zipCode, telephoneNumber = args.telephoneNumber, emailAddress = args.emailAddress;
            query = {
              _id: _id
            };

            if (!(firstName !== undefined)) {
              _context20.next = 6;
              break;
            }

            _context20.next = 5;
            return _Student["default"].findOneAndUpdate(query, {
              firstName: firstName
            });

          case 5:
            student = _context20.sent;

          case 6:
            if (!(lastName !== undefined)) {
              _context20.next = 10;
              break;
            }

            _context20.next = 9;
            return _Student["default"].findOneAndUpdate(query, {
              lastName: lastName
            });

          case 9:
            student = _context20.sent;

          case 10:
            if (!(gender !== undefined)) {
              _context20.next = 14;
              break;
            }

            _context20.next = 13;
            return _Student["default"].findOneAndUpdate(query, {
              gender: gender
            });

          case 13:
            student = _context20.sent;

          case 14:
            if (!(dob !== undefined)) {
              _context20.next = 18;
              break;
            }

            _context20.next = 17;
            return _Student["default"].findOneAndUpdate(query, {
              dob: dob
            });

          case 17:
            student = _context20.sent;

          case 18:
            if (!(streetAddress !== undefined)) {
              _context20.next = 22;
              break;
            }

            _context20.next = 21;
            return _Student["default"].findOneAndUpdate(query, {
              streetAddress: streetAddress
            });

          case 21:
            student = _context20.sent;

          case 22:
            if (!(city !== undefined)) {
              _context20.next = 26;
              break;
            }

            _context20.next = 25;
            return _Student["default"].findOneAndUpdate(query, {
              city: city
            });

          case 25:
            student = _context20.sent;

          case 26:
            if (!(zipCode !== undefined)) {
              _context20.next = 30;
              break;
            }

            _context20.next = 29;
            return _Student["default"].findOneAndUpdate(query, {
              zipCode: zipCode
            });

          case 29:
            student = _context20.sent;

          case 30:
            if (!(telephoneNumber !== undefined)) {
              _context20.next = 34;
              break;
            }

            _context20.next = 33;
            return _Student["default"].findOneAndUpdate(query, {
              telephoneNumber: telephoneNumber
            });

          case 33:
            student = _context20.sent;

          case 34:
            if (!(emailAddress !== undefined)) {
              _context20.next = 38;
              break;
            }

            _context20.next = 37;
            return _Student["default"].findOneAndUpdate(query, {
              emailAddress: emailAddress
            });

          case 37:
            student = _context20.sent;

          case 38:
            return _context20.abrupt("return", student);

          case 39:
          case "end":
            return _context20.stop();
        }
      }
    }, _callee20);
  }));
  return _updateStudentPersoInfo.apply(this, arguments);
}

function updateStudentProfilePic(_x41, _x42) {
  return _updateStudentProfilePic.apply(this, arguments);
}

function _updateStudentProfilePic() {
  _updateStudentProfilePic = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee21(parent, args) {
    var _id, photoID, profilePic, _yield$profilePic2, createReadStream, result, profilePicLink, student, query;

    return regeneratorRuntime.wrap(function _callee21$(_context21) {
      while (1) {
        switch (_context21.prev = _context21.next) {
          case 0:
            _id = args._id, photoID = args.photoID;
            profilePic = args.profilePic;
            _context21.next = 4;
            return profilePic;

          case 4:
            _yield$profilePic2 = _context21.sent;
            createReadStream = _yield$profilePic2.createReadStream;
            _context21.prev = 6;
            _context21.next = 9;
            return new Promise(function (resolve, reject) {
              createReadStream().pipe(cloudinary.uploader.upload_stream({
                folder: 'student_profile_pic/',
                public_id: photoID
              }, function (error, result) {
                if (error) {
                  reject(error);
                }

                resolve(result);
              }));
            });

          case 9:
            result = _context21.sent;
            profilePicLink = cloudinary.url(result.public_id, {
              version: result.version,
              gravity: 'face',
              height: 200,
              width: 150,
              crop: 'fill'
            });
            _context21.next = 16;
            break;

          case 13:
            _context21.prev = 13;
            _context21.t0 = _context21["catch"](6);
            console.log(_context21.t0);

          case 16:
            query = {
              _id: _id
            };

            if (!(profilePic !== undefined)) {
              _context21.next = 21;
              break;
            }

            _context21.next = 20;
            return _Student["default"].findOneAndUpdate(query, {
              profilePic: profilePicLink
            });

          case 20:
            student = _context21.sent;

          case 21:
            return _context21.abrupt("return", student);

          case 22:
          case "end":
            return _context21.stop();
        }
      }
    }, _callee21, null, [[6, 13]]);
  }));
  return _updateStudentProfilePic.apply(this, arguments);
}

function updateStudentClassInfo(_x43, _x44) {
  return _updateStudentClassInfo.apply(this, arguments);
}

function _updateStudentClassInfo() {
  _updateStudentClassInfo = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee22(parent, args) {
    var _id, classID, studentClassInfo, query;

    return regeneratorRuntime.wrap(function _callee22$(_context22) {
      while (1) {
        switch (_context22.prev = _context22.next) {
          case 0:
            _id = args._id, classID = args.classID;
            query = {
              _id: _id
            }; // if (grade !== undefined) {
            // 	studentClassInfo = await Student.findOneAndUpdate(query, { grade });
            // }

            if (!(classID !== undefined)) {
              _context22.next = 6;
              break;
            }

            _context22.next = 5;
            return _Student["default"].findOneAndUpdate(query, {
              classID: classID
            });

          case 5:
            studentClassInfo = _context22.sent;

          case 6:
            return _context22.abrupt("return", studentClassInfo);

          case 7:
          case "end":
            return _context22.stop();
        }
      }
    }, _callee22);
  }));
  return _updateStudentClassInfo.apply(this, arguments);
}

function updateStudentGuardianInfo(_x45, _x46) {
  return _updateStudentGuardianInfo.apply(this, arguments);
}

function _updateStudentGuardianInfo() {
  _updateStudentGuardianInfo = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee23(parent, args) {
    var _id, firstName, lastName, relationship, mobilePhone, workPhone, emailAddress, guardian, query;

    return regeneratorRuntime.wrap(function _callee23$(_context23) {
      while (1) {
        switch (_context23.prev = _context23.next) {
          case 0:
            _id = args._id, firstName = args.firstName, lastName = args.lastName, relationship = args.relationship, mobilePhone = args.mobilePhone, workPhone = args.workPhone, emailAddress = args.emailAddress;
            query = {
              _id: _id
            };

            if (!(firstName !== undefined)) {
              _context23.next = 6;
              break;
            }

            _context23.next = 5;
            return _Guardian["default"].findOneAndUpdate(query, {
              firstName: firstName
            });

          case 5:
            guardian = _context23.sent;

          case 6:
            if (!(lastName !== undefined)) {
              _context23.next = 10;
              break;
            }

            _context23.next = 9;
            return _Guardian["default"].findOneAndUpdate(query, {
              lastName: lastName
            });

          case 9:
            guardian = _context23.sent;

          case 10:
            if (!(relationship !== undefined)) {
              _context23.next = 14;
              break;
            }

            _context23.next = 13;
            return _Guardian["default"].findOneAndUpdate(query, {
              relationship: relationship
            });

          case 13:
            guardian = _context23.sent;

          case 14:
            if (!(mobilePhone !== undefined)) {
              _context23.next = 18;
              break;
            }

            _context23.next = 17;
            return _Guardian["default"].findOneAndUpdate(query, {
              mobilePhone: mobilePhone
            });

          case 17:
            guardian = _context23.sent;

          case 18:
            if (!(workPhone !== undefined)) {
              _context23.next = 22;
              break;
            }

            _context23.next = 21;
            return _Guardian["default"].findOneAndUpdate(query, {
              workPhone: workPhone
            });

          case 21:
            guardian = _context23.sent;

          case 22:
            if (!(emailAddress !== undefined)) {
              _context23.next = 26;
              break;
            }

            _context23.next = 25;
            return _Guardian["default"].findOneAndUpdate(query, {
              emailAddress: emailAddress
            });

          case 25:
            guardian = _context23.sent;

          case 26:
            return _context23.abrupt("return", guardian);

          case 27:
          case "end":
            return _context23.stop();
        }
      }
    }, _callee23);
  }));
  return _updateStudentGuardianInfo.apply(this, arguments);
}

function updateSchoolInfo(_x47, _x48) {
  return _updateSchoolInfo.apply(this, arguments);
}

function _updateSchoolInfo() {
  _updateSchoolInfo = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee24(parent, args) {
    var _id, name, streetAddress, telephoneNumber, emailAddress, website, markingSystem, school, query;

    return regeneratorRuntime.wrap(function _callee24$(_context24) {
      while (1) {
        switch (_context24.prev = _context24.next) {
          case 0:
            _id = args._id, name = args.name, streetAddress = args.streetAddress, telephoneNumber = args.telephoneNumber, emailAddress = args.emailAddress, website = args.website, markingSystem = args.markingSystem;
            query = {
              _id: _id
            };

            if (!(name !== undefined)) {
              _context24.next = 6;
              break;
            }

            _context24.next = 5;
            return _School["default"].findOneAndUpdate(query, {
              name: name
            });

          case 5:
            school = _context24.sent;

          case 6:
            if (!(streetAddress !== undefined)) {
              _context24.next = 10;
              break;
            }

            _context24.next = 9;
            return _School["default"].findOneAndUpdate(query, {
              streetAddress: streetAddress
            });

          case 9:
            school = _context24.sent;

          case 10:
            if (!(telephoneNumber !== undefined)) {
              _context24.next = 14;
              break;
            }

            _context24.next = 13;
            return _School["default"].findOneAndUpdate(query, {
              telephoneNumber: telephoneNumber
            });

          case 13:
            school = _context24.sent;

          case 14:
            if (!(emailAddress !== undefined)) {
              _context24.next = 18;
              break;
            }

            _context24.next = 17;
            return _School["default"].findOneAndUpdate(query, {
              emailAddress: emailAddress
            });

          case 17:
            school = _context24.sent;

          case 18:
            if (!(website !== undefined)) {
              _context24.next = 22;
              break;
            }

            _context24.next = 21;
            return _School["default"].findOneAndUpdate(query, {
              website: website
            });

          case 21:
            school = _context24.sent;

          case 22:
            if (!(markingSystem !== undefined)) {
              _context24.next = 26;
              break;
            }

            _context24.next = 25;
            return _School["default"].findOneAndUpdate(query, {
              markingSystem: markingSystem
            });

          case 25:
            school = _context24.sent;

          case 26:
            return _context24.abrupt("return", school);

          case 27:
          case "end":
            return _context24.stop();
        }
      }
    }, _callee24);
  }));
  return _updateSchoolInfo.apply(this, arguments);
}

function updateAssessment(_x49, _x50) {
  return _updateAssessment.apply(this, arguments);
}

function _updateAssessment() {
  _updateAssessment = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee25(parent, args) {
    var _id, assessmentDate, period, subject, gradeClass, markings, term, updatedAssessment, query, existingID;

    return regeneratorRuntime.wrap(function _callee25$(_context25) {
      while (1) {
        switch (_context25.prev = _context25.next) {
          case 0:
            _id = args._id, assessmentDate = args.assessmentDate, period = args.period, subject = args.subject, gradeClass = args.gradeClass, markings = args.markings, term = args.term;
            query = {
              _id: _id
            };
            _context25.next = 4;
            return _Assessment["default"].findById(query);

          case 4:
            existingID = _context25.sent;

            if (existingID) {
              _context25.next = 7;
              break;
            }

            throw new Error('This assessment is not recorded...');

          case 7:
            if (!(assessmentDate !== null)) {
              _context25.next = 11;
              break;
            }

            _context25.next = 10;
            return _Assessment["default"].findOneAndUpdate(query, {
              assessmentDate: assessmentDate
            });

          case 10:
            updatedAssessment = _context25.sent;

          case 11:
            if (!(period !== null)) {
              _context25.next = 15;
              break;
            }

            _context25.next = 14;
            return _Assessment["default"].findOneAndUpdate(query, {
              period: period
            });

          case 14:
            updatedAssessment = _context25.sent;

          case 15:
            if (!(subject !== null)) {
              _context25.next = 19;
              break;
            }

            _context25.next = 18;
            return _Assessment["default"].findOneAndUpdate(query, {
              subject: subject
            });

          case 18:
            updatedAssessment = _context25.sent;

          case 19:
            if (!(gradeClass !== null)) {
              _context25.next = 23;
              break;
            }

            _context25.next = 22;
            return _Assessment["default"].findOneAndUpdate(query, {
              gradeClass: gradeClass
            });

          case 22:
            updatedAssessment = _context25.sent;

          case 23:
            if (!(markings !== null)) {
              _context25.next = 27;
              break;
            }

            _context25.next = 26;
            return _Assessment["default"].findOneAndUpdate(query, {
              markings: markings
            });

          case 26:
            updatedAssessment = _context25.sent;

          case 27:
            if (!(term !== null)) {
              _context25.next = 31;
              break;
            }

            _context25.next = 30;
            return _Assessment["default"].findOneAndUpdate(query, {
              term: term
            });

          case 30:
            updatedAssessment = _context25.sent;

          case 31:
            return _context25.abrupt("return", updatedAssessment);

          case 32:
          case "end":
            return _context25.stop();
        }
      }
    }, _callee25);
  }));
  return _updateAssessment.apply(this, arguments);
}

function updateExam(_x51, _x52) {
  return _updateExam.apply(this, arguments);
}

function _updateExam() {
  _updateExam = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee26(parent, args) {
    var _id, examDate, startTime, duration, subject, gradeClass, markings, term, updatedExam, query, existingID;

    return regeneratorRuntime.wrap(function _callee26$(_context26) {
      while (1) {
        switch (_context26.prev = _context26.next) {
          case 0:
            _id = args._id, examDate = args.examDate, startTime = args.startTime, duration = args.duration, subject = args.subject, gradeClass = args.gradeClass, markings = args.markings, term = args.term;
            query = {
              _id: _id
            };
            _context26.next = 4;
            return _Exam["default"].findById(query);

          case 4:
            existingID = _context26.sent;

            if (existingID) {
              _context26.next = 7;
              break;
            }

            throw new Error('This exam is not recorded...');

          case 7:
            _context26.prev = 7;

            if (!(examDate !== null)) {
              _context26.next = 12;
              break;
            }

            _context26.next = 11;
            return _Exam["default"].findOneAndUpdate(query, {
              examDate: examDate
            });

          case 11:
            updatedExam = _context26.sent;

          case 12:
            if (!(startTime !== null)) {
              _context26.next = 16;
              break;
            }

            _context26.next = 15;
            return _Exam["default"].findOneAndUpdate(query, {
              startTime: startTime
            });

          case 15:
            updatedExam = _context26.sent;

          case 16:
            if (!(duration !== null)) {
              _context26.next = 20;
              break;
            }

            _context26.next = 19;
            return _Exam["default"].findOneAndUpdate(query, {
              duration: duration
            });

          case 19:
            updatedExam = _context26.sent;

          case 20:
            if (!(subject !== null)) {
              _context26.next = 24;
              break;
            }

            _context26.next = 23;
            return _Exam["default"].findOneAndUpdate(query, {
              subject: subject
            });

          case 23:
            updatedExam = _context26.sent;

          case 24:
            if (!(gradeClass !== null)) {
              _context26.next = 28;
              break;
            }

            _context26.next = 27;
            return _Exam["default"].findOneAndUpdate(query, {
              gradeClass: gradeClass
            });

          case 27:
            updatedExam = _context26.sent;

          case 28:
            if (!(markings !== null)) {
              _context26.next = 32;
              break;
            }

            _context26.next = 31;
            return _Exam["default"].findOneAndUpdate(query, {
              markings: markings
            });

          case 31:
            updatedExam = _context26.sent;

          case 32:
            if (!(term !== null)) {
              _context26.next = 36;
              break;
            }

            _context26.next = 35;
            return _Exam["default"].findOneAndUpdate(query, {
              term: term
            });

          case 35:
            updatedExam = _context26.sent;

          case 36:
            _context26.next = 41;
            break;

          case 38:
            _context26.prev = 38;
            _context26.t0 = _context26["catch"](7);
            console.log(_context26.t0);

          case 41:
            return _context26.abrupt("return", updatedExam);

          case 42:
          case "end":
            return _context26.stop();
        }
      }
    }, _callee26, null, [[7, 38]]);
  }));
  return _updateExam.apply(this, arguments);
}

function updateClass(_x53, _x54) {
  return _updateClass.apply(this, arguments);
}

function _updateClass() {
  _updateClass = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee27(parent, args) {
    var _id, className, grade, capacity, teacherID, updatedClass, query, existingID;

    return regeneratorRuntime.wrap(function _callee27$(_context27) {
      while (1) {
        switch (_context27.prev = _context27.next) {
          case 0:
            _id = args._id, className = args.className, grade = args.grade, capacity = args.capacity, teacherID = args.teacherID;
            query = {
              _id: _id
            };
            _context27.next = 4;
            return _GradeClass["default"].findById(query);

          case 4:
            existingID = _context27.sent;

            if (existingID) {
              _context27.next = 7;
              break;
            }

            throw new Error('This exam is not recorded...');

          case 7:
            _context27.prev = 7;

            if (!className) {
              _context27.next = 12;
              break;
            }

            _context27.next = 11;
            return _GradeClass["default"].findOneAndUpdate(query, {
              className: className
            });

          case 11:
            updatedClass = _context27.sent;

          case 12:
            if (!grade) {
              _context27.next = 16;
              break;
            }

            _context27.next = 15;
            return _GradeClass["default"].findOneAndUpdate(query, {
              grade: grade
            });

          case 15:
            updatedClass = _context27.sent;

          case 16:
            if (!capacity) {
              _context27.next = 20;
              break;
            }

            _context27.next = 19;
            return _GradeClass["default"].findOneAndUpdate(query, {
              capacity: capacity
            });

          case 19:
            updatedClass = _context27.sent;

          case 20:
            if (!teacherID) {
              _context27.next = 24;
              break;
            }

            _context27.next = 23;
            return _GradeClass["default"].findOneAndUpdate(query, {
              teacherID: teacherID
            });

          case 23:
            updatedClass = _context27.sent;

          case 24:
            _context27.next = 29;
            break;

          case 26:
            _context27.prev = 26;
            _context27.t0 = _context27["catch"](7);
            console.log(_context27.t0);

          case 29:
            return _context27.abrupt("return", updatedClass);

          case 30:
          case "end":
            return _context27.stop();
        }
      }
    }, _callee27, null, [[7, 26]]);
  }));
  return _updateClass.apply(this, arguments);
}

function updateSubject(_x55, _x56) {
  return _updateSubject.apply(this, arguments);
}

function _updateSubject() {
  _updateSubject = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee28(parent, args) {
    var _id, subjectName, teacherID, updatedSubject, query, existingID;

    return regeneratorRuntime.wrap(function _callee28$(_context28) {
      while (1) {
        switch (_context28.prev = _context28.next) {
          case 0:
            _id = args._id, subjectName = args.subjectName, teacherID = args.teacherID;
            query = {
              _id: _id
            };
            _context28.next = 4;
            return _Subject["default"].findById(query);

          case 4:
            existingID = _context28.sent;

            if (existingID) {
              _context28.next = 7;
              break;
            }

            throw new Error('This subject is not recorded...');

          case 7:
            _context28.prev = 7;

            if (!(subjectName && subjectName !== 'undefined')) {
              _context28.next = 12;
              break;
            }

            _context28.next = 11;
            return _Subject["default"].findOneAndUpdate(query, {
              subjectName: subjectName
            });

          case 11:
            updatedSubject = _context28.sent;

          case 12:
            if (!teacherID) {
              _context28.next = 16;
              break;
            }

            _context28.next = 15;
            return _Subject["default"].findOneAndUpdate(query, {
              teacherID: teacherID
            });

          case 15:
            updatedSubject = _context28.sent;

          case 16:
            _context28.next = 21;
            break;

          case 18:
            _context28.prev = 18;
            _context28.t0 = _context28["catch"](7);
            console.log(_context28.t0);

          case 21:
            return _context28.abrupt("return", updatedSubject);

          case 22:
          case "end":
            return _context28.stop();
        }
      }
    }, _callee28, null, [[7, 18]]);
  }));
  return _updateSubject.apply(this, arguments);
}

function updateSchoolLogo(_x57, _x58) {
  return _updateSchoolLogo.apply(this, arguments);
}

function _updateSchoolLogo() {
  _updateSchoolLogo = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee29(parent, args) {
    var _id, photoID, logo, _yield$logo, createReadStream, result, logoLink, school, query;

    return regeneratorRuntime.wrap(function _callee29$(_context29) {
      while (1) {
        switch (_context29.prev = _context29.next) {
          case 0:
            _id = args._id, photoID = args.photoID;
            logo = args.logo;
            _context29.next = 4;
            return logo;

          case 4:
            _yield$logo = _context29.sent;
            createReadStream = _yield$logo.createReadStream;
            _context29.prev = 6;
            _context29.next = 9;
            return new Promise(function (resolve, reject) {
              createReadStream().pipe(cloudinary.uploader.upload_stream({
                public_id: photoID
              }, function (error, result) {
                if (error) {
                  reject(error);
                }

                resolve(result);
              }));
            });

          case 9:
            result = _context29.sent;
            logoLink = cloudinary.url(result.public_id, {
              version: result.version,
              width: 150,
              crop: 'scale'
            });
            _context29.next = 16;
            break;

          case 13:
            _context29.prev = 13;
            _context29.t0 = _context29["catch"](6);
            console.log(_context29.t0);

          case 16:
            query = {
              _id: _id
            };

            if (!(logo !== undefined)) {
              _context29.next = 21;
              break;
            }

            _context29.next = 20;
            return _School["default"].findOneAndUpdate(query, {
              logo: logoLink
            });

          case 20:
            school = _context29.sent;

          case 21:
            return _context29.abrupt("return", school);

          case 22:
          case "end":
            return _context29.stop();
        }
      }
    }, _callee29, null, [[6, 13]]);
  }));
  return _updateSchoolLogo.apply(this, arguments);
}

function updateStaffPersoInfo(_x59, _x60) {
  return _updateStaffPersoInfo.apply(this, arguments);
}

function _updateStaffPersoInfo() {
  _updateStaffPersoInfo = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee30(parent, args) {
    var _id, firstName, lastName, gender, dob, streetAddress, city, zipCode, telephoneNumber, emailAddress, staff, query;

    return regeneratorRuntime.wrap(function _callee30$(_context30) {
      while (1) {
        switch (_context30.prev = _context30.next) {
          case 0:
            _id = args._id, firstName = args.firstName, lastName = args.lastName, gender = args.gender, dob = args.dob, streetAddress = args.streetAddress, city = args.city, zipCode = args.zipCode, telephoneNumber = args.telephoneNumber, emailAddress = args.emailAddress;
            query = {
              _id: _id
            };

            if (!(firstName !== undefined)) {
              _context30.next = 6;
              break;
            }

            _context30.next = 5;
            return _Staff["default"].findOneAndUpdate(query, {
              firstName: firstName
            });

          case 5:
            staff = _context30.sent;

          case 6:
            if (!(lastName !== undefined)) {
              _context30.next = 10;
              break;
            }

            _context30.next = 9;
            return _Staff["default"].findOneAndUpdate(query, {
              lastName: lastName
            });

          case 9:
            staff = _context30.sent;

          case 10:
            if (!(gender !== undefined)) {
              _context30.next = 14;
              break;
            }

            _context30.next = 13;
            return _Staff["default"].findOneAndUpdate(query, {
              gender: gender
            });

          case 13:
            staff = _context30.sent;

          case 14:
            if (!(dob !== undefined)) {
              _context30.next = 18;
              break;
            }

            _context30.next = 17;
            return _Staff["default"].findOneAndUpdate(query, {
              dob: dob
            });

          case 17:
            staff = _context30.sent;

          case 18:
            if (!(streetAddress !== undefined)) {
              _context30.next = 22;
              break;
            }

            _context30.next = 21;
            return _Staff["default"].findOneAndUpdate(query, {
              streetAddress: streetAddress
            });

          case 21:
            staff = _context30.sent;

          case 22:
            if (!(city !== undefined)) {
              _context30.next = 26;
              break;
            }

            _context30.next = 25;
            return _Staff["default"].findOneAndUpdate(query, {
              city: city
            });

          case 25:
            staff = _context30.sent;

          case 26:
            if (!(zipCode !== undefined)) {
              _context30.next = 30;
              break;
            }

            _context30.next = 29;
            return _Staff["default"].findOneAndUpdate(query, {
              zipCode: zipCode
            });

          case 29:
            staff = _context30.sent;

          case 30:
            if (!(telephoneNumber !== undefined)) {
              _context30.next = 34;
              break;
            }

            _context30.next = 33;
            return _Staff["default"].findOneAndUpdate(query, {
              telephoneNumber: telephoneNumber
            });

          case 33:
            staff = _context30.sent;

          case 34:
            if (!(emailAddress !== undefined)) {
              _context30.next = 38;
              break;
            }

            _context30.next = 37;
            return _Staff["default"].findOneAndUpdate(query, {
              emailAddress: emailAddress
            });

          case 37:
            staff = _context30.sent;

          case 38:
            return _context30.abrupt("return", staff);

          case 39:
          case "end":
            return _context30.stop();
        }
      }
    }, _callee30);
  }));
  return _updateStaffPersoInfo.apply(this, arguments);
}

function updateStaffProfilePic(_x61, _x62) {
  return _updateStaffProfilePic.apply(this, arguments);
}

function _updateStaffProfilePic() {
  _updateStaffProfilePic = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee31(parent, args) {
    var _id, photoID, profilePic, _yield$profilePic3, createReadStream, result, profilePicLink, staff, query;

    return regeneratorRuntime.wrap(function _callee31$(_context31) {
      while (1) {
        switch (_context31.prev = _context31.next) {
          case 0:
            _id = args._id, photoID = args.photoID;
            profilePic = args.profilePic;
            _context31.next = 4;
            return profilePic;

          case 4:
            _yield$profilePic3 = _context31.sent;
            createReadStream = _yield$profilePic3.createReadStream;
            _context31.prev = 6;
            _context31.next = 9;
            return new Promise(function (resolve, reject) {
              createReadStream().pipe(cloudinary.uploader.upload_stream({
                folder: 'staff_profile_pic/',
                public_id: photoID
              }, function (error, result) {
                if (error) {
                  reject(error);
                }

                resolve(result);
              }));
            });

          case 9:
            result = _context31.sent;
            profilePicLink = cloudinary.url(result.public_id, {
              version: result.version,
              gravity: 'face',
              height: 200,
              width: 150,
              crop: 'fill'
            });
            _context31.next = 16;
            break;

          case 13:
            _context31.prev = 13;
            _context31.t0 = _context31["catch"](6);
            console.log(_context31.t0);

          case 16:
            query = {
              _id: _id
            };

            if (!(profilePic !== undefined)) {
              _context31.next = 21;
              break;
            }

            _context31.next = 20;
            return _Staff["default"].findOneAndUpdate(query, {
              profilePic: profilePicLink
            });

          case 20:
            staff = _context31.sent;

          case 21:
            return _context31.abrupt("return", staff);

          case 22:
          case "end":
            return _context31.stop();
        }
      }
    }, _callee31, null, [[6, 13]]);
  }));
  return _updateStaffProfilePic.apply(this, arguments);
}

function updateUserPassword(_x63, _x64) {
  return _updateUserPassword.apply(this, arguments);
}
/**************** DELETES ****************/


function _updateUserPassword() {
  _updateUserPassword = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee32(parent, args) {
    var username, oldPassword, newPassword, user, oldPasswordValid, newHashedPassword, usernewPassword;
    return regeneratorRuntime.wrap(function _callee32$(_context32) {
      while (1) {
        switch (_context32.prev = _context32.next) {
          case 0:
            username = args.username, oldPassword = args.oldPassword, newPassword = args.newPassword;
            _context32.prev = 1;
            _context32.next = 4;
            return _User["default"].findOne({
              username: username
            });

          case 4:
            user = _context32.sent;
            _context32.next = 7;
            return _bcryptjs["default"].compareSync(oldPassword, user.password);

          case 7:
            oldPasswordValid = _context32.sent;

            if (oldPasswordValid) {
              _context32.next = 10;
              break;
            }

            throw new Error('Old password incorrect.');

          case 10:
            _context32.next = 12;
            return _bcryptjs["default"].hash(newPassword, 10);

          case 12:
            newHashedPassword = _context32.sent;
            _context32.next = 15;
            return _User["default"].findOneAndUpdate({
              username: username
            }, {
              password: newHashedPassword,
              defaultPassword: null
            });

          case 15:
            usernewPassword = _context32.sent;
            return _context32.abrupt("return", usernewPassword);

          case 19:
            _context32.prev = 19;
            _context32.t0 = _context32["catch"](1);
            throw new Error(_context32.t0);

          case 22:
          case "end":
            return _context32.stop();
        }
      }
    }, _callee32, null, [[1, 19]]);
  }));
  return _updateUserPassword.apply(this, arguments);
}

function deleteSchoolTerm(_x65, _x66) {
  return _deleteSchoolTerm.apply(this, arguments);
}

function _deleteSchoolTerm() {
  _deleteSchoolTerm = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee33(parent, args) {
    var _id, query, toDeleteSchoolTerm;

    return regeneratorRuntime.wrap(function _callee33$(_context33) {
      while (1) {
        switch (_context33.prev = _context33.next) {
          case 0:
            _id = args._id;
            query = {
              _id: _id
            };
            _context33.next = 4;
            return _SchoolTerm["default"].findOneAndRemove(query);

          case 4:
            toDeleteSchoolTerm = _context33.sent;
            return _context33.abrupt("return", toDeleteSchoolTerm);

          case 6:
          case "end":
            return _context33.stop();
        }
      }
    }, _callee33);
  }));
  return _deleteSchoolTerm.apply(this, arguments);
}

function deleteClassHour(_x67, _x68) {
  return _deleteClassHour.apply(this, arguments);
}

function _deleteClassHour() {
  _deleteClassHour = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee34(parent, args) {
    var _id, query, toDeleteClassHour;

    return regeneratorRuntime.wrap(function _callee34$(_context34) {
      while (1) {
        switch (_context34.prev = _context34.next) {
          case 0:
            _id = args._id;
            query = {
              _id: _id
            };
            _context34.next = 4;
            return _ClassHour["default"].findOneAndRemove(query);

          case 4:
            toDeleteClassHour = _context34.sent;
            return _context34.abrupt("return", toDeleteClassHour);

          case 6:
          case "end":
            return _context34.stop();
        }
      }
    }, _callee34);
  }));
  return _deleteClassHour.apply(this, arguments);
}

function deleteGradeClass(_x69, _x70) {
  return _deleteGradeClass.apply(this, arguments);
}

function _deleteGradeClass() {
  _deleteGradeClass = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee35(parent, args) {
    var _id, query, toDeleteClass;

    return regeneratorRuntime.wrap(function _callee35$(_context35) {
      while (1) {
        switch (_context35.prev = _context35.next) {
          case 0:
            _id = args._id;
            query = {
              _id: _id
            };
            _context35.next = 4;
            return _GradeClass["default"].findOneAndRemove(query);

          case 4:
            toDeleteClass = _context35.sent;
            return _context35.abrupt("return", toDeleteClass);

          case 6:
          case "end":
            return _context35.stop();
        }
      }
    }, _callee35);
  }));
  return _deleteGradeClass.apply(this, arguments);
}

function deleteAssessment(_x71, _x72) {
  return _deleteAssessment.apply(this, arguments);
}

function _deleteAssessment() {
  _deleteAssessment = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee36(parent, args) {
    var _id, query, toDeleteAssessment;

    return regeneratorRuntime.wrap(function _callee36$(_context36) {
      while (1) {
        switch (_context36.prev = _context36.next) {
          case 0:
            _id = args._id;
            query = {
              _id: _id
            };
            _context36.next = 4;
            return _Assessment["default"].findOneAndRemove(query);

          case 4:
            toDeleteAssessment = _context36.sent;
            return _context36.abrupt("return", toDeleteAssessment);

          case 6:
          case "end":
            return _context36.stop();
        }
      }
    }, _callee36);
  }));
  return _deleteAssessment.apply(this, arguments);
}

function deleteExam(_x73, _x74) {
  return _deleteExam.apply(this, arguments);
}

function _deleteExam() {
  _deleteExam = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee37(parent, args) {
    var _id, query, toDeleteExam;

    return regeneratorRuntime.wrap(function _callee37$(_context37) {
      while (1) {
        switch (_context37.prev = _context37.next) {
          case 0:
            _id = args._id;
            query = {
              _id: _id
            };
            _context37.next = 4;
            return _Exam["default"].findOneAndRemove(query);

          case 4:
            toDeleteExam = _context37.sent;
            return _context37.abrupt("return", toDeleteExam);

          case 6:
          case "end":
            return _context37.stop();
        }
      }
    }, _callee37);
  }));
  return _deleteExam.apply(this, arguments);
}

function deleteSubject(_x75, _x76) {
  return _deleteSubject.apply(this, arguments);
}

function _deleteSubject() {
  _deleteSubject = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee38(parent, args) {
    var _id, query, deleteSubject;

    return regeneratorRuntime.wrap(function _callee38$(_context38) {
      while (1) {
        switch (_context38.prev = _context38.next) {
          case 0:
            _id = args._id;
            query = {
              _id: _id
            };
            _context38.next = 4;
            return _Subject["default"].findOneAndRemove(query);

          case 4:
            deleteSubject = _context38.sent;
            return _context38.abrupt("return", deleteSubject);

          case 6:
          case "end":
            return _context38.stop();
        }
      }
    }, _callee38);
  }));
  return _deleteSubject.apply(this, arguments);
}

function deleteStaff(_x77, _x78) {
  return _deleteStaff.apply(this, arguments);
}

function _deleteStaff() {
  _deleteStaff = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee39(parent, args) {
    var username, query, deleteStaff, deleteUser;
    return regeneratorRuntime.wrap(function _callee39$(_context39) {
      while (1) {
        switch (_context39.prev = _context39.next) {
          case 0:
            username = args.username;
            query = {
              username: username
            };
            _context39.next = 4;
            return _Staff["default"].findOneAndRemove(query);

          case 4:
            deleteStaff = _context39.sent;
            _context39.next = 7;
            return _User["default"].findOneAndRemove(query);

          case 7:
            deleteUser = _context39.sent;
            return _context39.abrupt("return", 'Staff deleted successfully');

          case 9:
          case "end":
            return _context39.stop();
        }
      }
    }, _callee39);
  }));
  return _deleteStaff.apply(this, arguments);
}