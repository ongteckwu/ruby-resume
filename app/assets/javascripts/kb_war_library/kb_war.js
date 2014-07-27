var randomIndex = function(maxLength) {
	var randIndex = Math.round(Math.random() * maxLength);
	if (randIndex < 0) {
		randIndex = 0;
	}
	else if (randIndex >= maxLength) {
		randIndex = maxLength - 1;
	}
	return randIndex;
};

var eventLoop = function() {
	var alphabets = function(){
		var alphabets = [];
		for(var i = 65; i <= 90; i++) {
			alphabets.push(String.fromCharCode(i))
		}

		alphabets = alphabets.join('');
		return alphabets;
	}();

	var alphabetsLength = alphabets.length
	var currentLevel = 1;
	var initialLevelRequirement = 0;
	var blockSpeed = 10000; //seconds to reach ground
	var spawnSpeed = 1000; //block manifest every 3 seconds
	var alphabetsQueue = [];
	var alphabetsObjectQueue = [];
	var alphabetsCount = 0;
	//dark | light
	var alphabetColours = {"red": ["#9E302D", "#D56865"],
						   "orange": ["#9E612D", "#D59865"],
						   "green": ["#247C29", "#4FA755"],
						   "blue": ["#234367", "#48678B"],
						   "purple": ["#502269", "#75476E"],
						   "yellow": ["#9E9E2D", "D5D565"]};
	var alphabetColoursKeys = Object.keys(alphabetColours);
	var haveLost = false;
	//stops level
	var levelBreakers = [];
	/*
	Type of queue:
		It's either a queue structure or a pseudo-queue.
		Add a letter into the queue:
			push(letter)
			then, add element.alpha-block.alpha-<alphabet> into #alpha-board with append
		Record a delete from the queue structure:
			search for element index in queue (first encounter will be recorded)
				if index > -1:
					splice it out of the queue
					find jquery elements corresponding to letter
					remove first element with .remove()

	*/
	var startKeyDown = function() {
		$(document).on("keydown", handler = function(event) {	
			//get character from char code
			var character = String.fromCharCode(event.which);

			//find character within queue
			var character_i_in_cache = alphabetsQueue.indexOf(character);

			if (alphabets.indexOf(character) > -1 && character_i_in_cache > -1) {
				//render alphabets captured
				alphabetsCount++;
				$("#alpha-count").html(alphabetsCount);
				//remove element from queue and object queue
				alphabetsQueue.splice(character_i_in_cache, 1);
				alphabetsObjectQueue.splice(character_i_in_cache, 1);

				//remove alphabet from board
				var $alphaBlock = $(".alpha-" + character).slice(-1).remove()
			}		
		});
	};

	//you lose
	var renderYouLose = function() {
		console.log("You have lost!");
		$("#alphabets-count").hide();
		$("#you-lose").show();
		$(document).off("keydown");
		haveLost = true;

	};

	startKeyDown();

	var levelInterval = function(spawnSpeed, blockSpeed) {
		levelBreakers.push(setInterval(function() {
			var $alphaBoard = $("#alpha-board");

			//get a random alphabet
			var randIndex = randomIndex(alphabetsLength);
			var randomAlpha = alphabets[randIndex];

			var alphaBlockClass = "alpha-" + randomAlpha;

			//add alpha-block to alpha-board
			$alphaBoard.prepend("<div class=\"text-center alpha-block " + alphaBlockClass + "\"><div>" + randomAlpha + "</div></div>");		
			
			//get alpha-block as jquery object
			var $currentAlphaBlock = $alphaBoard.children("." + alphaBlockClass).slice(0, 1)

			//set position
			$currentAlphaBlock.css("left", String(Math.random() * ($alphaBoard.width())) + "px");
			$currentAlphaBlock.css("top", "50px");

			//set color| dark, light
			var colorScheme = alphabetColours[alphabetColoursKeys[randomIndex(alphabetColoursKeys.length)]];
			$currentAlphaBlock.css("background-color", colorScheme[1])
							  .css("border", "2px solid " + colorScheme[0]);


			//console.log element
			//console.log($currentAlphaBlock);

			//drop element
			//render you lose upon complete
			$currentAlphaBlock.transition({y: $(document).height() - 45},
										  blockSpeed,
										  complete = function() {
										  	//lose if block is still in queue
										  	if (!haveLost && $(this).is(alphabetsObjectQueue[0])) {
										  		console.log("lost!!!!!");
										  		//render final score
										  		$("#you-lose-final-score").html(alphabetsCount);
										  		renderYouLose();
										  	}
										  });

			//add letter into cache
			alphabetsQueue.push(randomAlpha);

			//add object into cache
			alphabetsObjectQueue.push($currentAlphaBlock);
		}, spawnSpeed));
	}

	//level variables
	var thisLevelRequirement = initialLevelRequirement;
	var thisLevel = currentLevel;
	var thisBlockSpeed = blockSpeed; //0.98
	var thisSpawnSpeed = spawnSpeed; //0.99
	var thisLevelDifficulty = 2 // Means that 2 threads running at a time
						    	// every 10 levels increase by 1

	//activate level loop
	var selfBreaker = setInterval(function() {
		//stops game if lost
		if (haveLost || $("body").data("title") !== "game") {
			window.clearInterval(selfBreaker); //breaks self
			//clear all levels
			for (var i in levelBreakers) {
				window.clearInterval(levelBreakers[i]);
			}
		}

		if (alphabetsCount >= thisLevelRequirement) {
			console.log("-------------------")
			console.log("Level " + thisLevel);
			console.log("Threads: " + levelBreakers.length);

			//run next level
			levelInterval(thisSpawnSpeed, thisBlockSpeed);

			//render level
			$("#alpha-level").html("Level " + thisLevel);
			//pop a thread. Based on thisLevelDifficulty.
			if (levelBreakers.length >= thisLevelDifficulty  ) {
				console.log("Thread popped.");
				window.clearInterval(levelBreakers.shift());
			}

			//increase level
			thisLevel++;

			//increase level difficulty if requirement met
			if (thisLevel % 7 == 0) {
				console.log("Level difficulty increased!");
				thisLevelDifficulty += 1;
				thisSpawnSpeed *= 1.3;
			}
			//set next level requirement and settings
			thisLevelRequirement += 2;
			thisBlockSpeed *= 0.99;
			thisSpawnSpeed *= 0.98;
		}
	}, 500)
	
}

$(document).ready(function() {
	if ($("body").data("title") === "main") {
		$("#footer").click(function() {
			window.location.href = "/../../";
		});
	}
	if ($("body").data("title") === "game") {
		console.log("start");
		eventLoop();
	}
});
