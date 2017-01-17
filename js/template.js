/* global TrelloPowerUp */

var YOUTRACK_ICON = './images/youtrack.png';

var CheckIfYouTrackLinkAvailable = function(t){
  return t.card('name')
  .get('name')
  .then(function(cardName){
    var lowercaseName = cardName.toLowerCase();
    var issueNumberRegex = /[A-Za-z\d]{1,4}-[0-9]{1,5}/;
    var issueNumberMatches = lowercaseName.match(issueNumberRegex);
    if(!issueNumberMatches){
      return null;
    }
    var youTrackUrl = "http://source.scannt.lan:8080/issue/$0".Replace(/\.$0/g, issueNumberMatches[0]);
    return youTrackUrl;
  })
};


TrelloPowerUp.initialize({
  'card-buttons': function(t, options) {
    // var link  = CheckIfYouTrackLinkAvailable(t);
    // if(!link){
    //   return [];
    // }
    return [{
      icon: YOUTRACK_ICON,
      text: 'YouTrack',
      callback: function(t){
        return t.popup({
          title: "You Track Issue",
          url: "www.google.com"
        });
      }
    }];
  }
});
