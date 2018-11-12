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

function getAll() {
    playlistContainer.html('');
    $.get('/api/playlist.php?type=playlist', function (data) {
        setDataInLocalHost(data);
        drawPlaylists(data.data);
    });
}

function createPlaylistRequest(name, img, songs) {
    $.post('/api/playlist.php?type=playlist', {
        name: name,
        image: img,
        songs: songs
    }, function (response) {
        getOne(response.data.id);
    })
}

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

function updatePlaylist(id , name , img) {
    $.post(`/api/playlist.php?type=playlist&id=${id}`,
        {
            name: name,
            image: img
        }
    )
}

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

/*

function checkImg(img) {
    $.ajax({
        type: "get",
        url: img,
        success: function(response, status, xhr){
            if (xhr.status === 200) {
               return true;
            }
        }
    });
}
*/
