// ------------------------------------------------------------------------
// Called in the displayMyHistory function which passes the user.uid as 
// a parameter to display all of the user's previous reports ordered 
// by date.
// ------------------------------------------------------------------------

function populateHistoryDynamically(userID) {
    let historyTemplate = document.getElementById("historyTemplate");
    let historyData = document.getElementById("historyData");

    db.collection("users").doc(userID).collection("Reports")
        .orderBy("timestamp", "desc")
        .get()
        .then(allusers => {
            allusers.forEach(doc => {
                let testHistoryTable = historyTemplate.content.cloneNode(true);
                var date = doc.data().timestamp.toDate(); 
                testHistoryTable.querySelector('.date').innerHTML = date;
                var status = doc.data().currentStatus;
                testHistoryTable.querySelector('.health-status').innerHTML = status;
                // var cough = doc.data().Cough;
                // testHistoryTable.querySelector('.cough').innerHTML = cough;

                historyData.appendChild(testHistoryTable);
            })
        })
}

// ------------------------------------------------------------------------
// Called upon loading into history.html which will confirm if the user
// has logged in and pass their user.uid as a parameter to 
// populateHistoryDynamically.
// ------------------------------------------------------------------------
function displayMyHistory() {
    firebase.auth().onAuthStateChanged(user => {

        if (user) {

            let userID = user.uid;

                populateHistoryDynamically(userID);

        }
    })
}
displayMyHistory();
// populateStatusDynamically();




    
