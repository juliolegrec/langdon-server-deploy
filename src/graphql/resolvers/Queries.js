import User from '../../model/User';
import Student from '../../model/Student';
import Guardian from '../../model/Guardian';
import Teacher from '../../model/Teacher';
import bcrypt from 'bcryptjs';
import GradeClass from '../../model/GradeClass';
import StudentAttendance from '../../model/StudentAttendance';
import TeacherAttendance from '../../model/TeacherAttendance';
import Assessment from '../../model/Assessment';
import Exam from '../../model/Exam';
import AssessmentMark from '../../model/AssessmentMark';
import ExamMark from '../../model/ExamMark';
import Timetable from '../../model/Timetable';
import Subject from '../../model/Subject';
import moment from 'moment';
import Staff from '../../model/Staff';

export async function login(parent, args) {
	try {
		const user = await User.findOne({ username: args.username });
		if (!user) throw new Error('Username/Password Incorrect');

		const passwordIsValid = await bcrypt.compareSync(
			args.password,
			user.password
		);
		if (!passwordIsValid) throw new Error('Username/Password Incorrect');

		// const token = jwt.sign({ id: user._id }, 'mysecret');
		return { password: null, ...user._doc };
	} catch (error) {
		throw error;
	}
}

export async function teacherFromId(parent, args) {
	try {
		const teacher = await Teacher.findOne({ _id: args._id });
		return teacher;
	} catch (error) {
		throw error;
	}
}
export async function studentFromId(parent, args) {
	try {
		const student = await Student.findOne({ _id: args._id });
		return student;
	} catch (error) {
		throw error;
	}
}
export async function staffFromId(parent, args) {
	try {
		const staff = await Staff.findOne({ _id: args._id });
		return staff;
	} catch (error) {
		throw error;
	}
}
export async function classFromId(parent, args) {
	try {
		const gradeClass = await GradeClass.findOne({ _id: args._id });
		return gradeClass;
	} catch (error) {
		throw error;
	}
}
export async function studentFromClassID(parent, args) {
	try {
		const studentsFromClassID = await Student.find({ classID: args.classID });
		return studentsFromClassID;
	} catch (error) {
		throw error;
	}
}
export async function assessmentFromId(parent, args) {
	try {
		const assessment = await Assessment.findOne({ _id: args._id });
		return assessment;
	} catch (error) {
		throw error;
	}
}
export async function examFromId(parent, args) {
	try {
		const exam = await Exam.findOne({ _id: args._id });
		return exam;
	} catch (error) {
		throw error;
	}
}
export async function markingsFromAssessmentID(parent, args) {
	try {
		const markings = await AssessmentMark.findOne({
			assessmentID: args.assessmentID,
		});
		return markings;
	} catch (error) {
		throw error;
	}
}
export async function markingsFromExamID(parent, args) {
	try {
		const markings = await ExamMark.findOne({
			examID: args.examID,
		});
		return markings;
	} catch (error) {
		throw error;
	}
}
export async function totalStudents() {
	try {
		const studentCount = await Student.countDocuments();
		return studentCount;
	} catch (error) {
		throw error;
	}
}

export async function totalTeachers() {
	try {
		const teacherCount = await Teacher.countDocuments();
		return teacherCount;
	} catch (error) {
		throw error;
	}
}

export async function studentGuardianDetails(parent, args) {
	try {
		const guardiansDetails = await Guardian.findOne({
			studentID: args.studentID,
		});
		return guardiansDetails;
	} catch (error) {
		throw error;
	}
}

export async function studentAttendanceFromDate(parent, args) {
	try {
		const studentAttendance = await StudentAttendance.findOne({
			dateOfAttendance: new Date(args.date).toISOString(),
		});

		if (!studentAttendance) {
			return 'No Records for that date';
		}
		return studentAttendance;
	} catch (error) {
		throw error;
	}
}

export async function totalStudentAttendanceRecordedOnDate(parent, args) {
	try {
		const dateRecordered = await StudentAttendance.findOne({
			dateOfAttendance: new Date(args.date).toISOString(),
		});

		if (dateRecordered) {
			return dateRecordered.attendance.length;
		}

		return 0;
	} catch (error) {
		throw error;
	}
}
export async function totalStudentPresentOnDate(parent, args) {
	try {
		const dateRecordered = await StudentAttendance.findOne({
			dateOfAttendance: new Date(args.date).toISOString(),
		});

		if (dateRecordered) {
			const studentsPresent = dateRecordered.attendance.filter(
				(student) => student.status === 'PRESENT'
			);
			return studentsPresent.length;
		}

		return 0;
	} catch (error) {
		throw error;
	}
}

export async function teacherAttendanceFromDate(parent, args) {
	try {
		const teacherAttendance = await TeacherAttendance.findOne({
			dateOfAttendance: new Date(args.date).toISOString(),
		});

		if (!teacherAttendance) {
			return 'No Records for that date';
		}
		return teacherAttendance;
	} catch (error) {
		throw error;
	}
}

export async function totalTeacherAttendanceRecordedOnDate(parent, args) {
	try {
		const dateRecordered = await TeacherAttendance.findOne({
			dateOfAttendance: new Date(args.date).toISOString(),
		});

		if (dateRecordered) {
			return dateRecordered.attendance.length;
		}

		return 0;
	} catch (error) {
		throw error;
	}
}
export async function totalTeacherPresentOnDate(parent, args) {
	try {
		const dateRecordered = await TeacherAttendance.findOne({
			dateOfAttendance: new Date(args.date).toISOString(),
		});

		if (dateRecordered) {
			const teachersPresent = dateRecordered.attendance.filter(
				(teacher) => teacher.status === 'PRESENT'
			);
			return teachersPresent.length;
		}

		return 0;
	} catch (error) {
		throw error;
	}
}

export async function timetableFromClassID(parent, args) {
	try {
		const timetable = await Timetable.findOne({
			classID: args.classID,
		});

		if (!timetable) {
			return 'No Records for that class..';
		}
		return timetable;
	} catch (error) {
		throw error;
	}
}

export async function studentAttendance5days(parent, args) {
	function getPreviousWorkday() {
		let previousDays = [];

		for (let i = 0; i < 8; i++) {
			let day = moment().subtract(i, 'days').format('YYYY-MM-DD');

			if (moment(day).day() !== 0 && moment(day).day() !== 6) {
				previousDays.push(day);
			}
		}

		return previousDays;
	}

	try {
		const { studentID } = args;

		const last5Days = getPreviousWorkday();

		let attendances = [];

		for (let i = 0; i < last5Days.length; i++) {
			const attendance = await StudentAttendance.findOne({
				dateOfAttendance: last5Days[i],
			});

			if (attendance === null) {
				let missingInfo = {
					attendance: [{ studentID: studentID }, { status: 'NOT RECORDED' }],
					dateOfAttendance: last5Days[i],
				};

				attendances.push(missingInfo);
			} else {
				attendances.push(attendance);
			}
		}

		let agregateData = [];

		attendances.forEach((attendance) => {
			agregateData.push({
				dateOfAttendance: attendance.dateOfAttendance,
				attendance: attendance.attendance.find(
					(element) => element.studentID === studentID
				) || { studentID: 'NOT RECORDED', status: 'NOT RECORDED' },
			});
		});

		return agregateData;
	} catch (error) {
		console.log(error);
	}
}

export async function teacherAttendance5days(parent, args) {
	function getPreviousWorkday() {
		let previousDays = [];

		for (let i = 0; i < 8; i++) {
			let day = moment().subtract(i, 'days').format('YYYY-MM-DD');

			if (moment(day).day() !== 0 && moment(day).day() !== 6) {
				previousDays.push(day);
			}
		}

		return previousDays;
	}

	try {
		const { teacherID } = args;

		const last5Days = getPreviousWorkday();

		let attendances = [];

		for (let i = 0; i < last5Days.length; i++) {
			const attendance = await TeacherAttendance.findOne({
				dateOfAttendance: last5Days[i],
			});

			if (attendance === null) {
				let missingInfo = {
					attendance: [{ teacherID: teacherID }, { status: 'NOT RECORDED' }],
					dateOfAttendance: last5Days[i],
				};

				attendances.push(missingInfo);
			} else {
				attendances.push(attendance);
			}
		}

		let agregateData = [];

		attendances.forEach((attendance) => {
			agregateData.push({
				dateOfAttendance: attendance.dateOfAttendance,
				attendance: attendance.attendance.find(
					(element) => element.teacherID === teacherID
				) || { teacherID: 'NOT RECORDED', status: 'NOT RECORDED' },
			});
		});

		return agregateData;
	} catch (error) {
		console.log(error);
	}
}

export async function getSubjectFromID(parent, args) {
	try {
		const subject = await Subject.findOne({
			_id: args._id,
		});

		if (!subject) {
			return 'No Records for that subject..';
		}
		return subject;
	} catch (error) {
		throw error;
	}
}
