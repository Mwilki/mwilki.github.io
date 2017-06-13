# mwilki.github.io


Showcasing of a customizable utility panel which has multiple features that are saved to your browser.
Not only is this the perfect homepage, but any developer can easily change the source code to add, edit, or remove content for further personalization of this application.


<h1> Documentation - Adding a container <h1>

<h2> Simple container <h2>

            <div class="normalbox" id="4container">
                <div class='logoHolder'>
                    <img class="yahoo" src="images/Yahoo.png" draggable="false"/>
                </div>
                <div class='searchContainer'>
                    <form class="form" method="get" action="https://search.yahoo.com/search">
                        <input type="text" name="p" placeholder="Search the web..." class="searchbar" autocomplete="off">
                        <input type="submit" class="searchbutton" value="Search" id="search_text">
                    </form>
                </div>
            </div>

<h2>  Complex container <h2>

            <div class="normalbox" id="3container" draggable="false">
                <div class='logoHolder'>
                    <img class= "google" src="images/Google.png" draggable="false"/>
                </div>
                <div class="buttonHolder">
                    <form class="googlehiddenform" action="https://mail.google.com/mail/u/0/?pli=1#inbox">
                        <input type="submit" name="q" class="leftButton" id="gmail" value="Gmail" >
                    </form>
                    <form class="googlehiddenform" action="https://google.com/news">
                        <input type="submit" name="q" class="middleButton" id="news" value="News" >
                    </form>
                    <form class="googlehiddenform" action="https://translate.google.com">
                        <input type="submit" class="rightButton" id="translate" value="Translate">
                    </form>
                </div>

                <div class='searchContainer'>
                    <form class="form" action="https://google.com/search">
                        <input type="text" name="q" class="input" autocomplete="off" placeholder="Search the web...">
                        <input type="submit" name="searchbutton" value="Search" id="search_text">
                    </form>
                </div>
            </div>

