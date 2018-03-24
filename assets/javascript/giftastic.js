$(document).ready(function() {

    //initialize the variables
    var giftasticObj = {
        topics: ['hogwarts','Harry Potter', 'Ron Weasley', 'Hermione Grange', 'Lord Voldemort', 'Albus Dumbledore', 'Severus Snape', 'Rubeus Hagrid', ],
        currentSelection: "",
        userInput: "",
        giphyApiUrl: "https://api.giphy.com/v1/gifs/search?",
        giphyApiKey: "dc6zaTOxFJmzC",
        
        //empty the buttons and populate the buttons
        renderButtons: function() {
            $("#buttonsBar").empty();
            for (var i = 0; i < this.topics.length; i++) {
                var a = $("<button>");
                a.addClass("buttons btn btn-info");
                a.attr("data-name", this.topics[i]);
                a.text(this.topics[i]);
                $("#buttonsBar").append(a);
            }
            $(".buttons").on("click", function() {
                giftasticObj.currentSelection = $(this).attr("data-name");
                giftasticObj.displayGifs();
            });
        },

        displayGifs: function() {
            console.log(this.currentSelection);
            // first build the ajax query based on current button clicked
            var topicToDisplay = this.currentSelection;
            var queryURL = this.giphyApiUrl + "&q=" + topicToDisplay + "&limit=10&api_key=" + this.giphyApiKey;
    
            // make the ajax query and store the response
            $.ajax({url: queryURL, method: "GET"}).done(function(response) {
                console.log(response);
                $("#gifsWindow").empty();
                for (var i = 0; i < response.data.length; i++) {
                    var gitObject = response.data[i];
                    var gifStill = response.data[i].images.fixed_height_still.url;
                    var gifActive = response.data[i].images.fixed_height.url;
                    var gifRating = response.data[i].rating;
    
                    var gifDiv = $("<div class='topic col-md-4 col-sm-12 text-center'>");
                    var addGifRating = $("<p>").text("Rating: " + gifRating);
                    gifDiv.append(addGifRating);
                    var image = $("<img class='gif center-block'>").attr("src", gifStill);
                    image.addClass("myShowImage");
                    image.attr("data-still", gifStill);
                    image.attr("data-moving", gifActive);
                    gifDiv.append(image);
                    $("#gifsWindow").append(gifDiv);
                }
    
                // create on clicks for each image that has been displayed
                $(".myShowImage").on("click", function() {
                    if ($(this).attr("src") == $(this).attr("data-still")) {
                        $(this).attr("src", $(this).attr("data-moving"));
                    } else if ($(this).attr("src") == $(this).attr("data-moving")) {
                        $(this).attr("src", $(this).attr("data-still"));
                    }
                });
            });
        }
    };
    
    // user can add additional topics / buttons
    $("#addTopicBtn").on("click", function() {
        giftasticObj.userInput = $("#topicAddition").val().trim();
        debugger;
        var test = giftasticObj.topics.indexOf(giftasticObj.userInput);
        var test2 = giftasticObj.userInput;

        if ((giftasticObj.userInput !== "") && (giftasticObj.topics.indexOf(giftasticObj.userInput) === -1)) {
            giftasticObj.topics.push(giftasticObj.userInput);
            giftasticObj.renderButtons();
        }

        $("input#topicAddition").val("");
        return false;
    });
    
    // begin by rendering buttons at start of page load or upon refresh
    giftasticObj.renderButtons();
    
});
