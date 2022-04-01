function createTeam() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var userDoc = db.collection("users").doc(user.uid)
            var userID = user.uid;
            //get the document for current user.
            userDoc.get()

            var teamID = db.collection("team");
            // Team successfully created.
            // creates a new team with a unique ID and adds the user to that team
            teamID.add({
                teamMembers: [userID]
            }).then(function (doc) {
                console.log("New team added to firestore");
                window.location.assign("join-team-complete.html"); //re-direct to invite.html after signup
                updateTeam(doc.id, userID);
            }).catch(function (error) {
                console.log("Error adding new team: " + error);
            })
        } else {
            console.log("Please log in"); // No user is signed in.
            window.location.href = "index.html";
        }
    })
}

function joinTeam() {

    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {
            // Do something for the current logged-in user here: 
            //teamID and userID are put into variables
            let userID = user.uid;
            var userDoc = db.collection("users").doc(user.uid)

            db.collection("team").get()
                .then(
                    snap => {
                        snap.forEach(doc => {
                            var teamID = doc.id;
                            var joinID = document.getElementById("jointeam").value;
                            joinID = joinID.trim();
                            console.log(doc.id);
                            console.log(joinID);
                            if (joinID == teamID) {
                                db.collection("team").doc(joinID).update({
                                    teamMembers: firebase.firestore.FieldValue.arrayUnion(userID)
                                }).then(() => {
                                    updateTeam(teamID, userID);
                                })
                            }
                        })
                    })
        } else {
            console.log("Please log in to join a team");
        }
    })
}

function updateTeam(teamID, userID) {
    db.collection("users").doc(userID).update({
        memberOf: teamID
    })
}