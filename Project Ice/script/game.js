var Game = (function()
	{
		var element = new UIPanel(0,0,800,575);
		
		var fields = {
			
		}
		Object.assign(element,fields);
		
		var methods = {			
			// get map() {return map},
			
			initialize: function()
			{	
				Engine.log("Initializing Map_handler...");
				Map_handler.initialize();
				Inventory_handler.initialize();
				
				
			},
			
			paint: function(context,x,y)
			{
				//map.draw(context,x,y);
			},
			
			tick: function(lapse)
			{
				//map.tick();
				
				// travel some distance 
				
				
				// consume food and stuffs
				
				// events!
				
				
			},
		}
		Object.assign(element,methods);
		
		return element;
	}
)();