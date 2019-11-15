/**
	For all their glory, here they are: map objects!
	They all simplify down to rectanglers, every one of 'em (though NOT in collision)
 */
function MapObject(map, x, y, width, height)
{
	this.map = map;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	
	this.center_x = x + width/2;
	this.center_y = y + height/2;
	
	this.active = true;
	this.type = "generic";
	this.z = 0;
}

MapObject.prototype.draw = function(context,x,y)
{
	context.beginPath();
	context.lineTo(this.x + x, this.y + y);
	context.lineTo(this.x + this.width + x, this.y + y);
	context.lineTo(this.x + this.width + x, this.y + this.height + y);
	context.lineTo(this.x + x, this.y + this.height + y);
	context.closePath();
	context.stroke();
}

MapObject.prototype.isInBounds = function(x,y)
{
	if(x > this.x && x < this.x + this.width 
		&& y > this.y && y < this.y + this.height)
	{
		return true; 
	}
	return false;
}

MapObject.prototype.move = function(x=0,y=0,z=0)
{
	this.x += x;
	this.y += y;
	this.z += z;
	
	this.center_x += x;
	this.center_y += y;
}

// we ain't gonna implement, but it's here just to be safe.
MapObject.prototype.collide = function(){}
