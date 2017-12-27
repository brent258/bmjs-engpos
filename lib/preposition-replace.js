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
		case 'a short distance from':
		case 'a stones throw away from':
		case 'adjacent to':
		case 'bordering on':
		case 'close by':
		case 'close to':
		case 'contiguous with':
		case 'in the neighbourhood of':
		case 'in the vicinity of':
		case 'next to':
		case 'not far away from':
		case 'not far from':
		case 'within reach of':
		case 'within sniffing distance of':
		case 'within spitting distance of':
			return rand(...['a short distance from','a stones throw away from','abutting','adjacent to','adjoining','alongside','bordering on','close by','close to','contiguous with','in the neighbourhood of','in the vicinity of','near','next to','not far away from','not far from','within reach of','within sniffing distance of','within spitting distance of']);
		case 'above and beyond':
		case 'apart from':
		case 'as well as':
		case 'aside from':
		case 'but for':
		case 'in addition to':
		case 'leaving aside':
		case 'not counting':
		case 'not including':
		case 'other than':
		case 'outside of':
		case 'over and above':
		case 'save for':
		case 'with the exception of':
			return rand(...['above and beyond','apart from','as well as','aside from','bar','barring','besides','beyond','but for','except','excepting','excluding','forbye','in addition to','leaving aside','not counting','not including','other than','outside of','over and above','save for','with the exception of']);
		case 'above and beyond':
		case 'greater than':
		case 'in excess of':
		case 'more than':
		case 'over and above':
		case 'upwards of':
			return rand(...['above','above and beyond','beyond','exceeding','greater than','in excess of','more than','over and above','upwards of']);
		case 'abreast of':
		case 'adjacent to':
		case 'aside of':
		case 'at the side of':
		case 'by the side of':
		case 'cheek by jowl with':
		case 'close to':
		case 'hard by':
		case 'next door to':
		case 'next to':
		case 'parallel to':
			return rand(...['abreast of','abutting','adjacent to','alongside','aside of','at the side of','beside','bordering','by','by the side of','cheek by jowl with','close to','hard by','near','neighbouring','next door to','next to','overlooking','parallel to','with']);
		case 'abreast of':
		case 'adjacent to':
		case 'at the side of':
		case 'attached to':
		case 'by the side of':
		case 'cheek by jowl with':
		case 'close to':
		case 'connected to':
		case 'connecting with':
		case 'contiguous with':
		case 'hard by':
		case 'nearest to':
		case 'next door to':
		case 'next to':
		case 'side by side with':
			return rand(...['abreast of','abutting','adjacent to','adjoining','alongside','at the side of','attached to','beside','bordering','by','by the side of','cheek by jowl with','close to','connected to','connecting with','contiguous with','hard by','near','nearest to','neighbouring','next door to','next to','overlooking','side by side with']);
		case 'accompanied by':
		case 'escorted by':
		case 'in the company of':
			return rand(...['accompanied by','escorted by','in the company of','with']);
		case 'according to':
			return rand(...['according to','by','concerning','with']);
		case 'across from':
		case 'eyeball to eyeball with':
		case 'face to face with':
			return rand(...['across from','eyeball to eyeball with','face to face with','facing','fronting','opposite']);
		case 'acting as':
		case 'functioning as':
		case 'in the role of':
			return rand(...['acting as','as','being','functioning as','in the role of']);
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
		case 'after only':
		case 'in less than':
		case 'in no more than':
		case 'in under':
			return rand(...['after only','in less than','in no more than','in under','within']);
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
		case 'after the fashion of':
		case 'along the lines of':
		case 'in a similar way to':
		case 'in the manner of':
		case 'in the same manner as':
		case 'in the same way as':
		case 'in the same way that':
		case 'on the lines of':
		case 'tantamount to':
			return rand(...['after the fashion of','along the lines of','as','in a similar way to','in the manner of','in the same manner as','in the same way as','in the same way that','like','on the lines of','tantamount to']);
		case 'against a background of':
		case 'as a result of':
		case 'at a time of':
		case 'in an atmosphere of':
			return rand(...['against a background of','amid','as a result of','at a time of','during','in an atmosphere of']);
		case 'ahead of':
		case 'anterior to':
		case 'earlier than':
		case 'in advance of':
		case 'in anticipation of':
		case 'in expectation of':
		case 'in preparation for':
		case 'leading up to':
		case 'on the eve of':
		case 'preliminary to':
		case 'preparatory to':
		case 'previous to':
		case 'prior to':
			return rand(...['ahead of','anterior to','before','earlier than','in advance of','in anticipation of','in expectation of','in preparation for','leading up to','on the eve of','preliminary to','preparatory to','previous to','prior to']);
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
		case 'all round':
		case 'all through':
		case 'everywhere in':
		case 'here and there in':
		case 'in every part of':
		case 'right through':
			return rand(...['all over','all round','all through','everywhere in','here and there in','in every part of','right through','round','throughout']);
		case 'all over':
		case 'around in':
		case 'by way of':
		case 'from end to end of':
		case 'into and out of':
		case 'to the far side of':
		case 'to the other side of':
			return rand(...['across','all over','along','around in','between','by','by way of','down','from end to end of','into and out of','past','through','throughout','to the far side of','to the other side of','via']);
		case 'all over':
		case 'everywhere in':
		case 'here and there in':
		case 'in all parts of':
		case 'to all parts of':
			return rand(...['about','all over','around','everywhere in','here and there in','in all parts of','to all parts of']);
		case 'all the time through':
		case 'all through':
		case 'for the duration of':
		case 'for the whole of':
		case 'the whole time through':
		case 'until the end of':
			return rand(...['all the time through','all through','for the duration of','for the whole of','the whole time through','through','throughout','until the end of']);
		case 'all through':
		case 'everywhere in':
		case 'in all parts of':
		case 'on to':
		case 'throughout the extent of':
			return rand(...['across','all through','around','everywhere in','in all parts of','on to','over','throughout','throughout the extent of']);
		case 'all through':
		case 'for the duration of':
		case 'to the end of':
		case 'until the end of':
			return rand(...['all through','during','for the duration of','through','throughout','to the end of','until the end of']);
		case 'answerable to':
		case 'at the mercy of':
		case 'controlled by':
		case 'inferior to':
		case 'junior to':
		case 'reporting to':
		case 'responsible to':
		case 'secondary to':
		case 'subject to':
		case 'subordinate to':
		case 'subservient to':
		case 'under the heel of':
			return rand(...['answerable to','at the mercy of','controlled by','inferior to','junior to','reporting to','responsible to','secondary to','subject to','subordinate to','subservient to','under','under the heel of']);
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
		case 'apart from':
		case 'aside from':
		case 'but for':
		case 'except for':
		case 'leaving out':
		case 'other than':
		case 'outside of':
		case 'save for':
		case 'short of':
		case 'with the exception of':
			return rand(...['apart from','aside from','bar','barring','besides','but for','except for','excepting','excluding','leaving out','omitting','other than','outside of','save for','saving','short of','with the exception of']);
		case 'apart from':
		case 'aside from':
		case 'but for':
		case 'except for':
		case 'leaving out':
		case 'other than':
		case 'outside of':
		case 'with the exception of':
			return rand(...['apart from','aside from','bar','barring','besides','but','but for','except','except for','excluding','leaving out','omitting','other than','outside of','save','saving','with the exception of']);
		case 'apart from':
		case 'aside from':
		case 'except for':
		case 'exclusive of':
		case 'leaving out':
		case 'not counting':
		case 'not including':
		case 'other than':
		case 'outside of':
		case 'with the exception of':
		case 'with the exclusion of':
		case 'with the omission of':
			return rand(...['apart from','aside from','bar','barring','besides','but','except','except for','excepting','excluding','exclusive of','forbye','leaving out','not counting','not including','omitting','other than','outside of','save','saving','with the exception of','with the exclusion of','with the omission of']);
		case 'apart from':
		case 'aside from':
		case 'except for':
		case 'leaving out':
		case 'other than':
		case 'outside of':
		case 'save for':
		case 'short of':
		case 'with the exception of':
			return rand(...['apart from','aside from','bar','barring','besides','but','except for','excepting','excluding','leaving out','omitting','other than','outside of','save for','saving','short of','with the exception of']);
		case 'apart from':
		case 'other than':
			return rand(...['apart from','beyond','except','other than']);
		case 'apropos of':
		case 'as for':
		case 'as regards':
		case 'in connection with':
		case 'on the subject of':
		case 'relating to':
		case 'speaking of':
		case 'with reference to':
		case 'with regard to':
		case 'with respect to':
			return rand(...['about','apropos of','as for','as regards','concerning','in connection with','on the subject of','over','re','regarding','relating to','respecting','speaking of','with reference to','with regard to','with respect to']);
		case 'apropos of':
		case 'connected with':
		case 'dealing with':
		case 'in connection with':
		case 'in the matter of':
		case 'on the subject of':
		case 'touching on':
		case 'with reference to':
		case 'with regard to':
		case 'with respect to':
			return rand(...['about','anent','apropos','apropos of','concerning','connected with','dealing with','in connection with','in the matter of','on the subject of','re','regarding','respecting','touching on','with reference to','with regard to','with respect to']);
		case 'as a consequence of':
		case 'as a result of':
		case 'because of':
		case 'by dint of':
		case 'by means of':
		case 'by virtue of':
		case 'by way of':
		case 'on account of':
		case 'owing to':
		case 'thanks to':
		case 'through the agency of':
		case 'under the aegis of':
		case 'with the aid of':
		case 'with the assistance of':
		case 'with the help of':
			return rand(...['as a consequence of','as a result of','because of','by dint of','by means of','by virtue of','by way of','on account of','owing to','thanks to','through','through the agency of','under the aegis of','using','via','with the aid of','with the assistance of','with the help of']);
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
		case 'as a contribution to':
		case 'as a help to':
		case 'to assist':
		case 'to help':
			return rand(...['as a contribution to','as a help to','assisting','for','promoting','supporting','to assist','to help','toward','towards']);
		case 'as a foil to':
		case 'in contrast to':
			return rand(...['against','as a foil to','in contrast to']);
		case 'as a mark of respect to':
		case 'as a tribute to':
		case 'in honour of':
		case 'the same as':
			return rand(...['after','as a mark of respect to','as a tribute to','for','in honour of','the same as']);
		case 'as a result of':
		case 'because of':
		case 'by dint of':
		case 'by means of':
		case 'by virtue of':
		case 'by way of':
		case 'through the agency of':
		case 'under the aegis of':
		case 'with the aid of':
		case 'with the help of':
			return rand(...['as a result of','because of','by','by dint of','by means of','by virtue of','by way of','employing','through','through the agency of','under the aegis of','using','utilizing','via','with the aid of','with the help of']);
		case 'as late as':
		case 'until such time as':
		case 'up till':
		case 'up to':
		case 'up to the time of':
		case 'up to the time that':
		case 'up until':
			return rand(...['as late as','pending','through','till','until','until such time as','up till','up to','up to the time of','up to the time that','up until']);
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
		case 'or so':
		case 'or thereabouts':
		case 'plus or minus a few':
		case 'round about':
		case 'something like':
		case 'there or thereabouts':
			return rand(...['about','approaching','approximately','around','as near as dammit','circa','close to','getting on for','give or take a few','in the area of','in the ballpark of','in the neighbourhood of','in the region of','more or less','nearly','not far off','of the order of','or so','or thereabouts','plus or minus a few','plus-minus','roughly','round about','something like','there or thereabouts']);
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
		case 'as opposed to':
		case 'differently from':
		case 'in contradistinction to':
		case 'in contrast to':
		case 'in contrast with':
		case 'not like':
		case 'not typical of':
		case 'uncharacteristic of':
			return rand(...['as opposed to','differently from','in contradistinction to','in contrast to','in contrast with','not like','not typical of','uncharacteristic of','unlike']);
		case 'as provision for':
		case 'in anticipation of':
		case 'in case of':
		case 'in expectation of':
		case 'in preparation for':
		case 'in provision for':
			return rand(...['against','as provision for','in anticipation of','in case of','in expectation of','in preparation for','in provision for']);
		case 'as regards':
		case 'in connection with':
		case 'in regard to':
		case 'in relation to':
		case 'in respect to':
		case 'with regard to':
		case 'with respect to':
			return rand(...['about','apropos','as regards','concerning','in connection with','in regard to','in relation to','in respect to','regarding','respecting','toward','towards','with regard to','with respect to']);
		case 'at a point on':
		case 'in the course of':
		case 'in the middle of':
			return rand(...['along','at a point on','during','in the course of','in the middle of','on']);
		case 'at the back of':
		case 'at the bottom of':
		case 'culpable of':
		case 'guilty of':
		case 'responsible for':
		case 'the cause of':
		case 'the organizer of':
		case 'the source of':
		case 'to blame for':
			return rand(...['at the back of','at the bottom of','behind','causing','culpable of','guilty of','initiating','instigating','responsible for','the cause of','the organizer of','the source of','to blame for','urging']);
		case 'at the back of':
		case 'at the rear of':
		case 'in back of':
		case 'on the far side of':
		case 'on the further side of':
		case 'on the other side of':
			return rand(...['at the back of','at the rear of','behind','beyond','in back of','on the far side of','on the further side of','on the other side of']);
		case 'at the back of':
		case 'close on':
		case 'hard on the heels of':
		case 'in the wake of':
		case 'on the trail of':
		case 'to the rear of':
			return rand(...['after','at the back of','behind','close on','following','hard on the heels of','in the wake of','on the trail of','to the rear of']);
		case 'at the bottom of':
		case 'at the foot of':
			return rand(...['at the bottom of','at the foot of','below','beneath','under','underneath']);
		case 'at the bottom of':
		case 'at the foot of':
		case 'lower than':
			return rand(...['at the bottom of','at the foot of','below','beneath','lower than','under','underneath']);
		case 'at the close of':
		case 'at the end of':
		case 'in the wake of':
		case 'later than':
		case 'posterior to':
		case 'subsequent to':
			return rand(...['after','at the close of','at the end of','following','in the wake of','later than','posterior to','subsequent to','succeeding']);
		case 'at the end of':
		case 'in less than':
		case 'in no more than':
		case 'in under':
		case 'subsequent to':
			return rand(...['after','at the end of','following','in','in less than','in no more than','in under','subsequent to','within']);
		case 'at the mercy of':
		case 'bound by':
		case 'constrained by':
		case 'controlled by':
		case 'liable to':
		case 'subject to':
		case 'under the control of':
			return rand(...['at the mercy of','bound by','constrained by','controlled by','liable to','subject to','under','under the control of']);
		case 'at the mercy of':
		case 'controlled by':
		case 'inferior to':
		case 'lower than':
		case 'secondary to':
		case 'subject to':
		case 'subordinate to':
		case 'subservient to':
		case 'under the heel of':
			return rand(...['at the mercy of','below','controlled by','inferior to','lower than','secondary to','subject to','subordinate to','subservient to','under','under the heel of']);
		case 'before the very eyes of':
		case 'in front of':
		case 'in the presence of':
		case 'in the sight of':
		case 'under the nose of':
			return rand(...['before','before the very eyes of','in front of','in the presence of','in the sight of','under the nose of']);
		case 'beyond the capacity of':
		case 'beyond the power of':
		case 'outside the limitations of':
		case 'outside the range of':
			return rand(...['beyond','beyond the capacity of','beyond the power of','outside the limitations of','outside the range of','surpassing']);
		case 'beyond the limits of':
		case 'in excess of':
			return rand(...['beyond','beyond the limits of','in excess of','past']);
		case 'by all of':
		case 'by the joint action of':
		case 'by the whole of':
			return rand(...['among','amongst','by all of','by the joint action of','by the whole of']);
		case 'by way of':
		case 'throughout the length of':
		case 'to the other end of':
			return rand(...['across','along','by way of','down','through','throughout the length of','to the other end of','via']);
		case 'characteristic of':
		case 'in character with':
		case 'typical of':
			return rand(...['characteristic of','in character with','like','typical of']);
		case 'close to':
		case 'coming to':
		case 'getting on for':
		case 'just before':
		case 'not quite':
		case 'shortly before':
			return rand(...['approaching','around','close to','coming to','getting on for','just before','near','nearing','not quite','shortly before','toward','towards']);
		case 'compared with':
		case 'contrasted with':
		case 'in comparison with':
		case 'in contrast to':
		case 'in contrast with':
		case 'next to':
			return rand(...['against','beside','compared with','contrasted with','in comparison with','in contrast to','in contrast with','next to']);
		case 'connected with':
		case 'dealing with':
		case 'in connection with':
		case 'in terms of':
		case 'in the matter of':
		case 'on the subject of':
		case 'referring to':
		case 'relating to':
		case 'relevant to':
		case 'touching on':
		case 'with reference to':
		case 'with regard to':
		case 'with respect to':
			return rand(...['about','apropos','concerning','connected with','dealing with','in connection with','in terms of','in the matter of','on','on the subject of','re','referring to','regarding','relating to','relevant to','respecting','touching on','with reference to','with regard to','with respect to']);
		case 'contrary to':
		case 'counter to':
		case 'in opposition to':
		case 'in the opposite direction to':
		case 'not in accord with':
			return rand(...['against','contrary to','counter to','in opposition to','in the opposite direction to','not in accord with','resisting']);
		case 'degrading to':
		case 'inappropriate for':
		case 'unbecoming to':
		case 'unbefitting for':
		case 'undignified for':
		case 'unworthy of':
			return rand(...['below','beneath','degrading to','inappropriate for','unbecoming to','unbefitting for','undignified for','unworthy of']);
		case 'deprived of':
		case 'destitute of':
		case 'in need of':
		case 'short of':
		case 'wanting for':
			return rand(...['deprived of','destitute of','in need of','lacking','needing','requiring','short of','wanting for','without']);
		case 'different from':
		case 'dissimilar to':
		case 'distant from':
		case 'far apart from':
		case 'far from':
		case 'not like':
		case 'not resembling':
		case 'not similar to':
			return rand(...['different from','dissimilar to','distant from','far apart from','far from','not like','not resembling','not similar to','unalike','unlike']);
		case 'drowned by':
		case 'engulfed by':
		case 'flooded by':
		case 'immersed in':
		case 'inundated by':
		case 'submerged by':
		case 'sunk in':
			return rand(...['drowned by','engulfed by','flooded by','immersed in','inundated by','submerged by','sunk in','under']);
		case 'earlier than':
		case 'in advance of':
		case 'previous to':
		case 'prior to':
		case 'up till':
		case 'up to':
		case 'up until':
			return rand(...['before','earlier than','in advance of','previous to','prior to','till','until','up till','up to','up until']);
		case 'en route for':
		case 'in the direction of':
		case 'in the vicinity of':
		case 'on the road to':
		case 'on the way to':
		case 'so as to approach':
		case 'so as to near':
			return rand(...['en route for','in the direction of','in the vicinity of','on the road to','on the way to','so as to approach','so as to near','to','toward','towards']);
		case 'enclosed by':
		case 'in the middle of':
		case 'surrounded by':
		case 'within the bounds of':
		case 'within the confines of':
			return rand(...['enclosed by','in','in the middle of','inside','surrounded by','within','within the bounds of','within the confines of']);
		case 'enclosed by':
		case 'surrounded by':
		case 'within the bounds of':
		case 'within the confines of':
			return rand(...['enclosed by','in','inside','surrounded by','within','within the bounds of','within the confines of']);
		case 'even with':
		case 'for all':
		case 'in defiance of':
		case 'in spite of':
		case 'in the face of':
		case 'regardless of':
		case 'undeterred by':
		case 'without being affected by':
			return rand(...['despite','even with','for all','in defiance of','in spite of','in the face of','notwithstanding','regardless of','undeterred by','without being affected by']);
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
		case 'for all':
		case 'in spite of':
		case 'regardless of':
			return rand(...['despite','for all','in spite of','notwithstanding','regardless of']);
		case 'for example':
		case 'for instance':
		case 'in particular':
		case 'such as':
			return rand(...['as','for example','for instance','in particular','like','namely','such as','viz']);
		case 'for the time of':
		case 'in the course of':
		case 'in the time of':
		case 'throughout the time of':
			return rand(...['during','for the time of','in','in the course of','in the time of','through','throughout','throughout the time of']);
		case 'from one end to the other of':
		case 'throughout the length of':
			return rand(...['across','along','down','from one end to the other of','through','throughout the length of']);
		case 'further down than':
		case 'lower than':
			return rand(...['below','beneath','further down than','lower than','under','underneath']);
		case 'further on than':
		case 'on the far side of':
		case 'on the farther side of':
		case 'on the other side of':
			return rand(...['after','behind','beyond','further on than','on the far side of','on the farther side of','on the other side of','outwith','over','past']);
		case 'greater than':
		case 'higher than':
		case 'in excess of':
		case 'more than':
		case 'over and above':
		case 'upwards of':
			return rand(...['above','beyond','exceeding','greater than','higher than','in excess of','more than','over','over and above','surpassing','upwards of']);
		case 'greater than':
		case 'in excess of':
		case 'more than':
		case 'upwards of':
			return rand(...['above','beyond','exceeding','greater than','in excess of','more than','over','upwards of']);
		case 'higher than':
		case 'higher up than':
		case 'on top of':
			return rand(...['above','atop','higher than','higher up than','on top of','over']);
		case 'higher than':
		case 'higher up than':
		case 'on top of':
			return rand(...['above','atop','higher than','higher up than','on','on top of','over','overlooking','upon']);
		case 'higher up than':
		case 'in charge of':
		case 'more powerful than':
		case 'responsible for':
		case 'superior to':
			return rand(...['above','commanding','higher up than','in charge of','more powerful than','over','responsible for','superior to']);
		case 'hunting for':
		case 'in pursuit of':
		case 'in quest of':
		case 'in search of':
		case 'looking for':
		case 'on a quest for':
		case 'on the lookout for':
		case 'trying to find':
			return rand(...['after','hunting for','in pursuit of','in quest of','in search of','looking for','on a quest for','on the lookout for','trying to find']);
		case 'identical to':
		case 'similar to':
		case 'the same as':
			return rand(...['identical to','like','similar to','the same as']);
		case 'immediately inferior to':
		case 'nearest to':
		case 'next to':
			return rand(...['after','below','beside','besides','following','immediately inferior to','nearest to','next to']);
		case 'in agreement with':
		case 'on the side of':
			return rand(...['backing','behind','financing','for','in agreement with','on the side of','supporting']);
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
		case 'in contact with':
		case 'resting on':
		case 'supported by':
			return rand(...['in contact with','on','resting on','supported by']);
		case 'in favour of':
		case 'in preference to':
		case 'instead of':
		case 'more than':
		case 'rather than':
		case 'sooner than':
			return rand(...['above','before','in favour of','in preference to','instead of','more than','over','rather than','sooner than']);
		case 'in front of':
			return rand(...['beyond','by','in front of','past']);
		case 'in good time for':
		case 'no later than':
			return rand(...['at','before','by','in good time for','no later than']);
		case 'in order to achieve':
		case 'in order to obtain':
		case 'so as to achieve':
		case 'with the aim of':
			return rand(...['for','in order to achieve','in order to obtain','so as to achieve','toward','towards','with the aim of']);
		case 'in preference to':
		case 'instead of':
		case 'rather than':
		case 'sooner than':
			return rand(...['above','before','in preference to','instead of','over','rather than','sooner than']);
		case 'in pursuit of':
		case 'in the direction of':
		case 'in the footsteps of':
		case 'in the tracks of':
		case 'on the track of':
			return rand(...['after','following','in pursuit of','in the direction of','in the footsteps of','in the tracks of','on the track of']);
		case 'in resistance to':
			return rand(...['against','in resistance to']);
		case 'in the absence of':
		case 'unaccompanied by':
		case 'unescorted by':
			return rand(...['in the absence of','unaccompanied by','unescorted by','without']);
		case 'in the character of':
		case 'in the guise of':
		case 'so as to appear to be':
		case 'with the appearance of':
			return rand(...['as','in the character of','in the guise of','so as to appear to be','with the appearance of']);
		case 'in the company of':
		case 'in the middle of':
		case 'in the midst of':
		case 'in the thick of':
		case 'surrounded by':
			return rand(...['amid','amidst','among','amongst','between','in the company of','in the middle of','in the midst of','in the thick of','surrounded by']);
		case 'in the course of':
		case 'in the time of':
			return rand(...['during','in','in the course of','in the time of','over']);
		case 'in the group of':
		case 'in the number of':
		case 'included in':
		case 'one of':
		case 'out of':
		case 'some of':
			return rand(...['among','amongst','in the group of','in the number of','included in','one of','out of','some of']);
		case 'in the middle of':
			return rand(...['between','betwixt','in the middle of']);
		case 'in the middle of':
		case 'in the midst of':
		case 'in the thick of':
		case 'surrounded by':
			return rand(...['amid','amidst','among','amongst','between','in the middle of','in the midst of','in the thick of','surrounded by']);
		case 'in the process of':
			return rand(...['in the process of','receiving','under','undergoing']);
		case 'in the rear of':
			return rand(...['after','following','in the rear of']);
		case 'inferior to':
		case 'less advanced than':
		case 'slower than':
		case 'weaker than':
			return rand(...['behind','inferior to','less advanced than','slower than','weaker than']);
		case 'inferior to':
		case 'lower in status than':
		case 'lower than':
		case 'not so important as':
		case 'secondary to':
		case 'subordinate to':
		case 'subservient to':
			return rand(...['below','beneath','inferior to','lower in status than','lower than','not so important as','secondary to','subordinate to','subservient to']);
		case 'inside the limits of':
		case 'inside the range of':
		case 'within the bounds of':
			return rand(...['inside','inside the limits of','inside the range of','within','within the bounds of']);
		case 'into the interior of':
			return rand(...['in','inside','into','into the interior of']);
		case 'late in relation to':
		case 'later than':
			return rand(...['after','behind','late in relation to','later than']);
		case 'later than':
			return rand(...['after','beyond','later than','past']);
		case 'less than':
		case 'lower than':
		case 'not as much as':
		case 'not so much as':
		case 'shy of':
		case 'smaller than':
			return rand(...['below','less than','lower than','not as much as','not so much as','shy of','smaller than','under']);
		case 'lower in':
		case 'lower on':
		case 'to the bottom of':
			return rand(...['down','lower in','lower on','to the bottom of']);
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
		case 'on to':
			return rand(...['on','on to','onto']);
		case 'to each of':
			return rand(...['among','amongst','between','to each of']);
		case 'up to and including':
			return rand(...['through','up to and including']);
		case 'upstream from':
			return rand(...['above','upstream from']);
		default: return word;
	}
};