function populateHistoryDynamically(userID) {
    let historyTemplate = document.getElementById("historyTemplate");
    let historyData = document.getElementById("historyData");

    db.collection("users").doc(userID).collection("Reports")
        .orderBy("timestamp", "desc")
        .get()
        .then(allusers => {
            allusers.forEach(doc => {
                let testHistoryTable = historyTemplate.content.cloneNode(true);
                var date = doc.data().timestamp.toDate(); //gets the date field
                testHistoryTable.querySelector('.date').innerHTML = date;
                var status = doc.data().currentStatus;
                testHistoryTable.querySelector('.health-status').innerHTML = status;
                // var cough = doc.data().Cough;
                // testHistoryTable.querySelector('.cough').innerHTML = cough;

                historyData.appendChild(testHistoryTable);
            })

        })
}
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




    
