$(document).ready(function () {
    getAll();
    initialize();
});

function getAll() {
    playlistContainer.html('');
    $.get('/api/playlist.php?type=playlist', function (data) {
            for (let i = 0; i < data.data.length; i++) {
                playlistContainer.append(playlistTemp.apply({
                    id: data.data[i].id,
                    name: data.data[i].name,
                    image: data.data[i].image
                }))
            }
        }
    );
}

function createPlaylistRequest(name, img, songs) {
    $.post('/api/playlist.php?type=playlist', {
            name: name,
            image: img,
            songs: songs
        },
        getAll());
}

function getOneForUpdate(id) {
    $.get(`/api/playlist.php?type=playlist&id=${id}`, function (data) {
        openUpdateModal(data.data);
    });
}


function getOne(id) {
    $.get(`/api/playlist.php?type=playlist&id=${id}` , function (data) {
        return data.data;
    });
}

function getSongs(id) {
    $.get(`/api/playlist.php?type=songs&id=${id}`, function (data) {
        editSongsModal(data);
    });
}

function getSongsToMedia(id , img) {
    $.get(`/api/playlist.php?type=songs&id=${id}`, function (data) {
        const songs = data.data.songs;
        playPlaylist(id ,img , songs);
    });
}

function updatePlaylist(id) {
    const name = playlistName.val();
    const img = playlistImg.val();
    if($('.bounce-in-bck').length > 0) {
        updateMediaPlayer(img);
    }
    $.post(`/api/playlist.php?type=playlist&id=${id}`,
        {
            name: name,
            image: img
        }
    )
}

function updateSongs(id) {
    $.post(`/api/playlist.php?type=songs&id=${id}`, {
        songs: getValOfNewSongsToUpload()
    });
    executeThisOnSaveClick();
    getAll();
}

function deletePlaylist(id) {
    $.ajax({
        method: 'DELETE',
        url: `/api/playlist.php?type=playlist&id=${id}`,
        success: function () {
            getAll();
        }
    });
}