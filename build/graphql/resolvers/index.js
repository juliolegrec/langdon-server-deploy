"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var resolvers = {
  Query: {
    schoolInfo: function () {
      var _schoolInfo = _asyncToGenerator(function* () {
        var school = yield _School.default.findOne();
        return school;
      });

      function schoolInfo() {
        return _schoolInfo.apply(this, arguments);
      }

      return schoolInfo;
    }(),
    allUsers: function () {
      var _allUsers = _asyncToGenerator(function* () {
        var users = yield _User.default.find();
        return users;
      });

      function allUsers() {
        return _allUsers.apply(this, arguments);
      }

      return allUsers;
    }(),
    allStaffs: function () {
      var _allStaffs = _asyncToGenerator(function* () {
        var staffs = yield _Staff.default.find();
        return staffs;
      });

      function allStaffs() {
        return _allStaffs.apply(this, arguments);
      }

      return allStaffs;
    }(),
    allStudents: function () {
      var _allStudents = _asyncToGenerator(function* () {
        var students = yield _Student.default.find();
        return students;
      });

      function allStudents() {
        return _allStudents.apply(this, arguments);
      }

      return allStudents;
    }(),
    allGuardianDetails: function () {
      var _allGuardianDetails = _asyncToGenerator(function* () {
        var guardians = yield _Guardian.default.find();
        return guardians;
      });

      function allGuardianDetails() {
        return _allGuardianDetails.apply(this, arguments);
      }

      return allGuardianDetails;
    }(),
    allTeachers: function () {
      var _allTeachers = _asyncToGenerator(function* () {
        var teachers = yield _Teacher.default.find();
        return teachers;
      });

      function allTeachers() {
        return _allTeachers.apply(this, arguments);
      }

      return allTeachers;
    }(),
    allSchoolTerms: function () {
      var _allSchoolTerms = _asyncToGenerator(function* () {
        var schoolTerms = yield _SchoolTerm.default.find();
        return schoolTerms;
      });

      function allSchoolTerms() {
        return _allSchoolTerms.apply(this, arguments);
      }

      return allSchoolTerms;
    }(),
    allClassHours: function () {
      var _allClassHours = _asyncToGenerator(function* () {
        var classHours = yield _ClassHour.default.find();
        return classHours;
      });

      function allClassHours() {
        return _allClassHours.apply(this, arguments);
      }

      return allClassHours;
    }(),
    allClasses: function () {
      var _allClasses = _asyncToGenerator(function* () {
        var classes = yield _GradeClass.default.find();
        return classes;
      });

      function allClasses() {
        return _allClasses.apply(this, arguments);
      }

      return allClasses;
    }(),
    allSubjects: function () {
      var _allSubjects = _asyncToGenerator(function* () {
        var subjects = yield _Subject.default.find();
        return subjects;
      });

      function allSubjects() {
        return _allSubjects.apply(this, arguments);
      }

      return allSubjects;
    }(),
    allAssessments: function () {
      var _allAssessments = _asyncToGenerator(function* () {
        var assessments = yield _Assessment.default.find();
        return assessments;
      });

      function allAssessments() {
        return _allAssessments.apply(this, arguments);
      }

      return allAssessments;
    }(),
    allExams: function () {
      var _allExams = _asyncToGenerator(function* () {
        var exams = yield _Exam.default.find();
        return exams;
      });

      function allExams() {
        return _allExams.apply(this, arguments);
      }

      return allExams;
    }(),
    allAssessmentsMarks: function () {
      var _allAssessmentsMarks = _asyncToGenerator(function* () {
        var assessmentsMarks = yield _AssessmentMark.default.find();
        return assessmentsMarks;
      });

      function allAssessmentsMarks() {
        return _allAssessmentsMarks.apply(this, arguments);
      }

      return allAssessmentsMarks;
    }(),
    allExamsMarks: function () {
      var _allExamsMarks = _asyncToGenerator(function* () {
        var examsMarks = yield _ExamMark.default.find();
        return examsMarks;
      });

      function allExamsMarks() {
        return _allExamsMarks.apply(this, arguments);
      }

      return allExamsMarks;
    }(),
    attendanceInfo: function () {
      var _attendanceInfo = _asyncToGenerator(function* () {
        var studentAttendances = yield _StudentAttendance.default.find();
        return studentAttendances;
      });

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
      var _findStaffFromUsername = _asyncToGenerator(function* (parent, args) {
        var {
          username
        } = args;
        var staff = yield _Staff.default.findOne({
          username
        });
        return staff;
      });

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
      var _systemLogin = _asyncToGenerator(function* (parent, args) {
        var {
          username
        } = parent;
        var user = yield _User.default.findOne({
          username
        });
        return user;
      });

      function systemLogin(_x3, _x4) {
        return _systemLogin.apply(this, arguments);
      }

      return systemLogin;
    }()
  },
  Student: {
    guardianDetails: function () {
      var _guardianDetails = _asyncToGenerator(function* (parent, args) {
        var {
          studentID
        } = parent;
        var guardians = yield _Guardian.default.find({
          studentID
        });
        return guardians;
      });

      function guardianDetails(_x5, _x6) {
        return _guardianDetails.apply(this, arguments);
      }

      return guardianDetails;
    }(),
    classDetails: function () {
      var _classDetails = _asyncToGenerator(function* (parent, args) {
        var {
          classID
        } = parent;
        var gradeClass = yield _GradeClass.default.findOne({
          classID
        });
        return gradeClass;
      });

      function classDetails(_x7, _x8) {
        return _classDetails.apply(this, arguments);
      }

      return classDetails;
    }()
  },
  Teacher: {
    subjectTaught: function () {
      var _subjectTaught = _asyncToGenerator(function* (parent, args) {
        var {
          teacherID
        } = parent;
        var regex = new RegExp("\\b".concat(teacherID, "\\b"));
        var allSubjects = yield _Subject.default.find({});
        var selectedSubjects = allSubjects.filter(subject => {
          var finder = regex.exec(subject.teacherID);

          if (finder !== null) {
            return finder[0] === teacherID;
          }
        });
        return selectedSubjects;
      });

      function subjectTaught(_x9, _x10) {
        return _subjectTaught.apply(this, arguments);
      }

      return subjectTaught;
    }(),
    classAssigned: function () {
      var _classAssigned = _asyncToGenerator(function* (parent, args) {
        var {
          teacherID
        } = parent;
        var classes = yield _GradeClass.default.find({
          teacherID: teacherID
        });
        return classes;
      });

      function classAssigned(_x11, _x12) {
        return _classAssigned.apply(this, arguments);
      }

      return classAssigned;
    }()
  },
  GradeClass: {
    formTeacher: function () {
      var _formTeacher = _asyncToGenerator(function* (parent, args) {
        var {
          teacherID
        } = parent;
        var teacher = yield _Teacher.default.findOne({
          teacherID
        });
        return teacher;
      });

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
    parseValue: value => new Date(value),
    serialize: value => new Date(value).toISOString(),
    parseLiteral: ast => ast.value
  }),
  JSON: _graphqlTypeJson.default // ObjectType: new GraphQLScalarType({
  // 	name: 'ObjectType',
  // 	description: 'A valid object type',
  // 	parseValue: value => new Date(value),
  // 	serialize: value => new Date(value).toISOString(),
  // 	parseLiteral: ast => ast.value,
  // }),

};
var _default = resolvers;
exports.default = _default;