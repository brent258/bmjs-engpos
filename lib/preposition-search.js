module.exports = {
	phrases: [
		{search: /\baround\sthe\sbend\s/gi, replace: 'around_the_bend '},
		{search: /\bconnected\swith\s/gi, replace: 'connected_with '},
		{search: /\bdealing\swith\s/gi, replace: 'dealing_with '},
		{search: /\bin\sconnection\swith\s/gi, replace: 'in_connection_with '},
		{search: /\bin\sthe\smatter\sof\s/gi, replace: 'in_the_matter_of '},
		{search: /\bon\severy\sside\sof\s/gi, replace: 'on_every_side_of '},
		{search: /\bon\sthe\ssubject\sof\s/gi, replace: 'on_the_subject_of '},
		{search: /\breferring\sto\s/gi, replace: 'referring_to '},
		{search: /\brelating\sto\s/gi, replace: 'relating_to '},
		{search: /\brelevant\sto\s/gi, replace: 'relevant_to '},
		{search: /\btouching\son\s/gi, replace: 'touching_on '},
		{search: /\bwith\sreference\sto\s/gi, replace: 'with_reference_to '},
		{search: /\bwith\sregard\sto\s/gi, replace: 'with_regard_to '},
		{search: /\bwith\srespect\sto\s/gi, replace: 'with_respect_to '}
	],
	singleRegex: /(\b)(about|apropos|around|concerning|on|over|re|regarding|respecting|round|through|throughout)([^_])/gi,
	multiRegex: /(\b)(around_the_bend|connected_with|dealing_with|in_connection_with|in_the_matter_of|on_every_side_of|on_the_subject_of|referring_to|relating_to|relevant_to|touching_on|with_reference_to|with_regard_to|with_respect_to)/gi
};