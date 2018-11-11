function drawPlaylists(data) {
    for (let i = 0; i < data.length; i++) {
        playlistContainer.append(playlistTemp.apply({
            id: data[i].id,
            name: data[i].name,
            image: data[i].image
        }));
        curveText(i);
    }
}

function draw1(data) {
    playlistContainer.append(playlistTemp.apply({
        id: data.id,
        name: data.name,
        image: data.image
    }));
    curveText($('.curveMe').length - 1);
}

function deleteElementById(id) {
    $(`#${id}`).addClass('roll-out-right').animate({height: 0}, 1000, "linear", function () {
            $(this).remove();
            if ($('.mediaPlayer').length === 0) {
                movePlaylistsContainerBack();
            }
        }
    );
}

function getValOfNewSongsToUpload() {
    const songs = [];
    let song = {};
    const $songName = $('.songName');
    const $songURL = $('.songUrl');

    $songName.each(function (i) {
        song.name = $songName.eq(i).val();
        song.url = $songURL.eq(i).val();
        songs.push(song);
        song = {};
    });
    return songs;
}

function curveText(i) {
    new CircleType($('.curveMe')[i])
        .radius(140);
}

function movePlaylistsContainer() {
    playlistSection.addClass('moveDown');
}

function movePlaylistsContainerBack() {
    playlistSection.removeClass('moveDown');
}

// ============= search

$("#search").keyup(function () {
    let query = this.value.toLowerCase().trim();
    const $id = $('[id^="check"]');
    if (this.value.length === 0) {
        $id.each(function (i, elem) {
            showSearchResults(elem)
        });
    } else if (this.value.length === 1) {

    }
    else {
        $id.each(function (i, elem) {
            if (elem.value.toLowerCase().indexOf(query) !== -1) {
                showSearchResults(elem)
            } else {
                hideSearchUnmatch(elem);
            }
        });
    }
});

function showSearchResults(elem) {
    elem.parentElement.style.display = 'flex';
    elem.parentElement.classList.remove('roll-out-right');
}

function hideSearchUnmatch(elem) {
    elem.parentElement.classList.add('roll-out-right');
    setTimeout(function () {
        elem.parentElement.style.display = 'none';
    }, 400);
}

// ============= update related functions

function updateStepOne(id, i) {
    sendEvent('#modal-1', 2);
    updatePlaylist(id, i);
    getSongs(id);
}

function showUpdatedPlaylist(id, name ,img, songs, discElementId, i) {
    updatePlaylistName(name, i);
    updatePlaylistImg(img, i);
    checkIfplaylistIsOnMediaplayer(id, img, songs,discElementId , i);
}

function updatePlaylistName(name, i) {
    const $curveMe = $('.curveMe');
    $curveMe[i].innerHTML = name;
    curveText(i);
    $curveMe[i].classList.add('text-focus-in');
    setTimeout(function () {
        $curveMe[i].classList.remove('text-focus-in');
    }, 1000);
}

function updatePlaylistImg(img, i) {
    let $playListImage = $('.playListImage');
    $playListImage[i].src = img;
    $playListImage[i].classList.add('shake-bottom');
    setTimeout(function () {
        $playListImage[i].classList.remove('shake-bottom');
    }, 1000);
}

function checkIfplaylistIsOnMediaplayer(id, img, songs,discElementId , i) {
    const $btn = $('.btn-mediaplayer-edit');
    if ($btn.length > 0 && Number($btn[0].value) === Number(i)) {
        playPlaylist(id, img, songs,discElementId , i);
    }
}

function editSongsModal(data) {
    const songs = data.data.songs;
    let j = 0;
    addSongsFrom.html("");
    songs.forEach(function () {
        addSongsFrom.append(addSongTemp(songs[j].name, songs[j].url, j));
        j++
    });
    checkAllSongNameInputs();
    checkAllMp3Inputs();
}

function openUpdateModal(data) {
    playlistName.val(data.name);
    playlistImg.val(data.image);
    imgPriview.attr('src', data.image);
    validatePlaylistName();
    validatePlaylistImg();
    validateFirstStep();
}