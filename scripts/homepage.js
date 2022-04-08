var currentUser;
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUser = db.collection("users").doc(user.uid); 
        console.log(currentUser);

        // the following functions are always called when someone is logged in

        // Insert the users' name into homepage.html
        insertName();
        // Insert the users' status into homepage.html
        insertStatus();
    } else {
        // No user is signed in.
        console.log("No user is signed in");
        // Redirect to login page if no user is signed in.
        window.location.href = "login.html";
    }
});

// Called in homepage.html to display the current user's name onto the 
// landing page.
function insertName() {

    currentUser.get().then(userDoc => {
        // get the name field
        var user_Name = userDoc.data().name;
        console.log(user_Name);
        // insert the users' name into the welcome message
        $("#name-goes-here").text(user_Name);
    })
}

// Called in homepage.html to display the current user's status onto
// the landing page.
function insertStatus() {
    let greenStatus = document.getElementById("greenStatus");
    let redStatus = document.getElementById("redStatus");
    let statusData = document.getElementById("insertStatus");

    // Clears the html stored in the statusData variable which is pointing to the "insertStatus" id.
    statusData.innerHTML = "";

    currentUser.get().then(userDoc => {
        // gets the users' latest health status from the latestStatus field.
        var status = userDoc.data().latestStatus;
        if (status == "recovering")
            // Copies the attributes of the redStatus template.
            statusLabel = redStatus.content.cloneNode(true); 
        else
            // Copies the attributes of the greenStatus template.
            statusLabel = greenStatus.content.cloneNode(true); 

        // Inserts the status into the appropriate template
        statusLabel.querySelector('.status-goes-here').innerHTML = status;

        // inserts this information into the corresponding redStatus or greenStatus template
        statusData.appendChild(statusLabel);
    })
}
