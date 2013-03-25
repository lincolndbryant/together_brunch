(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    definition(module.exports, localRequire(name), module);
    var exports = cache[name] = module.exports;
    return exports;
  };

  var require = function(name) {
    var path = expand(name, '.');

    if (has(cache, path)) return cache[path];
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex];
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.brunch = true;
})();

var Lineup, SC_ID;

SC_ID = "528dd3394707d2e437879317d161890a";

Lineup = (function($) {
  var $currentPopup, $player, baseUrl, drawTracks, getSoundcloud, hide, hideAll, init, initArtist, isOpen, load, mouseOut, render, scPlay, sel, share, show;

  isOpen = false;
  $player = $("<div id=\"player\"></div>");
  $currentPopup = void 0;
  baseUrl = document.location.toString().replace(document.location.hash, '');
  sel = {
    artist: '.portfolio-items li'
  };
  show = function() {
    var $popup, left;

    hideAll();
    $('.lineup-opaque').show();
    $popup = $(this).data("artistPopup");
    $currentPopup = $popup;
    left = $(this).offset().left;
    if (left - 100 > $("#main-container").width() / 2) {
      left -= 20 + $popup.width();
      $popup.removeClass("right").addClass("left");
    } else {
      left += $(this).width() + 20;
      $popup.removeClass("left").addClass("right");
    }
    $popup.show().css({
      top: $(this).offset().top,
      left: left
    });
    $(this).addClass("active");
    isOpen = true;
    if (!$(this).data("tracks")) {
      $.proxy(load, this)();
    }
    return FB.XFBML.parse(this);
  };
  hide = function() {
    isOpen = false;
    return $(this).data("artistPopup").hide();
  };
  hideAll = function() {
    isOpen = false;
    $(".artist-popup").hide();
    $(sel.artist).removeClass("active");
    return $('.lineup-opaque').hide();
  };
  load = function() {
    var popup,
      _this = this;

    $(this).data("tracks", "loading");
    popup = $(this).data("artistPopup");
    popup.find('ul.tracks').append('<li>Loading...</li>');
    return SC.get("/resolve.json?limit=5&url=http://soundcloud.com/" + $(this).data("artist").soundcloudUsername + "/tracks", {
      limit: 5
    }, function(tracks) {
      tracks = tracks.slice(tracks.length - 5);
      $(_this).data("tracks", tracks);
      popup.find('ul.tracks').html('');
      return drawTracks(popup.find("ul.tracks"), tracks);
    });
  };
  scPlay = function() {
    debugger;
    var scTrack;

    scTrack = $(this).data("scTrack");
    $("#jplayer").jPlayer("setMedia", {
      mp3: scTrack.stream_url + "?client_id=" + SC_ID
    }).jPlayer("play");
    $("#player").find(".title").html(scTrack.title);
    return $(this).find(".icon-play").attr("class", "icon-pause");
  };
  drawTracks = function($el, tracks) {
    return $(tracks).each(function() {
      var track;

      track = $("<li>").html("<i class=\"icon-play\"></i>" + this.title);
      track.data("scTrack", this);
      track.click(scPlay);
      return $el.append(track);
    });
  };
  share = function() {
    var artistId, artistName, story;

    artistName = $(this).data('artistName');
    artistId = $(this).data('id');
    story = {
      method: 'feed',
      link: baseUrl + '#/' + artistId,
      picture: $(this).find('figure img').attr('src'),
      name: artistName,
      caption: "I'm going to " + artistName + " at Together Boston 2013"
    };
    return FB.ui(story);
  };
  mouseOut = function() {
    if ($currentPopup === $(this).data("artistPopup")) {
      return hideAll();
    }
  };
  render = function() {};
  getSoundcloud = function($artist) {
    var link;

    link = $artist.find("a[href*=\"soundcloud.com\"]").attr("href");
    if (link) {
      return _.last(link.split("/"));
    }
  };
  initArtist = function() {
    var $popup, artistId, artistName, context, soundcloudUsername, template,
      _this = this;

    artistName = $(this).find(".portfolio-item-title").text();
    artistId = _(artistName.toLowerCase().replace(RegExp(" ", "g"), "_")).without('(', ')').join('');
    soundcloudUsername = getSoundcloud($(this));
    template = window.templates["app/templates/artist_popup.hbs"];
    context = {
      id: artistId,
      soundcloudUsername: soundcloudUsername,
      artistName: artistName
    };
    $(this).data(context);
    context.baseUrl = baseUrl;
    context.artistUrl = baseUrl + '#/' + artistName;
    $popup = $(template(context));
    $(document.body).append($popup);
    $(this).hover(show);
    $(this).data("artistPopup", $popup).data("artist", context);
    $(this).attr('data-artistid', artistId);
    return $popup.mouseleave(function(evt) {
      console.log("mouseleave");
      console.log($(this));
      console.log(evt);
      return hideAll();
    }).find('.share').click(function() {
      return share.call(_this);
    });
  };
  init = function() {
    var playerTemplate;

    $(sel.artist).each(initArtist);
    $(".portfolio-items").mouseleave(function(evt) {
      console.log(evt);
      if ($(evt.relatedTarget).parents(".artist-popup").length > 0) {
        return false;
      }
      return setTimeout(hideAll, 1000);
    });
    playerTemplate = window.templates["app/templates/player.hbs"];
    $player.html(playerTemplate());
    $(document.body).append($player);
    $player.css({
      left: $(".menu-black-menu-container").offset().left + 460
    });
    $("#jplayer").jPlayer({
      cssSelectorAncestor: "#jp_container"
    });
    $player.show();
    return $(document.body).append($('<div class="lineup-opaque"></div>').hide());
  };
  $(function() {
    var artistId;

    init();
    if (document.location.hash) {
      artistId = _(document.location.hash).without('#', '/').join('');
      show.call($(sel.artist + ("[data-artistid='" + artistId + "']")));
    }
    return $(window).scroll(function() {
      debugger;      if ($(this).scrollTop() > $("#nav-section").offset().top) {
        return $("#player").addClass("fixed");
      } else {
        return $("#player").removeClass("fixed");
      }
    });
  });
  return {
    hideAll: hideAll
  };
})(jQuery);
