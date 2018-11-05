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
    $(`#${id}`).addClass('scale-out-center').animate({height: 0}, 1000,"linear",function()
        {
            $(this).remove();
            let $mediaPlayer = $('.mediaPlayer');
            if($mediaPlayer.length === 0) {
                movePlaylistsContainerBack();
            }
        }
    );
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

$("#search").keyup(function () {
    if (this.value.length === 0) {
        getAll();
    } else if(this.value.length === 1) {

    }
    else {
        let query = this.value.toLowerCase().trim();

        $('[id^="check"]').each(function (i, elem) {
            if (elem.value.toLowerCase().indexOf(query) !== -1) {
                elem.parentElement.style.display = 'flex';
            } else {
                elem.parentElement.style.display = 'none';
            }
        });
    }
});

function curveText(i) {
    new CircleType($('.curveMe')[i])
        .radius(140);
}

function updateStepOne(id,i) {
    sendEvent('#modal-1', 2);
    updatePlaylist(id , i);
    getSongs(id);
}

function updatePlaylistName(name , i) {
    $('.curveMe')[i].innerHTML = name;
    curveText(i);
}

function movePlaylistsContainer() {
    playlistSection.addClass('moveDown');
}

function movePlaylistsContainerBack() {
    playlistSection.removeClass('moveDown');
}