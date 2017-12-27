const rand = require('bmjs-random');

module.exports = function(word) {
	switch (word) {
		case 'a fact which':
		case 'something which':
			return rand(...['a fact which','as','something which','which']);
		case 'all the same':
		case 'at the same time':
		case 'be that as it may':
		case 'despite that':
		case 'even so':
		case 'for all that':
		case 'in spite of that':
		case 'just the same':
		case 'still and all':
			return rand(...['all the same','although','at the same time','be that as it may','but','despite that','even so','for all that','howbeit','however','in spite of that','just the same','natheless','nevertheless','nonetheless','notwithstanding','still','still and all','though','withal','yet']);
		case 'allowing that':
		case 'as long as':
		case 'assuming that':
		case 'contingent on':
		case 'given that':
		case 'if and only if':
		case 'if and when':
		case 'if so be':
		case 'in the event that':
		case 'on condition that':
		case 'on the assumption that':
		case 'on the understanding that':
		case 'presuming that':
		case 'provided that':
		case 'providing that':
		case 'supposing that':
		case 'with the provision that':
		case 'with the proviso that':
		case 'with the understanding that':
			return rand(...['allowing','allowing that','as long as','assuming','assuming that','contingent on','given that','if','if and only if','if and when','if so be','in the event that','on condition that','on the assumption that','on the understanding that','presuming','presuming that','provided','provided that','providing','providing that','supposing','supposing that','with the provision that','with the proviso that','with the understanding that']);
		case 'allowing that':
		case 'as long as':
		case 'assuming that':
		case 'contingent on':
		case 'given that':
		case 'if and only if':
		case 'in the event that':
		case 'on condition that':
		case 'on the assumption that':
		case 'presuming that':
		case 'provided that':
		case 'providing that':
		case 'with the provision that':
		case 'with the proviso that':
		case 'with the understanding that':
			return rand(...['allowing that','as long as','assuming','assuming that','contingent on','given','given that','if','if and only if','in the event that','on condition that','on the assumption that','presuming','presuming that','provided','provided that','providing','providing that','with the provision that','with the proviso that','with the understanding that']);
		case 'along with':
		case 'as well as':
		case 'coupled with':
		case 'in addition to':
		case 'let alone':
		case 'not to mention':
		case 'on top of':
		case 'over and above':
		case 'over and beyond':
		case 'to say nothing of':
		case 'together with':
			return rand(...['along with','and','as well as','besides','coupled with','in addition to','let alone','not to mention','on top of','over and above','over and beyond','plus','to say nothing of','together with','with']);
		case 'along with':
		case 'as well as':
		case 'in addition to':
		case 'together with':
		case 'whats more':
			return rand(...['along with','also','and','as well as','in addition to','including','plus','together with','whats more','with']);
		case 'any place':
			return rand(...['any place','anywhere','wherever']);
		case 'any time':
			return rand(...['any time','anytime','whenever']);
		case 'any way':
			return rand(...['any way','however']);
		case 'as an illustration':
		case 'by way of illustration':
		case 'for example':
		case 'for instance':
		case 'such as':
		case 'to give an example':
		case 'to give an instance':
			return rand(...['as','as an illustration','by way of illustration','eg','for example','for instance','like','such as','to give an example','to give an instance']);
		case 'as far as':
		case 'in as much as':
		case 'in so far as':
		case 'insofar as':
		case 'the way':
		case 'the way in which':
			return rand(...['as far as','how','in as much as','in so far as','insofar as','the way','the way in which']);
		case 'as if':
		case 'as though':
		case 'in the manner that':
		case 'in the same manner that':
		case 'in the same way that':
		case 'in the way that':
		case 'the same way':
		case 'the way':
			return rand(...['as','as if','as though','how','in the manner that','in the same manner that','in the same way that','in the way that','like','the same way','the way']);
		case 'as late as':
		case 'until such time as':
		case 'up till':
		case 'up to the time that':
		case 'up until':
			return rand(...['as late as','till','until','until such time as','up till','up to the time that','up until']);
		case 'as soon as':
		case 'immediately after':
		case 'the instant':
		case 'the minute':
		case 'the moment':
		case 'the second':
			return rand(...['after','as soon as','immediately after','once','the instant','the minute','the moment','the second','when']);
		case 'at the moment that':
		case 'at the same time that':
		case 'at the time that':
		case 'during the time that':
		case 'even as':
		case 'just as':
		case 'just when':
			return rand(...['as','at the moment that','at the same time that','at the time that','during the time that','even as','just as','just when','while']);
		case 'being that':
		case 'for that':
		case 'for the reason that':
		case 'in view of the fact that':
		case 'owing to the fact that':
		case 'seeing as':
		case 'seeing that':
			return rand(...['as','because','being that','for that','for the reason that','in view of the fact that','owing to the fact that','seeing as','seeing that','since']);
		case 'but then':
		case 'by contrast':
		case 'having said that':
		case 'in contrast':
		case 'on the contrary':
		case 'on the other hand':
		case 'then again':
			return rand(...['but','but then','by contrast','contrarily','conversely','having said that','in contrast','on the contrary','on the other hand','then again','whereas']);
		case 'considering that':
		case 'in view of the fact that':
		case 'on account of':
		case 'on account of the fact that':
		case 'owing to the fact that':
		case 'seeing as':
		case 'seeing that':
			return rand(...['as','because','considering that','for','forasmuch','in view of the fact that','on account of','on account of the fact that','owing to the fact that','seeing as','seeing that','since']);
		case 'despite being':
		case 'in spite of being':
			return rand(...['albeit','although','but','despite being','if','in spite of being','whilst','yet']);
		case 'despite the fact that':
		case 'despite the possibility that':
		case 'even if':
		case 'even supposing':
		case 'even though':
		case 'for all that':
		case 'granted that':
		case 'in spite of the fact that':
		case 'notwithstanding that':
		case 'notwithstanding the fact that':
			return rand(...['albeit','although','but','despite the fact that','despite the possibility that','even if','even supposing','even though','for all that','granted that','however','in spite of the fact that','notwithstanding that','notwithstanding the fact that','though','while','whilst','yet']);
		case 'despite the fact that':
		case 'despite the possibility that':
		case 'even if':
		case 'even supposing':
		case 'even though':
		case 'for all that':
		case 'granted that':
		case 'in spite of the fact that':
		case 'notwithstanding that':
		case 'notwithstanding the fact that':
			return rand(...['although','despite the fact that','despite the possibility that','even if','even supposing','even though','for all that','granted that','in spite of the fact that','notwithstanding that','notwithstanding the fact that','while','whilst']);
		case 'despite the fact that':
		case 'even if':
		case 'even though':
		case 'for all that':
		case 'in spite of the fact that':
		case 'notwithstanding that':
		case 'notwithstanding the fact that':
			return rand(...['albeit','although','as','despite the fact that','even if','even though','for all that','however','in spite of the fact that','notwithstanding that','notwithstanding the fact that','though','while','whilst']);
		case 'even if':
		case 'even though':
			return rand(...['even if','even though']);
		case 'even if':
		case 'even though':
		case 'even when':
			return rand(...['even if','even though','even when','if']);
		case 'ever since':
			return rand(...['ever since','since']);
		case 'every time':
			return rand(...['every time','if','whenever']);
		case 'in case':
		case 'in the event':
		case 'in the event that':
		case 'just in case':
			return rand(...['if','in case','in the event','in the event that','just in case']);
		case 'in order that':
		case 'so that':
		case 'such that':
			return rand(...['in order that','so','so that','such that']);
		case 'now that':
			return rand(...['now','now that']);
		case 'that which':
			return rand(...['as','that which','what']);
		case 'the place':
		case 'the place in which':
		case 'the place where':
			return rand(...['the place','the place in which','the place where','where']);
		case 'the time':
		case 'the time at which':
		case 'the time when':
		case 'the time which':
			return rand(...['the time','the time at which','the time when','the time which','when']);
		case 'whats more':
			return rand(...['and','besides','furthermore','moreover','plus','whats more']);
		case 'whether or not':
			return rand(...['if','whether','whether or not']);
		default: return word;
	}
};