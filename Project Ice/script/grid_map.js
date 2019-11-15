/**
	A simple grid based map for all your gridmap based needs!
 */
 
function GridMap(width, height)
{
	this.width = width;
	this.height = height;
	
	this.objects = [];
	
	this.tiles = [];
	for(var index = 0; index < this.width * this.height; index++)
	{
		var coordinate = this.get_cartesian_from_position(index);
		var tile = new Tile(coordinate.x,coordinate.y);
		
		this.tiles.push(tile);
	}
	
	// set neighbours 
	for(var index = 0; index < this.width * this.height; index++)
	{
		var coordinate = this.get_cartesian_from_position(index);
		var tile = this.tiles[index];
		
		if(coordinate.x > 0)
		{
			tile.neighbours.west = this.tiles[this.get_position_from_cartesian(coordinate.x-1,coordinate.y)];
		}
		if(coordinate.x < this.width - 1)
		{
			tile.neighbours.east = this.tiles[this.get_position_from_cartesian(coordinate.x+1,coordinate.y)];
		}
		if(coordinate.y > 0)
		{
			tile.neighbours.north = this.tiles[this.get_position_from_cartesian(coordinate.x,coordinate.y-1)];
		}
		if(coordinate.y < this.height - 1)
		{
			tile.neighbours.south = this.tiles[this.get_position_from_cartesian(coordinate.x,coordinate.y+1)];
		}
	}
}

GridMap.prototype.get_tile = function(x,y)
{
	if(this.is_valid_tile(x,y))
	{
		return this.tiles[this.get_position_from_cartesian(x,y)];
	}
}

// get real point 
GridMap.prototype.get_position_from_cartesian = function(x,y)
{
	return y*this.width + x;
}

GridMap.prototype.get_cartesian_from_position = function(position)
{
	return {x: position % this.width, y: Math.floor(position/this.width)}; 
}

// code 0, all good 
// code 1, invalid placement 
GridMap.prototype.add_object = function(x,y,object)
{
	if(this.is_valid_placement(x,y,object.width,object.height))
	{
		// change the occupied!
		for (var index = 0; index < object.points.length; index++)
		{
			this.tiles[this.get_position_from_cartesian(object.points[index].x,object.points[index].y)].object = object;
		}
		
		this.objects.push(object);
		return 0;
	}
	else
	{
		return 1;
	}
}

GridMap.prototype.remove_object_at_coordinate = function(x,y)
{
	if(this.tiles[this.get_position_from_cartesian(x,y)].object)
	{
		var object = this.tiles[this.get_position_from_cartesian(x,y)].object;
		
		// change the occupied!
		for (var index = 0; index < object.points.length; index++)
		{
			this.tiles[this.get_position_from_cartesian(object.points[index].x,object.points[index].y)].object = null;
		}
		
		// set as inactive 
		object.active = false;
		this.objects = this.objects.filter(object => object.active);
	}
}

GridMap.prototype.remove_object = function(object)
{
	for (var index = 0; index < object.points.length; index++)
	{
		this.tiles[this.get_position_from_cartesian(object.points[index].x,object.points[index].y)].object = null;
	}
		
	// set as inactive 
	object.active = false;
	this.objects = this.objects.filter(object => object.active);
}

// getting object from tile
GridMap.prototype.get_object = function(x,y)
{
	return this.tiles[this.get_position_from_cartesian(x,y)].object;
}

// checks if all is clear 
GridMap.prototype.is_valid_object_placement = function(x,y,width,height)
{

	for(var x_index = 0; x_index < width; x_index++)
	{
		for(var y_index = 0; y_index < height; y_index++)
		{
			// if a result isn't even valid, falsify immediately and spare us an exception
			if(!this.is_valid_tile(x+x_index,y+y_index)) return false;
			if(this.tiles[this.get_position_from_cartesian(x+x_index,y+y_index)].object)
			{
				return false;
			}		
		}
	}
	return true;
}

GridMap.prototype.is_valid_tile = function(x,y)
{
	if (x < 0 || y < 0 || x >= this.width || y >= this.height) return false;
	return true;
}

// not used.
GridMap.prototype.tick = function()
{
	this.objects.forEach(object => object.tick());
}


/**
	Tiles!
 */
function Tile(x,y)
{
	this.x = x;
	this.y = y;
	this.neighbours = {};
}