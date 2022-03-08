//---------------------------------
// Your own functions here
//---------------------------------


function sayHello() {
    //do something
}
//sayHello();    //invoke function


function insertTeam() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {                                                                 
            // Do something for the current logged-in user here: 
            console.log(user.uid);
            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("team").doc(user.uid);
            //get the document for current user.
            currentUser.get()
                  .then(userDoc => {
               var current_Teams = userDoc.data().teamName;
               console.log(current_Teams);
               //method #1:  insert with html only
               document.getElementById("team-name-here").innerText = current_Teams;    //using javascript
               //method #2:  insert using jquery
            //    $("#team-name-here").text(current_Teams);                         //using jquery
            })
        } else {
            console.log("Please sign in");
        }
    });
}
insertTeam();

function insertName() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {                                                                 
            // Do something for the current logged-in user here: 
            console.log(user.uid);
            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid);
            //get the document for current user.
            currentUser.get()
                  .then(userDoc => {
               var user_Name = userDoc.data().name;
               console.log(user_Name);
               //method #1:  insert with html only
               document.getElementById("name-goes-here").innerText = user_Name;    //using javascript
               //method #2:  insert using jquery
               $("#name-goes-here").text(user_Name);                         //using jquery
            })
        } else {
            // No user is signed in.
        }
    });
}
insertName();

