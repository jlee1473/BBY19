var currentUser;
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUser = db.collection("users").doc(user.uid);   //global
        console.log(currentUser);

        // the following functions are always called when someone is logged in
        //read_display_Quote();
        insertName();
        insertStatus();
        //populateCardsDynamically();
    } else {
        // No user is signed in.
        console.log("No user is signed in");
        window.location.href = "login.html";
    }
});

// ------------------------------------------------------------------------
// Called in homepage.html to display the current user's name onto the 
// landing page.
// ------------------------------------------------------------------------
function insertName() {
    // to check if the user is logged in:


    currentUser.get().then(userDoc => {
        //get the user name
        var user_Name = userDoc.data().name;
        console.log(user_Name);
        $("#name-goes-here").text(user_Name); //jquery
        // document.getElementByID("name-goes-here").innetText=user_Name;



    })
}

// ------------------------------------------------------------------------
// Called in homepage.html to display the current user's status onto
// the landing page.
// ------------------------------------------------------------------------
function insertStatus() {
    let greenStatus = document.getElementById("greenStatus");
    let redStatus = document.getElementById("redStatus");
    let statusData = document.getElementById("insertStatus");
    statusData.innerHTML = "";

    currentUser.get().then(userDoc => {
        var status = userDoc.data().latestStatus;
        console.log(status);
        if (status == "recovering")
            statusLabel = redStatus.content.cloneNode(true);
        else
            statusLabel = greenStatus.content.cloneNode(true);
        statusLabel.querySelector('.status-goes-here').innerHTML = status;
        // console.log(status);

        // $("#status-goes-here").text(status);
        statusData.appendChild(statusLabel);
    })
}
