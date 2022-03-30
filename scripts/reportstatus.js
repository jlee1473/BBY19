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
            var currentUser = db.collection("users").doc(user.uid)
            var userID = user.uid;
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    var userEmail = userDoc.data().email;
                    db.collection("users").doc(user.uid).collection("Reports").add({
                    //db.collection("Reports").add({//
                        userID: userID,
                        currentStatus: status,
                        Cough: cough,
                        Fatigue: fatigue,
                        LossOfTasteOrSmell: lossOfTasteSmell,
                        difficultyBreathing: breathing,
                        chestPain: chestPain,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    }).then(()=>{
                        updateStatus(status, userID);
                    })
                })
                   
        } else {
            console.log("Please log in"); // No user is signed in.
            window.location.href = "index.html";
        }
    });
}

function updateStatus(status, userID) {
    db.collection("users").doc(userID).update({
        latestStatus: status,
        latestStatusTimeStamp: firebase.firestore.FieldValue.serverTimestamp()
    }) 
    .then(window.location.href = "submit-complete.html"); //new line added)
}
