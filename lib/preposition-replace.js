const rand = require('bmjs-random');

module.exports = function(word) {
	switch (word) {
		case 'a drawback for':
		case 'adverse to':
		case 'damaging to':
		case 'deleterious to':
		case 'detrimental to':
		case 'disadvantageous to':
		case 'harmful to':
		case 'hurtful to':
		case 'inconvenient for':
		case 'injurious to':
		case 'prejudicial to':
		case 'unfavourable to':
		case 'unfortunate for':
			return rand(...['a drawback for','adverse to','against','damaging to','deleterious to','detrimental to','disadvantageous to','harmful to','hurtful to','inconvenient for','injurious to','prejudicial to','unfavourable to','unfortunate for']);
		case 'adjacent to':
		case 'by the side of':
		case 'close by':
		case 'in a line by':
		case 'next to':
		case 'on the edge of':
		case 'one after the other by':
			return rand(...['adjacent to','along','alongside','beside','by the side of','close by','in a line by','next to','on the edge of','one after the other by']);
		case 'adjacent to':
		case 'close up to':
		case 'in contact with':
		case 'up against':
			return rand(...['abutting','adjacent to','against','close up to','in contact with','on','touching','up against']);
		case 'after the fashion of':
		case 'along the lines of':
		case 'characteristic of':
		case 'following the pattern of':
		case 'in imitation of':
		case 'in the manner of':
		case 'in the style of':
		case 'influenced by':
		case 'on the model of':
		case 'similar to':
			return rand(...['after','after the fashion of','along the lines of','characteristic of','following the pattern of','in imitation of','in the manner of','in the style of','influenced by','like','on the model of','similar to']);
		case 'against a background of':
		case 'as a result of':
		case 'at a time of':
		case 'in an atmosphere of':
			return rand(...['against a background of','amid','as a result of','at a time of','during','in an atmosphere of']);
		case 'ahead of':
		case 'higher than':
		case 'higher up than':
		case 'in charge of':
		case 'more powerful than':
		case 'more responsible than':
		case 'senior to':
		case 'superior to':
			return rand(...['above','ahead of','commanding','higher than','higher up than','in charge of','more powerful than','more responsible than','over','senior to','superior to']);
		case 'all over':
		case 'everywhere in':
		case 'here and there in':
		case 'in all parts of':
		case 'to all parts of':
			return rand(...['about','all over','around','everywhere in','here and there in','in all parts of','to all parts of']);
		case 'antagonistic towards':
		case 'at cross purposes with':
		case 'at odds with':
		case 'averse to':
		case 'dead set against':
		case 'hostile to':
		case 'in defiance of':
		case 'in disagreement with':
		case 'in opposition to':
		case 'inimical to':
		case 'opposed to':
		case 'resistant to':
		case 'unsympathetic to':
			return rand(...['against','agin','antagonistic towards','anti','at cross purposes with','at odds with','averse to','con','contra','counter','dead set against','hostile to','in defiance of','in disagreement with','in opposition to','inimical to','opposed to','resistant to','unsympathetic to','versus']);
		case 'as a consequence of':
		case 'as a result of':
		case 'because of':
		case 'by dint of':
		case 'in the wake of':
		case 'in view of':
		case 'on account of':
		case 'on grounds of':
		case 'owing to':
			return rand(...['after','as a consequence of','as a result of','because of','by dint of','in the wake of','in view of','on account of','on grounds of','owing to']);
		case 'as a foil to':
		case 'in contrast to':
			return rand(...['against','as a foil to','in contrast to']);
		case 'as a mark of respect to':
		case 'as a tribute to':
		case 'in honour of':
		case 'the same as':
			return rand(...['after','as a mark of respect to','as a tribute to','for','in honour of','the same as']);
		case 'as near as dammit':
		case 'close to':
		case 'getting on for':
		case 'give or take a few':
		case 'in the area of':
		case 'in the ballpark of':
		case 'in the neighbourhood of':
		case 'in the region of':
		case 'more or less':
		case 'not far off':
		case 'of the order of':
		case 'plus or minus a few':
		case 'round about':
		case 'something like':
		case 'there or thereabouts':
			return rand(...['about','approaching','approximately','around','as near as dammit','circa','close to','getting on for','give or take a few','in the area of','in the ballpark of','in the neighbourhood of','in the region of','more or less','nearly','not far off','of the order of','plus or minus a few','plus-minus','roughly','round about','something like','there or thereabouts']);
		case 'as provision for':
		case 'in anticipation of':
		case 'in case of':
		case 'in expectation of':
		case 'in preparation for':
		case 'in provision for':
			return rand(...['against','as provision for','in anticipation of','in case of','in expectation of','in preparation for','in provision for']);
		case 'at a point on':
		case 'in the course of':
		case 'in the middle of':
			return rand(...['along','at a point on','during','in the course of','in the middle of','on']);
		case 'at the close of':
		case 'at the end of':
		case 'in the wake of':
		case 'later than':
		case 'posterior to':
		case 'subsequent to':
			return rand(...['after','at the close of','at the end of','following','in the wake of','later than','posterior to','subsequent to','succeeding']);
		case 'by all of':
		case 'by the joint action of':
		case 'by the whole of':
			return rand(...['among','by all of','by the joint action of','by the whole of']);
		case 'connected with':
		case 'dealing with':
		case 'in connection with':
		case 'in the matter of':
		case 'on the subject of':
		case 'referring to':
		case 'relating to':
		case 'relevant to':
		case 'touching on':
		case 'with reference to':
		case 'with regard to':
		case 'with respect to':
			return rand(...['about','apropos','concerning','connected with','dealing with','in connection with','in the matter of','on','on the subject of','re','referring to','regarding','relating to','relevant to','respecting','touching on','with reference to','with regard to','with respect to']);
		case 'connected with':
		case 'dealing with':
		case 'in connection with':
		case 'in the matter of':
		case 'on the subject of':
		case 'touching on':
		case 'with reference to':
		case 'with regard to':
		case 'with respect to':
			return rand(...['about','anent','apropos','concerning','connected with','dealing with','in connection with','in the matter of','on the subject of','re','regarding','respecting','touching on','with reference to','with regard to','with respect to']);
		case 'contrary to':
		case 'counter to':
		case 'in opposition to':
		case 'in the opposite direction to':
		case 'not in accord with':
			return rand(...['against','contrary to','counter to','in opposition to','in the opposite direction to','not in accord with','resisting']);
		case 'everywhere on':
		case 'on all parts of':
		case 'throughout the width of':
		case 'to the other side of':
			return rand(...['across','covering','everywhere on','on all parts of','over','throughout the width of','to the other side of']);
		case 'exempt from':
		case 'immune to':
		case 'insusceptible to':
		case 'not exposed to':
		case 'not in danger of':
		case 'not liable to':
		case 'not open to':
		case 'not subject to':
		case 'not vulnerable to':
		case 'out of reach of':
		case 'superior to':
			return rand(...['above','beyond','exempt from','immune to','insusceptible to','not exposed to','not in danger of','not liable to','not open to','not subject to','not vulnerable to','out of reach of','superior to']);
		case 'for all':
		case 'in defiance of':
		case 'in spite of':
		case 'in the face of':
		case 'regardless of':
			return rand(...['after','despite','for all','in defiance of','in spite of','in the face of','notwithstanding','regardless of']);
		case 'from one end to the other of':
		case 'throughout the length of':
			return rand(...['across','along','down','from one end to the other of','through','throughout the length of']);
		case 'greater than':
		case 'higher than':
		case 'in excess of':
		case 'more than':
		case 'over and above':
		case 'upwards of':
			return rand(...['above','beyond','exceeding','greater than','higher than','in excess of','more than','over','over and above','surpassing','upwards of']);
		case 'higher than':
		case 'higher up than':
		case 'on top of':
			return rand(...['above','atop','higher than','higher up than','on','on top of','over','overlooking','upon']);
		case 'hunting for':
		case 'in pursuit of':
		case 'in quest of':
		case 'in search of':
		case 'looking for':
		case 'on a quest for':
		case 'on the lookout for':
		case 'trying to find':
			return rand(...['after','hunting for','in pursuit of','in quest of','in search of','looking for','on a quest for','on the lookout for','trying to find']);
		case 'immediately inferior to':
		case 'nearest to':
		case 'next to':
			return rand(...['after','below','beside','besides','following','immediately inferior to','nearest to','next to']);
		case 'in compensation for':
		case 'in exchange for':
		case 'in return for':
			return rand(...['against','in compensation for','in exchange for','in return for']);
		case 'in connection with':
		case 'in the matter of':
		case 'on the subject of':
		case 'referring to':
		case 'with reference to':
		case 'with regard to':
		case 'with respect to':
			return rand(...['about','after','apropos','concerning','in connection with','in the matter of','on the subject of','re','referring to','regarding','with reference to','with regard to','with respect to']);
		case 'in favour of':
		case 'in preference to':
		case 'instead of':
		case 'more than':
		case 'rather than':
		case 'sooner than':
			return rand(...['above','before','in favour of','in preference to','instead of','more than','over','rather than','sooner than']);
		case 'in pursuit of':
		case 'in the direction of':
		case 'in the footsteps of':
		case 'in the tracks of':
		case 'on the track of':
			return rand(...['after','following','in pursuit of','in the direction of','in the footsteps of','in the tracks of','on the track of']);
		case 'in resistance to':
			return rand(...['against','in resistance to']);
		case 'in the company of':
		case 'in the middle of':
		case 'in the midst of':
		case 'in the thick of':
		case 'surrounded by':
			return rand(...['amid','amidst','among','between','in the company of','in the middle of','in the midst of','in the thick of','surrounded by']);
		case 'in the group of':
		case 'in the number of':
		case 'included in':
		case 'one of':
		case 'out of':
		case 'some of':
			return rand(...['among','in the group of','in the number of','included in','one of','out of','some of']);
		case 'in the middle of':
		case 'in the midst of':
		case 'in the thick of':
		case 'surrounded by':
			return rand(...['amid','amidst','among','amongst','between','in the middle of','in the midst of','in the thick of','surrounded by']);
		case 'in the rear of':
			return rand(...['after','following','in the rear of']);
		case 'north of':
		case 'northward from':
		case 'northwards from':
			return rand(...['above','north of','northward from','northwards from']);
		case 'on all sides of':
		case 'on every side of':
			return rand(...['about','around','circling','encircling','encompassing','framing','on all sides of','on every side of','surrounding']);
		case 'on every side of':
			return rand(...['about','around','on every side of','over','round','through','throughout']);
		case 'on the other side of':
			return rand(...['across','beyond','on the other side of','over','past']);
		case 'to each of':
			return rand(...['among','between','to each of']);
		case 'upstream from':
			return rand(...['above','upstream from']);
		default: return word;
	}
};
