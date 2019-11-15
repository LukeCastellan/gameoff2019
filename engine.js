var Engine = (function() {
    var _log = true; //change to false on release build
    
    //logs to the console.
    function log(msg) {
       if (_log) {
           console.log(msg);
       }
    }
    
    //animation stuff
    var lapse = 0, last_time = null, paused = false;
    //animation function. draws the screen even if the game is paused.
    function animate(time) {
        if (last_time == null) {
            lapse = 0;
        } else {
            lapse = time - last_time;
        }
        last_time = time;
        
        if (!paused) {
            update(lapse);
        }
        
        draw();
        
        requestAnimationFrame(animate);
    }
    
    //canvas to draw on, call init() to set it.
    var drawing_canvas = null;
    //drawing canvas's context, set alongside drawing_canvas in init()
    var cxt = null;
    /* the viewport
       - top and left refer to the top and left of the viewport (ie the viewport's top left corner is (top, left))
       - width and height are, respectively, the width and height of the drawing canvas, in pixels
       - view_width and view_height are, respectively, the width and the height that the drawing canvas covers in the level.
       - scale is how big, in pixels, each square of a level is.
    */
    var viewport = {
        top: null, left: null,
        width: null, height: null,
        view_width: null, view_height: null,
        scale: 30,
        offset_x: null, offset_y: null,
    };
    //background colour
    var background_colour = "royalblue";
    //wall colour
    var wall_colour = "mistyrose";
    //player colour
    var player_colour = "mediumspringgreen";
    //drawing function
    function draw() {
        //draw the background
        cxt.fillStyle = background_colour;
        cxt.fillRect(0, 0, viewport.width, viewport.height);
        
        //update the viewport and get everything in view
        var in_view = get_in_view();
        
        //draw the level itself.
        for (b = 0; b < in_view.length; b++) {
            for (a = 0; a < in_view[b].length; a++) {
                if (in_view[b][a] == "blank") {
                    //skip!
                    continue;
                } else {
                    cxt.fillStyle = wall_colour;
                    //DRAW THAT WALL! DRAW THAT WALL!
                    var draw_x = (a - viewport.offset_x) * viewport.scale;
                    var draw_y = (b - viewport.offset_y) * viewport.scale;
                    cxt.fillRect(draw_x, draw_y, viewport.scale - 1, viewport.scale - 1);
                }
            }
        }
        
        //draw the player
        var draw_x = (Player.position.x - viewport.left) * viewport.scale;
        var draw_y = (Player.position.y - viewport.top) * viewport.scale;
        cxt.fillStyle = player_colour;
        cxt.fillRect(draw_x, draw_y, viewport.scale * Player.dimensions.x, viewport.scale * Player.dimensions.y);
        
        cxt.fillStyle = "white";
        cxt.font = "16pt Arial";
        cxt.fillText(current_level.name, 5, 25);
    }
    
    //helper function: updates the viewport and gets everything that's in view
    function get_in_view() {
        var margin = { x: viewport.view_width / 3, y: viewport.view_height / 3};
        var center = { x: Player.position.x + Player.dimensions.x / 2, y: Player.position.y + Player.dimensions.y / 2 };
        
        //scroll the player into view
        if (center.x < viewport.left + margin.x) {
            //scroll left
            viewport.left = center.x - margin.x;
        }
        if (center.x > viewport.left + viewport.view_width - margin.x) {
            //scroll right
            viewport.left = center.x - viewport.view_width + margin.x;
        }
        if (center.y < viewport.top + margin.y) {
            //scroll up
            viewport.top = center.y - margin.y;
        }
        if (center.y > viewport.top + viewport.view_height - margin.y) {
            //scroll down
            viewport.top = center.y - viewport.view_height + margin.y;
        }
        //sanity check
        viewport.left = Math.max(0, Math.min(current_level.width - viewport.view_width, viewport.left));
        viewport.top = Math.max(0, Math.min(current_level.height - viewport.view_height, viewport.top));
        
        viewport.offset_x = viewport.left % 1; viewport.offset_y = viewport.top % 1;
        
        //get everything in view
        var in_view = [];
        for (var b = Math.floor(viewport.top); b < Math.ceil(viewport.top + viewport.view_height); b++) {
            in_view.push(current_level.tiles[b].slice(Math.floor(viewport.left), Math.ceil(viewport.left + viewport.view_width + 1)));
        }
        
        return in_view;
    }
    
    //update function
    function update(lapse) {
        Player.update(lapse);
    }
    
    //the level currently playing
    var current_level = null;
    //load a level
    function load_level(new_level) {
        current_level = new_level;
        Player.set_position(new_level.starting_position);
    }
    
    return {
        get gravity() {
            return 0.0005;
        },
        
        get current_level() {
            return current_level;
        },
        
        log: log,
        
        init: function(canvas) {
            drawing_canvas = canvas; cxt = drawing_canvas.getContext("2d");
            viewport.width = canvas.width; viewport.height = canvas.height;
            viewport.view_width = canvas.width / viewport.scale; viewport.view_height = canvas.height / viewport.scale;
        },
        
        start_game: function() {
            //load the first level
            load_level(new Level(GAME_LEVELS[0], {" ": "blank", "@": "player", "x": "wall"}, "Level 1"));
            Player.init(document.body);
            requestAnimationFrame(animate);
        },
        
        load_level: load_level,
    };
})();