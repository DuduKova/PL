$(document).ready(function () {
    window.playlistsJson = localStorage.getItem('playlists');
    window.playlists = playlistsJson ? JSON.parse(playlistsJson) : [];
    getAll();
    initialize();
});

function setDataInLocalHost(data) {
    window.playlists = data.data;
    localStorage.setItem('playlists', JSON.stringify(window.playlists));
}

// GET /playlist

function getAll() {
    playlistContainer.html('');
    $.get('/api/playlist.php?type=playlist', function (data) {
        setDataInLocalHost(data);
        drawPlaylists(data.data);
    });
}

//POST /playlist

function createPlaylistRequest(name, img, songs) {
    $.post('/api/playlist.php?type=playlist', {
        name: name,
        image: img,
        songs: songs
    }, function (response) {
        getOne(response.data.id);
    })
}

//GET /playlist/{id}

function getOne(id) {
    $.get(`/api/playlist.php?type=playlist&id=${id}`, function (data) {
        draw1(data.data)
    });
}

function getOneForUpdate(id) {
    $.get(`/api/playlist.php?type=playlist&id=${id}`, function (data) {
        openUpdateModal(data.data);
    });
}

//GET /playlist/{id}/songs

function getSongs(id) {
    $.get(`/api/playlist.php?type=songs&id=${id}`, function (data) {
        editSongsModal(data);
    });
}

function getSongsToMedia(id, img, discElementId) {
    $.get(`/api/playlist.php?type=songs&id=${id}`, function (data) {
        playPlaylist(id, img, data.data.songs, discElementId);
    });
}

//POST /playlist/{id}

function updatePlaylist(id , name , img) {
    $.post(`/api/playlist.php?type=playlist&id=${id}`,
        {
            name: name,
            image: img
        }
    )
}

//POST /playlist/{id}/songs

function updateSongs(id, discElementId) {
    if (validateSecondStep()) {
        $.post(`/api/playlist.php?type=songs&id=${id}`, {
            songs: getValOfNewSongsToUpload(),
            success: function () {
                checkIfplaylistIsOnMediaplayer(id, playlistImg.val(), getValOfNewSongsToUpload(), discElementId);
            }
        });
    }
}

//DELETE /playlist/{id}

function deletePlaylist(id, elementId) {
    $.ajax({
        method: 'DELETE',
        url: `/api/playlist.php?type=playlist&id=${id}`,
        success: function () {
            deleteElementById('md' + id);
            deleteElementById(elementId);
        }
    });
}
