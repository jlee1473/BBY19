function populateStatusDynamically(userID) {
    let historyTemplate = document.getElementById("historyTemplate");
    let userData = document.getElementById("data");

    db.collection("users").doc(userID).collection("Reports")
        .orderBy("timestamp", "desc")
        .get()
        .then(allusers => {
            allusers.forEach(doc => {
                let testHistoryTable = historyTemplate.content.cloneNode(true);
                var date = doc.data().timestamp; //gets the date field
                testHistoryTable.querySelector('.date').innerHTML = date;
                var status = doc.data().currentStatus;
                testHistoryTable.querySelector('.health-status').innerHTML = status;
                var cough = doc.data().Cough;
                testRecordsTable.querySelector('.cough').innerHTML = cough;

                userData.appendChild(testHistoryTable);
            })

        })
}
function displayMyHistory() {
    firebase.auth().onAuthStateChanged(user => {

        if (user) {

            let userID = user.uid;
            // db.collection("users").doc(userID).get().then(doc => {
            //     team = doc.data().memberOf;
            //     console.log(team);
                populateStatusDynamically(userID);
            // })
        }
    })
}
displayMyHistory();
// populateStatusDynamically();

//This function will be reserved for pulling all records for a user after a teams link.
function getStatus(id) {
            db.collection("users").doc(id).get()
                .then(doc => {
                    console.log(doc.data().currentStatus);
                    // var memberStatus = doc.data().currentStatus;
                    // let testRecordsTable = recordsTableTemplate.content.cloneNode(true);
                    // testRecordsTable.querySelector('.health-status').innerHTML = memberStatus;
                    // hikeCardGroup.appendChild(testRecordsTable);
                })
        }


    
