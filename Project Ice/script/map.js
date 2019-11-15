/*
	A NOTE
	We are operating in a 2D plane, with 3D cheated in.
	There is a z-index for all objects. All objects are sorted according to z in graphics.
*/
function Map(width, height, ground_height, image, viewport = new Viewport(0,0,800,600))
{
	this.x = 0;
	this.y = 0;
	this.width = width;
	this.height = height;
	this.ground_height = ground_height;
	this.background_image = image;
	this.objects = [];
	this.viewport = viewport;
}

Map.prototype.draw = function(context, x, y)
{
	this.restitute_viewport();
	
	if(this.background_image)
	{
		context.drawImage(this.background_image
			,this.viewport.x
			,this.viewport.y
			,this.viewport.width
			,this.viewport.height
			,x
			,y
			,this.viewport.width
			,this.viewport.height);
	}
	
	// only draw images in frame 
	// order matters! (customers will always be in front of furniture for example!)
	var objects_in_frame = this.objects.filter(object => this.viewport.isInBounds(object));
	objects_in_frame = objects_in_frame.sort((a,b) => a.z - b.z);
	
	for(var i = 0; i < objects_in_frame.length; i++)
	{
		objects_in_frame[i].draw(context,x - this.viewport.x,y - this.viewport.y)
	}
}

Map.prototype.tick = function(lapse)
{
	this.objects = this.objects.filter(object => object.active);
	for(var i = 0; i < this.objects.length; i++)
	{
		this.objects[i].tick(lapse);
		this.restitute(this.objects[i]);
	}
}

/* dealing with mapObjects */

Map.prototype.add_object = function(object)
{
	this.objects.push(object);
}

Map.prototype.remove_object = function(object)
{
	object.active = false;
}

Map.prototype.is_in_bounds = function(x,y)
{
	if(x > this.x 
		&& y < this.y 
		&& x < this.x + this.width 
		&& y < this.y + this.height)
	{
		return true;
	}
	return false;
}

Map.prototype.is_object_in_bounds = function(object)
{
	if(object.x + object.width > this.x
		&& object.y + object.height > this.y 
		&& object.x < this.x + this.width 
		&& object.y < this.y + this.height)
	{
		return true;
	}
	return false;
}

Map.prototype.restitute = function(object)
{
	if(object.x < this.x)
	{
		object.move(this.x - object.x,0);
	}
	
	if(object.y < this.y)
	{
		object.move(0,this.y - object.y,0);
	}
	
	if(object.x + object.width > this.x + this.width)
	{
		object.move(-(object.x + object.width - this.x - this.width))
	}
	
	if(object.y + object.height > this.x + this.height)
	{
		object.move(0,-(object.y + object.height - this.y - this.height));
	}
}

/* Finicky viewport stuff */

Map.prototype.set_viewport_position = function()
{
	this.viewport.setPosition(x,y);
}

Map.prototype.center_viewport_at = function(x,y)
{
	this.viewport.setPosition(x - this.viewport.width / 2, y - this.viewport.height / 2);
}

Map.prototype.get_viewport_position = function()
{
	return new Point(this.viewport.x,this.viewport.y);
}

Map.prototype.restitute_viewport = function()
{
	if(this.viewport.x < this.x) this.viewport.x = this.x;
	if(this.viewport.y < this.y) this.viewport.y = this.y;
	if(this.viewport.width + this.viewport.x > this.x + this.width) this.viewport.x = this.x + this.width - this.viewport.width;
	if(this.viewport.height + this.viewport.y > this.y + this.height) this.viewport.y = this.y + this.height - this.viewport.height;
}