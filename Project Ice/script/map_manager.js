/**
	Arrghhh! The customizable main logic of the game, mateys!
 */
var Map_handler = (function()
	{
		var element = new UIPanel(0,0,800,575);
		var map;
		
		var Player;
		
		var SPEED = 15;
		
		var fields = {
			
		}
		Object.assign(element,fields);
		
		var methods = {			
			get map() {return map},
			
			initialize: function()
			{	
				Engine.log("Initializing Map_handler...");
				
				map = new Map(2000,600,400,images["test1"],new Viewport(0,0,element.width,element.height));
				
				
			},
			
			paint: function(context,x,y)
			{
				map.draw(context,x,y);
			},
			
			tick: function(lapse)
			{
				map.tick();
				
				// travel some distance 
				
				
				// consume food and stuffs
				
				// events!
				
				
			},
		}
		Object.assign(element,methods);
		
		return element;
	}
)();

function Journey(origin,destination)
{
	if(WAYPOINTS[origin] && WAYPOINTS[destination])
	{
		this.origin_point = WAYPOINTS[origin];
		this.destination_point = WAYPOINTS[destination];
	}
	
	this.distance_left = this.origin_point.next_waypoint[destination].distance;
}

var WAYPOINTS = {
	"north_point": {
		"name:":"North Point",
		"climate": "coastal",
		"image": null,
		"next_waypoint": {
			"seal_island": {
				"distance": 314,
			}
		},
	},
	
	"seal_island": {
		"name:":"Seal Island",
		"climate": "coastal",
		"image": null,
		"next_waypoint": {
			"cooks_landing": {
				"distance": 532,
			}
		},
	},
	
	"cooks_landing": {
		"name:":"Cooks' Landing",
		"climate": "coastal",
		"image": null,
		"next_waypoint": {
			"cooks_landing": {
				"distance": 179,
			}
		},
	},
}