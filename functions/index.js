const functions = require("firebase-functions");
const admin = require('firebase-admin')
const sendGrid = require('@sendgrid/mail')

admin.initializeApp()
const db = admin.firestore()

const sendGridKey = functions.config().sendgrid.key



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

exports.sendContactEmail = functions.firestore.document('contactMessages/{contactId}').onCreate(async (snap, context) => {
  const { name, email, message } = snap.data()
  const text = `<div>
    <h4>Information</h4>
    <ul>
      <li>
        Name - ${name || ""}
      </li>
      <li>
        Email - ${email || ""}
      </li>
    </ul>
    <h4>Message</h4>
    <p>${message || ""}</p>
  </div>`;
  const msg = {
    to: "vlad+donateforukraine@vmdumitrache.dev",
    from: "no-reply@donateforukraine.org",
    subject: `${name} submitted a contact form`,
    text: text,
    html: text
  };
  sendGrid.setApiKey(sendGridKey);

  sendGrid
  .send(msg)
  .then(() => {
    console.log("Email sent!");
  })
  .catch((err) => {
    console.log(err);
  })
});
