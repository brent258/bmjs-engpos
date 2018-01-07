module.exports = {
  commonRegex: /(\b)(be|is|are|am|was|were|being|been|do|does|did|doing|done|have|has|had|having|can|could|should|would|will|might|may|must|shall)(\b)/gi,
  commonList: ['be','is','are','am','was','were','being','been','do','does','did','doing','done','have','has','had','having','can','could','should','would','will','might','may','must','shall'],
  contractionRegex: /(\b)([a-z]+)(\')(s|re|ll|ve|d|t)(\b)/gi
};
