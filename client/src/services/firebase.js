// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
import axios from 'axios';

const firebaseConfig = {
	apiKey: "AIzaSyC6yrfTc1huWqjwQfMcOukIdAKpICFyAKE",
	authDomain: "travel-social-eb053.firebaseapp.com",
	projectId: "travel-social-eb053",
	storageBucket: "travel-social-eb053.appspot.com",
	messagingSenderId: "796598518970",
	appId: "1:796598518970:web:d9b7fdff06c6de2e8d6e83",
	measurementId: "G-SLECTMXSWC"
};
export const app = initializeApp(firebaseConfig);
// export const messaging = getMessaging(app);



// Send a message to the device corresponding to the provided
// registration token.
// import admin from 'firebase-admin';
// import serviceAccount from "./travel-social-eb053-firebase-adminsdk-4gnem-b2a3a78a7f.json";

// admin.initializeApp({
// 	credential: admin.credential.cert(serviceAccount),
// 	// Add your Firebase project ID
// 	projectId: 'travel-social-eb053',
// });

// export const sendMessage = () => {
// 	// This device token comes from the client FCM SDKs.
// 	const deviceToken = 'fpt_Xx7rPamN-MVn2EDQoo:APA91bGYoHc_2x-bZxlDPlNITPPialL0k3fNkjQsYZc3OUAbwnCRtFqBrdsPqJdHMt1MslnTLFQdBDBD4Hs52l7v3KYPDpDjif7My7WQgMLZjvJhjw1Xkp2jZFlwNlvrz3Bsze0rv4k6';

// 	const message = {
// 		notification: {
// 			title: 'Notification Title',
// 			body: 'Test test test',
// 		},
// 		// Add the target device token(s)
// 		token: deviceToken,
// 	};

// 	admin.messaging().send(message)
// 		.then((response) => {
// 			console.log('Notification sent successfully:', response);
// 		})
// 		.catch((error) => {
// 			console.error('Error sending notification:', error);
// 		});
// }


let YOUR_FIREBASE_WEB_API_KEY = "AAAAuXj4xLo:APA91bHxnnAgKjGX7CTYo6IBUkHvTr9oj-8GoYVzlocsP9LjAhAR7NPRmZc50j4Ag4yCIrxD1qPgv45GbKMctmImTubEbIAaT_tuFChl__qz42DuMUOVf7XpSx1_DAA5j0GH_kXN3UFH";
let chi_dat_deviceKey = "fpt_Xx7rPamN-MVn2EDQoo:APA91bGYoHc_2x-bZxlDPlNITPPialL0k3fNkjQsYZc3OUAbwnCRtFqBrdsPqJdHMt1MslnTLFQdBDBD4Hs52l7v3KYPDpDjif7My7WQgMLZjvJhjw1Xkp2jZFlwNlvrz3Bsze0rv4k6";
// đổi token = deviceKey sẽ hiện trong console log phần currentToken
export const sendNotification = async (token, title, body) => {
	const message = {
		to : chi_dat_deviceKey,
		notification: {
			title,
			body,
		},
	};

	const res = await axios.post('https://fcm.googleapis.com/fcm/send', message, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `key=${YOUR_FIREBASE_WEB_API_KEY}`,
		},
	})
		.catch((error) => {
			console.log('Error sending notification:', error);
		});
	return res;
}
