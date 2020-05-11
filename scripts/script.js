$(document).ready(function(){
    console.log('Loaded');
    
    // Get JSON from server to get average rate
    averageRatingDisplay();

    // Colour stars on hover
    $('#stars img').mouseover(function(e){
        position=$('#stars img').index(e.target);
        console.log(position);
        colourStars(position);
    });

    // On leave mouse colour none or if submitted average number of stars
    $('#stars').mouseleave(function(){
        colourStars(lastPosition);
    });
    
    // On click submit to server and refresh average value
    $('#stars img').click(function(e){
        lastPosition = position = $('#stars img').index(e.target);
        $.post('https://mycourseresource.com/mcr76/stefan.php',
        {'key':'2020','user': ($('#names').val()),'rating': (lastPosition + 1), 'comment': ('Average rate is: ' + (averageRating + 1) + ' of ' + submissions + ' submissions. ' + $('#message').val()), 'limit': 'none', 'format':'json'},
        function(data, response){
            alert('Server response is ' + response);
            var received = JSON.parse(data);
            console.log(received);
            var dateTime = new Date(received["ratings"][1]["unixTime"]*1000);
            $('h1').html(dateTime.getDate() + '.' + (dateTime.getMonth() + 1) + '.' + dateTime.getFullYear());
            console.log(dateTime.getDate() + '.' + (dateTime.getMonth() + 1) + '.' + dateTime.getFullYear());
        }
        )
        averageRatingDisplay();
    });
    
});

// Get average rate without submittion
var averageRating=0;
var submissions = 0;
function averageRatingDisplay(){
    $.post('https://mycourseresource.com/mcr76/stefan.php',
        {'key':'2020','user': navigator.appName,'rating': (lastPosition + 1), 'comment': $('#message').val(), 'limit': 'none', 'submit': 'false', 'format':'json'},
        function(data){
            var received = JSON.parse(data);
            for (var q=0; q<received.ratings.length; q++){
                averageRating += parseInt(received.ratings[q].rating);
            }
            submissions = received.ratings.length;
            averageRating = Math.round(averageRating/submissions) -1;
            lastPosition = averageRating;
            colourStars(lastPosition);
            $('p').html(submissions + ' Votes');
        }
    )

}

// Colour the stars on hover and display text
var lastPosition =-1;
function colourStars(index){
    var text;
    $('#stars img').attr('src', 'icons/star0.gif');
    for (var q=0; q<=index; q++){
        $('#stars img').eq(q).attr('src', 'icons/star1.gif');
    }
    switch(index){
        case 0:
            text = 'Awful'
            break;
        case 1:
            text = 'Poor'
            break;
        case 2:
            text = 'Average'
            break;
        case 3:
            text = 'Good'
            break;
        case 4:
            text = 'Excellent'
            break;

    }
    $('h2').html(text);
}