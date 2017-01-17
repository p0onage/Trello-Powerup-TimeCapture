/* global TrelloPowerUp */

var YOUTRACK_ICON = './images/youtrack.png';

var GetYouTrackLinkIfAvailable = function(t){
  t.card('name')
  .get('name')
  .then(function(cardName){
    console.log("cardName : " + cardName)
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
    var link  = GetYouTrackLinkIfAvailable(t);
    if(!link){
       return [{
      icon: YOUTRACK_ICON,
      text: 'Add YouTrack Issue',
      callback: function(t){
        window.open("http://source.scannt.lan:8080/",'_blank');
      }
    }];
    };
    return [{
      icon: YOUTRACK_ICON,
      text: 'YouTrack',
      callback: function(t){
        window.open(link,'_blank');
      }
    }];
  }
});
