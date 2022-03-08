//---------------------------------
// Your own functions here
//---------------------------------


function sayHello() {
    //do something
}
//sayHello();    //invoke function

function read_display_Team() {
    //name of the collection and documents should matach excatly with what you have in Firestore
    db.collection("team").doc("lv9OWXT8E8UFPr5ypBFF") 
        .onSnapshot(teamDoc => { //arrow notation
            console.log("current team name: " + teamName.data()); //.data() returns data object
            //using javascript to display the data on the right place
            document.getElementById("teamName").innerHTML = lv9OWXT8E8UFPr5ypBFF.data().teamName;

            //Here are other ways to access key:value data fields
            //$('#quote-goes-here').text(c.data().quote);        //using jquery object dot notation
            //$("#quote-goes-here").text(c.data()["quote"]);      //using json object indexing
        })
}