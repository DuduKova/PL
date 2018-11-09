function audioPlayer() {
    let currentSong = 0;
    const audioPlayer = $("#audioPlayer")[0];
    const songElement = $("#myList li");
    const songElementUrl = $("#myList a");
    const playIcon = $('#myList i.fa-play');
    playIcon.click(function () {
        audioPlayer.src = $(this).attr('href');
        audioPlayer.play();
        songElement.removeClass("current-song");
        currentSong = $(this).parent().index();
        $(this).parent().addClass("current-song");
        $('#playingSongPause').remove();
    });

    audioPlayer.addEventListener("ended", function () {
        currentSong++;
        if (currentSong === songElement.length) {
            currentSong = 0;
        }
        songElement.removeClass("current-song");
        audioPlayer.src = songElementUrl[currentSong].href;
        audioPlayer.play();
    });

    audioPlayer.addEventListener("pause", function () {
        $("#myList li:eq(" + currentSong + ")").addClass('current-song-pause');
        $('#btnPlayMusic').removeClass('d-none');
        $('#btnPauseMusic').addClass('d-none');
        $('#playingDisc').css('animation-play-state', 'paused');
    });

    audioPlayer.addEventListener("play", function () {
        songElement.removeClass('current-song-pause');
        $('#btnPauseMusic').removeClass('d-none');
        $('#btnPlayMusic').addClass('d-none');
        $('#playingDisc').css('animation-play-state', 'running');
    });

    audioPlayer.addEventListener("playing", function () {
        songElement.removeClass('current-song-pause');
        songElement.removeClass("current-song");
        $('#playingSongPause').remove();
        movePlaylistsContainer();
        let playingSongItem = $("#myList li:eq(" + currentSong + ")");
        playingSongItem.addClass("current-song");
        playingSongItem.prepend(`<i id="playingSongPause" class="fa fa-pause fa-xs hide-pause" onclick="pauseMusic()"></i>`);
        $('#nowPlaying').text(songElement[currentSong].textContent);
        document.title = songElement[currentSong].textContent;
    });
}

function playPlaylist(id, img, songs, discElementId, i) {
    mediaPlayerDiv.html(mediaPlayerTemp(id, img, songs, discElementId, i));
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
    audioPlayer();
}

function pauseMusic() {
    $('#audioPlayer')[0].pause();
}

function playMusic() {
    $('#audioPlayer')[0].play();
}