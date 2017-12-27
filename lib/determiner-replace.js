const rand = require('bmjs-random');

module.exports = function(word) {
	switch (word) {
		case 'a bit of':
		case 'a dab of':
		case 'a dash of':
		case 'a dribble of':
		case 'a driblet of':
		case 'a fragment of':
		case 'a grain of':
		case 'a hint of':
		case 'a jot of':
		case 'a little':
		case 'a modicum of':
		case 'a morsel of':
		case 'a particle of':
		case 'a pinch of':
		case 'a shade of':
		case 'a small amount of':
		case 'a smidgen of':
		case 'a snippet of':
		case 'a soupcon of':
		case 'a speck of':
		case 'a splash of':
		case 'a spot of':
		case 'a sprinkle of':
		case 'a sprinkling of':
		case 'a suggestion of':
		case 'a suspicion of':
		case 'a tad of':
		case 'a taste of':
		case 'a tinge of':
		case 'a touch of':
		case 'a trace of':
			return rand(...['a bit of','a dab of','a dash of','a dribble of','a driblet of','a fragment of','a grain of','a hint of','a jot of','a little','a modicum of','a morsel of','a particle of','a pinch of','a shade of','a small amount of','a smidgen of','a snippet of','a soupcon of','a speck of','a splash of','a spot of','a sprinkle of','a sprinkling of','a suggestion of','a suspicion of','a tad of','a taste of','a tinge of','a touch of','a trace of','some']);
		case 'a bit of':
		case 'a part of':
		case 'a piece of':
			return rand(...['a bit of','a part of','a piece of','any','some']);
		case 'a cornucopia of':
		case 'a deal of':
		case 'a feast of':
		case 'a good deal of':
		case 'a great deal of':
		case 'a hatful of':
		case 'a large amount of':
		case 'a large number of':
		case 'a lot of':
		case 'a mickle of':
		case 'a peck of':
		case 'a plethora of':
		case 'a raft of':
		case 'a slew of':
		case 'a swag of':
		case 'a wealth of':
		case 'bags of':
		case 'enough and to spare':
		case 'gazillions of':
		case 'gobs of':
		case 'heaps of':
		case 'lashings of':
		case 'loads of':
		case 'lots of':
		case 'masses of':
		case 'more than enough':
		case 'no lack of':
		case 'oceans of':
		case 'oodles of':
		case 'piles of':
		case 'plenty of':
		case 'quantities of':
		case 'scads of':
		case 'stacks of':
		case 'tons of':
			return rand(...['a cornucopia of','a deal of','a feast of','a good deal of','a great deal of','a hatful of','a large amount of','a large number of','a lot of','a mickle of','a peck of','a plethora of','a raft of','a slew of','a swag of','a wealth of','bags of','enough','enough and to spare','gazillions of','gobs of','heaps of','lashings of','loads of','lots of','many','masses of','more than enough','no lack of','oceans of','oodles of','piles of','plenty','plenty of','quantities of','scads of','stacks of','sufficient','tons of']);
		case 'a couple of':
		case 'a few':
		case 'a handful of':
		case 'a small amount of':
		case 'a small number of':
		case 'a small quantity of':
		case 'a sprinkling of':
		case 'hardly any':
		case 'not many':
		case 'one or two':
		case 'scarcely any':
			return rand(...['a couple of','a few','a handful of','a small amount of','a small number of','a small quantity of','a sprinkling of','hardly any','little','not many','one or two','scarcely any']);
		case 'a couple of':
		case 'a handful of':
		case 'a small amount of':
		case 'a small number of':
		case 'a small quantity of':
		case 'a sprinkling of':
		case 'hardly any':
		case 'not many':
		case 'one or two':
		case 'scarcely any':
			return rand(...['a couple of','a handful of','a small amount of','a small number of','a small quantity of','a sprinkling of','few','hardly any','little','not many','one or two','scarcely any']);
		case 'a different':
		case 'an alternative':
		case 'not the same':
		case 'some other':
			return rand(...['a different','an alternative','another','not the same','some other']);
		case 'a few':
		case 'a handful of':
		case 'a number of':
		case 'a small group of':
		case 'a variety of':
		case 'not very many':
			return rand(...['a few','a handful of','a number of','a small group of','a variety of','assorted','divers','diverse','not very many','several','some','sundry','various']);
		case 'a further':
		case 'a second':
		case 'a spare':
		case 'an additional':
		case 'an extra':
		case 'one more':
			return rand(...['a further','a second','a spare','an additional','an extra','another','one more']);
		case 'a good deal of':
		case 'a great amount of':
		case 'a great deal of':
		case 'a large amount of':
		case 'a lot of':
		case 'a pile of':
		case 'a shedload of':
		case 'gobs of':
		case 'heaps of':
		case 'lashings of':
		case 'loads of':
		case 'lots of':
		case 'masses of':
		case 'oodles of':
		case 'piles of':
		case 'plenty of':
		case 'tons of':
			return rand(...['a good deal of','a great amount of','a great deal of','a large amount of','a lot of','a pile of','a shedload of','abundant','ample','considerable','copious','gobs of','heaps of','lashings of','loads of','lots of','masses of','much','oodles of','piles of','plentiful','plenty of','substantial','tons of']);
		case 'a good deal of':
		case 'a great deal of':
		case 'a great number of':
		case 'a horde of':
		case 'a large number of':
		case 'a lot of':
		case 'a multiplicity of':
		case 'a multitude of':
		case 'a profusion of':
		case 'a slew of':
		case 'a swag of':
		case 'an abundance of':
		case 'an army of':
		case 'bags of':
		case 'bazillions of':
		case 'billions of':
		case 'crowds of':
		case 'dozens of':
		case 'droves of':
		case 'gazillions of':
		case 'gobs of':
		case 'great quantities of':
		case 'heaps of':
		case 'hundreds of':
		case 'loads of':
		case 'lots of':
		case 'masses of':
		case 'millions of':
		case 'oodles of':
		case 'piles of':
		case 'plenty of':
		case 'scads of':
		case 'scores of':
		case 'stacks of':
		case 'thousands of':
		case 'tons of':
		case 'zillions of':
			return rand(...['a good deal of','a great deal of','a great number of','a horde of','a large number of','a lot of','a multiplicity of','a multitude of','a profusion of','a slew of','a swag of','abundant','an abundance of','an army of','assorted','bags of','bazillions of','billions of','copious','countless','crowds of','divers','diverse','dozens of','droves of','eleventy','frequent','gazillions of','gobs of','great quantities of','heaps of','hundreds of','innumerable','loads of','lots of','many','masses of','millions of','multifarious','multiple','multitudinous','myriad','numberless','numerous','oodles of','piles of','plenty of','profuse','scads of','scores of','several','shedload','stacks of','sundry','thousands of','tons of','umpteen','untold','various','zillions of']);
		case 'a jot of':
		case 'a particle of':
		case 'a scrap of':
		case 'a shred of':
		case 'a whit of':
		case 'an atom of':
		case 'an iota of':
		case 'the slightest bit of':
		case 'the smallest amount of':
			return rand(...['a jot of','a particle of','a scrap of','a shred of','a whit of','an atom of','an iota of','any','the slightest bit of','the smallest amount of']);
		case 'a passable amount of':
		case 'a satisfactory amount of':
		case 'a sufficiency of':
		case 'a sufficient amount of':
		case 'a tolerable amount of':
		case 'an abundance of':
		case 'an acceptable amount of':
		case 'an adequacy of':
		case 'an adequate amount of':
		case 'an ample supply of':
		case 'an amplitude of':
		case 'as much as necessary':
		case 'plenty of':
		case 'the necessary':
			return rand(...['a passable amount of','a satisfactory amount of','a sufficiency of','a sufficient amount of','a tolerable amount of','an abundance of','an acceptable amount of','an adequacy of','an adequate amount of','an ample supply of','an amplitude of','as much as necessary','enough','plenty of','sufficient','the necessary']);
		case 'a variety of':
			return rand(...['a variety of','assorted','different','differing','disparate','dissimilar','divers','diverse','heterogeneous','miscellaneous','mixed','sundry','varied','variegated','various','varying']);
		case 'all of the':
		case 'every bit of the':
		case 'the complete':
		case 'the entire':
		case 'the totality of the':
		case 'the whole of the':
			return rand(...['all','all of the','every bit of the','the complete','the entire','the totality of the','the whole of the']);
		case 'all possible':
		case 'all probable':
		case 'as great as possible':
		case 'as much as possible':
		case 'the utmost':
			return rand(...['all possible','all probable','as great as possible','as much as possible','every','the utmost']);
		case 'almost all':
		case 'almost all of':
		case 'most of':
		case 'nearly all':
		case 'nearly all of':
		case 'the bulk of':
		case 'the greatest number of':
		case 'the greatest part of':
		case 'the greatest quantity of':
		case 'the lions share of':
		case 'the majority of':
		case 'the mass of':
		case 'the preponderance of':
			return rand(...['almost all','almost all of','most','most of','nearly all','nearly all of','the bulk of','the greatest number of','the greatest part of','the greatest quantity of','the lions share of','the majority of','the mass of','the preponderance of']);
		case 'any old':
		case 'never mind which':
		case 'no matter which':
		case 'whichever comes to hand':
			return rand(...['any','any old','never mind which','no matter which','whichever','whichever comes to hand']);
		case 'each and every':
		case 'every single':
			return rand(...['all','each and every','every','every single']);
		case 'each and every':
		case 'every single':
			return rand(...['each','each and every','every','every single']);
		case 'each of the':
		case 'each one of the':
		case 'every one of the':
		case 'every single one of the':
			return rand(...['all','each of the','each one of the','every one of the','every single one of the']);
		case 'hardly any':
		case 'little or no':
		case 'not much':
			return rand(...['hardly any','inadequate','insufficient','limited','little','little or no','minimal','modest','negligible','not much','restricted','scant','slight','small']);
		case 'large number of':
		case 'multiplicity of':
			return rand(...['abundant','copious','countless','innumerable','large number of','many','multiplicity of','numerous','profuse','several','various']);
		case 'plenty of':
			return rand(...['abundant','adequate','ample','enough','plenty','plenty of','sufficient']);
		default: return word;
	}
};