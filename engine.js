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
    //wall sprite
    var wall_sprite = sprite("sprites/wall.png");
    var goal_sprite = sprite("sprites/goal.png");
    var trap_sprite = sprite("sprites/trap.png");
    var player_sprite;
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
    var background_colour = "turquoise";
    //arrow colour
    var arrow_colour = "gold";
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
                }
                var sprite;
                switch (in_view[b][a]) {
                    case "wall":
                        sprite = wall_sprite;
                        break;
                    case "trap":
                        sprite = trap_sprite;
                        break;
                    case "goal":
                        sprite = goal_sprite;
                        break;
                }
                
                var draw_x = (a - viewport.offset_x) * viewport.scale;
                var draw_y = (b - viewport.offset_y) * viewport.scale;
                cxt.drawImage(sprite, draw_x, draw_y);
            }
        }
        
        //draw the player
        var draw_x = (Player.position.x - viewport.left) * viewport.scale;
        var draw_y = (Player.position.y - viewport.top) * viewport.scale;
        cxt.fillStyle = player_colour;
        cxt.fillRect(draw_x, draw_y, viewport.scale * Player.dimensions.x, viewport.scale * Player.dimensions.y);
        
        //draw the arrow 
        if (Math.abs(Player.position.x - current_level.goal.x) > viewport.view_width / 2||
            Math.abs(Player.position.y - current_level.goal.y) > viewport.view_height / 2) {
            var angle = get_angle(Player.position, current_level.goal);
            var draw_radius = 3 * viewport.scale;
            
            cxt.save();
            cxt.fillStyle = arrow_colour;
            cxt.translate((Player.position.x - viewport.left) * viewport.scale, (Player.position.y - viewport.top) * viewport.scale);
            cxt.translate(Math.cos(angle) * draw_radius, Math.sin(angle) * draw_radius);
            cxt.rotate(angle);
            cxt.beginPath(); cxt.moveTo(10, 0); cxt.lineTo(-10, 10); cxt.lineTo(-10, -10); cxt.closePath(); cxt.fill();
            cxt.restore();
        }
        
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
    //the level tiles mapping
    var default_mapping =  {" ": "blank", "@": "player", "x": "wall", "!": "trap", "$": "goal"};
    //load a level
    function load_level(new_level) {
        current_level = new_level;
        Player.set_position(new_level.starting_position);
    }
    
    var n = 0;
    var w = true;
    
    return {
        get gravity() {
            return 0.0002;
        },
        
        get current_level() {
            return current_level;
        },
        
        get tile_mapping() {
            return default_mapping;
        },
        
        log: log,
        
        init: function(canvas) {
            drawing_canvas = canvas; cxt = drawing_canvas.getContext("2d");
            viewport.width = canvas.width; viewport.height = canvas.height;
            viewport.view_width = canvas.width / viewport.scale; viewport.view_height = canvas.height / viewport.scale;
        },
        
        start_game: function() {
            //load the first level
            load_level(new Level(GAME_LEVELS[n], default_mapping, "Level 1"));
            Player.init(document.body);
            requestAnimationFrame(animate);
        },
        
        load_level: load_level,
        
        end_level: function(status) {
            if (status == "won" && w) { //player won the level
                background_colour = "lime";
                n++;
                w = false;
                
                if (n >= GAME_LEVELS.length) {
                    alert("you've won! congrats!");
                    return;
                }
                
                setTimeout(() => {
                    background_colour = "royalblue";
                    w = true;
                    load_level(new Level(GAME_LEVELS[n], default_mapping, "Level " + (n + 1)));
                }, 2000);
            } else if (status == "lost" && w) { //player lost the level
                player_colour = "indianred";
                w = false;
                setTimeout(() => {
                    player_colour = "mediumspringgreen";
                    w = true;
                    load_level(current_level);
                }, 2000);
            }
        },
    };
})();

function sprite(path) {
    var img = document.createElement("img");
    img.src = path;
    return img;
}

function get_angle(start, end) {
    var hypot = Math.hypot((end.x - start.x), (end.y - start.y));
    var opp   = end.y - start.y;

    var angle = Math.asin(opp / hypot);

    if (end.x < start.x) angle = Math.PI - angle;

    return angle;
};
