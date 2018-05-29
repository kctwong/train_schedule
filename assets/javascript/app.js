  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC3ntNQ4SpEyyYT9r6OchkwGgjvJLllxhM",
    authDomain: "train-schedule-77af6.firebaseapp.com",
    databaseURL: "https://train-schedule-77af6.firebaseio.com",
    projectId: "train-schedule-77af6",
    storageBucket: "train-schedule-77af6.appspot.com",
    messagingSenderId: "1024595649803"
};

firebase.initializeApp(config);

var database = firebase.database();
var currentTime = moment();


// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot);

    var name = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().firstTrain;
    var frequency = childSnapshot.val().frequency;
    var minAway = childSnapshot.val().minAway;
    var nextTrain = childSnapshot.val().nextTrain;

    $("#train-table > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" +
    frequency + "</td><td>" + nextTrain + "</td><td>" + minAway + "</td></tr>");


});

$("add-train-btn").on("click",function(){
    trainName = $("train-name-input").val().trim();
    destination = $("destination-input").val().trim();
    firstTrain = $("first-input").val().trim();
    frequency = $("frequency-input").val().trim();
   

var startTime = moment(firstTrain, "hh:mm").subtract("years", 1);
var difference = currentTime.diff(moment(startTime),"minutes");
var remainder = differnece % frequency;
var minAway = frequency - remainder;
var nextTrain = currentTime.add(minAway, "minutes").format("hh:mm a")


var newTrain = {
    name: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency,
    minAway: minAway,
    nextTrain: nextTrain,
};

console.log(newTrain);

database.ref().push(newTrain);

$("train-name-input").val("");
$("destination-input").val("");
$("first-input").val("");
$("frequency-input").val("");
   








})