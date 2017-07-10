$(document).ready(function(){
    // variables for storing extracted json
    var email;
    var guest;
    var room;
    var company = "[ENTER HOTEL]";
    var city = "[ENTER CITY]";
    var startTicks;
    var time;
    var message;
    var firstName;
    var lastName;

    //  invoking methods
    loadTemplate();
    loadGuests();
    loadCompanies();

    // dynamically change content on option select for guests
    $("#guests").change(function(){
        var index = (this.value - 1);
        changeGuest(index, company, city);
    }); 

    // dynamically change content on option select for company
    $("#companies").change(function(){
        var index = (this.value - 1);
        changeCompany(index);
    });
});

    function loadTemplate(){
        // choose appropriate template data and change mock data accordingly.
        var date = new Date();
        var hours = date.getHours();
        $.getJSON('Template.json', function(data){
            if (hours >= 15 && hours <= 24){
                time = data.greeting_start.evening;
            }
            else if (hours >= 0 && hours <= 11){
                time = data.greeting_start.morning;
            }
            else {
                time = data.greeting_start.afternoon;
            }
        });

    // updates guest name and associated data
    }
    function changeGuest(index, company, city){
        $.getJSON('Guests.json', function(data){
            guest = data[index].firstName;
            room = data[index].reservation.roomNumber;
            startTicks = data[index].reservation.startTimestamp;
            firstName = data[index].firstName;
            lastName = data[index].lastName;
            $("#guestInfo").empty();
            $("#guestInfo").append("<p id='fullname'> Guest - " + firstName + " " + lastName + "</p>");
            message = time + " " + guest + ", and welcome to " + company + ". Room #" + room + " is now available for you" + ". Feel free to reach out to us anytime, our concierge desk is available 24/7 for ticket prices, tour locations, and the best meals in " + city + "!";
            $("#email").val(firstName + "." + lastName + "@aol.com");
            $("#guests").val(0);
            $("#description").val(message);
        });
    }

    // updates company name and associated data
    function changeCompany(index){
        $.getJSON('Companies.json', function(data){
            company = data[index].company;
            city = data[index].city;
            timeZone = data[index].timezone;
            message = time + " " + guest + ", and welcome to " + company + ". Room #" + room + " is now available for you" + ". Feel free to reach out to us anytime, our concierge desk is available 24/7 for ticket prices, tour locations, and the best meals in " + city + "!";
            $("#email").val(firstName + "." + lastName + "@aol.com");
            $("#companies").val(0);
            $("#description").val(message);
        });
    }
    
    // populate dropdown for Guest names
    function loadGuests(){
        $.getJSON('Guests.json', function(data) {
            $.each( data, function( key, value ) {
                $("#guests").append('<option value="' + value.id + '">' + value.firstName + '</option>');
            });
        },JSON);
    }


    // populate dropdown for Company names
    function loadCompanies(){
        $.getJSON('Companies.json', function(data) {
            $.each( data, function( key, value ) {
                $("#companies").append('<option value="' + value.id + '">' + value.company + '</option>');
            });
        },JSON);
    }

// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, determine if message will be sent.
btn.onclick = function(event) {
    event.preventDefault();
    if ($("#description").val() == "")
    {
        $("#success").text("Cannot send blank message...");
    } 
    else if ($("#description").val().includes("[ENTER HOTEL]")) 
    {
        $("#success").text("Please enter hotel name...");
    }
    else if($("#email").val() == ""){
        $("#success").text("Please enter an email...");
    }
    else {
        $("#success").text("sending...");
        // so much real
        setTimeout(function(){
            $("#email").val("");
            $("#description").val("");
            $("#fullname").text("sent message!");
            modal.style.display = "none";
        }, 2000);
    }
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
