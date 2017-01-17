/* global TrelloPowerUp */

var YOUTRACK_ICON = './images/youtrack.png';

var GetYouTrackLinkIfAvailable = function(t){
  var youTrackUrl = "";
  t.card('name')
  .get('name')
  .then(function(cardName){
    console.log("cardName : " + cardName)
    var lowercaseName = cardName.toLowerCase();
    var issueNumberRegex = /[A-Za-z\d]{1,4}-[0-9]{1,5}/;
    var issueNumberMatches = lowercaseName.match(issueNumberRegex);
    console.log("found match  : " + !issueNumberMatches)
    console.log("Issue Number  : " + issueNumberMatches[0])
    if(!issueNumberMatches){
      return null;
    }
    youTrackUrl = "http://source.scannt.lan:8080/issue/$0".replace(/\$0/g, issueNumberMatches[0]);
    console.log("YouTrack Link: " + youTrackUrl)
  });
    return youTrackUrl;
};


TrelloPowerUp.initialize({
  'card-buttons': function(t, options) {
    return [{
      icon: YOUTRACK_ICON,
      text: 'YouTrack',
      callback: function(t){
        var link  = GetYouTrackLinkIfAvailable(t);
        console.log("link being opened :" + link)
        window.open(link,'_blank');
      }
    }];
  }
});
