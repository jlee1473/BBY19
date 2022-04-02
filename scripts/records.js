function populateStatusDynamically(team) {
    let redButtonRow = document.getElementById("redButtonRow");
    let greenButtonRow = document.getElementById("greenButtonRow");
    let userData = document.getElementById("data");
    userData.innerHTML="";

    db.collection("users")
        .where("memberOf", "==", team)
        .orderBy("latestStatus", "desc")
        .get()
        .then(allusers => {
            allusers.forEach(doc => {
                var teamMember = doc.data().name; //gets the name field
                var status = doc.data().latestStatus;
                if(status == "recovering")  
                    testRecordsTable = redButtonRow.content.cloneNode(true);
                else 
                    testRecordsTable = greenButtonRow.content.cloneNode(true);
                testRecordsTable.querySelector('.user-name').innerHTML = teamMember;
                testRecordsTable.querySelector('.health-status').innerHTML = status;
                var lastUpdate = doc.data().latestStatusTimeStamp.toDate().toDateString();
                testRecordsTable.querySelector('.last-update').innerHTML = lastUpdate;

                userData.appendChild(testRecordsTable);
            })
        })
}

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

//goes to the users collection, and gives everyone "healthy", or "recovering"
function updateHealth(status) {
    //define a variable for the collection you want to create in Firestore to populate data
    db.collection("users")
        .get()
        .then(snap => {
            snap.forEach(doc => {
                //console.log(doc.data());
                db.collection("users").doc(doc.id).set({ //add to database, autogen ID
                    latestStatus: status
                }, {
                    merge: true
                });
            })
        })
}
        // Live listener for changes in sos
function listenStatus() {
    db.collection("users")
        .onSnapshot(snap => {
            displayMyTeam();
        })
}
listenStatus();

//Function initially created to insert correct button colour based on employee status. Not needed now but would like to keep.
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
