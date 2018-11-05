function audioPlayer() {
    let currentSong = 0;
    const audioPlayer = $("#audioPlayer")[0];
    const playlistItem = $("#myList li");
    const playIcon = $('#myList i.fa-play');
    playIcon.click(function () {
        audioPlayer.src = $(this).attr('href');
        audioPlayer.play();
        playlistItem.removeClass("current-song");
        $('#playingSongPause').remove();
        currentSong = $(this).parent().index();
        $(this).parent().addClass("current-song");
    });

    audioPlayer.addEventListener("ended", function () {
        currentSong++;
        if (currentSong === playlistItem.length)
            currentSong = 0;
        playlistItem.removeClass("current-song");
        audioPlayer.src = playlistItem[currentSong].href;
        audioPlayer.play();
    });

    audioPlayer.addEventListener("pause", function () {
        $('#playingSongPause').remove();
        $("#myList li:eq(" + currentSong + ")").addClass('current-song-pause');
        $('#btnPlayMusic').removeClass('d-none');
        $('#btnPauseMusic').addClass('d-none');
        $('#playingDisc').css('animation-play-state', 'paused');
    });

    audioPlayer.addEventListener("play", function () {
        $('#playingSongPause').remove();
        playlistItem.removeClass('current-song-pause');
        $('#btnPauseMusic').removeClass('d-none');
        $('#btnPlayMusic').addClass('d-none');
        $('#playingDisc').css('animation-play-state', 'running');
    });

    audioPlayer.addEventListener("playing", function () {
        movePlaylistsContainer();
        let playingSongItem = $("#myList li:eq(" + currentSong + ")");
        playingSongItem.addClass("current-song");
        playingSongItem.prepend(`<i id="playingSongPause" class="fa fa-pause fa-xs hide-pause" onclick="pauseMusic()"></i>`);
        $('#nowPlaying').text(playlistItem[currentSong].textContent);
        document.title = playlistItem[currentSong].textContent;
    });
}

function playPlaylist(id, img, songs ,PlId) {
    mediaPlayerDiv.html(mediaPlayerTemp(id, img, songs,PlId));
    createMyMediaList(songs);
}

function createMyMediaList(songs) {
    const myList = $('#myList');
    myList.html('');
    let j = 0;
    songs.forEach(function () {
        myList.append(listSongItem(songs[j].name, songs[j].url));
        j++
    });
    if ($('.bounce-in-bck').length > 0) {
        audioPlayer();
    }
}

function pauseMusic() {
    $('#audioPlayer')[0].pause();
}

function playMusic() {
    $('#audioPlayer')[0].play();
}

//$( '.songNames' ).mouseenter( handlerIn ).mouseleave( handlerOut );

//$( '.current-song' ).mouseenter( handlerIn ).mouseleave( handlerOut );