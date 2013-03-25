var SC_ID = '528dd3394707d2e437879317d161890a'

var Lineup = (function($) {
	var artists,
		isOpen = false,
		$player = $('<div id="player"></div>'),
		$currentPopup;

	var show = function() {
		hideAll()
		var $popup = $(this).data('artistPopup'),
			$currentPopup = $popup,
			left = $(this).offset().left
		
		if (left - 100 > $('#main-container').width() / 2) {
			left -= 20 + $popup.width()
			$popup.removeClass('right').addClass('left')
		} else {
			left += $(this).width() + 20
			$popup.removeClass('left').addClass('right')
		}
		$popup.show().css({
			top: ($(this).offset().top - ($(this).height() / 2)), 
			left: left
		})
		$(this).addClass('active')
		isOpen = true

		if (!$(this).data('tracks')) {
			$.proxy(load, this)()
		}
	}

	var hide = function() {
		isOpen = false
		$(this).data('artistPopup').hide()
	}

	var hideAll = function() {
		isOpen = false
		$('.artist-popup').hide()
		$('.lineup h1').removeClass('active')
	}

	var load = function() {
		var _this = this;
		$(this).data('tracks', 'loading')
		SC.get('/resolve.json?limit=5&url=http://soundcloud.com/' + $(this).data('artist').soundcloud + '/tracks', {limit: 5}, function(tracks){
		  	//debugger
		  	tracks = tracks.slice(tracks.length - 5)
		  	$(_this).data('tracks', tracks)
		  	drawTracks($(_this).data('artistPopup').find('ul.tracks'), tracks)
		});
	}

	var scPlay = function() {
		debugger
		var _this = this,
			scTrack = $(this).data('scTrack')
		$('#jplayer').jPlayer('setMedia', { mp3: scTrack.stream_url + '?client_id=' + SC_ID }).jPlayer('play')
		$('#player').find('.title').html(scTrack.title)
		$(this).find('.icon-play').attr('class', 'icon-pause')
	}

	var drawTracks = function($el, tracks) {
		$(tracks).each(function() {
			var track = $('<li>').html('<i class="icon-play"></i>' + this.title)
			track.data('scTrack', this)
			track.click(scPlay)
			$el.append(track)
		})
	}

	var mouseOut = function() {
		if ($currentPopup == $(this).data('artistPopup')) {
			hideAll()
		}
	}

	var render = function() {
		
	}

	var getSoundcloud = function($artist) {
		var link = $artist.find('a[href*="soundcloud.com"]').attr('href')
		if (link) return _.last(link.split('/'))
	}

	var initArtist = function() {
		var artistId = $(this).find('.portfolio-item-title').text().toLowerCase().replace(/ /g, '_').replace('(', '').replace(')', ''),
			soundcloudUsername = getSoundcloud($(this)),
			template = window.templates['app/templates/artist_popup.hbs'];
		var context = {
			artist: artists[artistId],
			soundcloudUsername: soundcloudUsername
		}
		console.log(context)
		$popup = $(template(context))
		$(document.body).append($popup)
		$(this).hover(show)
		$(this).data('artistPopup', $popup).data('artist', context.artist)

		$popup.mouseleave(function(evt) {
			console.log('mouseleave')
			console.log($(this))
			console.log(evt)
			$popup.hide()
		})
	}

	var init = function() {
		$('.portfolio-items li').each(initArtist)

		$('.portfolio-items').mouseleave(function(evt) {
			console.log(evt)
			if ($(evt.relatedTarget).parents('.artist-popup').length > 0) return false;
			setTimeout(hideAll, 1000)
		})

		var playerTemplate = window.templates['app/templates/player.hbs']
		$player.html(playerTemplate())
		$(document.body).append($player)
		$player.css({ left: $('.menu-black-menu-container').offset().left + 460 })
		//$('#mini-header .container .nav-wrap').append($player)
		$('#jplayer').jPlayer({
			cssSelectorAncestor: '#jp_container',
		})
		$player.show()
	}

	$(function() {
		artists = LineupData
		init()

		$(window).scroll(function() { 
			if ($(this).scrollTop() > $('#nav-section').offset().top) {
				$('#player').addClass('fixed')
			} else {
				$('#player').removeClass('fixed')
			}
		});
	})

	return {
		hideAll: hideAll
	}

})(jQuery)

var LineupData = {
	'crystal_castles': {
		'name': 'Crystal Castles',
		'image': 'http://wildtonicmusic.files.wordpress.com/2010/06/crystal-castles-celestica-bear-in-heaven-remix.jpg?w=700&h=610',
		'website': 'http://crystalcastles.com',
		'soundcloud': 'crystal-castles',
		'facebook': 'ccrystalccastles',
		'twitter': 'CRYSTALCASTLESS',
		'description': 'Crystal Castles is an electronic experimental band formed in 2004 in Toronto consisting of producer Ethan Kath and vocalist Alice Glass. The duo is known for their chaotic live shows and lo-fi melancholic homemade productions.'
	},
	'gold_panda': {
		'name': 'Gold Panda',
		'image': 'http://revistaogrito.ne10.uol.com.br/page/wp-content/uploads/2011/07/Gold-Panda.jpg',
		'website': 'http://www.iamgoldpanda.com/',
		'soundcloud': 'gold-panda',
		'description': 'Gold Panda is a musical composer, performer and producer from the United Kingdom. He was born in Peckham, London, in 1980 and hails from Chelmsford, Essex'
	},
	'soul_clap_records': {
		'name': 'Soul Clap Records',
		'image': 'http://pulseradio.net/media/filter/585x249/transfer/img/articleimage/2012-12/soul_clap.jpg',
		'soundcloud': 'soulclap',
		'description': '',
		'website': 'http://soulclaprecords.com',
	},
	'voices_of_black_live': {
		'name': 'Voices of Black (Live)',
		'image': 'http://b.vimeocdn.com/ps/394/923/3949235_300.jpg',
		'soundcloud': 'voicesofblack',
		'description': "Voices of Black is an American duo consisting of Julian ‘Jules Born’ Randolph and Baba Doherty",

	},
	'mathew_jonson_live': {
		'name': 'Matthew Johnson (Live)',
		'image': 'http://4.bp.blogspot.com/_6cf3bFVNe_w/TA7EYECH-yI/AAAAAAAAAM8/kJERPVubCrY/s1600/mathew+jonson.jpg',
		'soundcloud': 'mathew-jonson',
		'description': "Mathew Jonson really is one of a kind.  He's developed one of the most distinctive voices in electronic dance music: when you hear one of Jonson's tracks, you almost immediately know it's his. And yet there's no mistaking any given track for another."
	}
}

Handlebars.templates = [];