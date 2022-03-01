const functions = require("firebase-functions");

const admin = require('firebase-admin')

admin.initializeApp()

const db = admin.firestore()

exports.AddUserRole = functions.auth.user().onCreate(async function (authUser) {

    if (authUser.email === 'v.m.dumitrache@gmail.com') {
      const customClaims = {
        admin: true
      };
      try {
        var _ = await admin.auth().setCustomUserClaims(authUser.uid, customClaims);

        return db.collection("roles").doc(authUser.uid).set({
          email: authUser.email,
          role: customClaims
        });

      } catch (error) {
        console.log(error);
      }

    }

  });
