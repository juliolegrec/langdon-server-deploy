import { GraphQLScalarType } from 'graphql';
import GraphQLJSON from 'graphql-type-json';
import {
	createSchool,
	createUser,
	createStaff,
	// createStudent,
	createGuardian,
	createTeacher,
	createSchoolTerm,
	createClassHour,
	createGradeClass,
	createSubject,
	updateSchoolInfo,
	updateSchoolLogo,
	updateTeacherPersoInfo,
	updateTeacherProfilePic,
	updateStudentPersoInfo,
	updateStudentProfilePic,
	updateStudentClassInfo,
	updateStudentGuardianInfo,
	updateAssessment,
	updateExam,
	updateClass,
	updateSubject,
	updateStaffPersoInfo,
	updateStaffProfilePic,
	updateUserPassword,
	registerStudent,
	registerStudentAttendance,
	registerTeacherAttendance,
	registerAssessment,
	registerExam,
	registerAssessmentMark,
	registerExamMark,
	registerTimetable,
	deleteSchoolTerm,
	deleteClassHour,
	deleteGradeClass,
	deleteAssessment,
	deleteExam,
	deleteSubject,
	deleteStaff,
} from './Mutations';
import {
	login,
	teacherFromId,
	studentFromId,
	staffFromId,
	totalStudents,
	totalTeachers,
	classFromId,
	assessmentFromId,
	examFromId,
	markingsFromAssessmentID,
	markingsFromExamID,
	studentFromClassID,
	studentGuardianDetails,
	studentAttendanceFromDate,
	studentAttendance5days,
	totalStudentAttendanceRecordedOnDate,
	totalStudentPresentOnDate,
	totalTeacherAttendanceRecordedOnDate,
	totalTeacherPresentOnDate,
	teacherAttendanceFromDate,
	teacherAttendance5days,
	timetableFromClassID,
	getSubjectFromID,
} from './Queries';
import User from '../../model/User';
import Staff from '../../model/Staff';
import Student from '../../model/Student';
import Guardian from '../../model/Guardian';
import Teacher from '../../model/Teacher';
import School from '../../model/School';
import SchoolTerm from '../../model/SchoolTerm';
import ClassHour from '../../model/ClassHour';
import GradeClass from '../../model/GradeClass';
import Subject from '../../model/Subject';
import StudentAttendance from '../../model/StudentAttendance';
import Assessment from '../../model/Assessment';
import Exam from '../../model/Exam';
import AssessmentMark from '../../model/AssessmentMark';
import ExamMark from '../../model/ExamMark';

const resolvers = {
	Query: {
		schoolInfo: async () => {
			const school = await School.findOne();
			return school;
		},
		allUsers: async () => {
			const users = await User.find();
			return users;
		},
		allStaffs: async () => {
			const staffs = await Staff.find();
			return staffs;
		},
		allStudents: async () => {
			const students = await Student.find();
			return students;
		},
		allGuardianDetails: async () => {
			const guardians = await Guardian.find();
			return guardians;
		},
		allTeachers: async () => {
			const teachers = await Teacher.find();
			return teachers;
		},
		allSchoolTerms: async () => {
			const schoolTerms = await SchoolTerm.find();
			return schoolTerms;
		},
		allClassHours: async () => {
			const classHours = await ClassHour.find();
			return classHours;
		},
		allClasses: async () => {
			const classes = await GradeClass.find();
			return classes;
		},
		allSubjects: async () => {
			const subjects = await Subject.find();
			return subjects;
		},
		allAssessments: async () => {
			const assessments = await Assessment.find();
			return assessments;
		},
		allExams: async () => {
			const exams = await Exam.find();
			return exams;
		},
		allAssessmentsMarks: async () => {
			const assessmentsMarks = await AssessmentMark.find();
			return assessmentsMarks;
		},
		allExamsMarks: async () => {
			const examsMarks = await ExamMark.find();
			return examsMarks;
		},
		attendanceInfo: async () => {
			const studentAttendances = await StudentAttendance.find();
			return studentAttendances;
		},
		login,
		teacherFromId,
		studentFromId,
		staffFromId,
		classFromId,
		assessmentFromId,
		examFromId,
		markingsFromAssessmentID,
		markingsFromExamID,
		studentFromClassID,
		timetableFromClassID,
		findStaffFromUsername: async (parent, args) => {
			const { username } = args;
			const staff = await Staff.findOne({ username });
			return staff;
		},
		totalStudents: totalStudents,
		totalTeachers: totalTeachers,
		studentGuardianDetails,
		studentAttendanceFromDate,
		studentAttendance5days,
		teacherAttendanceFromDate,
		teacherAttendance5days,
		totalStudentAttendanceRecordedOnDate,
		totalStudentPresentOnDate,
		totalTeacherAttendanceRecordedOnDate,
		totalTeacherPresentOnDate,
		getSubjectFromID,
	},
	Mutation: {
		createSchool,
		createUser,
		createStaff,
		// createStudent,
		createGuardian,
		createTeacher,
		createSchoolTerm,
		createClassHour,
		createGradeClass,
		createSubject,
		updateSchoolInfo,
		updateSchoolLogo,
		updateTeacherPersoInfo,
		updateTeacherProfilePic,
		updateStudentPersoInfo,
		updateStudentProfilePic,
		updateStudentGuardianInfo,
		updateStudentClassInfo,
		updateAssessment,
		updateExam,
		updateClass,
		updateSubject,
		updateStaffPersoInfo,
		updateStaffProfilePic,
		updateUserPassword,
		registerStudent,
		registerStudentAttendance,
		registerTeacherAttendance,
		registerAssessment,
		registerExam,
		registerAssessmentMark,
		registerExamMark,
		registerTimetable,
		deleteSchoolTerm,
		deleteClassHour,
		deleteGradeClass,
		deleteAssessment,
		deleteExam,
		deleteSubject,
		deleteStaff,
	},
	Staff: {
		systemLogin: async (parent, args) => {
			const { username } = parent;
			const user = await User.findOne({ username });
			return user;
		},
	},
	Student: {
		guardianDetails: async (parent, args) => {
			const { studentID } = parent;
			const guardians = await Guardian.find({ studentID });
			return guardians;
		},
		classDetails: async (parent, args) => {
			const { classID } = parent;
			const gradeClass = await GradeClass.findOne({ classID });
			return gradeClass;
		},
	},
	Teacher: {
		subjectTaught: async (parent, args) => {
			const { teacherID } = parent;
			const regex = new RegExp(`\\b${teacherID}\\b`);

			const allSubjects = await Subject.find({});

			const selectedSubjects = allSubjects.filter((subject) => {
				let finder = regex.exec(subject.teacherID);

				if (finder !== null) {
					return finder[0] === teacherID;
				}
			});
			return selectedSubjects;
		},
		classAssigned: async (parent, args) => {
			const { teacherID } = parent;

			const classes = await GradeClass.find({ teacherID: teacherID });

			return classes;
		},
	},
	GradeClass: {
		formTeacher: async (parent, args) => {
			const { teacherID } = parent;

			const teacher = await Teacher.findOne({ teacherID });
			return teacher;
		},
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
	DateTime: new GraphQLScalarType({
		name: 'DateTime',
		description: 'A valid date time value',
		parseValue: (value) => new Date(value),
		serialize: (value) => new Date(value).toISOString(),
		parseLiteral: (ast) => ast.value,
	}),
	JSON: GraphQLJSON,
	// ObjectType: new GraphQLScalarType({
	// 	name: 'ObjectType',
	// 	description: 'A valid object type',
	// 	parseValue: value => new Date(value),
	// 	serialize: value => new Date(value).toISOString(),
	// 	parseLiteral: ast => ast.value,
	// }),
};

export default resolvers;
