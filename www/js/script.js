
var DEBUG;// = true;

/* For having a faster transition */
$(document).on('mobileinit', function() {
    //$.mobile.defaultPageTransition = 'none';
    //$.mobile.defaultDialogTransition = 'none';
});                

$(document).on('pageinit', '#page1', function() {
    if (DEBUG) {
        var logf = console.log;
        console.log = function() {
            logf(arguments);
            $.each(arguments, function(i, arg) {
                $("#debug").append(arg);
            });
            $('#debug').append('<br>');
        }
    }

    console.log('pageinit');

    var pageIdx = 0;
    // Bind the swipeHandler callback function to the swipe event on div.box
    $("body div").on("swipe", function(ev) {
        ev.stopImmediatePropagation();
        var dx = ev.swipestop.coords[0] - ev.swipestart.coords[0];
        var dy = ev.swipestop.coords[1] - ev.swipestart.coords[1];
        
        // navigate left
        if (dx > 0 && pageIdx > 0) {
            pageIdx--;
            console.log('page', pageIdx);
            $.mobile.navigate("#page" + (pageIdx + 1));
        // navigate right
        } else if (dx < 0 && pageIdx < 2) {
            pageIdx++;
            console.log('page', pageIdx);
            $.mobile.navigate("#page" + (pageIdx + 1));
        }
    
    });    

    // Populate dropdowns
    console.log(DATA);
    $.each(DATA.RACES, function(id, race) {
        $('#cd_race').append($('<option>', {
            value: id, 
            text: race.name
        }));
    });
    $.each(DATA.CLASSES, function(id, clasz) {
        $('#cd_class').append($('<option>', {
            value: id, 
            text: clasz.name
        }));
    });

});

