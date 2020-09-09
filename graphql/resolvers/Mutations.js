import User from '../../model/User';
import Staff from '../../model/Staff';
import Student from '../../model/Student';
import Guardian from '../../model/Guardian';
import Teacher from '../../model/Teacher';
import School from '../../model/School';
import SchoolTerm from '../../model/SchoolTerm';
import ClassHour from '../../model/ClassHour';
import bcrypt from 'bcryptjs';
import GradeClass from '../../model/GradeClass';
import Subject from '../../model/Subject';
import StudentAttendance from '../../model/StudentAttendance';
import TeacherAttendance from '../../model/TeacherAttendance';
import Assessment from '../../model/Assessment';
import Exam from '../../model/Exam';
import AssessmentMark from '../../model/AssessmentMark';
import ExamMark from '../../model/ExamMark';
import Timetable from '../../model/Timetable';
import { addLeadingZeros, randomNum, pictureUpload } from '../../helpers';
import generator from 'generate-password';

require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET,
});

/********* GENERATING USERNAME *********/
function usernameCreator(firstName, lastName) {
	return (
		firstName.substring(0, 3).toUpperCase() +
		lastName.substring(0, 3).toUpperCase()
	)
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '');
}

export async function createSchool(parent, args) {
	try {
		const {
			logo,
			name,
			streetAddress,
			telephoneNumber,
			emailAddress,
			website,
			markingSystem,
		} = args.schoolInput;

		const existingSchool = await School.find();
		if (existingSchool) {
			throw new Error(`School info already exist. Can't create newone.`);
		}

		const school = new School(
			{
				logo,
				name,
				streetAddress,
				telephoneNumber,
				emailAddress,
				website,
				markingSystem,
			},
			(err) => {
				if (err) throw err;
			}
		);

		school.save();

		return { ...school._doc };
	} catch (error) {
		throw error;
	}
}

export async function createUser(parent, args) {
	try {
		const { username, password, role } = args.userInput;

		const existingUser = await User.findOne({ username });
		if (existingUser) {
			throw new Error('Username already used. Choose another one.');
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = new User(
			{ username, password: hashedPassword, role },
			(err) => {
				if (err) throw err;
			}
		);

		user.save();

		return { password: null, ...user._doc };
	} catch (error) {
		throw error;
	}
}

export async function createStaff(parent, args) {
	try {
		const {
			firstName,
			lastName,
			gender,
			dob,
			streetAddress,
			city,
			zipCode,
			telephoneNumber,
			emailAddress,
		} = args.staffInput;

		const { profilePic } = args.staffInput;

		/********* GENERATING STAFFID *********/
		const currentYear = new Date().getFullYear();
		let currentMonth = `${new Date().getMonth() + 1}`;

		if (currentMonth < 10) {
			currentMonth = `0${currentMonth}`;
		}

		var regexp = new RegExp('^' + `STA${currentYear}${currentMonth}`);

		const staffCount = await Staff.countDocuments({
			staffID: regexp,
		}).exec();

		const staffID = `STA${currentYear}${addLeadingZeros(
			currentMonth,
			2
		)}${addLeadingZeros(staffCount + 1, 3)}`;

		/********* END GENERATING STAFFID *********/

		const username = usernameCreator(firstName, lastName);

		const existingUserName = await User.findOne({ username });

		if (profilePic) {
			const profilePicLink = await pictureUpload(profilePic, staffID, 'staff');
		}

		if (!existingUserName) {
			const staff = new Staff({
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
				profilePic: profilePic ? profilePicLink : null,
			});

			const defaultPassword = generator.generate({
				length: 6,
				numbers: true,
			});

			const hashedPassword = await bcrypt.hash(defaultPassword, 10);

			const user = new User({
				username,
				defaultPassword,
				password: hashedPassword,
				role: 'STAFF',
			});

			staff.save();
			user.save();
			return { password: null, ...staff._doc, ...user._doc };
		}
	} catch (error) {
		throw error;
	}
}

export async function createGuardian(parent, args) {
	try {
		const {
			firstName,
			lastName,
			relationship,
			mobilePhone,
			workPhone,
			emailAddress,
			studentID,
		} = args.guardianInput;

		const existingGuardian = await Guardian.find({ studentID: studentID });

		if (Object.keys(existingGuardian).length >= 2) {
			throw new Error('This student already has 2 guardian details.');
		}

		const guardian = new Guardian({
			firstName,
			lastName,
			relationship,
			mobilePhone,
			workPhone,
			emailAddress,
			studentID,
		});

		guardian.save();

		return { ...guardian._doc };
	} catch (error) {
		throw error;
	}
}

export async function createTeacher(parent, args) {
	try {
		const {
			firstName,
			lastName,
			gender,
			dob,
			streetAddress,
			city,
			zipCode,
			telephoneNumber,
			emailAddress,
			enrollmentDate,
		} = args.teacherInput;

		const { profilePic } = await args.teacherInput;

		// const { createReadStream } = await profilePic;

		/********* GENERATING TEACHERID *********/
		const currentYear = new Date().getFullYear();
		let currentMonth = `${new Date().getMonth() + 1}`;

		if (currentMonth < 10) {
			currentMonth = `0${currentMonth}`;
		}

		var regexp = new RegExp('^' + `T${currentYear}${currentMonth}`);
		const teacherCount = await Teacher.countDocuments({
			teacherID: regexp,
		}).exec();
		const teacherID = `T${currentYear}${addLeadingZeros(
			currentMonth,
			2
		)}${addLeadingZeros(teacherCount + 1, 3)}`;

		// Dealing with profile pic upload
		const profilePicLink = await pictureUpload(
			profilePic,
			teacherID,
			'teacher'
		);

		const teacher = new Teacher({
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
			profilePic: profilePicLink,
			enrollmentDate,
		});

		teacher.save();
		return { ...teacher._doc };
	} catch (error) {
		console.log(error);
	}
}

export async function registerStudent(parent, args) {
	try {
		const {
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
			enrollmentDate,
		} = args.studentInput;

		const { profilePic } = args.studentInput;

		// const { createReadStream } = await profilePic;

		/********* GENERATING STUDENTID *********/
		const currentYear = new Date().getFullYear();
		let currentMonth = `${new Date().getMonth() + 1}`;

		if (currentMonth < 10) {
			currentMonth = `0${currentMonth}`;
		}

		var regexp = new RegExp('^' + `${currentYear}${currentMonth}`);
		const studentCount = await Student.countDocuments({
			studentID: regexp,
		}).exec();
		const studentID = `${currentYear}${addLeadingZeros(
			currentMonth,
			2
		)}${addLeadingZeros(studentCount + 1, 3)}`;

		const profilePicLink = await pictureUpload(
			profilePic,
			studentID,
			'student'
		);

		const student = new Student({
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
			profilePic: profilePicLink,
			enrollmentDate,
		});

		/**************** GUARDIAN INFO ****************/

		const {
			guardianFirstName,
			guardianLastName,
			guardianRelationship,
			guardianMobilePhone,
			guardianWorkPhone,
			guardianEmailAddress,
		} = args.guardianInput;

		const guardian = new Guardian({
			firstName: guardianFirstName,
			lastName: guardianLastName,
			relationship: guardianRelationship,
			mobilePhone: guardianMobilePhone,
			workPhone: guardianWorkPhone,
			emailAddress: guardianEmailAddress,
			studentID,
		});

		student.save();
		guardian.save();

		return { ...student._doc, ...guardian._doc };
	} catch (error) {
		console.log(error);
	}
}

export async function createSchoolTerm(parent, args) {
	const { termName, beginDate, endDate } = args.schoolTermInput;

	const schoolTerm = new SchoolTerm({
		termName,
		beginDate,
		endDate,
	});

	schoolTerm.save();

	return { ...schoolTerm._doc };
}

export async function createClassHour(parent, args) {
	const { hourName, beginTime, endTime, type } = args.classHourInput;

	const classHour = new ClassHour({
		hourName,
		beginTime,
		endTime,
		type,
	});

	classHour.save();

	return { ...classHour._doc };
}

export async function createGradeClass(parent, args) {
	const { className, grade, capacity, teacherID } = args.gradeClassInput;
	let classID = `${grade}${className.slice(0, 3).toUpperCase()}`;

	const existingClass = await GradeClass.findOne({ classID });
	if (existingClass) {
		throw new Error('Class & Grade already registered. Choose a new one.');
	}

	const gradeClass = new GradeClass({
		classID,
		className,
		grade,
		capacity,
		teacherID,
		numberOfStudents: 34,
	});

	gradeClass.save();

	return { ...gradeClass._doc };
}

export async function createSubject(parent, args) {
	const { subjectName, teacherID } = args.subjectInput;
	let subjectID = `${subjectName
		.slice(0, 3)
		.toUpperCase()}${new Date().getFullYear()}`;

	const existingSubject = await Subject.findOne({ subjectID });
	if (existingSubject) {
		throw new Error('Subject already registered. Choose a new one.');
	}

	const subject = new Subject({
		subjectID,
		subjectName,
		teacherID,
	});

	subject.save();

	return { ...subject._doc };
}

export async function registerStudentAttendance(parent, args) {
	const { dateOfAttendance, attendance } = args.studentAttendanceInput;

	const studentIDs = attendance.map((student) => student.studentID);
	const studentAttendanceStatus = attendance.map((student) => student.status);

	const existingAttendanceEntry = await StudentAttendance.findOne({
		dateOfAttendance,
	});

	if (existingAttendanceEntry) {
		let attendanceStatus;

		for (let i = 0; i < studentIDs.length; i++) {
			let existingStatus = await StudentAttendance.findOne({
				dateOfAttendance: existingAttendanceEntry.dateOfAttendance,
				attendance: {
					$elemMatch: { studentID: studentIDs[i] },
				},
			});

			console.log(existingStatus);

			if (!existingStatus) {
				attendanceStatus = await StudentAttendance.findOneAndUpdate(
					{
						dateOfAttendance: existingAttendanceEntry.dateOfAttendance,
					},
					{
						$addToSet: {
							attendance: {
								studentID: studentIDs[i],
								status: studentAttendanceStatus[i],
							},
						},
					}
				);
			} else if (existingStatus) {
				attendanceStatus = await StudentAttendance.findOneAndUpdate(
					{
						dateOfAttendance: existingAttendanceEntry.dateOfAttendance,
						attendance: {
							$elemMatch: { studentID: studentIDs[i] },
						},
					},
					{
						$set: { 'attendance.$.status': studentAttendanceStatus[i] },
					}
				);
			}
		}
		return attendanceStatus;
	} else {
		const attendanceStatus = new StudentAttendance({
			dateOfAttendance,
			attendance,
		});

		attendanceStatus.save();

		return { ...attendanceStatus._doc };
	}
}

export async function registerTeacherAttendance(parent, args) {
	const { dateOfAttendance, attendance } = args.teacherAttendanceInput;

	const teacherIDs = attendance.map((teacher) => teacher.teacherID);
	const teacherAttendanceStatus = attendance.map((teacher) => teacher.status);

	const existingAttendanceEntry = await TeacherAttendance.findOne({
		dateOfAttendance,
	});

	if (existingAttendanceEntry) {
		let attendanceStatus;

		for (let i = 0; i < teacherIDs.length; i++) {
			let existingStatus = await TeacherAttendance.findOne({
				dateOfAttendance: existingAttendanceEntry.dateOfAttendance,
				attendance: {
					$elemMatch: { teacherID: teacherIDs[i] },
				},
			});

			if (!existingStatus) {
				attendanceStatus = await TeacherAttendance.findOneAndUpdate(
					{
						dateOfAttendance: existingAttendanceEntry.dateOfAttendance,
					},
					{
						$addToSet: {
							attendance: {
								teacherID: teacherIDs[i],
								status: teacherAttendanceStatus[i],
							},
						},
					}
				);
			} else if (existingStatus) {
				attendanceStatus = await TeacherAttendance.findOneAndUpdate(
					{
						dateOfAttendance: existingAttendanceEntry.dateOfAttendance,
						attendance: {
							$elemMatch: { teacherID: teacherIDs[i] },
						},
					},
					{
						$set: { 'attendance.$.status': teacherAttendanceStatus[i] },
					}
				);
			}
		}
		return attendanceStatus;
	} else {
		const attendanceStatus = new TeacherAttendance({
			dateOfAttendance,
			attendance,
		});

		attendanceStatus.save();

		return { ...attendanceStatus._doc };
	}
}

export async function registerAssessment(parent, args) {
	try {
		const {
			assessmentDate,
			period,
			subject,
			gradeClass,
			markings,
			term,
		} = args.assessmentInput;

		let assessmentID;

		do {
			assessmentID = `A${randomNum(6)}`;
			var existingID = await Assessment.findOne({ assessmentID });
		} while (existingID);

		const assessment = new Assessment({
			assessmentID,
			assessmentDate,
			period,
			subject,
			gradeClass,
			markings,
			term,
		});

		assessment.save();

		return { ...assessment._doc };
	} catch (error) {
		throw error;
	}
}
export async function registerExam(parent, args) {
	try {
		const {
			examDate,
			startTime,
			duration,
			subject,
			gradeClass,
			markings,
			term,
		} = args.examInput;

		let examID;

		do {
			examID = `E${randomNum(6)}`;
			var existingID = await Exam.findOne({ examID });
		} while (existingID);

		const exam = new Exam({
			examID,
			examDate,
			startTime,
			duration,
			subject,
			gradeClass,
			markings,
			term,
		});

		exam.save();

		return { ...exam._doc };
	} catch (error) {
		throw error;
	}
}

export async function registerAssessmentMark(parent, args) {
	try {
		const { assessmentID, studentMarks } = args.assessmentMarkInput;

		const studentIDs = studentMarks.map((student) => student.studentID);
		const studentMarkings = studentMarks.map((student) => student.markings);
		// console.log(studentMarks);

		const assessmentRecorded = await AssessmentMark.findOne({ assessmentID });

		if (assessmentRecorded) {
			let assessmentMark;

			for (let i = 0; i < studentIDs.length; i++) {
				let existingMarks = await AssessmentMark.findOne({
					assessmentID: assessmentRecorded.assessmentID,
					studentMarks: {
						$elemMatch: { studentID: studentIDs[i] },
					},
				});

				if (!existingMarks) {
					assessmentMark = await AssessmentMark.findOneAndUpdate(
						{
							assessmentID: assessmentRecorded.assessmentID,
						},
						{
							$addToSet: {
								studentMarks: {
									studentID: studentIDs[i],
									markings: studentMarkings[i],
								},
							},
						}
					);
				} else if (existingMarks) {
					assessmentMark = await AssessmentMark.findOneAndUpdate(
						{
							assessmentID: assessmentRecorded.assessmentID,
							studentMarks: {
								$elemMatch: { studentID: studentIDs[i] },
							},
						},
						{ $set: { 'studentMarks.$.markings': studentMarkings[i] } }
					);
				}
			}
			return assessmentMark;
		} else {
			const assessmentMark = new AssessmentMark({
				assessmentID,
				studentMarks,
			});

			assessmentMark.save();
		}

		return { ...assessmentMark._doc };
	} catch (error) {
		console.log(error);
	}
}

export async function registerExamMark(parent, args) {
	try {
		const { examID, studentMarks } = args.examMarkInput;

		const studentIDs = studentMarks.map((student) => student.studentID);
		const studentMarkings = studentMarks.map((student) => student.markings);
		// console.log(studentMarks);

		const examRecorded = await ExamMark.findOne({ examID });

		if (examRecorded) {
			let examMark;

			for (let i = 0; i < studentIDs.length; i++) {
				let existingMarks = await ExamMark.findOne({
					examID: examRecorded.examID,
					studentMarks: {
						$elemMatch: { studentID: studentIDs[i] },
					},
				});

				if (!existingMarks) {
					examMark = await ExamMark.findOneAndUpdate(
						{
							examID: examRecorded.examID,
						},
						{
							$addToSet: {
								studentMarks: {
									studentID: studentIDs[i],
									markings: studentMarkings[i],
								},
							},
						}
					);
				} else if (existingMarks) {
					examMark = await ExamMark.findOneAndUpdate(
						{
							examID: examRecorded.examID,
							studentMarks: {
								$elemMatch: { studentID: studentIDs[i] },
							},
						},
						{ $set: { 'studentMarks.$.markings': studentMarkings[i] } }
					);
				}
			}
			return examMark;
		} else {
			const examMark = new ExamMark({
				examID,
				studentMarks,
			});

			examMark.save();
			return { ...examMark._doc };
		}

		// return { ...examMark._doc };
	} catch (error) {
		console.log(error);
	}
}

export async function registerTimetable(parent, args) {
	try {
		const { classID, slots } = args.timetableInput;

		const slotTags = slots.map((slotTag) => slotTag.slotTag);
		const subjects = slots.map((subject) => subject.subjectID);

		const classRecorded = await Timetable.findOne({ classID });

		if (classRecorded) {
			let timeSlot;

			for (let i = 0; i < slotTags.length; i++) {
				let existingSlots = await Timetable.findOne({
					classID: classRecorded.classID,
					slots: {
						$elemMatch: { slotTag: slotTags[i] },
					},
				});

				if (!existingSlots) {
					timeSlot = await Timetable.findOneAndUpdate(
						{
							classID: classRecorded.classID,
						},
						{
							$addToSet: {
								slots: {
									slotTag: slotTags[i],
									subjectID: subjects[i],
								},
							},
						}
					);
				} else if (existingSlots) {
					timeSlot = await Timetable.findOneAndUpdate(
						{
							classID: classRecorded.classID,
							slots: {
								$elemMatch: { slotTag: slotTags[i] },
							},
						},
						{ $set: { 'slots.$.subjectID': subjects[i] } }
					);
				}
			}
			return timeSlot;
		} else {
			const timeSlot = new Timetable({
				classID,
				slots,
			});

			timeSlot.save();
			return { ...timeSlot._doc };
		}
	} catch (error) {
		console.log(error);
	}
}

/**************** UPDATES ****************/

export async function updateTeacherPersoInfo(parent, args) {
	const {
		_id,
		firstName,
		lastName,
		gender,
		dob,
		streetAddress,
		city,
		zipCode,
		telephoneNumber,
		emailAddress,
	} = args;

	let teacher;
	let query = { _id: _id };

	if (firstName !== undefined) {
		teacher = await Teacher.findOneAndUpdate(query, { firstName: firstName });
	}
	if (lastName !== undefined) {
		teacher = await Teacher.findOneAndUpdate(query, { lastName: lastName });
	}
	if (gender !== undefined) {
		teacher = await Teacher.findOneAndUpdate(query, { gender: gender });
	}
	if (dob !== undefined) {
		teacher = await Teacher.findOneAndUpdate(query, { dob: dob });
	}
	if (streetAddress !== undefined) {
		teacher = await Teacher.findOneAndUpdate(query, {
			streetAddress: streetAddress,
		});
	}
	if (city !== undefined) {
		teacher = await Teacher.findOneAndUpdate(query, { city: city });
	}
	if (zipCode !== undefined) {
		teacher = await Teacher.findOneAndUpdate(query, { zipCode: zipCode });
	}
	if (telephoneNumber !== undefined) {
		teacher = await Teacher.findOneAndUpdate(query, {
			telephoneNumber: telephoneNumber,
		});
	}
	if (emailAddress !== undefined) {
		teacher = await Teacher.findOneAndUpdate(query, {
			emailAddress: emailAddress,
		});
	}

	return teacher;
}

export async function updateTeacherProfilePic(parent, args) {
	const { _id, photoID } = args;

	const { profilePic } = args;

	const { createReadStream } = await profilePic;

	try {
		const result = await new Promise((resolve, reject) => {
			createReadStream().pipe(
				cloudinary.uploader.upload_stream(
					{ folder: 'teacher_profile_pic/', public_id: photoID },
					(error, result) => {
						if (error) {
							reject(error);
						}
						resolve(result);
					}
				)
			);
		});

		var profilePicLink = cloudinary.url(result.public_id, {
			version: result.version,
			gravity: 'face',
			height: 200,
			width: 150,
			crop: 'fill',
		});
	} catch (error) {
		console.log(error);
	}

	let teacher;
	let query = { _id: _id };

	if (profilePic !== undefined) {
		teacher = await Teacher.findOneAndUpdate(query, {
			profilePic: profilePicLink,
		});
	}

	return teacher;
}

export async function updateStudentPersoInfo(parent, args) {
	const {
		_id,
		firstName,
		lastName,
		gender,
		dob,
		streetAddress,
		city,
		zipCode,
		telephoneNumber,
		emailAddress,
	} = args;

	let student;
	let query = { _id: _id };

	if (firstName !== undefined) {
		student = await Student.findOneAndUpdate(query, { firstName: firstName });
	}
	if (lastName !== undefined) {
		student = await Student.findOneAndUpdate(query, { lastName: lastName });
	}
	if (gender !== undefined) {
		student = await Student.findOneAndUpdate(query, { gender: gender });
	}
	if (dob !== undefined) {
		student = await Student.findOneAndUpdate(query, { dob: dob });
	}
	if (streetAddress !== undefined) {
		student = await Student.findOneAndUpdate(query, {
			streetAddress: streetAddress,
		});
	}
	if (city !== undefined) {
		student = await Student.findOneAndUpdate(query, { city: city });
	}
	if (zipCode !== undefined) {
		student = await Student.findOneAndUpdate(query, { zipCode: zipCode });
	}
	if (telephoneNumber !== undefined) {
		student = await Student.findOneAndUpdate(query, {
			telephoneNumber: telephoneNumber,
		});
	}
	if (emailAddress !== undefined) {
		student = await Student.findOneAndUpdate(query, {
			emailAddress: emailAddress,
		});
	}

	return student;
}

export async function updateStudentProfilePic(parent, args) {
	const { _id, photoID } = args;

	const { profilePic } = args;

	const { createReadStream } = await profilePic;

	try {
		const result = await new Promise((resolve, reject) => {
			createReadStream().pipe(
				cloudinary.uploader.upload_stream(
					{ folder: 'student_profile_pic/', public_id: photoID },
					(error, result) => {
						if (error) {
							reject(error);
						}
						resolve(result);
					}
				)
			);
		});

		var profilePicLink = cloudinary.url(result.public_id, {
			version: result.version,
			gravity: 'face',
			height: 200,
			width: 150,
			crop: 'fill',
		});
	} catch (error) {
		console.log(error);
	}

	let student;
	let query = { _id: _id };

	if (profilePic !== undefined) {
		student = await Student.findOneAndUpdate(query, {
			profilePic: profilePicLink,
		});
	}

	return student;
}

export async function updateStudentClassInfo(parent, args) {
	const { _id, classID } = args;

	let studentClassInfo;
	let query = { _id: _id };

	// if (grade !== undefined) {
	// 	studentClassInfo = await Student.findOneAndUpdate(query, { grade });
	// }
	if (classID !== undefined) {
		studentClassInfo = await Student.findOneAndUpdate(query, {
			classID,
		});
	}

	return studentClassInfo;
}

export async function updateStudentGuardianInfo(parent, args) {
	const {
		_id,
		firstName,
		lastName,
		relationship,
		mobilePhone,
		workPhone,
		emailAddress,
	} = args;

	let guardian;
	let query = { _id: _id };

	if (firstName !== undefined) {
		guardian = await Guardian.findOneAndUpdate(query, { firstName: firstName });
	}

	if (lastName !== undefined) {
		guardian = await Guardian.findOneAndUpdate(query, { lastName: lastName });
	}

	if (relationship !== undefined) {
		guardian = await Guardian.findOneAndUpdate(query, {
			relationship: relationship,
		});
	}

	if (mobilePhone !== undefined) {
		guardian = await Guardian.findOneAndUpdate(query, {
			mobilePhone: mobilePhone,
		});
	}

	if (workPhone !== undefined) {
		guardian = await Guardian.findOneAndUpdate(query, { workPhone: workPhone });
	}

	if (emailAddress !== undefined) {
		guardian = await Guardian.findOneAndUpdate(query, {
			emailAddress: emailAddress,
		});
	}

	return guardian;
}

export async function updateSchoolInfo(parent, args) {
	const {
		_id,
		name,
		streetAddress,
		telephoneNumber,
		emailAddress,
		website,
		markingSystem,
	} = args;

	let school;
	let query = { _id: _id };

	if (name !== undefined) {
		school = await School.findOneAndUpdate(query, { name: name });
	}

	if (streetAddress !== undefined) {
		school = await School.findOneAndUpdate(query, {
			streetAddress: streetAddress,
		});
	}

	if (telephoneNumber !== undefined) {
		school = await School.findOneAndUpdate(query, {
			telephoneNumber: telephoneNumber,
		});
	}

	if (emailAddress !== undefined) {
		school = await School.findOneAndUpdate(query, {
			emailAddress: emailAddress,
		});
	}

	if (website !== undefined) {
		school = await School.findOneAndUpdate(query, { website: website });
	}

	if (markingSystem !== undefined) {
		school = await School.findOneAndUpdate(query, {
			markingSystem: markingSystem,
		});
	}

	return school;
}

export async function updateAssessment(parent, args) {
	const {
		_id,
		assessmentDate,
		period,
		subject,
		gradeClass,
		markings,
		term,
	} = args;

	let updatedAssessment;
	let query = { _id: _id };

	const existingID = await Assessment.findById(query);
	if (!existingID) {
		throw new Error('This assessment is not recorded...');
	}

	if (assessmentDate !== null) {
		updatedAssessment = await Assessment.findOneAndUpdate(query, {
			assessmentDate,
		});
	}
	if (period !== null) {
		updatedAssessment = await Assessment.findOneAndUpdate(query, { period });
	}
	if (subject !== null) {
		updatedAssessment = await Assessment.findOneAndUpdate(query, { subject });
	}
	if (gradeClass !== null) {
		updatedAssessment = await Assessment.findOneAndUpdate(query, {
			gradeClass,
		});
	}
	if (markings !== null) {
		updatedAssessment = await Assessment.findOneAndUpdate(query, { markings });
	}
	if (term !== null) {
		updatedAssessment = await Assessment.findOneAndUpdate(query, { term });
	}

	return updatedAssessment;
}
export async function updateExam(parent, args) {
	const {
		_id,
		examDate,
		startTime,
		duration,
		subject,
		gradeClass,
		markings,
		term,
	} = args;

	let updatedExam;
	let query = { _id: _id };

	const existingID = await Exam.findById(query);
	if (!existingID) {
		throw new Error('This exam is not recorded...');
	}

	try {
		if (examDate !== null) {
			updatedExam = await Exam.findOneAndUpdate(query, {
				examDate,
			});
		}
		if (startTime !== null) {
			updatedExam = await Exam.findOneAndUpdate(query, {
				startTime,
			});
		}
		if (duration !== null) {
			updatedExam = await Exam.findOneAndUpdate(query, { duration });
		}
		if (subject !== null) {
			updatedExam = await Exam.findOneAndUpdate(query, { subject });
		}
		if (gradeClass !== null) {
			updatedExam = await Exam.findOneAndUpdate(query, {
				gradeClass,
			});
		}
		if (markings !== null) {
			updatedExam = await Exam.findOneAndUpdate(query, { markings });
		}
		if (term !== null) {
			updatedExam = await Exam.findOneAndUpdate(query, { term });
		}
	} catch (error) {
		console.log(error);
	}

	return updatedExam;
}

export async function updateClass(parent, args) {
	const { _id, className, grade, capacity, teacherID } = args;

	let updatedClass;
	let query = { _id: _id };

	const existingID = await GradeClass.findById(query);
	if (!existingID) {
		throw new Error('This exam is not recorded...');
	}

	try {
		if (className) {
			updatedClass = await GradeClass.findOneAndUpdate(query, {
				className,
			});
		}
		if (grade) {
			updatedClass = await GradeClass.findOneAndUpdate(query, {
				grade,
			});
		}
		if (capacity) {
			updatedClass = await GradeClass.findOneAndUpdate(query, { capacity });
		}
		if (teacherID) {
			updatedClass = await GradeClass.findOneAndUpdate(query, { teacherID });
		}
	} catch (error) {
		console.log(error);
	}

	return updatedClass;
}

export async function updateSubject(parent, args) {
	const { _id, subjectName, teacherID } = args;

	let updatedSubject;
	let query = { _id: _id };

	const existingID = await Subject.findById(query);
	if (!existingID) {
		throw new Error('This subject is not recorded...');
	}

	try {
		if (subjectName && subjectName !== 'undefined') {
			updatedSubject = await Subject.findOneAndUpdate(query, {
				subjectName,
			});
		}
		if (teacherID) {
			updatedSubject = await Subject.findOneAndUpdate(query, {
				teacherID,
			});
		}
	} catch (error) {
		console.log(error);
	}

	return updatedSubject;
}

export async function updateSchoolLogo(parent, args) {
	const { _id, photoID } = args;

	const { logo } = args;

	const { createReadStream } = await logo;

	try {
		const result = await new Promise((resolve, reject) => {
			createReadStream().pipe(
				cloudinary.uploader.upload_stream(
					{ public_id: photoID },
					(error, result) => {
						if (error) {
							reject(error);
						}
						resolve(result);
					}
				)
			);
		});

		var logoLink = cloudinary.url(result.public_id, {
			version: result.version,
			width: 150,
			crop: 'scale',
		});
	} catch (error) {
		console.log(error);
	}

	let school;
	let query = { _id: _id };

	if (logo !== undefined) {
		school = await School.findOneAndUpdate(query, {
			logo: logoLink,
		});
	}

	return school;
}

export async function updateStaffPersoInfo(parent, args) {
	const {
		_id,
		firstName,
		lastName,
		gender,
		dob,
		streetAddress,
		city,
		zipCode,
		telephoneNumber,
		emailAddress,
	} = args;

	let staff;
	let query = { _id: _id };

	if (firstName !== undefined) {
		staff = await Staff.findOneAndUpdate(query, { firstName: firstName });
	}
	if (lastName !== undefined) {
		staff = await Staff.findOneAndUpdate(query, { lastName: lastName });
	}
	if (gender !== undefined) {
		staff = await Staff.findOneAndUpdate(query, { gender: gender });
	}
	if (dob !== undefined) {
		staff = await Staff.findOneAndUpdate(query, { dob: dob });
	}
	if (streetAddress !== undefined) {
		staff = await Staff.findOneAndUpdate(query, {
			streetAddress: streetAddress,
		});
	}
	if (city !== undefined) {
		staff = await Staff.findOneAndUpdate(query, { city: city });
	}
	if (zipCode !== undefined) {
		staff = await Staff.findOneAndUpdate(query, { zipCode: zipCode });
	}
	if (telephoneNumber !== undefined) {
		staff = await Staff.findOneAndUpdate(query, {
			telephoneNumber: telephoneNumber,
		});
	}
	if (emailAddress !== undefined) {
		staff = await Staff.findOneAndUpdate(query, {
			emailAddress: emailAddress,
		});
	}

	return staff;
}

export async function updateStaffProfilePic(parent, args) {
	const { _id, photoID } = args;

	const { profilePic } = args;

	const { createReadStream } = await profilePic;

	try {
		const result = await new Promise((resolve, reject) => {
			createReadStream().pipe(
				cloudinary.uploader.upload_stream(
					{ folder: 'staff_profile_pic/', public_id: photoID },
					(error, result) => {
						if (error) {
							reject(error);
						}
						resolve(result);
					}
				)
			);
		});

		var profilePicLink = cloudinary.url(result.public_id, {
			version: result.version,
			gravity: 'face',
			height: 200,
			width: 150,
			crop: 'fill',
		});
	} catch (error) {
		console.log(error);
	}

	let staff;
	let query = { _id: _id };

	if (profilePic !== undefined) {
		staff = await Staff.findOneAndUpdate(query, {
			profilePic: profilePicLink,
		});
	}

	return staff;
}

export async function updateUserPassword(parent, args) {
	const { username, oldPassword, newPassword } = args;

	try {
		const user = await User.findOne({ username: username });

		// console.log(user);

		const oldPasswordValid = await bcrypt.compareSync(
			oldPassword,
			user.password
		);

		if (!oldPasswordValid) {
			throw new Error('Old password incorrect.');
		}
		const newHashedPassword = await bcrypt.hash(newPassword, 10);

		const usernewPassword = await User.findOneAndUpdate(
			{ username: username },
			{ password: newHashedPassword, defaultPassword: null }
		);

		return usernewPassword;
	} catch (error) {
		throw new Error(error);
	}
}

/**************** DELETES ****************/

export async function deleteSchoolTerm(parent, args) {
	const { _id } = args;

	let query = { _id: _id };

	const toDeleteSchoolTerm = await SchoolTerm.findOneAndRemove(query);

	return toDeleteSchoolTerm;
}

export async function deleteClassHour(parent, args) {
	const { _id } = args;

	let query = { _id: _id };

	const toDeleteClassHour = await ClassHour.findOneAndRemove(query);

	return toDeleteClassHour;
}
export async function deleteGradeClass(parent, args) {
	const { _id } = args;

	let query = { _id: _id };

	const toDeleteClass = await GradeClass.findOneAndRemove(query);

	return toDeleteClass;
}
export async function deleteAssessment(parent, args) {
	const { _id } = args;

	let query = { _id: _id };

	const toDeleteAssessment = await Assessment.findOneAndRemove(query);

	return toDeleteAssessment;
}
export async function deleteExam(parent, args) {
	const { _id } = args;

	let query = { _id: _id };

	const toDeleteExam = await Exam.findOneAndRemove(query);

	return toDeleteExam;
}
export async function deleteSubject(parent, args) {
	const { _id } = args;

	let query = { _id: _id };

	const deleteSubject = await Subject.findOneAndRemove(query);
	return deleteSubject;
}

export async function deleteStaff(parent, args) {
	const { username } = args;

	let query = { username: username };

	const deleteStaff = await Staff.findOneAndRemove(query);

	const deleteUser = await User.findOneAndRemove(query);

	return 'Staff deleted successfully';
}
