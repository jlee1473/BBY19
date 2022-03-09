function submitReport() {
    console.log("in")
    let Healthy = document.querySelector('input[name="status"]:checked').value;
    console.log(Healthy);

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid)
            var userID = user.uid;
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    var userEmail = userDoc.data().email;
                    db.collection("Reports").add({
                        userID: userID,
                        currentStatus: Healthy,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    }).then(()=>{
                        window.location.href = "report4.html"; //new line added
                    })
                })
                   
        } else {
            // No user is signed in.
        }
    });

}