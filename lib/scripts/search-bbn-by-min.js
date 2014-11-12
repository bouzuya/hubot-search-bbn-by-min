// Description
//   A Hubot script that searches blog.bouzuya.net by minute.
//
// Configuration:
//   None
//
// Commands:
//   hubot bbn <minute> - search blog.bouzuya.net by minute
//
// Author:
//   bouzuya <m@bouzuya.net>
//
module.exports = function(robot) {
  var request;
  request = require('request-b');
  return robot.respond(/bbn\s+(\d+)\s*(?:min)?$/i, function(res) {
    var min, url;
    min = parseInt(res.match[1], 10);
    url = 'http://blog.bouzuya.net/posts.json';
    return request(url).then(function(r) {
      var filtered, json;
      json = JSON.parse(r.body);
      filtered = json.filter(function(p) {
        return p.minutes === min;
      }).map(function(p) {
        url = "http://blog.bouzuya.net/" + (p.date.replace(/-/g, '/')) + "/";
        return "" + p.date + " " + p.title + " " + url;
      });
      if (filtered.length === 0) {
        return res.send('no post');
      }
      return res.send(res.random(filtered));
    });
  });
};
