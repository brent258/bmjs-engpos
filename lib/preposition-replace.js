const rand = require('bmjs-random');

let obj = {};

obj['about'] = function() {
	return rand(...['about','apropos','around','concerning','connected with','dealing with','in connection with','in the matter of','on','on every side of','on the subject of','over','re','referring to','regarding','relating to','relevant to','respecting','round','through','throughout','touching on','with reference to','with regard to','with respect to']);
};
obj['around the bend'] = function() {
	return rand(...['apropos','around','around the bend','concerning','connected with','dealing with','in connection with','in the matter of','on','on every side of','on the subject of','over','re','referring to','regarding','relating to','relevant to','respecting','round','through','throughout','touching on','with reference to','with regard to','with respect to']);
};

module.exports = obj;