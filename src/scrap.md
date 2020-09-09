// Student Attendance Registration Crap

let newAbsentees = {
classRecorded: classRecording,
};

    allPresent
    	? (newAbsentees['absentees'] = ['ALL PRESENT'])
    	: (newAbsentees['absentees'] = absentee.split(','));

    if (existingAttendanceEntry) {
    	let classRecordedToday = [];

    	for (const record of existingAttendanceEntry.absentee) {
    		classRecordedToday.push(record.classRecorded);
    	}

    	if (classRecordedToday.indexOf(classRecording) === -1) {
    		const attendance = await StudentAttendance.findOneAndUpdate(
    			{ dateOfAttendance },
    			{
    				absentee: [...existingAttendanceEntry.absentee, absentees],
    			}
    		);
    		return attendance;
    	} else {
    		const absentees2 = [newAbsentees];

    		console.log(dateOfAttendance);

    		const newAttendanceRecord = existingAttendanceEntry.absentee.map(
    			(obj) =>
    				absentees2.find((o) => o.classRecorded === obj.classRecorded) || obj
    		);

    		const attendance = await StudentAttendance.findOneAndUpdate(
    			{ dateOfAttendance },
    			{
    				absentee: newAttendanceRecord,
    			},
    			(error, doc) => {
    				if (error) {
    					console.log(`Error is ${error}`);
    				}

    				console.log(doc);
    			}
    		);
    		return attendance;
    	}
    } else {
    	const attendance = new StudentAttendance({
    		dateOfAttendance,
    		absentee: [absentees],
    	});
    	attendance.save();
    	return { ...attendance._doc };
    }
