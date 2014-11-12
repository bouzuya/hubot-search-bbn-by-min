# Description
#   A Hubot script that searches blog.bouzuya.net by minute.
#
# Configuration:
#   None
#
# Commands:
#   hubot bbn <minute> - search blog.bouzuya.net by minute
#
# Author:
#   bouzuya <m@bouzuya.net>
#
module.exports = (robot) ->
  request = require 'request-b'

  robot.respond /bbn\s+(\d+)\s*(?:min)?$/i, (res) ->
    min = parseInt(res.match[1], 10)
    url = 'http://blog.bouzuya.net/posts.json'
    request(url).then (r) ->
      json = JSON.parse r.body
      filtered = json
        .filter (p) ->
          p.minutes is min
        .map (p) ->
          url = "http://blog.bouzuya.net/#{p.date.replace(/-/g,'/')}/"
          "#{p.date} #{p.title} #{url}"
      return res.send('no post') if filtered.length is 0
      res.send res.random(filtered)
