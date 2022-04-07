function displayMyTeam() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            let userID = user.uid;
            db.collection("users").doc(userID).get().then(doc => {
                team = doc.data().memberOf;
                console.log(team);
                populateStatusDynamically(team);
            })
        }
    })
}

//This function inserts the users 
function populateStatusDynamically(team) {
    let redButtonRow = document.getElementById("redButtonRow");
    let greenButtonRow = document.getElementById("greenButtonRow");
    let userData = document.getElementById("data");
    userData.innerHTML = ""; //Clears the html stored in the userData variable which is pointing to the "data" id.

    db.collection("users")
        .where("memberOf", "==", team)//gets each person from the users collection that is on the same team as the user logged in.
        .orderBy("latestStatus", "desc")//orders the display of each user displaying the users that are of "recovering" status first and then "healthy" status.
        .get()
        .then(allusers => {
            allusers.forEach(doc => {
                var teamMember = doc.data().name; //gets the name field
                var status = doc.data().latestStatus; //gets the latest health status from the latestStatus field.
                if (status == "recovering")
                    testRecordsTable = redButtonRow.content.cloneNode(true); //Copies the attributes of the redButtonRow template.
                else
                    testRecordsTable = greenButtonRow.content.cloneNode(true); //Copies the attributes of the greenButtonRow template.
                testRecordsTable.querySelector('.user-name').innerHTML = teamMember;
                testRecordsTable.querySelector('.health-status').innerHTML = status;
                var lastUpdate = doc.data().latestStatusTimeStamp.toDate().toDateString(); //Reads the latestStatusTimeStamp value from firebase and displays the date and time of the users last self-report and formats it for readability
                testRecordsTable.querySelector('.last-update').innerHTML = lastUpdate; 
                userData.appendChild(testRecordsTable); //inserts this information into the corresponding redButtonRow or greenButtonRow template.
            })
        })
}

function listenStatus() {
    db.collection("users")
        .onSnapshot(snap => {
            displayMyTeam();
        })
}
listenStatus();

//Goes to the users collection, and listens for any changes made to the latestStatus field in the users collection and updates these changes immediately by invoking their status to "healthy", or "recovering"
// function updateHealth(status) {
//     //define a variable for the collection you want to create in Firestore to populate data
//     db.collection("users")
//         .get()
//         .then(snap => {
//             snap.forEach(doc => {
//                 db.collection("users").doc(doc.id).set({ //add to database, autogen ID
//                     latestStatus: status
//                 }, {
//                     merge: true
//                 });
//             })
//         })
// }
// Live listener for changes in sos in the users collection that will trigger updates and invoke displayMyTeam function.

//Would like to keep this code for now. Function initially created to insert correct button colour based on employee status. 
// function displayEmployees() {
//     db.collection("users")
//          .get()
//          .then(function (snap) {
//              document.getElementById("status-goes-here").innerHTML = ""
//              snap.forEach(doc => {
//                  //console.log(doc.data());
//                  //console.log(doc.data().name);
//                  console.log(doc.data().latestStatus);
//                  if (doc.data().latestStatus == "recovering")
//                  showStatus();
//                     //  document.getElementById("status-goes-here").innerHTML +=
//                     //  "<button type='button' class='btn btn-danger'>" +
//                     //  doc.data().name + " is " + doc.data().latestStatus + "</button> <br>"
//                  else
//                      document.getElementById("status-goes-here").innerHTML +=
//                      "<button type='button' class='btn btn-success'>" +
//                      doc.data().name + " is " + doc.data().latestStatus + "</button> <br>"
//              })
//          })
// }