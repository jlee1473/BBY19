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
// displayMyTeam();

//goes to the users collection, and gives everyone "ok", or "sick"
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

function displayEmployees() {
    db.collection("users")
         .get()
         .then(function (snap) {
             document.getElementById("status-goes-here").innerHTML = ""
             snap.forEach(doc => {
                 //console.log(doc.data());
                 //console.log(doc.data().name);
                 console.log(doc.data().latestStatus);
                 if (doc.data().latestStatus == "recovering")
                 showStatus();
                    //  document.getElementById("status-goes-here").innerHTML +=
                    //  "<button type='button' class='btn btn-danger'>" +
                    //  doc.data().name + " is " + doc.data().latestStatus + "</button> <br>"
                 else
                     document.getElementById("status-goes-here").innerHTML +=
                     "<button type='button' class='btn btn-success'>" +
                     doc.data().name + " is " + doc.data().latestStatus + "</button> <br>"
             })
         })
}

        
    // function displayEmployees() {
    //     db.collection("users")
    //          .get()
    //          .then(function (snap) {
    //              document.getElementById('.health-status').innerHTML = ""
    //              snap.forEach(doc => {
    //                  //console.log(doc.data());
    //                  console.log(doc.data().name);
    //                  console.log(doc.data().status);
    //                  if (doc.data().latestStatus == "recovering")
    //                      document.getElementById('.health-status').innerHTML +=
    //                      "<button type='button' class='btn btn-danger'>" +
    //                      doc.data().name + " is " + doc.data().latestStatus + "</button> <br>"
    //                  else
    //                      document.getElementById('.health-status').innerHTML +=
    //                      "<button type='button' class='btn btn-success'>" +
    //                      doc.data().name + " is " + doc.data().latestStatus + "</button> <br>"
    //              })
    //          })
    //      }

    
// sick();

// function sick() {
//     if ("latestStatus", "==", "healthy"){
//         var removeStatus = document.getElementById("colorID");
//         removeStatus.classList.remove(badge bg-success);
//         removeStatus.classList.add(badge bg-warning);
//     } else {
//         removeStatus.classList.remove(badge bg-warning);
//         removeStatus.classList.add(badge bg-success);
//     }
//     }


//This function will be reserved for pulling all records for a user after a teams link.
// function getStatus(id) {
//             db.collection("users").doc(id).get()
//                 .then(doc => {
//                     console.log(doc.data().currentStatus);
//                     // var memberStatus = doc.data().currentStatus;
//                     // let testRecordsTable = recordsTableTemplate.content.cloneNode(true);
//                     // testRecordsTable.querySelector('.health-status').innerHTML = memberStatus;
//                     // hikeCardGroup.appendChild(testRecordsTable);
//                 })
//         }


    
