function Level(plan, mapping, name) {
    //takes an array of strings, and a key, to build the level object
    
    //safety
    if (plan.length == 0 || plan[0].length == 0) {
    	throw new Error("Invalid plan: width or height of the level is zero.");
    	return;
    }
    
    this.width = plan[0].length;
    this.height = plan.length;
    this.key = mapping;
    this.tiles = [];
    
    //scan the level
    for (var y = 0; y < plan.length; y++) {
    	var line = plan[y].split("");
        var tile_line = [];
    	for (var x = 0; x < line.length; x++) {
        	if (mapping[line[x]] == "player") {
                this.starting_position = new Vector(x, y - Player.dimensions.y + 0.95);
            	tile_line.push("blank");
        	} else {
        	    tile_line.push(mapping[line[x]]);
        	    if (mapping[line[x]] == "goal") {
        	        this.goal = new Vector(x, y);
        	    }
            }
    	}
        
        this.tiles.push(tile_line);
    }
    
    if (name) {
        this.name = name;
    } else {
        this.name = "an unnamed level";
    }
}

Level.prototype.get_tile = function(pos) {
    if (this.tiles[pos.y]) {
        return this.tiles[pos.y][pos.x];
    } else {
        return "blank";
    }
};
    
Level.prototype.set_tile = function(pos, new_tile) {
    this.tiles[pos.y][pos.x] = new_tile;
};

Level.prototype.get_obstacle = function(pos, size) {
    var start_x = Math.floor(pos.x), end_x = Math.floor(pos.x + size.x);
    var start_y = Math.floor(pos.y), end_y = Math.floor(pos.y + size.y);
    
    if (start_x < 0 || end_x > this.width || start_y < 0) {
        return "wall";
    } else if (end_y + 1 > this.height) {
        return "trap";
    } else {
        for (var c = start_y; c <= end_y; c++) {
            for (var b = start_x; b <= end_x; b++) {
                var tile = this.tiles[c][b];
                if (tile != "blank") return tile;
            }
        }
        
        return null;
    }
};
