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
                hikeCardGroup.appendChild(testRecordsTable);
            })

        })
}
populateStatusDynamically();