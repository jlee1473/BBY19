function populateStatusDynamically(team) {
    let recordsTableTemplate = document.getElementById("recordsTableTemplate");
    let userData = document.getElementById("data");

    db.collection("users")
        .where("memberOf", "==", team)
        .orderBy("latestStatus", "desc")
        .get()
        .then(allusers => {
            allusers.forEach(doc => {
                var teamMember = doc.data().name; //gets the name field
                let testRecordsTable = recordsTableTemplate.content.cloneNode(true);
                testRecordsTable.querySelector('.user-name').innerHTML = teamMember;
                var status = doc.data().latestStatus;
                testRecordsTable.querySelector('.health-status').innerHTML = status;
                var lastUpdate = doc.data().latestStatusTimeStamp.toDate();
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

displayMyTeam();
populateStatusDynamically();
// sick();

// function sick() {
//     if ("latestStatus", "==", "healthy"){
//         var removeStatus = document.getElementById("myDIV");
//         removeStatus.classList.remove(btn btn-success);
//         removeStatus.classList.add(btn btn-warning);
//     } else {
//         removeStatus.classList.remove(btn btn-warning);
//         removeStatus.classList.add(btn btn-success);
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


    
