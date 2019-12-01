var AudioSystem = (
	function() {
		var trackList = [];
		//trackList[3] = var cityBuilding = document.getElementById("paperworkTrack");
		var currentTrack;
	
		return {
			initialize: function()
			{
				trackList.push(document.getElementById("track1"));
				trackList.push(document.getElementById("track2"));
				trackList.push(document.getElementById("track3"));
			},
			sleep: function(ms) {
				return new Promise(resolve => setTimeout(resolve, ms));
			},
			playSingleTrack: function(soundTrack) {
				soundTrack.play();
			},
			playAllTracks: async function() {
				trackList.forEach(async function(soundTrack) {
					AudioSystem.playSingleTrack(soundTrack);
					currentTrack = soundTrack;
					await AudioSystem.sleep(soundTrack.duration);
				});
			},
			pauseSingleTrack: async function(soundTrack) {
				for (let i = 100; i >= 0; --i) {
					await sleep(20);
					soundTrack.volume = i/100;
				}
				soundTrack.pause();
			},
			pauseAllTracks: async function() {
				
			},
		}
	}
)();
