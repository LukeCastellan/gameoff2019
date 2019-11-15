var Player = (function() {
    var x = null, y = null;
    var v_x = null, v_y = null;
    var width = 0.9, height = 1.5;
    
    //the player's pose. can be "standing" or "jumping"
    var pose = "standing";
    //which way the player is facing. can be "left" or "right"
    var orientation = "right";
    
    var keys = {
        left: false,
        right: false,
        up: false,
        down: false,
        action: false, // ???
    };
    
    return {
        get position() {
            return {x: x, y: y};
        },
        
        get dimensions() {
            return {x: width, y: height};
        },
        
        get motion() {
            return {x: v_x, y: v_y};
        },
        
        get state() {
            return { pose: pose, orientation: orientation };
        },
        
        init: function(element) {
            /*
                element: the element to which to add the keyboard event listeners (usually the game canvas)
            */
            element.addEventListener("keydown", function(e) {
                e.stopPropagation();
                
                switch (e.keyCode) {
                    case 65: // A key
                    case 37: // left arrow key
                        keys.left = true;
                        break;
                    case 87: // W key
                    case 38: // up arrow key
                        keys.up = true;
                        break;
                    case 68: // D key
                    case 39: // right arrow key
                        keys.right = true;
                        break;
                    case 83: // S key
                    case 40: // down arrow key
                        keys.down = true;
                        break;
                    case 32: // space bar
                    case 13: // ENTER key
                        keys.action = true;
                        break;
                }
            });
            
            element.addEventListener("keyup", function(e) {
                e.stopPropagation();
                
                switch (e.keyCode) {
                    case 65: // A key
                    case 37: // left arrow key
                        keys.left = false;
                        break;
                    case 87: // W key
                    case 38: // up arrow key
                        keys.up = false;
                        break;
                    case 68: // D key
                    case 39: // right arrow key
                        keys.right = false;
                        break;
                    case 83: // S key
                    case 40: // down arrow key
                        keys.down = false;
                        break;
                    case 32: // space bar
                    case 13: // ENTER key
                        keys.action = false;
                        break;
                }
            });
        },
        
        set_position: function(new_position, keep_state) {
            x = new_position.x; y = new_position.y;
            
            if (!keep_state) {
                v_x = 0; v_y = 0;
                pose = "standing", orientation = "right";
            }
        },
        
        update: function(lapse) {
            //for now, just some basic movement
            x += keys.left ? -0.005 * lapse : 0;
            y += keys.up ? -0.005 * lapse : 0;
            x += keys.right ? 0.005 * lapse : 0;
            y += keys.down ? 0.005 * lapse : 0;
        },
    };
})();