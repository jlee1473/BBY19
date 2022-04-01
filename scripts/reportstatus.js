// ------------------------------------------------------------------------
// Called upon clicking the submit button in reportstatus.html 
// once the user has finished selecting all options for their self-report.
// ------------------------------------------------------------------------
function submitReport() {
    console.log("in")
    let status = document.querySelector('input[name="status"]:checked').value;
    console.log(status);
    let cough = document.querySelector('input[name="cough"]:checked').value;
    console.log(cough);
    let fatigue = document.querySelector('input[name="fatigue"]:checked').value;
    console.log(fatigue);
    let lossOfTasteSmell = document.querySelector('input[name="loss-of-taste-or-smell"]:checked').value;
    console.log(lossOfTasteSmell);
    let breathing = document.querySelector('input[name="breathing-difficulty"]:checked').value;
    console.log(breathing);
    let chestPain = document.querySelector('input[name="chest-pain"]:checked').value;
    console.log(chestPain);


    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var userID = user.uid;

            db.collection("users").doc(user.uid).collection("Reports").add({
                userID: userID,
                currentStatus: status,
                Cough: cough,
                Fatigue: fatigue,
                LossOfTasteOrSmell: lossOfTasteSmell,
                difficultyBreathing: breathing,
                chestPain: chestPain,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            }).then(() => {
                updateStatus(status, userID);
            })
        } else {
            console.log("Please log in"); // No user is signed in.
            window.location.href = "index.html";
        }
    });
}

// ------------------------------------------------------------------------
// Invoked once submitReport is called to update the users collection 
// userID with the users current status.
// ------------------------------------------------------------------------
function updateStatus(status, userID) {
    db.collection("users").doc(userID).update({
        latestStatus: status,
        latestStatusTimeStamp: firebase.firestore.FieldValue.serverTimestamp()
    })
        .then(window.location.href = "submit-complete.html"); //new line added)
}
