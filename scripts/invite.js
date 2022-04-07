
// Displays the data from the memberOf field in the "team-id" box
function displayMyTeam() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            let userID = user.uid;
            db.collection("users").doc(userID).get().then(doc => {
                team = doc.data().memberOf;
                console.log(team);
                document.getElementById("team-id").innerHTML = team; 
            })
        }
    })
}
displayMyTeam();
