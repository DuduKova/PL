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

function getOneForUpdate(id) {
    $.get(`/api/playlist.php?type=playlist&id=${id}`, function (data) {
        openUpdateModal(data.data);
    });
}

function getOne(id) {
    $.get(`/api/playlist.php?type=playlist&id=${id}`, function (data) {
        draw1(data.data)
    });
}

function getSongs(id) {
    $.get(`/api/playlist.php?type=songs&id=${id}`, function (data) {
        editSongsModal(data);
    });
}

function getSongsToMedia(id, img, PlId , i) {
    $.get(`/api/playlist.php?type=songs&id=${id}`, function (data) {
        playPlaylist(id, img, data.data.songs, PlId , i);
    });
}

function updatePlaylist(id, i) {
    const name = playlistName.val();
    const img = playlistImg.val();
    $.post(`/api/playlist.php?type=playlist&id=${id}`,
        {
            name: name,
            image: img
        }
    )
}

function updateSongs(id , i) {
    $.post(`/api/playlist.php?type=songs&id=${id}`, {
        songs: getValOfNewSongsToUpload()
    });
    const name = playlistName.val();
    const img = playlistImg.val();
    showUpdatedPlaylist(name , img ,i);
    if ($('.bounce-in-bck').length > 0) {
        createMyMediaList(getValOfNewSongsToUpload());
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
function getHeaderContent(url) {
    $.ajax({
        type: "get",
        url: {url},
        success: function(response, status, xhr){
            let ct = xhr.getResponseHeader('content-type') || "";
            console.log(ct);
        }
    });
}
*/