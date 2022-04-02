function populateHistoryDynamically(userID) {
    let redHistoryTemplate = document.getElementById("redHistoryTemplate");
    let greenHistoryTemplate = document.getElementById("greenHistoryTemplate");
    let historyData = document.getElementById("historyData");
    historyData.innerHTML = "";

    db.collection("users").doc(userID).collection("Reports")
        .orderBy("timestamp", "desc")
        .get()
        .then(allusers => {
            allusers.forEach(doc => {
                // let testHistoryTable = historyTemplate.content.cloneNode(true);
                var date = doc.data().timestamp.toDate().toDateString();
                var status = doc.data().currentStatus;
                if (status == "recovering")
                    testHistoryTable = redHistoryTemplate.content.cloneNode(true);
                else
                    testHistoryTable = greenHistoryTemplate.content.cloneNode(true);
                testHistoryTable.querySelector('.date').innerHTML = date;
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





