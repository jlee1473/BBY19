// Called upon clicking the submit button in reportstatus.html 
// once the user has finished selecting all options for their self-report.
function submitReport() {
    // Value of current status input assigned to status variable.
    let status = document.querySelector('input[name="status"]:checked').value;
    // Value of cough severity input assigned to cough variable.
    let cough = document.querySelector('input[name="cough"]:checked').value;
    // Value of fatigue severity input assigned to fatigue variable.
    let fatigue = document.querySelector('input[name="fatigue"]:checked').value;
    // Value of severity in loss of taste or smell input assigned to lossOfTasteSmell variable.
    let lossOfTasteSmell = document.querySelector('input[name="loss-of-taste-or-smell"]:checked').value;
    // Value of breathing difficulty severity input assigned to breathing variable.
    let breathing = document.querySelector('input[name="breathing-difficulty"]:checked').value;
    // Value of chest pain severity input assigned to chestPain variable.
    let chestPain = document.querySelector('input[name="chest-pain"]:checked').value;
    // Confirms if a user is signed in. 
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var userID = user.uid;
            // Write the values to a document in a subcollection called "Reports" located 
            // within a collection of "users" in the current users' user id.
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
                // invokes a function to update the users current status
                updateStatus(status, userID);
            })
        } else {
            // No user is signed in.
            console.log("Please log in");
            // Redirect to the login page.
            window.location.href = "index.html";
        }
    });
}

// Invoked once submitReport is called to update the latestStatus field with 
// either a "healthy" or "recovering" status in the users' specific user id
// document located in the "users" collection.
function updateStatus(status, userID) {
    // Updates the users' latest status with the same value they submitted in 
    // the submitReport function along with the timestamp at the time of submission
    db.collection("users").doc(userID).update({
        latestStatus: status,
        latestStatusTimeStamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    // Confirm submission by redirecting the user to a confirmation page.
        .then(window.location.href = "submit-complete.html"); //new line added)
}
