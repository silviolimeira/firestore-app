var admin = require("firebase-admin");

var serviceAccount = require("d:/Users/silvio.limeira/notablenotes-b7bcb-firebase-adminsdk-ltxkd-162060bb14.json");

var defaultApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://notablenotes-b7bcb.firebaseio.com"
});

console.log("Admin App");

console.log("defaultApp.name: ", defaultApp.name);

// Retrieve services via the defaultApp variable...
var defaultAuth = defaultApp.auth();
var defaultDatabase = defaultApp.database();

// ... or use the equivalent shorthand notation
defaultAuth = admin.auth();
defaultDatabase = admin.database();

// // https://firebase.google.com/docs/auth/admin/manage-users/#retrieve_user_data
// admin
//   .auth()
//   .getUser("Xcrixj6k5LWjGdoCHJqd20KOUmJ3")
//   .then(function(userRecord) {
//     // See the UserRecord reference doc for the contents of userRecord.
//     console.log("Successfully fetched user data:", userRecord.toJSON());
//   })
//   .catch(function(error) {
//     console.log("Error fetching user data:", error);
//   });

// // https://firebase.google.com/docs/auth/admin/manage-users/#retrieve_user_data
// admin
//   .auth()
//   .getUserByEmail("silvio.limeira@live.com")
//   .then(function(userRecord) {
//     // See the UserRecord reference doc for the contents of userRecord.
//     console.log("Successfully fetched user data:", userRecord.toJSON());
//   })
//   .catch(function(error) {
//     console.log("Error fetching user data:", error);
//   });

// // https://firebase.google.com/docs/auth/admin/manage-users/#retrieve_user_data
// admin
//   .auth()
//   .getUserByPhoneNumber(phoneNumber)
//   .then(function(userRecord) {
//     // See the UserRecord reference doc for the contents of userRecord.
//     console.log("Successfully fetched user data:", userRecord.toJSON());
//   })
//   .catch(function(error) {
//     console.log("Error fetching user data:", error);
//   });

// // Criar usuário
// admin
//   .auth()
//   .createUser({
//     email: "user@example.com",
//     emailVerified: false,
//     phoneNumber: "+11234567890",
//     password: "secretPassword",
//     displayName: "John Doe",
//     photoURL: "http://www.example.com/12345678/photo.png",
//     disabled: false
//   })
//   .then(function(userRecord) {
//     // See the UserRecord reference doc for the contents of userRecord.
//     console.log("Successfully created new user:", userRecord.uid);
//   })
//   .catch(function(error) {
//     console.log("Error creating new user:", error);
//   });

// Create user with id
admin
  .auth()
  .createUser({
    uid: "some-uid",
    email: "user1@example.com",
    phoneNumber: "+12234567890"
  })
  .then(function(userRecord) {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log("Successfully created new user:", userRecord.uid);
  })
  .catch(function(error) {
    console.log("Error creating new user:", error);
  });
