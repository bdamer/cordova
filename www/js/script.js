
DATA = {
    BASE: 'data/',
    
    load: function() {
        var d1 = $.get(DATA.BASE + "classes.json", function(data) {
            DATA.CLASSES = data;
        });
        var d2 = $.get(DATA.BASE + "races.json", function(data) {
            DATA.RACES = data;      
        });
        var d3 = $.get(DATA.BASE + "feats.json", function(data) {
            DATA.FEATS = data;      
        }); 
        return $.when(d1, d2, d3);
    }
};

$(document).on('pageinit', function() {
    console.log('pageinit');

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

    var l = DATA.load();

    l.done(function() {
        console.log('load complete', DATA);
        $.each(DATA.RACES, function(id, race) {
            $('#cd_race').append($('<option>', {
                value: id, 
                text: race.name
            }));
        });
    });

    l.fail(function() {
        console.log('fail', arguments);
    })

});

