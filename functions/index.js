//import firebase functions modules
const functions = require("firebase-functions");
//import admin module
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

// Listens for new messages added to messages/:pushId
exports.pushNotification = functions.database.ref("/messages/{pushId}").onWrite((change, context) => {
  console.log("Maziah Push notification triggered");

  console.log(change.after);

  //  Grab the current value of what was written to the Realtime Database.
  var valueObject = change.after.val();

  console.log(valueObject);

  // Create a notification
  const payload = {
    notification: {
      title: "News",
      body: valueObject.content,
      sound: "default",
    },
  };

  //Create an options object that contains the time to live for the notification and the priority
  const options = {
    priority: "high",
    timeToLive: 60 * 60 * 24,
  };

  return admin.messaging().sendToTopic("maziah_topic", payload, options);
});
