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
                window.location.assign("join-team-complete.html"); //re-direct to invite.html after signup, comment back in after testing
               
                updateTeam(doc.id, userID); //<---! This teamID needs to be the new one that was just created 
            }).catch(function (error) {
                console.log("Error adding new team: " + error);
            })
        } else {
            console.log("Please log in"); // No user is signed in.
            window.location.href = "index.html";
        }
    })
}

// read_display_Quote()        //calling the function

// function displayTeam() {
//     db.collection("team").get()        //name of the collection and documents should matach excatly with what you have in Firestore
//       .onSnapshot(docID => {                                                               //arrow notation
//            console.log("current document data: " + doc.data());                          //.data() returns data object
//            document.getElementById("team-id").innerHTML = team.data().TeamMembers;      //using javascript to display the data on the right place

//            //Here are other ways to access key:value data fields
//            //$('#quote-goes-here').text(c.data().quote);                                       //using jquery object dot notation
//            //$("#quote-goes-here").text(c.data()["quote"]);                                    //using json object indexing
//       })
// }
// displayTeam();        //calling the function


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
                            console.log(doc.id);
                            console.log(joinID);
                            if (joinID == teamID) {
                                // db.collection("team").doc(joinID).update({
                                //     teamMembers: firebase.firestore.FieldValue.arrayUnion(userID)
                                // }).then(() => {
                                updateTeam(teamID, userID);
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



// var team_Name = teamDoc.data().teamMembers;
// console.log(team_Name);
// //method #1:  insert with html only
// document.add().getElementById("jointeam").innerText  //using javascript

// //add userID to end of teamMembers array in the document with value teamID
// db.collection("team").doc(teamID).appendchild({

// db.collection("team").doc(team.uid).add({
//     teamMembers: userID
// })