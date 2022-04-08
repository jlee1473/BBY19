//This function checks if the user is logged in, and if they are then stores their unique
//userID into the userID variable and then goes into the users collection and gets the team
//ID of that user and passes it as a parameter into populateStatusDynamically().
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

//This function gets all the users that are on the same team and for each 
//member of the team, it gets their name, latestStatus and latest update time and
//inserts it into the appropriate template. This also displays the
//sickest users at the top of the list.
function populateStatusDynamically(team) {
    let redButtonRow = document.getElementById("redButtonRow");
    let greenButtonRow = document.getElementById("greenButtonRow");
    let userData = document.getElementById("data");
    //Clears the html stored in the userData variable which 
    //is pointing to the "data" id from records2.html.
    userData.innerHTML = ""; 

    db.collection("users")
        //gets each person from the users collection that is on 
        //the same team as the user logged in.
        .where("memberOf", "==", team) 
        //orders the display of each user displaying the users that are of 
        //"recovering" status first and then "healthy" status.
        .orderBy("latestStatus", "desc") 
        .get()
        .then(allusers => {
            allusers.forEach(doc => {
                var teamMember = doc.data().name; //gets the name field
                //gets the latest health status from the latestStatus field.
                var status = doc.data().latestStatus; 
                if (status == "recovering")
                    //Copies the attributes of the redButtonRow template.
                    testRecordsTable = redButtonRow.content.cloneNode(true); 
                else
                    //Copies the attributes of the greenButtonRow template.
                    testRecordsTable = greenButtonRow.content.cloneNode(true); 
                testRecordsTable.querySelector('.user-name').innerHTML = teamMember;
                testRecordsTable.querySelector('.health-status').innerHTML = status;
                //Reads the latestStatusTimeStamp value from firebase and displays the date
                //and time of the users last self-report and formats it for readability
                var lastUpdate = doc.data().latestStatusTimeStamp.toDate().toDateString(); 
                testRecordsTable.querySelector('.last-update').innerHTML = lastUpdate; 
                //inserts this information into the corresponding redButtonRow or greenButtonRow template.
                userData.appendChild(testRecordsTable); 
            })
        })
}

//Live listener for any changes made to the users collection which will 
//invoke the displayMyTeam() function if there are any changes.
function listenStatus() {
    db.collection("users")
        .onSnapshot(snap => {
            displayMyTeam();
        })
}
listenStatus();

