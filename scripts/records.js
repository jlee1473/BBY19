function populateStatusDynamically() {
    let recordsTableTemplate = document.getElementById("recordsTableTemplate");
    let hikeCardGroup = document.getElementById("hikeCardGroup");

    db.collection("users").get()
        .then(allusers => {
            allusers.forEach(doc => {
                var teamMember = doc.data().name; //gets the name field
                // var hikeID = doc.data().id; //gets the unique ID field
                // var hikeLength = doc.data().length; //gets the length field
                let testRecordsTable = recordsTableTemplate.content.cloneNode(true);
                testRecordsTable.querySelector('.user-name').innerHTML = teamMember;
                // testHikeCard.querySelector('.card-length').innerHTML = hikeLength;
                // testHikeCard.querySelector('a').onclick = () => setHikeData(hikeID);
                // testHikeCard.querySelector('img').src = `./images/${hikeID}.jpg`;
                // var status = getStatus(doc.id); 
                var status = doc.data().latestStatus;
                testRecordsTable.querySelector('.health-status').innerHTML = status;
                var lastUpdate = doc.data().latestStatusTimeStamp.toDate();
                testRecordsTable.querySelector('.last-update').innerHTML=lastUpdate;
                
                hikeCardGroup.appendChild(testRecordsTable);


            })

        })


}
populateStatusDynamically();

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
        


