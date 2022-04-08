//This populates the information int he history.html page on load.
function populateHistoryDynamically(userID) {
    let redHistoryTemplate = document.getElementById("redHistoryTemplate");
    let greenHistoryTemplate = document.getElementById("greenHistoryTemplate");
    let historyData = document.getElementById("historyData");
    historyData.innerHTML = ""; //Clears all of the html from "historyData".
    
    //Goes into the Reports subcollection and for the user logged in, it goes through 
    //each document and stores the date and status the user submitted for each report
    //and populates the data into the redHistoryTemplate or greenHistoryTemplate.
    db.collection("users").doc(userID).collection("Reports")
        .orderBy("timestamp", "desc")
        .get()
        .then(allusers => {
            allusers.forEach(doc => {
                var date = doc.data().timestamp.toDate().toDateString();
                var status = doc.data().currentStatus;
                if (status == "recovering") //If user is sick, then populate info into the red template.
                    testHistoryTable = redHistoryTemplate.content.cloneNode(true);
                else
                    //If user is healthy, then populate the info into the green template.
                    testHistoryTable = greenHistoryTemplate.content.cloneNode(true);
                testHistoryTable.querySelector('.date').innerHTML = date;
                testHistoryTable.querySelector('.health-status').innerHTML = status;
                historyData.appendChild(testHistoryTable);
            })
        })
}

// Called upon loading into history.html which will confirm if the user
// has logged in and pass their user.uid as a parameter to 
// populateHistoryDynamically to invoke its function.
function displayMyHistory() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            let userID = user.uid;
            populateHistoryDynamically(userID);
        }
    })
}
displayMyHistory();