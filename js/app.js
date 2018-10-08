function createPlaylist() {
    const name = playlistName.val();
    const img = playlistImg.val();

    if (validatePlaylist(name, img, getValOfNewSongsToUpload())) {
        return;
    }
    createPlaylistRequest(name, img, getValOfNewSongsToUpload());
}

function getValOfNewSongsToUpload() {
    const songs = [];
    let song = {};
    const songName = $('.songName');
    const songURL = $('.songUrl');

    songName.each(function (i) {
        song.name = songName.eq(i).val();
        song.url = songURL.eq(i).val();
        songs.push(song);
        song = {};
    });
    return songs;
}

function editSongsModal(data) {
    const songs = data.data.songs;
    let j = 0;
    addSongsFrom.html("");

    songs.forEach(function () {
        addSongsFrom.append(addSongTemp(songs[j].name, songs[j].url));
        j++
    });
}

function validatePlaylist(name, image, songs) {
    if (name === "" || image === "" || songs.length < 1) {
        errorAlert.removeClass('d-none');
    }
    return false;
}

function confirmDelete(id) {
    btnConfirmDelete.attr('onclick', `deletePlaylist(${id})`);
    deleteModal.modal();
}

function resetFields() {
    $('input').val('');
}

function addMoreSong() {
    addSongsFrom.append(addSongTemp());
}

// =============== modal

sendEvent = function (sel, step) {
    if (playlistName.val() === "" || playlistImg.val() === "") {
        return;
    }
    $(sel).trigger('next.m.' + step);
};

modal.on('show.bs.modal', function (event) {
    if ($(event.relatedTarget).hasClass('btn-info')) {
        modalHeader.html('Edit Playlist');
        modalHeaderSongs.html('Edit Playlist Songs');
        btnNext.html('Edit & Next');
    }
});

modal.on('hidden.bs.modal', function () {
    modalHeader.html('Add Playlist');
    modalHeaderSongs.html('Add Playlist Songs');
    imgPriview.attr('src', "img/student.png");
    playlistName.val("");
    playlistImg.val("");
    addSongsFrom.html(addSongTemp());
    modal.find('.step').hide();
    modal.find('[data-step]').hide();
    modal.find('.step-1').show();
});

function openUpdateModal(data) {
    playlistName.val(data.name);
    playlistImg.val(data.image);
    imgPriview.attr('src', data.image);
    btnNext.attr('onclick', `executeThisOnNextClick(${data.id})`)
}


function executeThisOnNextClick(id) {
    sendEvent('#modal-1', 2);
    updatePlaylist(id);
    getSongs(id);
    btnSave.attr('onclick', `updateSongs(${id})`);
    btnNext.attr('onclick', `sendEvent('#modal-1', 2);`);
}

function updateMediaPlayer(img) {
    alert('hello');
    $('#playingDisc').attr('src', img);
}

function executeThisOnSaveClick() {
    btnSave.attr('onclick', 'createPlaylist()');
}


function bindEventsToModal(modal) {
    var data_steps = [];
    $('[data-step]').each(function () {
        var step = $(this).data().step;
        if (step && $.inArray(step, data_steps) === -1) {
            data_steps.push(step);
        }
    });

    $.each(data_steps, function (i, v) {
        modal.on('next.m.' + v, {step: v}, function (e) {
            goToStep(e.data.step);
        });
    });
}

function goToStep(step) {
    reset();
    var to_show = modal.find('.step-' + step);
    if (to_show.length === 0) {
        // at the last step, nothing else to show
        return;
    }
    to_show.show();
}

function reset() {
    modal.find('.step').hide();
    modal.find('[data-step]').hide();
}

function initialize() {
    reset();
    modal.find('.step-1').show();
    bindEventsToModal(modal, total_num_steps);
    modal.data({
        total_num_steps: bodies.length,
    });
}

function priviewImg() {
    let check = playlistImg.val();
    if (is_url(check)) {
        imgPriview.attr('src', check);
    } else {
        imgPriview.attr('src', 'img/student.png');
    }
}

function is_url(str) {
    let regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    return (regexp.test(str));
}

//======== jQuery audio controls

function audioPlayer() {
    let currentSong = 0;
    const audioPlayer = $("#audioPlayer")[0];
    const playlistSong = $("#myList li a");
    const playlistItem = $("#myList li");
    audioPlayer.src = playlistSong[0];
    audioPlayer.play();
    playlistSong.click(function (e) {
        e.preventDefault();
        audioPlayer.src = this;
        audioPlayer.play();
        playlistItem.removeClass("current-song");
        currentSong = $(this).parent().index();
        $(this).parent().addClass("current-song");
    });

    audioPlayer.addEventListener("ended", function () {
        currentSong++;
        if (currentSong === playlistSong.length)
            currentSong = 0;
        playlistItem.removeClass("current-song");
        $("#myList li:eq(" + currentSong + ")").addClass("current-song");
        audioPlayer.src = playlistSong[currentSong].href;
        audioPlayer.play();
    });
}

function playPlaylist(id, img, songs) {
    $('#mediaContainer').html(mediaPlayerTemp(id, img , songs));
    createMyMediaList(songs);
}

function createMyMediaList(songs) {
    let j = 0;
    songs.forEach(function () {
        $('#myList').append(listSongItem(songs[j].name, songs[j].url));
        j++
    });

}

function pauseMusic() {
    $('#btnPlayMusic').removeClass('d-none');
    $('#btnPauseMusic').addClass('d-none');
    $('#playingDisc').css('animation-play-state', 'paused');
    $('#audioPlayer')[0].pause();
}

function playMusic() {
    $('#btnPauseMusic').removeClass('d-none');
    $('#btnPlayMusic').addClass('d-none');
    $('#playingDisc').css('animation-play-state', 'running');
    $('#audioPlayer')[0].play();
}
