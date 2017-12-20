const rand = require('bmjs-random');

let obj = {};

obj['about'] = function() {
	return rand(...['about','apropos','around','concerning','connected with','dealing with','in connection with','in the matter of','on','on every side of','on the subject of','over','re','referring to','regarding','relating to','relevant to','respecting','round','through','throughout','touching on','with reference to','with regard to','with respect to']);
};
obj['above'] = function() {
	return rand(...['above','ahead of','atop','before','beyond','commanding','exceeding','exempt from','greater than','higher than','higher up than','immune to','in charge of','in excess of','in favour of','in preference to','instead of','insusceptible to','more powerful than','more responsible than','more than','north of','northward from','northwards from','not exposed to','not in danger of','not liable to','not open to','not subject to','not vulnerable to','on','on top of','out of reach of','over','over and above','overlooking','rather than','senior to','sooner than','superior to','surpassing','upon','upstream from','upwards of']);
};
obj['across'] = function() {
	return rand(...['across','beyond','covering','everywhere on','on all parts of','on the other side of','over','past','throughout the width of','to the other side of']);
};
obj['after'] = function() {
	return rand(...['about','after','after the fashion of','along the lines of','apropos','as a consequence of','as a mark of respect to','as a result of','as a tribute to','at the close of','at the end of','because of','below','beside','besides','by dint of','characteristic of','concerning','despite','following','following the pattern of','for','for all','hunting for','immediately inferior to','in connection with','in defiance of','in honour of','in imitation of','in pursuit of','in quest of','in search of','in spite of','in the direction of','in the face of','in the footsteps of','in the manner of','in the matter of','in the rear of','in the style of','in the tracks of','in the wake of','in view of','influenced by','later than','like','looking for','nearest to','next to','notwithstanding','on a quest for','on account of','on grounds of','on the lookout for','on the model of','on the subject of','on the track of','owing to','posterior to','re','referring to','regarding','regardless of','similar to','subsequent to','succeeding','the same as','trying to find','with reference to','with regard to','with respect to']);
};
obj['against'] = function() {
	return rand(...['a drawback for','abutting','adjacent to','adverse to','against','agin','antagonistic towards','anti','as a foil to','as provision for','at cross purposes with','at odds with','averse to','close up to','con','contra','contrary to','counter','counter to','damaging to','dead set against','deleterious to','detrimental to','disadvantageous to','harmful to','hostile to','hurtful to','in anticipation of','in case of','in compensation for','in contact with','in contrast to','in defiance of','in disagreement with','in exchange for','in expectation of','in opposition to','in preparation for','in provision for','in resistance to','in return for','in the opposite direction to','inconvenient for','inimical to','injurious to','not in accord with','on','opposed to','prejudicial to','resistant to','resisting','touching','unfavourable to','unfortunate for','unsympathetic to','up against','versus']);
};
obj['along'] = function() {
	return rand(...['across','adjacent to','along','alongside','at a point on','beside','by the side of','close by','down','during','from one end to the other of','in a line by','in the course of','in the middle of','next to','on','on the edge of','one after the other by','through','throughout the length of']);
};
obj['alongside'] = function() {
	return rand(...['alongside']);
};
obj['amid'] = function() {
	return rand(...['against a background of','amid','amidst','among','amongst','as a result of','at a time of','between','during','in an atmosphere of','in the middle of','in the midst of','in the thick of','surrounded by']);
};
obj['among'] = function() {
	return rand(...['amid','amidst','among','amongst','between','by all of','by the joint action of','by the whole of','in the company of','in the group of','in the middle of','in the midst of','in the number of','in the thick of','included in','one of','out of','some of','surrounded by','to each of']);
};
obj['apropos'] = function() {
	return rand(...['about','anent','apropos','apropos of','concerning','connected with','dealing with','in connection with','in the matter of','on the subject of','re','regarding','respecting','touching on','with reference to','with regard to','with respect to']);
};
obj['around'] = function() {
	return rand(...['about','all over','approaching','approximately','around','as near as dammit','circa','circling','close to','encircling','encompassing','everywhere in','framing','getting on for','give or take a few','here and there in','in all parts of','in the area of','in the ballpark of','in the neighbourhood of','in the region of','into all parts of','more or less','nearly','not far off','of the order of','on all sides of','on every side of','plus or minus a few','plus-minus','roughly','round about','something like','surrounding','there or thereabouts','to all parts of']);
};

module.exports = obj;
