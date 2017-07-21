Instructions for how to run your program:

This project was designed as a web application and can be opened in any of your favorite web browsers by simply clicking hotel.html

An overview of design decisions:
I chose to utilize a free bootstrap template that allowed for responsive flow between media views.
I used Jquery's getJSON() method to open the local .json files.

Ultimately I'm making an ajax request to a locally stored file.  This may have not been the most appropriate way to access a local file but it certainly was the easiest.  Make sure you have a CORS (cross origin) extention on your browser, or just visit the live demo here: mwilki.github.io/messenger/hotel

What language you picked and why 
vanilla JavaScript and jQuery for ajax / dom manipulation.
I chose JS because it was immediately relevant to Kipsu's tech stack.

Your process for verifying the correctness of you program 
I actively tried to break the application.
Validation measurements were also made to guarantee a client wouldn't send a message template without first filling in the blanks (message, email, guest name, hotel)

What didn't you get to, or what else might you do with more time?
I'd like to hook the application up to a MySQL database.
Something else that would be cool : append some links relevant to the guest's city (restaurants, beaches, stores) that are within a < 5 mile radius of their hotel.