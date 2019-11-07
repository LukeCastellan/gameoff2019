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
    	for (var x = 0; x < line.length; x++) {
        	if (mapping[line[x]] == "player") {
                this.starting_position = {x: x, y: y};
            	this.tiles.push("blank");
        	} else {
        	    this.tiles.push(mapping[line[x]]);
            }
    	}
    }
    
    if (name) {
        this.name = name;
    } else {
        this.name = "an unnamed level";
    }
}
    
Level.prototype.get_tile = function(x, y) {
    return this.tiles[y * this.width + x];
};
    
Level.prototype.set_tile = function(x, y, new_tile) {
    Engine.log("gotta set up the set_tile() function.");
};