"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _graphql = require("graphql");

var _graphqlTypeJson = _interopRequireDefault(require("graphql-type-json"));

var _Mutations = require("./Mutations");

var _Queries = require("./Queries");

var _User = _interopRequireDefault(require("../../model/User"));

var _Staff = _interopRequireDefault(require("../../model/Staff"));

var _Student = _interopRequireDefault(require("../../model/Student"));

var _Guardian = _interopRequireDefault(require("../../model/Guardian"));

var _Teacher = _interopRequireDefault(require("../../model/Teacher"));

var _School = _interopRequireDefault(require("../../model/School"));

var _SchoolTerm = _interopRequireDefault(require("../../model/SchoolTerm"));

var _ClassHour = _interopRequireDefault(require("../../model/ClassHour"));

var _GradeClass = _interopRequireDefault(require("../../model/GradeClass"));

var _Subject = _interopRequireDefault(require("../../model/Subject"));

var _StudentAttendance = _interopRequireDefault(require("../../model/StudentAttendance"));

var _Assessment = _interopRequireDefault(require("../../model/Assessment"));

var _Exam = _interopRequireDefault(require("../../model/Exam"));

var _AssessmentMark = _interopRequireDefault(require("../../model/AssessmentMark"));

var _ExamMark = _interopRequireDefault(require("../../model/ExamMark"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var resolvers = {
  Query: {
    schoolInfo: function () {
      var _schoolInfo = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var school;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _School["default"].findOne();

              case 2:
                school = _context.sent;
                return _context.abrupt("return", school);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function schoolInfo() {
        return _schoolInfo.apply(this, arguments);
      }

      return schoolInfo;
    }(),
    allUsers: function () {
      var _allUsers = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var users;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _User["default"].find();

              case 2:
                users = _context2.sent;
                return _context2.abrupt("return", users);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function allUsers() {
        return _allUsers.apply(this, arguments);
      }

      return allUsers;
    }(),
    allStaffs: function () {
      var _allStaffs = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var staffs;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _Staff["default"].find();

              case 2:
                staffs = _context3.sent;
                return _context3.abrupt("return", staffs);

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function allStaffs() {
        return _allStaffs.apply(this, arguments);
      }

      return allStaffs;
    }(),
    allStudents: function () {
      var _allStudents = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var students;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _Student["default"].find();

              case 2:
                students = _context4.sent;
                return _context4.abrupt("return", students);

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function allStudents() {
        return _allStudents.apply(this, arguments);
      }

      return allStudents;
    }(),
    allGuardianDetails: function () {
      var _allGuardianDetails = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var guardians;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return _Guardian["default"].find();

              case 2:
                guardians = _context5.sent;
                return _context5.abrupt("return", guardians);

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function allGuardianDetails() {
        return _allGuardianDetails.apply(this, arguments);
      }

      return allGuardianDetails;
    }(),
    allTeachers: function () {
      var _allTeachers = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var teachers;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return _Teacher["default"].find();

              case 2:
                teachers = _context6.sent;
                return _context6.abrupt("return", teachers);

              case 4:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function allTeachers() {
        return _allTeachers.apply(this, arguments);
      }

      return allTeachers;
    }(),
    allSchoolTerms: function () {
      var _allSchoolTerms = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        var schoolTerms;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return _SchoolTerm["default"].find();

              case 2:
                schoolTerms = _context7.sent;
                return _context7.abrupt("return", schoolTerms);

              case 4:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function allSchoolTerms() {
        return _allSchoolTerms.apply(this, arguments);
      }

      return allSchoolTerms;
    }(),
    allClassHours: function () {
      var _allClassHours = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        var classHours;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return _ClassHour["default"].find();

              case 2:
                classHours = _context8.sent;
                return _context8.abrupt("return", classHours);

              case 4:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      function allClassHours() {
        return _allClassHours.apply(this, arguments);
      }

      return allClassHours;
    }(),
    allClasses: function () {
      var _allClasses = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
        var classes;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return _GradeClass["default"].find();

              case 2:
                classes = _context9.sent;
                return _context9.abrupt("return", classes);

              case 4:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }));

      function allClasses() {
        return _allClasses.apply(this, arguments);
      }

      return allClasses;
    }(),
    allSubjects: function () {
      var _allSubjects = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
        var subjects;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return _Subject["default"].find();

              case 2:
                subjects = _context10.sent;
                return _context10.abrupt("return", subjects);

              case 4:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10);
      }));

      function allSubjects() {
        return _allSubjects.apply(this, arguments);
      }

      return allSubjects;
    }(),
    allAssessments: function () {
      var _allAssessments = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
        var assessments;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.next = 2;
                return _Assessment["default"].find();

              case 2:
                assessments = _context11.sent;
                return _context11.abrupt("return", assessments);

              case 4:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11);
      }));

      function allAssessments() {
        return _allAssessments.apply(this, arguments);
      }

      return allAssessments;
    }(),
    allExams: function () {
      var _allExams = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
        var exams;
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.next = 2;
                return _Exam["default"].find();

              case 2:
                exams = _context12.sent;
                return _context12.abrupt("return", exams);

              case 4:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12);
      }));

      function allExams() {
        return _allExams.apply(this, arguments);
      }

      return allExams;
    }(),
    allAssessmentsMarks: function () {
      var _allAssessmentsMarks = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
        var assessmentsMarks;
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.next = 2;
                return _AssessmentMark["default"].find();

              case 2:
                assessmentsMarks = _context13.sent;
                return _context13.abrupt("return", assessmentsMarks);

              case 4:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13);
      }));

      function allAssessmentsMarks() {
        return _allAssessmentsMarks.apply(this, arguments);
      }

      return allAssessmentsMarks;
    }(),
    allExamsMarks: function () {
      var _allExamsMarks = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
        var examsMarks;
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                _context14.next = 2;
                return _ExamMark["default"].find();

              case 2:
                examsMarks = _context14.sent;
                return _context14.abrupt("return", examsMarks);

              case 4:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14);
      }));

      function allExamsMarks() {
        return _allExamsMarks.apply(this, arguments);
      }

      return allExamsMarks;
    }(),
    attendanceInfo: function () {
      var _attendanceInfo = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15() {
        var studentAttendances;
        return regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                _context15.next = 2;
                return _StudentAttendance["default"].find();

              case 2:
                studentAttendances = _context15.sent;
                return _context15.abrupt("return", studentAttendances);

              case 4:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15);
      }));

      function attendanceInfo() {
        return _attendanceInfo.apply(this, arguments);
      }

      return attendanceInfo;
    }(),
    login: _Queries.login,
    teacherFromId: _Queries.teacherFromId,
    studentFromId: _Queries.studentFromId,
    staffFromId: _Queries.staffFromId,
    classFromId: _Queries.classFromId,
    assessmentFromId: _Queries.assessmentFromId,
    examFromId: _Queries.examFromId,
    markingsFromAssessmentID: _Queries.markingsFromAssessmentID,
    markingsFromExamID: _Queries.markingsFromExamID,
    studentFromClassID: _Queries.studentFromClassID,
    timetableFromClassID: _Queries.timetableFromClassID,
    findStaffFromUsername: function () {
      var _findStaffFromUsername = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(parent, args) {
        var username, staff;
        return regeneratorRuntime.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                username = args.username;
                _context16.next = 3;
                return _Staff["default"].findOne({
                  username: username
                });

              case 3:
                staff = _context16.sent;
                return _context16.abrupt("return", staff);

              case 5:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16);
      }));

      function findStaffFromUsername(_x, _x2) {
        return _findStaffFromUsername.apply(this, arguments);
      }

      return findStaffFromUsername;
    }(),
    totalStudents: _Queries.totalStudents,
    totalTeachers: _Queries.totalTeachers,
    studentGuardianDetails: _Queries.studentGuardianDetails,
    studentAttendanceFromDate: _Queries.studentAttendanceFromDate,
    studentAttendance5days: _Queries.studentAttendance5days,
    teacherAttendanceFromDate: _Queries.teacherAttendanceFromDate,
    teacherAttendance5days: _Queries.teacherAttendance5days,
    totalStudentAttendanceRecordedOnDate: _Queries.totalStudentAttendanceRecordedOnDate,
    totalStudentPresentOnDate: _Queries.totalStudentPresentOnDate,
    totalTeacherAttendanceRecordedOnDate: _Queries.totalTeacherAttendanceRecordedOnDate,
    totalTeacherPresentOnDate: _Queries.totalTeacherPresentOnDate,
    getSubjectFromID: _Queries.getSubjectFromID
  },
  Mutation: {
    createSchool: _Mutations.createSchool,
    createUser: _Mutations.createUser,
    createStaff: _Mutations.createStaff,
    // createStudent,
    createGuardian: _Mutations.createGuardian,
    createTeacher: _Mutations.createTeacher,
    createSchoolTerm: _Mutations.createSchoolTerm,
    createClassHour: _Mutations.createClassHour,
    createGradeClass: _Mutations.createGradeClass,
    createSubject: _Mutations.createSubject,
    updateSchoolInfo: _Mutations.updateSchoolInfo,
    updateSchoolLogo: _Mutations.updateSchoolLogo,
    updateTeacherPersoInfo: _Mutations.updateTeacherPersoInfo,
    updateTeacherProfilePic: _Mutations.updateTeacherProfilePic,
    updateStudentPersoInfo: _Mutations.updateStudentPersoInfo,
    updateStudentProfilePic: _Mutations.updateStudentProfilePic,
    updateStudentGuardianInfo: _Mutations.updateStudentGuardianInfo,
    updateStudentClassInfo: _Mutations.updateStudentClassInfo,
    updateAssessment: _Mutations.updateAssessment,
    updateExam: _Mutations.updateExam,
    updateClass: _Mutations.updateClass,
    updateSubject: _Mutations.updateSubject,
    updateStaffPersoInfo: _Mutations.updateStaffPersoInfo,
    updateStaffProfilePic: _Mutations.updateStaffProfilePic,
    updateUserPassword: _Mutations.updateUserPassword,
    registerStudent: _Mutations.registerStudent,
    registerStudentAttendance: _Mutations.registerStudentAttendance,
    registerTeacherAttendance: _Mutations.registerTeacherAttendance,
    registerAssessment: _Mutations.registerAssessment,
    registerExam: _Mutations.registerExam,
    registerAssessmentMark: _Mutations.registerAssessmentMark,
    registerExamMark: _Mutations.registerExamMark,
    registerTimetable: _Mutations.registerTimetable,
    deleteSchoolTerm: _Mutations.deleteSchoolTerm,
    deleteClassHour: _Mutations.deleteClassHour,
    deleteGradeClass: _Mutations.deleteGradeClass,
    deleteAssessment: _Mutations.deleteAssessment,
    deleteExam: _Mutations.deleteExam,
    deleteSubject: _Mutations.deleteSubject,
    deleteStaff: _Mutations.deleteStaff
  },
  Staff: {
    systemLogin: function () {
      var _systemLogin = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17(parent, args) {
        var username, user;
        return regeneratorRuntime.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                username = parent.username;
                _context17.next = 3;
                return _User["default"].findOne({
                  username: username
                });

              case 3:
                user = _context17.sent;
                return _context17.abrupt("return", user);

              case 5:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17);
      }));

      function systemLogin(_x3, _x4) {
        return _systemLogin.apply(this, arguments);
      }

      return systemLogin;
    }()
  },
  Student: {
    guardianDetails: function () {
      var _guardianDetails = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18(parent, args) {
        var studentID, guardians;
        return regeneratorRuntime.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                studentID = parent.studentID;
                _context18.next = 3;
                return _Guardian["default"].find({
                  studentID: studentID
                });

              case 3:
                guardians = _context18.sent;
                return _context18.abrupt("return", guardians);

              case 5:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18);
      }));

      function guardianDetails(_x5, _x6) {
        return _guardianDetails.apply(this, arguments);
      }

      return guardianDetails;
    }(),
    classDetails: function () {
      var _classDetails = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19(parent, args) {
        var classID, gradeClass;
        return regeneratorRuntime.wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                classID = parent.classID;
                _context19.next = 3;
                return _GradeClass["default"].findOne({
                  classID: classID
                });

              case 3:
                gradeClass = _context19.sent;
                return _context19.abrupt("return", gradeClass);

              case 5:
              case "end":
                return _context19.stop();
            }
          }
        }, _callee19);
      }));

      function classDetails(_x7, _x8) {
        return _classDetails.apply(this, arguments);
      }

      return classDetails;
    }()
  },
  Teacher: {
    subjectTaught: function () {
      var _subjectTaught = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee20(parent, args) {
        var teacherID, regex, allSubjects, selectedSubjects;
        return regeneratorRuntime.wrap(function _callee20$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                teacherID = parent.teacherID;
                regex = new RegExp("\\b".concat(teacherID, "\\b"));
                _context20.next = 4;
                return _Subject["default"].find({});

              case 4:
                allSubjects = _context20.sent;
                selectedSubjects = allSubjects.filter(function (subject) {
                  var finder = regex.exec(subject.teacherID);

                  if (finder !== null) {
                    return finder[0] === teacherID;
                  }
                });
                return _context20.abrupt("return", selectedSubjects);

              case 7:
              case "end":
                return _context20.stop();
            }
          }
        }, _callee20);
      }));

      function subjectTaught(_x9, _x10) {
        return _subjectTaught.apply(this, arguments);
      }

      return subjectTaught;
    }(),
    classAssigned: function () {
      var _classAssigned = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee21(parent, args) {
        var teacherID, classes;
        return regeneratorRuntime.wrap(function _callee21$(_context21) {
          while (1) {
            switch (_context21.prev = _context21.next) {
              case 0:
                teacherID = parent.teacherID;
                _context21.next = 3;
                return _GradeClass["default"].find({
                  teacherID: teacherID
                });

              case 3:
                classes = _context21.sent;
                return _context21.abrupt("return", classes);

              case 5:
              case "end":
                return _context21.stop();
            }
          }
        }, _callee21);
      }));

      function classAssigned(_x11, _x12) {
        return _classAssigned.apply(this, arguments);
      }

      return classAssigned;
    }()
  },
  GradeClass: {
    formTeacher: function () {
      var _formTeacher = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee22(parent, args) {
        var teacherID, teacher;
        return regeneratorRuntime.wrap(function _callee22$(_context22) {
          while (1) {
            switch (_context22.prev = _context22.next) {
              case 0:
                teacherID = parent.teacherID;
                _context22.next = 3;
                return _Teacher["default"].findOne({
                  teacherID: teacherID
                });

              case 3:
                teacher = _context22.sent;
                return _context22.abrupt("return", teacher);

              case 5:
              case "end":
                return _context22.stop();
            }
          }
        }, _callee22);
      }));

      function formTeacher(_x13, _x14) {
        return _formTeacher.apply(this, arguments);
      }

      return formTeacher;
    }()
  },
  // Subject: {
  // 	teachedBy: async (parent, args) => {
  // 		const { teacherID } = parent;
  // 		let teachers = [];
  // 		const teacherIdArr = teacherID.split(',');
  // 		for (let i = 0; i < teacherIdArr.length; i++) {
  // 			const teacher = await Teacher.findOne({ teacherID: teacherIdArr[i] });
  // 			teachers.push(teacher);
  // 		}
  // 		// console.log(teachers);
  // 		return teachers;
  // 	},
  // },
  DateTime: new _graphql.GraphQLScalarType({
    name: 'DateTime',
    description: 'A valid date time value',
    parseValue: function parseValue(value) {
      return new Date(value);
    },
    serialize: function serialize(value) {
      return new Date(value).toISOString();
    },
    parseLiteral: function parseLiteral(ast) {
      return ast.value;
    }
  }),
  JSON: _graphqlTypeJson["default"] // ObjectType: new GraphQLScalarType({
  // 	name: 'ObjectType',
  // 	description: 'A valid object type',
  // 	parseValue: value => new Date(value),
  // 	serialize: value => new Date(value).toISOString(),
  // 	parseLiteral: ast => ast.value,
  // }),

};
var _default = resolvers;
exports["default"] = _default;