function submitReport() {
    console.log("in")
    let status = document.querySelector('input[name="status"]:checked').value;
    console.log(status);

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
