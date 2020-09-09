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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  _createSchool = _asyncToGenerator(function* (parent, args) {
    try {
      var {
        logo,
        name,
        streetAddress,
        telephoneNumber,
        emailAddress,
        website,
        markingSystem
      } = args.schoolInput;
      var existingSchool = yield _School.default.find();

      if (existingSchool) {
        throw new Error("School info already exist. Can't create newone.");
      }

      var school = new _School.default({
        logo,
        name,
        streetAddress,
        telephoneNumber,
        emailAddress,
        website,
        markingSystem
      }, err => {
        if (err) throw err;
      });
      school.save();
      return _objectSpread({}, school._doc);
    } catch (error) {
      throw error;
    }
  });
  return _createSchool.apply(this, arguments);
}

function createUser(_x3, _x4) {
  return _createUser.apply(this, arguments);
}

function _createUser() {
  _createUser = _asyncToGenerator(function* (parent, args) {
    try {
      var {
        username,
        password,
        role
      } = args.userInput;
      var existingUser = yield _User.default.findOne({
        username
      });

      if (existingUser) {
        throw new Error('Username already used. Choose another one.');
      }

      var hashedPassword = yield _bcryptjs.default.hash(password, 10);
      var user = new _User.default({
        username,
        password: hashedPassword,
        role
      }, err => {
        if (err) throw err;
      });
      user.save();
      return _objectSpread({
        password: null
      }, user._doc);
    } catch (error) {
      throw error;
    }
  });
  return _createUser.apply(this, arguments);
}

function createStaff(_x5, _x6) {
  return _createStaff.apply(this, arguments);
}

function _createStaff() {
  _createStaff = _asyncToGenerator(function* (parent, args) {
    try {
      var {
        firstName,
        lastName,
        gender,
        dob,
        streetAddress,
        city,
        zipCode,
        telephoneNumber,
        emailAddress
      } = args.staffInput;
      var {
        profilePic
      } = args.staffInput;
      /********* GENERATING STAFFID *********/

      var currentYear = new Date().getFullYear();
      var currentMonth = "".concat(new Date().getMonth() + 1);

      if (currentMonth < 10) {
        currentMonth = "0".concat(currentMonth);
      }

      var regexp = new RegExp('^' + "STA".concat(currentYear).concat(currentMonth));
      var staffCount = yield _Staff.default.countDocuments({
        staffID: regexp
      }).exec();
      var staffID = "STA".concat(currentYear).concat((0, _helpers.addLeadingZeros)(currentMonth, 2)).concat((0, _helpers.addLeadingZeros)(staffCount + 1, 3));
      /********* END GENERATING STAFFID *********/

      var username = usernameCreator(firstName, lastName);
      var existingUserName = yield _User.default.findOne({
        username
      });

      if (profilePic) {
        var _profilePicLink = yield (0, _helpers.pictureUpload)(profilePic, staffID, 'staff');
      }

      if (!existingUserName) {
        var staff = new _Staff.default({
          staffID,
          firstName,
          lastName,
          gender,
          dob,
          username,
          streetAddress,
          city,
          zipCode,
          telephoneNumber,
          emailAddress,
          profilePic: profilePic ? profilePicLink : null
        });

        var defaultPassword = _generatePassword.default.generate({
          length: 6,
          numbers: true
        });

        var hashedPassword = yield _bcryptjs.default.hash(defaultPassword, 10);
        var user = new _User.default({
          username,
          defaultPassword,
          password: hashedPassword,
          role: 'STAFF'
        });
        staff.save();
        user.save();
        return _objectSpread(_objectSpread({
          password: null
        }, staff._doc), user._doc);
      }
    } catch (error) {
      throw error;
    }
  });
  return _createStaff.apply(this, arguments);
}

function createGuardian(_x7, _x8) {
  return _createGuardian.apply(this, arguments);
}

function _createGuardian() {
  _createGuardian = _asyncToGenerator(function* (parent, args) {
    try {
      var {
        firstName,
        lastName,
        relationship,
        mobilePhone,
        workPhone,
        emailAddress,
        studentID
      } = args.guardianInput;
      var existingGuardian = yield _Guardian.default.find({
        studentID: studentID
      });

      if (Object.keys(existingGuardian).length >= 2) {
        throw new Error('This student already has 2 guardian details.');
      }

      var guardian = new _Guardian.default({
        firstName,
        lastName,
        relationship,
        mobilePhone,
        workPhone,
        emailAddress,
        studentID
      });
      guardian.save();
      return _objectSpread({}, guardian._doc);
    } catch (error) {
      throw error;
    }
  });
  return _createGuardian.apply(this, arguments);
}

function createTeacher(_x9, _x10) {
  return _createTeacher.apply(this, arguments);
}

function _createTeacher() {
  _createTeacher = _asyncToGenerator(function* (parent, args) {
    try {
      var {
        firstName,
        lastName,
        gender,
        dob,
        streetAddress,
        city,
        zipCode,
        telephoneNumber,
        emailAddress,
        enrollmentDate
      } = args.teacherInput;
      var {
        profilePic
      } = yield args.teacherInput; // const { createReadStream } = await profilePic;

      /********* GENERATING TEACHERID *********/

      var currentYear = new Date().getFullYear();
      var currentMonth = "".concat(new Date().getMonth() + 1);

      if (currentMonth < 10) {
        currentMonth = "0".concat(currentMonth);
      }

      var regexp = new RegExp('^' + "T".concat(currentYear).concat(currentMonth));
      var teacherCount = yield _Teacher.default.countDocuments({
        teacherID: regexp
      }).exec();
      var teacherID = "T".concat(currentYear).concat((0, _helpers.addLeadingZeros)(currentMonth, 2)).concat((0, _helpers.addLeadingZeros)(teacherCount + 1, 3)); // Dealing with profile pic upload

      var _profilePicLink2 = yield (0, _helpers.pictureUpload)(profilePic, teacherID, 'teacher');

      var teacher = new _Teacher.default({
        teacherID,
        firstName,
        lastName,
        gender,
        dob,
        username: usernameCreator(firstName, lastName),
        streetAddress,
        city,
        zipCode,
        telephoneNumber,
        emailAddress,
        profilePic: _profilePicLink2,
        enrollmentDate
      });
      teacher.save();
      return _objectSpread({}, teacher._doc);
    } catch (error) {
      console.log(error);
    }
  });
  return _createTeacher.apply(this, arguments);
}

function registerStudent(_x11, _x12) {
  return _registerStudent.apply(this, arguments);
}

function _registerStudent() {
  _registerStudent = _asyncToGenerator(function* (parent, args) {
    try {
      var {
        firstName,
        lastName,
        gender,
        dob,
        classID,
        streetAddress,
        city,
        zipCode,
        telephoneNumber,
        emailAddress,
        enrollmentDate
      } = args.studentInput;
      var {
        profilePic
      } = args.studentInput; // const { createReadStream } = await profilePic;

      /********* GENERATING STUDENTID *********/

      var currentYear = new Date().getFullYear();
      var currentMonth = "".concat(new Date().getMonth() + 1);

      if (currentMonth < 10) {
        currentMonth = "0".concat(currentMonth);
      }

      var regexp = new RegExp('^' + "".concat(currentYear).concat(currentMonth));
      var studentCount = yield _Student.default.countDocuments({
        studentID: regexp
      }).exec();
      var studentID = "".concat(currentYear).concat((0, _helpers.addLeadingZeros)(currentMonth, 2)).concat((0, _helpers.addLeadingZeros)(studentCount + 1, 3));

      var _profilePicLink3 = yield (0, _helpers.pictureUpload)(profilePic, studentID, 'student');

      var student = new _Student.default({
        studentID,
        firstName,
        lastName,
        gender,
        dob,
        // grade,
        classID,
        username: usernameCreator(firstName, lastName),
        streetAddress,
        city,
        zipCode,
        telephoneNumber,
        emailAddress,
        profilePic: _profilePicLink3,
        enrollmentDate
      });
      /**************** GUARDIAN INFO ****************/

      var {
        guardianFirstName,
        guardianLastName,
        guardianRelationship,
        guardianMobilePhone,
        guardianWorkPhone,
        guardianEmailAddress
      } = args.guardianInput;
      var guardian = new _Guardian.default({
        firstName: guardianFirstName,
        lastName: guardianLastName,
        relationship: guardianRelationship,
        mobilePhone: guardianMobilePhone,
        workPhone: guardianWorkPhone,
        emailAddress: guardianEmailAddress,
        studentID
      });
      student.save();
      guardian.save();
      return _objectSpread(_objectSpread({}, student._doc), guardian._doc);
    } catch (error) {
      console.log(error);
    }
  });
  return _registerStudent.apply(this, arguments);
}

function createSchoolTerm(_x13, _x14) {
  return _createSchoolTerm.apply(this, arguments);
}

function _createSchoolTerm() {
  _createSchoolTerm = _asyncToGenerator(function* (parent, args) {
    var {
      termName,
      beginDate,
      endDate
    } = args.schoolTermInput;
    var schoolTerm = new _SchoolTerm.default({
      termName,
      beginDate,
      endDate
    });
    schoolTerm.save();
    return _objectSpread({}, schoolTerm._doc);
  });
  return _createSchoolTerm.apply(this, arguments);
}

function createClassHour(_x15, _x16) {
  return _createClassHour.apply(this, arguments);
}

function _createClassHour() {
  _createClassHour = _asyncToGenerator(function* (parent, args) {
    var {
      hourName,
      beginTime,
      endTime,
      type
    } = args.classHourInput;
    var classHour = new _ClassHour.default({
      hourName,
      beginTime,
      endTime,
      type
    });
    classHour.save();
    return _objectSpread({}, classHour._doc);
  });
  return _createClassHour.apply(this, arguments);
}

function createGradeClass(_x17, _x18) {
  return _createGradeClass.apply(this, arguments);
}

function _createGradeClass() {
  _createGradeClass = _asyncToGenerator(function* (parent, args) {
    var {
      className,
      grade,
      capacity,
      teacherID
    } = args.gradeClassInput;
    var classID = "".concat(grade).concat(className.slice(0, 3).toUpperCase());
    var existingClass = yield _GradeClass.default.findOne({
      classID
    });

    if (existingClass) {
      throw new Error('Class & Grade already registered. Choose a new one.');
    }

    var gradeClass = new _GradeClass.default({
      classID,
      className,
      grade,
      capacity,
      teacherID,
      numberOfStudents: 34
    });
    gradeClass.save();
    return _objectSpread({}, gradeClass._doc);
  });
  return _createGradeClass.apply(this, arguments);
}

function createSubject(_x19, _x20) {
  return _createSubject.apply(this, arguments);
}

function _createSubject() {
  _createSubject = _asyncToGenerator(function* (parent, args) {
    var {
      subjectName,
      teacherID
    } = args.subjectInput;
    var subjectID = "".concat(subjectName.slice(0, 3).toUpperCase()).concat(new Date().getFullYear());
    var existingSubject = yield _Subject.default.findOne({
      subjectID
    });

    if (existingSubject) {
      throw new Error('Subject already registered. Choose a new one.');
    }

    var subject = new _Subject.default({
      subjectID,
      subjectName,
      teacherID
    });
    subject.save();
    return _objectSpread({}, subject._doc);
  });
  return _createSubject.apply(this, arguments);
}

function registerStudentAttendance(_x21, _x22) {
  return _registerStudentAttendance.apply(this, arguments);
}

function _registerStudentAttendance() {
  _registerStudentAttendance = _asyncToGenerator(function* (parent, args) {
    var {
      dateOfAttendance,
      attendance
    } = args.studentAttendanceInput;
    var studentIDs = attendance.map(student => student.studentID);
    var studentAttendanceStatus = attendance.map(student => student.status);
    var existingAttendanceEntry = yield _StudentAttendance.default.findOne({
      dateOfAttendance
    });

    if (existingAttendanceEntry) {
      var attendanceStatus;

      for (var i = 0; i < studentIDs.length; i++) {
        var existingStatus = yield _StudentAttendance.default.findOne({
          dateOfAttendance: existingAttendanceEntry.dateOfAttendance,
          attendance: {
            $elemMatch: {
              studentID: studentIDs[i]
            }
          }
        });
        console.log(existingStatus);

        if (!existingStatus) {
          attendanceStatus = yield _StudentAttendance.default.findOneAndUpdate({
            dateOfAttendance: existingAttendanceEntry.dateOfAttendance
          }, {
            $addToSet: {
              attendance: {
                studentID: studentIDs[i],
                status: studentAttendanceStatus[i]
              }
            }
          });
        } else if (existingStatus) {
          attendanceStatus = yield _StudentAttendance.default.findOneAndUpdate({
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
        }
      }

      return attendanceStatus;
    } else {
      var _attendanceStatus = new _StudentAttendance.default({
        dateOfAttendance,
        attendance
      });

      _attendanceStatus.save();

      return _objectSpread({}, _attendanceStatus._doc);
    }
  });
  return _registerStudentAttendance.apply(this, arguments);
}

function registerTeacherAttendance(_x23, _x24) {
  return _registerTeacherAttendance.apply(this, arguments);
}

function _registerTeacherAttendance() {
  _registerTeacherAttendance = _asyncToGenerator(function* (parent, args) {
    var {
      dateOfAttendance,
      attendance
    } = args.teacherAttendanceInput;
    var teacherIDs = attendance.map(teacher => teacher.teacherID);
    var teacherAttendanceStatus = attendance.map(teacher => teacher.status);
    var existingAttendanceEntry = yield _TeacherAttendance.default.findOne({
      dateOfAttendance
    });

    if (existingAttendanceEntry) {
      var attendanceStatus;

      for (var i = 0; i < teacherIDs.length; i++) {
        var existingStatus = yield _TeacherAttendance.default.findOne({
          dateOfAttendance: existingAttendanceEntry.dateOfAttendance,
          attendance: {
            $elemMatch: {
              teacherID: teacherIDs[i]
            }
          }
        });

        if (!existingStatus) {
          attendanceStatus = yield _TeacherAttendance.default.findOneAndUpdate({
            dateOfAttendance: existingAttendanceEntry.dateOfAttendance
          }, {
            $addToSet: {
              attendance: {
                teacherID: teacherIDs[i],
                status: teacherAttendanceStatus[i]
              }
            }
          });
        } else if (existingStatus) {
          attendanceStatus = yield _TeacherAttendance.default.findOneAndUpdate({
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
        }
      }

      return attendanceStatus;
    } else {
      var _attendanceStatus2 = new _TeacherAttendance.default({
        dateOfAttendance,
        attendance
      });

      _attendanceStatus2.save();

      return _objectSpread({}, _attendanceStatus2._doc);
    }
  });
  return _registerTeacherAttendance.apply(this, arguments);
}

function registerAssessment(_x25, _x26) {
  return _registerAssessment.apply(this, arguments);
}

function _registerAssessment() {
  _registerAssessment = _asyncToGenerator(function* (parent, args) {
    try {
      var {
        assessmentDate,
        period,
        subject,
        gradeClass,
        markings,
        term
      } = args.assessmentInput;
      var assessmentID;

      do {
        assessmentID = "A".concat((0, _helpers.randomNum)(6));
        var existingID = yield _Assessment.default.findOne({
          assessmentID
        });
      } while (existingID);

      var assessment = new _Assessment.default({
        assessmentID,
        assessmentDate,
        period,
        subject,
        gradeClass,
        markings,
        term
      });
      assessment.save();
      return _objectSpread({}, assessment._doc);
    } catch (error) {
      throw error;
    }
  });
  return _registerAssessment.apply(this, arguments);
}

function registerExam(_x27, _x28) {
  return _registerExam.apply(this, arguments);
}

function _registerExam() {
  _registerExam = _asyncToGenerator(function* (parent, args) {
    try {
      var {
        examDate,
        startTime,
        duration,
        subject,
        gradeClass,
        markings,
        term
      } = args.examInput;
      var examID;

      do {
        examID = "E".concat((0, _helpers.randomNum)(6));
        var existingID = yield _Exam.default.findOne({
          examID
        });
      } while (existingID);

      var exam = new _Exam.default({
        examID,
        examDate,
        startTime,
        duration,
        subject,
        gradeClass,
        markings,
        term
      });
      exam.save();
      return _objectSpread({}, exam._doc);
    } catch (error) {
      throw error;
    }
  });
  return _registerExam.apply(this, arguments);
}

function registerAssessmentMark(_x29, _x30) {
  return _registerAssessmentMark.apply(this, arguments);
}

function _registerAssessmentMark() {
  _registerAssessmentMark = _asyncToGenerator(function* (parent, args) {
    try {
      var {
        assessmentID,
        studentMarks
      } = args.assessmentMarkInput;
      var studentIDs = studentMarks.map(student => student.studentID);
      var studentMarkings = studentMarks.map(student => student.markings); // console.log(studentMarks);

      var assessmentRecorded = yield _AssessmentMark.default.findOne({
        assessmentID
      });

      if (assessmentRecorded) {
        var _assessmentMark;

        for (var i = 0; i < studentIDs.length; i++) {
          var existingMarks = yield _AssessmentMark.default.findOne({
            assessmentID: assessmentRecorded.assessmentID,
            studentMarks: {
              $elemMatch: {
                studentID: studentIDs[i]
              }
            }
          });

          if (!existingMarks) {
            _assessmentMark = yield _AssessmentMark.default.findOneAndUpdate({
              assessmentID: assessmentRecorded.assessmentID
            }, {
              $addToSet: {
                studentMarks: {
                  studentID: studentIDs[i],
                  markings: studentMarkings[i]
                }
              }
            });
          } else if (existingMarks) {
            _assessmentMark = yield _AssessmentMark.default.findOneAndUpdate({
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
          }
        }

        return _assessmentMark;
      } else {
        var _assessmentMark2 = new _AssessmentMark.default({
          assessmentID,
          studentMarks
        });

        _assessmentMark2.save();
      }

      return _objectSpread({}, assessmentMark._doc);
    } catch (error) {
      console.log(error);
    }
  });
  return _registerAssessmentMark.apply(this, arguments);
}

function registerExamMark(_x31, _x32) {
  return _registerExamMark.apply(this, arguments);
}

function _registerExamMark() {
  _registerExamMark = _asyncToGenerator(function* (parent, args) {
    try {
      var {
        examID,
        studentMarks
      } = args.examMarkInput;
      var studentIDs = studentMarks.map(student => student.studentID);
      var studentMarkings = studentMarks.map(student => student.markings); // console.log(studentMarks);

      var examRecorded = yield _ExamMark.default.findOne({
        examID
      });

      if (examRecorded) {
        var examMark;

        for (var i = 0; i < studentIDs.length; i++) {
          var existingMarks = yield _ExamMark.default.findOne({
            examID: examRecorded.examID,
            studentMarks: {
              $elemMatch: {
                studentID: studentIDs[i]
              }
            }
          });

          if (!existingMarks) {
            examMark = yield _ExamMark.default.findOneAndUpdate({
              examID: examRecorded.examID
            }, {
              $addToSet: {
                studentMarks: {
                  studentID: studentIDs[i],
                  markings: studentMarkings[i]
                }
              }
            });
          } else if (existingMarks) {
            examMark = yield _ExamMark.default.findOneAndUpdate({
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
          }
        }

        return examMark;
      } else {
        var _examMark = new _ExamMark.default({
          examID,
          studentMarks
        });

        _examMark.save();

        return _objectSpread({}, _examMark._doc);
      } // return { ...examMark._doc };

    } catch (error) {
      console.log(error);
    }
  });
  return _registerExamMark.apply(this, arguments);
}

function registerTimetable(_x33, _x34) {
  return _registerTimetable.apply(this, arguments);
}
/**************** UPDATES ****************/


function _registerTimetable() {
  _registerTimetable = _asyncToGenerator(function* (parent, args) {
    try {
      var {
        classID,
        slots
      } = args.timetableInput;
      var slotTags = slots.map(slotTag => slotTag.slotTag);
      var subjects = slots.map(subject => subject.subjectID);
      var classRecorded = yield _Timetable.default.findOne({
        classID
      });

      if (classRecorded) {
        var timeSlot;

        for (var i = 0; i < slotTags.length; i++) {
          var existingSlots = yield _Timetable.default.findOne({
            classID: classRecorded.classID,
            slots: {
              $elemMatch: {
                slotTag: slotTags[i]
              }
            }
          });

          if (!existingSlots) {
            timeSlot = yield _Timetable.default.findOneAndUpdate({
              classID: classRecorded.classID
            }, {
              $addToSet: {
                slots: {
                  slotTag: slotTags[i],
                  subjectID: subjects[i]
                }
              }
            });
          } else if (existingSlots) {
            timeSlot = yield _Timetable.default.findOneAndUpdate({
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
          }
        }

        return timeSlot;
      } else {
        var _timeSlot = new _Timetable.default({
          classID,
          slots
        });

        _timeSlot.save();

        return _objectSpread({}, _timeSlot._doc);
      }
    } catch (error) {
      console.log(error);
    }
  });
  return _registerTimetable.apply(this, arguments);
}

function updateTeacherPersoInfo(_x35, _x36) {
  return _updateTeacherPersoInfo.apply(this, arguments);
}

function _updateTeacherPersoInfo() {
  _updateTeacherPersoInfo = _asyncToGenerator(function* (parent, args) {
    var {
      _id,
      firstName,
      lastName,
      gender,
      dob,
      streetAddress,
      city,
      zipCode,
      telephoneNumber,
      emailAddress
    } = args;
    var teacher;
    var query = {
      _id: _id
    };

    if (firstName !== undefined) {
      teacher = yield _Teacher.default.findOneAndUpdate(query, {
        firstName: firstName
      });
    }

    if (lastName !== undefined) {
      teacher = yield _Teacher.default.findOneAndUpdate(query, {
        lastName: lastName
      });
    }

    if (gender !== undefined) {
      teacher = yield _Teacher.default.findOneAndUpdate(query, {
        gender: gender
      });
    }

    if (dob !== undefined) {
      teacher = yield _Teacher.default.findOneAndUpdate(query, {
        dob: dob
      });
    }

    if (streetAddress !== undefined) {
      teacher = yield _Teacher.default.findOneAndUpdate(query, {
        streetAddress: streetAddress
      });
    }

    if (city !== undefined) {
      teacher = yield _Teacher.default.findOneAndUpdate(query, {
        city: city
      });
    }

    if (zipCode !== undefined) {
      teacher = yield _Teacher.default.findOneAndUpdate(query, {
        zipCode: zipCode
      });
    }

    if (telephoneNumber !== undefined) {
      teacher = yield _Teacher.default.findOneAndUpdate(query, {
        telephoneNumber: telephoneNumber
      });
    }

    if (emailAddress !== undefined) {
      teacher = yield _Teacher.default.findOneAndUpdate(query, {
        emailAddress: emailAddress
      });
    }

    return teacher;
  });
  return _updateTeacherPersoInfo.apply(this, arguments);
}

function updateTeacherProfilePic(_x37, _x38) {
  return _updateTeacherProfilePic.apply(this, arguments);
}

function _updateTeacherProfilePic() {
  _updateTeacherProfilePic = _asyncToGenerator(function* (parent, args) {
    var {
      _id,
      photoID
    } = args;
    var {
      profilePic
    } = args;
    var {
      createReadStream
    } = yield profilePic;

    try {
      var result = yield new Promise((resolve, reject) => {
        createReadStream().pipe(cloudinary.uploader.upload_stream({
          folder: 'teacher_profile_pic/',
          public_id: photoID
        }, (error, result) => {
          if (error) {
            reject(error);
          }

          resolve(result);
        }));
      });
      var profilePicLink = cloudinary.url(result.public_id, {
        version: result.version,
        gravity: 'face',
        height: 200,
        width: 150,
        crop: 'fill'
      });
    } catch (error) {
      console.log(error);
    }

    var teacher;
    var query = {
      _id: _id
    };

    if (profilePic !== undefined) {
      teacher = yield _Teacher.default.findOneAndUpdate(query, {
        profilePic: profilePicLink
      });
    }

    return teacher;
  });
  return _updateTeacherProfilePic.apply(this, arguments);
}

function updateStudentPersoInfo(_x39, _x40) {
  return _updateStudentPersoInfo.apply(this, arguments);
}

function _updateStudentPersoInfo() {
  _updateStudentPersoInfo = _asyncToGenerator(function* (parent, args) {
    var {
      _id,
      firstName,
      lastName,
      gender,
      dob,
      streetAddress,
      city,
      zipCode,
      telephoneNumber,
      emailAddress
    } = args;
    var student;
    var query = {
      _id: _id
    };

    if (firstName !== undefined) {
      student = yield _Student.default.findOneAndUpdate(query, {
        firstName: firstName
      });
    }

    if (lastName !== undefined) {
      student = yield _Student.default.findOneAndUpdate(query, {
        lastName: lastName
      });
    }

    if (gender !== undefined) {
      student = yield _Student.default.findOneAndUpdate(query, {
        gender: gender
      });
    }

    if (dob !== undefined) {
      student = yield _Student.default.findOneAndUpdate(query, {
        dob: dob
      });
    }

    if (streetAddress !== undefined) {
      student = yield _Student.default.findOneAndUpdate(query, {
        streetAddress: streetAddress
      });
    }

    if (city !== undefined) {
      student = yield _Student.default.findOneAndUpdate(query, {
        city: city
      });
    }

    if (zipCode !== undefined) {
      student = yield _Student.default.findOneAndUpdate(query, {
        zipCode: zipCode
      });
    }

    if (telephoneNumber !== undefined) {
      student = yield _Student.default.findOneAndUpdate(query, {
        telephoneNumber: telephoneNumber
      });
    }

    if (emailAddress !== undefined) {
      student = yield _Student.default.findOneAndUpdate(query, {
        emailAddress: emailAddress
      });
    }

    return student;
  });
  return _updateStudentPersoInfo.apply(this, arguments);
}

function updateStudentProfilePic(_x41, _x42) {
  return _updateStudentProfilePic.apply(this, arguments);
}

function _updateStudentProfilePic() {
  _updateStudentProfilePic = _asyncToGenerator(function* (parent, args) {
    var {
      _id,
      photoID
    } = args;
    var {
      profilePic
    } = args;
    var {
      createReadStream
    } = yield profilePic;

    try {
      var result = yield new Promise((resolve, reject) => {
        createReadStream().pipe(cloudinary.uploader.upload_stream({
          folder: 'student_profile_pic/',
          public_id: photoID
        }, (error, result) => {
          if (error) {
            reject(error);
          }

          resolve(result);
        }));
      });
      var profilePicLink = cloudinary.url(result.public_id, {
        version: result.version,
        gravity: 'face',
        height: 200,
        width: 150,
        crop: 'fill'
      });
    } catch (error) {
      console.log(error);
    }

    var student;
    var query = {
      _id: _id
    };

    if (profilePic !== undefined) {
      student = yield _Student.default.findOneAndUpdate(query, {
        profilePic: profilePicLink
      });
    }

    return student;
  });
  return _updateStudentProfilePic.apply(this, arguments);
}

function updateStudentClassInfo(_x43, _x44) {
  return _updateStudentClassInfo.apply(this, arguments);
}

function _updateStudentClassInfo() {
  _updateStudentClassInfo = _asyncToGenerator(function* (parent, args) {
    var {
      _id,
      classID
    } = args;
    var studentClassInfo;
    var query = {
      _id: _id
    }; // if (grade !== undefined) {
    // 	studentClassInfo = await Student.findOneAndUpdate(query, { grade });
    // }

    if (classID !== undefined) {
      studentClassInfo = yield _Student.default.findOneAndUpdate(query, {
        classID
      });
    }

    return studentClassInfo;
  });
  return _updateStudentClassInfo.apply(this, arguments);
}

function updateStudentGuardianInfo(_x45, _x46) {
  return _updateStudentGuardianInfo.apply(this, arguments);
}

function _updateStudentGuardianInfo() {
  _updateStudentGuardianInfo = _asyncToGenerator(function* (parent, args) {
    var {
      _id,
      firstName,
      lastName,
      relationship,
      mobilePhone,
      workPhone,
      emailAddress
    } = args;
    var guardian;
    var query = {
      _id: _id
    };

    if (firstName !== undefined) {
      guardian = yield _Guardian.default.findOneAndUpdate(query, {
        firstName: firstName
      });
    }

    if (lastName !== undefined) {
      guardian = yield _Guardian.default.findOneAndUpdate(query, {
        lastName: lastName
      });
    }

    if (relationship !== undefined) {
      guardian = yield _Guardian.default.findOneAndUpdate(query, {
        relationship: relationship
      });
    }

    if (mobilePhone !== undefined) {
      guardian = yield _Guardian.default.findOneAndUpdate(query, {
        mobilePhone: mobilePhone
      });
    }

    if (workPhone !== undefined) {
      guardian = yield _Guardian.default.findOneAndUpdate(query, {
        workPhone: workPhone
      });
    }

    if (emailAddress !== undefined) {
      guardian = yield _Guardian.default.findOneAndUpdate(query, {
        emailAddress: emailAddress
      });
    }

    return guardian;
  });
  return _updateStudentGuardianInfo.apply(this, arguments);
}

function updateSchoolInfo(_x47, _x48) {
  return _updateSchoolInfo.apply(this, arguments);
}

function _updateSchoolInfo() {
  _updateSchoolInfo = _asyncToGenerator(function* (parent, args) {
    var {
      _id,
      name,
      streetAddress,
      telephoneNumber,
      emailAddress,
      website,
      markingSystem
    } = args;
    var school;
    var query = {
      _id: _id
    };

    if (name !== undefined) {
      school = yield _School.default.findOneAndUpdate(query, {
        name: name
      });
    }

    if (streetAddress !== undefined) {
      school = yield _School.default.findOneAndUpdate(query, {
        streetAddress: streetAddress
      });
    }

    if (telephoneNumber !== undefined) {
      school = yield _School.default.findOneAndUpdate(query, {
        telephoneNumber: telephoneNumber
      });
    }

    if (emailAddress !== undefined) {
      school = yield _School.default.findOneAndUpdate(query, {
        emailAddress: emailAddress
      });
    }

    if (website !== undefined) {
      school = yield _School.default.findOneAndUpdate(query, {
        website: website
      });
    }

    if (markingSystem !== undefined) {
      school = yield _School.default.findOneAndUpdate(query, {
        markingSystem: markingSystem
      });
    }

    return school;
  });
  return _updateSchoolInfo.apply(this, arguments);
}

function updateAssessment(_x49, _x50) {
  return _updateAssessment.apply(this, arguments);
}

function _updateAssessment() {
  _updateAssessment = _asyncToGenerator(function* (parent, args) {
    var {
      _id,
      assessmentDate,
      period,
      subject,
      gradeClass,
      markings,
      term
    } = args;
    var updatedAssessment;
    var query = {
      _id: _id
    };
    var existingID = yield _Assessment.default.findById(query);

    if (!existingID) {
      throw new Error('This assessment is not recorded...');
    }

    if (assessmentDate !== null) {
      updatedAssessment = yield _Assessment.default.findOneAndUpdate(query, {
        assessmentDate
      });
    }

    if (period !== null) {
      updatedAssessment = yield _Assessment.default.findOneAndUpdate(query, {
        period
      });
    }

    if (subject !== null) {
      updatedAssessment = yield _Assessment.default.findOneAndUpdate(query, {
        subject
      });
    }

    if (gradeClass !== null) {
      updatedAssessment = yield _Assessment.default.findOneAndUpdate(query, {
        gradeClass
      });
    }

    if (markings !== null) {
      updatedAssessment = yield _Assessment.default.findOneAndUpdate(query, {
        markings
      });
    }

    if (term !== null) {
      updatedAssessment = yield _Assessment.default.findOneAndUpdate(query, {
        term
      });
    }

    return updatedAssessment;
  });
  return _updateAssessment.apply(this, arguments);
}

function updateExam(_x51, _x52) {
  return _updateExam.apply(this, arguments);
}

function _updateExam() {
  _updateExam = _asyncToGenerator(function* (parent, args) {
    var {
      _id,
      examDate,
      startTime,
      duration,
      subject,
      gradeClass,
      markings,
      term
    } = args;
    var updatedExam;
    var query = {
      _id: _id
    };
    var existingID = yield _Exam.default.findById(query);

    if (!existingID) {
      throw new Error('This exam is not recorded...');
    }

    try {
      if (examDate !== null) {
        updatedExam = yield _Exam.default.findOneAndUpdate(query, {
          examDate
        });
      }

      if (startTime !== null) {
        updatedExam = yield _Exam.default.findOneAndUpdate(query, {
          startTime
        });
      }

      if (duration !== null) {
        updatedExam = yield _Exam.default.findOneAndUpdate(query, {
          duration
        });
      }

      if (subject !== null) {
        updatedExam = yield _Exam.default.findOneAndUpdate(query, {
          subject
        });
      }

      if (gradeClass !== null) {
        updatedExam = yield _Exam.default.findOneAndUpdate(query, {
          gradeClass
        });
      }

      if (markings !== null) {
        updatedExam = yield _Exam.default.findOneAndUpdate(query, {
          markings
        });
      }

      if (term !== null) {
        updatedExam = yield _Exam.default.findOneAndUpdate(query, {
          term
        });
      }
    } catch (error) {
      console.log(error);
    }

    return updatedExam;
  });
  return _updateExam.apply(this, arguments);
}

function updateClass(_x53, _x54) {
  return _updateClass.apply(this, arguments);
}

function _updateClass() {
  _updateClass = _asyncToGenerator(function* (parent, args) {
    var {
      _id,
      className,
      grade,
      capacity,
      teacherID
    } = args;
    var updatedClass;
    var query = {
      _id: _id
    };
    var existingID = yield _GradeClass.default.findById(query);

    if (!existingID) {
      throw new Error('This exam is not recorded...');
    }

    try {
      if (className) {
        updatedClass = yield _GradeClass.default.findOneAndUpdate(query, {
          className
        });
      }

      if (grade) {
        updatedClass = yield _GradeClass.default.findOneAndUpdate(query, {
          grade
        });
      }

      if (capacity) {
        updatedClass = yield _GradeClass.default.findOneAndUpdate(query, {
          capacity
        });
      }

      if (teacherID) {
        updatedClass = yield _GradeClass.default.findOneAndUpdate(query, {
          teacherID
        });
      }
    } catch (error) {
      console.log(error);
    }

    return updatedClass;
  });
  return _updateClass.apply(this, arguments);
}

function updateSubject(_x55, _x56) {
  return _updateSubject.apply(this, arguments);
}

function _updateSubject() {
  _updateSubject = _asyncToGenerator(function* (parent, args) {
    var {
      _id,
      subjectName,
      teacherID
    } = args;
    var updatedSubject;
    var query = {
      _id: _id
    };
    var existingID = yield _Subject.default.findById(query);

    if (!existingID) {
      throw new Error('This subject is not recorded...');
    }

    try {
      if (subjectName && subjectName !== 'undefined') {
        updatedSubject = yield _Subject.default.findOneAndUpdate(query, {
          subjectName
        });
      }

      if (teacherID) {
        updatedSubject = yield _Subject.default.findOneAndUpdate(query, {
          teacherID
        });
      }
    } catch (error) {
      console.log(error);
    }

    return updatedSubject;
  });
  return _updateSubject.apply(this, arguments);
}

function updateSchoolLogo(_x57, _x58) {
  return _updateSchoolLogo.apply(this, arguments);
}

function _updateSchoolLogo() {
  _updateSchoolLogo = _asyncToGenerator(function* (parent, args) {
    var {
      _id,
      photoID
    } = args;
    var {
      logo
    } = args;
    var {
      createReadStream
    } = yield logo;

    try {
      var result = yield new Promise((resolve, reject) => {
        createReadStream().pipe(cloudinary.uploader.upload_stream({
          public_id: photoID
        }, (error, result) => {
          if (error) {
            reject(error);
          }

          resolve(result);
        }));
      });
      var logoLink = cloudinary.url(result.public_id, {
        version: result.version,
        width: 150,
        crop: 'scale'
      });
    } catch (error) {
      console.log(error);
    }

    var school;
    var query = {
      _id: _id
    };

    if (logo !== undefined) {
      school = yield _School.default.findOneAndUpdate(query, {
        logo: logoLink
      });
    }

    return school;
  });
  return _updateSchoolLogo.apply(this, arguments);
}

function updateStaffPersoInfo(_x59, _x60) {
  return _updateStaffPersoInfo.apply(this, arguments);
}

function _updateStaffPersoInfo() {
  _updateStaffPersoInfo = _asyncToGenerator(function* (parent, args) {
    var {
      _id,
      firstName,
      lastName,
      gender,
      dob,
      streetAddress,
      city,
      zipCode,
      telephoneNumber,
      emailAddress
    } = args;
    var staff;
    var query = {
      _id: _id
    };

    if (firstName !== undefined) {
      staff = yield _Staff.default.findOneAndUpdate(query, {
        firstName: firstName
      });
    }

    if (lastName !== undefined) {
      staff = yield _Staff.default.findOneAndUpdate(query, {
        lastName: lastName
      });
    }

    if (gender !== undefined) {
      staff = yield _Staff.default.findOneAndUpdate(query, {
        gender: gender
      });
    }

    if (dob !== undefined) {
      staff = yield _Staff.default.findOneAndUpdate(query, {
        dob: dob
      });
    }

    if (streetAddress !== undefined) {
      staff = yield _Staff.default.findOneAndUpdate(query, {
        streetAddress: streetAddress
      });
    }

    if (city !== undefined) {
      staff = yield _Staff.default.findOneAndUpdate(query, {
        city: city
      });
    }

    if (zipCode !== undefined) {
      staff = yield _Staff.default.findOneAndUpdate(query, {
        zipCode: zipCode
      });
    }

    if (telephoneNumber !== undefined) {
      staff = yield _Staff.default.findOneAndUpdate(query, {
        telephoneNumber: telephoneNumber
      });
    }

    if (emailAddress !== undefined) {
      staff = yield _Staff.default.findOneAndUpdate(query, {
        emailAddress: emailAddress
      });
    }

    return staff;
  });
  return _updateStaffPersoInfo.apply(this, arguments);
}

function updateStaffProfilePic(_x61, _x62) {
  return _updateStaffProfilePic.apply(this, arguments);
}

function _updateStaffProfilePic() {
  _updateStaffProfilePic = _asyncToGenerator(function* (parent, args) {
    var {
      _id,
      photoID
    } = args;
    var {
      profilePic
    } = args;
    var {
      createReadStream
    } = yield profilePic;

    try {
      var result = yield new Promise((resolve, reject) => {
        createReadStream().pipe(cloudinary.uploader.upload_stream({
          folder: 'staff_profile_pic/',
          public_id: photoID
        }, (error, result) => {
          if (error) {
            reject(error);
          }

          resolve(result);
        }));
      });
      var profilePicLink = cloudinary.url(result.public_id, {
        version: result.version,
        gravity: 'face',
        height: 200,
        width: 150,
        crop: 'fill'
      });
    } catch (error) {
      console.log(error);
    }

    var staff;
    var query = {
      _id: _id
    };

    if (profilePic !== undefined) {
      staff = yield _Staff.default.findOneAndUpdate(query, {
        profilePic: profilePicLink
      });
    }

    return staff;
  });
  return _updateStaffProfilePic.apply(this, arguments);
}

function updateUserPassword(_x63, _x64) {
  return _updateUserPassword.apply(this, arguments);
}
/**************** DELETES ****************/


function _updateUserPassword() {
  _updateUserPassword = _asyncToGenerator(function* (parent, args) {
    var {
      username,
      oldPassword,
      newPassword
    } = args;

    try {
      var user = yield _User.default.findOne({
        username: username
      }); // console.log(user);

      var oldPasswordValid = yield _bcryptjs.default.compareSync(oldPassword, user.password);

      if (!oldPasswordValid) {
        throw new Error('Old password incorrect.');
      }

      var newHashedPassword = yield _bcryptjs.default.hash(newPassword, 10);
      var usernewPassword = yield _User.default.findOneAndUpdate({
        username: username
      }, {
        password: newHashedPassword,
        defaultPassword: null
      });
      return usernewPassword;
    } catch (error) {
      throw new Error(error);
    }
  });
  return _updateUserPassword.apply(this, arguments);
}

function deleteSchoolTerm(_x65, _x66) {
  return _deleteSchoolTerm.apply(this, arguments);
}

function _deleteSchoolTerm() {
  _deleteSchoolTerm = _asyncToGenerator(function* (parent, args) {
    var {
      _id
    } = args;
    var query = {
      _id: _id
    };
    var toDeleteSchoolTerm = yield _SchoolTerm.default.findOneAndRemove(query);
    return toDeleteSchoolTerm;
  });
  return _deleteSchoolTerm.apply(this, arguments);
}

function deleteClassHour(_x67, _x68) {
  return _deleteClassHour.apply(this, arguments);
}

function _deleteClassHour() {
  _deleteClassHour = _asyncToGenerator(function* (parent, args) {
    var {
      _id
    } = args;
    var query = {
      _id: _id
    };
    var toDeleteClassHour = yield _ClassHour.default.findOneAndRemove(query);
    return toDeleteClassHour;
  });
  return _deleteClassHour.apply(this, arguments);
}

function deleteGradeClass(_x69, _x70) {
  return _deleteGradeClass.apply(this, arguments);
}

function _deleteGradeClass() {
  _deleteGradeClass = _asyncToGenerator(function* (parent, args) {
    var {
      _id
    } = args;
    var query = {
      _id: _id
    };
    var toDeleteClass = yield _GradeClass.default.findOneAndRemove(query);
    return toDeleteClass;
  });
  return _deleteGradeClass.apply(this, arguments);
}

function deleteAssessment(_x71, _x72) {
  return _deleteAssessment.apply(this, arguments);
}

function _deleteAssessment() {
  _deleteAssessment = _asyncToGenerator(function* (parent, args) {
    var {
      _id
    } = args;
    var query = {
      _id: _id
    };
    var toDeleteAssessment = yield _Assessment.default.findOneAndRemove(query);
    return toDeleteAssessment;
  });
  return _deleteAssessment.apply(this, arguments);
}

function deleteExam(_x73, _x74) {
  return _deleteExam.apply(this, arguments);
}

function _deleteExam() {
  _deleteExam = _asyncToGenerator(function* (parent, args) {
    var {
      _id
    } = args;
    var query = {
      _id: _id
    };
    var toDeleteExam = yield _Exam.default.findOneAndRemove(query);
    return toDeleteExam;
  });
  return _deleteExam.apply(this, arguments);
}

function deleteSubject(_x75, _x76) {
  return _deleteSubject.apply(this, arguments);
}

function _deleteSubject() {
  _deleteSubject = _asyncToGenerator(function* (parent, args) {
    var {
      _id
    } = args;
    var query = {
      _id: _id
    };
    var deleteSubject = yield _Subject.default.findOneAndRemove(query);
    return deleteSubject;
  });
  return _deleteSubject.apply(this, arguments);
}

function deleteStaff(_x77, _x78) {
  return _deleteStaff.apply(this, arguments);
}

function _deleteStaff() {
  _deleteStaff = _asyncToGenerator(function* (parent, args) {
    var {
      username
    } = args;
    var query = {
      username: username
    };
    var deleteStaff = yield _Staff.default.findOneAndRemove(query);
    var deleteUser = yield _User.default.findOneAndRemove(query);
    return 'Staff deleted successfully';
  });
  return _deleteStaff.apply(this, arguments);
}