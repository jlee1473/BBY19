
// When called, the current user will create a new team in the db
// and their userID will be added to that team, then redirect to invite page
function createTeam() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var userDoc = db.collection("users").doc(user.uid)
            var userID = user.uid;
            // Get the document for current user.
            userDoc.get()
            var teamID = db.collection("team");
            // Team successfully created.
            // Creates a new team with a unique ID and adds the user to that team
            teamID.add({
                teamMembers: [userID]
            }).then(function (doc) {
                console.log("New team added to firestore");
                // Re-direct to invite.html after signup
                window.location.assign("join-team-complete.html"); 
                // Updates current users' memberOf field
                updateTeam(doc.id, userID); 
            }).catch(function (error) {
                console.log("Error adding new team: " + error);
            })
        } else {
            // If no user is signed in.
            console.log("Please log in"); 
            window.location.href = "index.html";
        }
    })
}

// When called, the users ID will be added to the 
// team matching the value in the jointeam textbox
function joinTeam() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {
            // TeamID and userID are put into variables
            let userID = user.uid;
            var userDoc = db.collection("users").doc(user.uid)
            db.collection("team").get()
                .then(
                    snap => {
                        snap.forEach(doc => {
                            var teamID = doc.id;
                            // Compares value in the jointeam textbox to each teamID in the database
                            var joinID = document.getElementById("jointeam").value; 
                            joinID = joinID.trim();
                            console.log(doc.id, joinID); 
                            // If there is a match, the user is added to that team
                            if (joinID == teamID) { 
                                db.collection("team").doc(joinID).update({
                                    teamMembers: firebase.firestore.FieldValue.arrayUnion(userID)
                                }).then(() => {
                                    // Then updates the users' memberOf field
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

// MemberOf field of the user is replaced with the new teamID
// Input parameters: The new team id of the requested user and their user id
function updateTeam(teamID, userID) {
    db.collection("users").doc(userID).update({
        memberOf: teamID
    })
        .then(window.location.href = "join-team-complete.html");
}
