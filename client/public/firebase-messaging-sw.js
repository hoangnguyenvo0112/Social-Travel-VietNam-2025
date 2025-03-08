importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

firebase.initializeApp({
	apiKey: "AIzaSyC6yrfTc1huWqjwQfMcOukIdAKpICFyAKE",
	authDomain: "travel-social-eb053.firebaseapp.com",
	projectId: "travel-social-eb053",
	storageBucket: "travel-social-eb053.appspot.com",
	messagingSenderId: "796598518970",
	appId: "1:796598518970:web:d9b7fdff06c6de2e8d6e83",
	measurementId: "G-SLECTMXSWC"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message:', payload);
  // Handle the background notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
