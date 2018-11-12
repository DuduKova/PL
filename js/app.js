// ========== darw & delete func

function playPlaylist(id, img, songs, discElementId) {
    mediaPlayerDiv.html(mediaPlayerTemp(id, img, songs, discElementId));
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
            $(`#${id}`).remove();
            if ($('.mediaPlayer').length === 0) {
                movePlaylistsContainerBack();
            }
        }
    );
}

function curveText(i) {
    new CircleType($('.curveMe')[i])
        .radius(140);
}

function curveTextElement(ele) {
    new CircleType(ele)
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

function updateStepOne(id, discElementId) {
    if(validateFirstStep()) {
        const name = playlistName.val();
        const img = playlistImg.val();
        sendEvent('#modal-1', 2);
        updatePlaylist(id , name , img);
        getSongs(id);
        updatePlaylistName(name, discElementId);
        updatePlaylistImg(img, discElementId);
        updateMediaPlayerFirstStep(img , discElementId);
    }
}

function updateMediaPlayerFirstStep(img , discElementId) {
    const $btn = $('.btn-mediaplayer-edit');
    if ($btn.length > 0 && Number($btn[0].name) === Number(discElementId)) {
        $('#playingDisc').attr('src' , img);
    }
}

function updatePlaylistName(name, discElementId) {
    const $curveMe = $(`.${discElementId}`)[0];
    $curveMe.innerHTML = name;
    curveTextElement($curveMe);
    $curveMe.classList.add('text-focus-in');
    setTimeout(function () {
        $curveMe.classList.remove('text-focus-in');
    }, 1000);
}

function updatePlaylistImg(img, discElementId) {
    let $playListImage = $(`img[name^=${discElementId}]`)[0];
    $playListImage.src = img;
    $playListImage.classList.add('shake-bottom');
    setTimeout(function () {
        $playListImage.classList.remove('shake-bottom');
    }, 1000);
}

function checkIfplaylistIsOnMediaplayer(id, img, songs,discElementId) {
    const $btn = $('.btn-mediaplayer-edit');
    if ($btn.length > 0 && Number($btn[0].name) === Number(discElementId)) {
        playPlaylist(id, img, songs,discElementId);
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