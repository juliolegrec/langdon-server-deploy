require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET,
});

export const addLeadingZeros = (num, size) => {
	const diff = size - num.toString().length;

	if (diff < 0) {
		return num;
	}

	for (var i = 0; i < diff; i++) {
		num = '0' + num;
	}

	return num;
};

export function randomNum(x) {
	let uid = '';

	for (let i = 0; i < x; i++) {
		let rand = Math.floor(Math.random() * 10);
		uid = uid + rand;
	}
	return uid;
}

export const pictureUpload = async (file, id, profileType) => {
	const { createReadStream } = await file;

	try {
		const result = await new Promise((resolve, reject) => {
			createReadStream().pipe(
				cloudinary.uploader.upload_stream(
					{ folder: `${profileType}_profile_pic/`, tags: id },
					(error, result) => {
						if (error) {
							// reject(error);
							console.log(error);
						}

						resolve(result);
					}
				)
			);
		});

		return cloudinary.url(result.public_id, {
			gravity: 'face',
			height: 200,
			width: 150,
			crop: 'fill',
		});
	} catch (error) {
		console.log(error);
	}
};
