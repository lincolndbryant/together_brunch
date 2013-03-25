SC_ID = "528dd3394707d2e437879317d161890a"
Lineup = (($) ->
    isOpen = false
    $player = $("<div id=\"player\"></div>")
    $currentPopup = undefined
    show = ->
        hideAll()
        $popup = $(this).data("artistPopup")
        $currentPopup = $popup
        left = $(this).offset().left
        if left - 100 > $("#main-container").width() / 2
            left -= 20 + $popup.width()
            $popup.removeClass("right").addClass "left"
        else
            left += $(this).width() + 20
            $popup.removeClass("left").addClass "right"
        $popup.show().css
            top: ($(this).offset().top - ($(this).height() / 2))
            left: left

        $(this).addClass "active"
        isOpen = true
        $.proxy(load, this)()  unless $(this).data("tracks")
        FB.XFBML.parse(this);

    hide = ->
        isOpen = false
        $(this).data("artistPopup").hide()

    hideAll = ->
        isOpen = false
        $(".artist-popup").hide()
        $(".lineup h1").removeClass "active"

    load = ->
        $(this).data "tracks", "loading"
        SC.get "/resolve.json?limit=5&url=http://soundcloud.com/" + $(this).data("artist").soundcloudUsername + "/tracks",
               limit: 5
        , (tracks) =>

            #debugger
            tracks = tracks.slice(tracks.length - 5)
            $(_this).data "tracks", tracks
            drawTracks $(this).data("artistPopup").find("ul.tracks"), tracks


    scPlay = ->
        debugger
        scTrack = $(this).data("scTrack")
        $("#jplayer").jPlayer("setMedia",
                              mp3: scTrack.stream_url + "?client_id=" + SC_ID
        ).jPlayer "play"
        $("#player").find(".title").html scTrack.title
        $(this).find(".icon-play").attr "class", "icon-pause"

    drawTracks = ($el, tracks) ->
        $(tracks).each ->
            track = $("<li>").html("<i class=\"icon-play\"></i>" + @title)
            track.data "scTrack", this
            track.click scPlay
            $el.append track

    mouseOut = ->
        hideAll() if $currentPopup is $(this).data("artistPopup")

    render = ->

    getSoundcloud = ($artist) ->
        link = $artist.find("a[href*=\"soundcloud.com\"]").attr("href")
        _.last link.split("/")  if link

    initArtist = ->
        artistName = $(this).find(".portfolio-item-title").text()
        artistId = artistName.toLowerCase().replace(RegExp(" ", "g"), "_").replace("(", "").replace(")", "")
        soundcloudUsername = getSoundcloud($(this))
        template = window.templates["app/templates/artist_popup.hbs"]
        context =
            id: artistId
            soundcloudUsername: soundcloudUsername

        console.log context
        $popup = $(template(context))
        $(document.body).append $popup
        $(this).hover show
        $(this).data("artistPopup", $popup).data "artist", context
        $popup.mouseleave (evt) ->
            console.log "mouseleave"
            console.log $(this)
            console.log evt
            $popup.hide()


    init = ->
        $(".portfolio-items li").each initArtist
        $(".portfolio-items").mouseleave (evt) ->
            console.log evt
            return false  if $(evt.relatedTarget).parents(".artist-popup").length > 0
            setTimeout hideAll, 1000

        playerTemplate = window.templates["app/templates/player.hbs"]
        $player.html playerTemplate()
        $(document.body).append $player
        $player.css left: $(".menu-black-menu-container").offset().left + 460

        #$('#mini-header .container .nav-wrap').append($player)
        $("#jplayer").jPlayer cssSelectorAncestor: "#jp_container"
        $player.show()

    $ ->
        init()
        $(window).scroll ->
            if $(this).scrollTop() > $("#nav-section").offset().top
                $("#player").addClass "fixed"
            else
                $("#player").removeClass "fixed"


    hideAll: hideAll
)(jQuery)