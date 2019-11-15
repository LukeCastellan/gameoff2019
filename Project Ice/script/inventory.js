var Inventory_handler = (
	function()
	{
		// constants
		var ITEM_WIDTH = 400;
		var ITEM_HEIGHT = 200;
		
		var element = new UIPanel(0,0,800,575);
		
		var fields = {
			inventory: null,
		}
		Object.assign(element,fields);
		
		var methods = {			
			// get map() {return map},
			
			initialize: function()
			{	
				Engine.log("Initializing Inventory_handler...");
				
				this.inventory = new Inventory(30,20);
				
			},
			
			paint: function(context,x,y)
			{
				//map.draw(context,x,y);
				for(var x = 0; x < inventory.width; x++)
				{
					for(var y = 0; y < inventory.height; y++)
					{
						
					}
				}
			},
			
			tick: function(lapse)
			{
				
			},
		}
		Object.assign(element,methods);
		
		return element;
	}
)();

// tile based inventory!
function Inventory(width,height)
{
	GridMap.call(this,width,height);
}

Inventory.prototype = Object.create(GridMap.prototype);
Object.defineProperty(Inventory.prototype, 'constructor', {
	value: Inventory,
	enumerable: false, // so that it does not appear in 'for in' loop
    writable: true });

Inventory.prototype.draw = function()
{
	
}
	
function Item(key)
{
	// topmost points
	this.x = null;
	this.y = null;
	
	this.width;
	this.height;
	this.points = [];
	this.relative_points = Item.defined_items[key].points;
	
	
	this.inventory = null;
}

Object.defineProperty(Item.prototype, "property", {get: function() {return null}});

Item.prototype.defined_items = {
	"thing": {
		"name": "Thing",
		"points": [{x:0,y:0},{x:1,y:0},{x:1,y:1}],
	}
}