//variables

const btnAddNewPlaylist = $('#addNewPlaylist'); // opens modal to add playlist-first name and URL

const btnResetFields = $('#btnResetFields'); // as it sounds lol
const btnAddSongToPlaylist = $('#btnAddSongToPlaylist'); //adds song to the PL in the final stage
const btnFinish = $('#btnFinish'); // saves all the data and create a new playlist-first
const albumList = $('#albumList'); // the row that contains the albums
const mediaPlayerDiv = $('#mediaContainer');
const errorAlert = $('#errorAlert');
const playlistContainer = $('#playlists');

//media player vars

const btnPlay = $('#btnPlay');
const btnPause = $('#btnPause');
const btnMute = $('#btnMute');
const btnDelete = $('#btnDelete');
const btnEdit = $('#btnEdit');

// modal

const modal = $('#modal-1');
const modalHeader = $('#modalTitle');
const modalHeaderSongs = $('#modalTitleSongs');
const playlistName = $('#playlistName');
const playlistImg = $('#playlistImg');
const songsUrl = $('.songUrl');
const imgPriview = $('#imgPreview');
const addSongsFrom = $('#addSongsForm');
const btnNext = $('#next'); // continue to next step in creating the playlist-first
const btnSave = $('#save');
const btnConfirmDelete = $('#btnConfirmDelete');
const deleteModal = $('#confirmDelete');
const bodies = modal.find('div.modal-body');
const total_num_steps = bodies.length;

//templates

const playlistTemp = function () {
    return `
      <div class="col-lg-3 col-md-4 col-sm-6 playlist mt-3 mb-3" id="${this.id}">
            <div class="row d-flex justify-content-center align-items-center playlistName" id="${this.name}">
                ${this.name}
            </div>
            <div class="d-flex justify-content-center align-items-center">
                <div class="position-absolute be-at-the-top">
                    <button class="btn btn-danger btn-sm rounded-circle" onclick="confirmDelete(${this.id})"><i class="fa fa-times-circle"></i></button>
                    <button class="btn btn-info btn-sm rounded-circle" data-target="#modal-1" data-toggle="modal" onclick="getOneForUpdate(${this.id})"><i class="fa fa-pencil-alt"></i></button>
                </div>
                <div class="rounded-circle position-absolute center-dot"></div>
                <img src=${this.image} class="rounded-circle" id="${this.image}">
                <button class="btn btn-success btn-sm rounded-circle position-absolute" onclick="getSongsToMedia(${this.id},'${this.image}')"><i
                        class="fa fa-play"></i></button>
            </div>
        </div>
    </div>
`
};

const addSongTemp = function (name, url) {
    if (name === undefined && url === undefined) {
        name = "";
        url = "";
    }

    return `
 <div class="row m-2">
    <div class="col-sm-6">
        <input class="input-group songUrl" type="text" placeholder="Song URL" value="${name}" minlength="1" required>
         </div>
          <div class="col-sm-4">
            <input class="input-group songName" type="text" placeholder="Name" value="${url}" minlength="1" required>
           </div>
           <div class="col-sm-2">
              <button class="rounded-circle btn btn-outline-danger btn-sm" type="button" onclick="$(this).closest('.m-2').remove();"><i class="fa fa-times" style="color: red"></i></button>
          </div>
    </div>
    `
};

const mediaPlayerTemp = function (id , img , songs) {
    return `
       <div id="mediaPlayer" class="row justify-content-center align-items-center shadow bounce-in-bck">
        <div class="col-sm-5 d-flex justify-content-center align-items-center">
            <img src="${img}" class="rounded-circle rotate-center" id="playingDisc">
            <button class="btn btn-success btn-sm rounded-circle position-absolute d-none" onclick="playMusic()" id="btnPlayMusic">
                <i class="fa fa-play"></i>
            </button>
            <button class="btn btn-danger btn-sm rounded-circle position-absolute" onclick="pauseMusic()" id="btnPauseMusic">
                <i class="fa fa-pause"></i>
            </button>
        </div>
        <div class="col-sm-6">
            <audio controls autoplay id="audioPlayer">
                <source src="${songs[0].url}">
            </audio>
            <p>${songs[0].name}</p>
            <ol class="list-group pl-4" id="myList">
    
            </ol>
        </div>
        <div class="col-sm-1">

        </div>
    </div>
    <div class="float-right ml-5" id="floatRightBtns">
        <div class="row mb-5">
            <button class="btn btn-danger btn-sm rounded-circle" onclick="confirmDelete(${id})"><i class="fa fa-times-circle"></i></button>
        </div>

        <div class="row">
            <button class="btn btn-info btn-sm rounded-circle" data-target="#modal-1" data-toggle="modal" onclick="getOneForUpdate(${id})"><i class="fa fa-pencil-alt"></i></button>
        </div>
    </div>
    `
};

const listSongItem = function (name , url) {
    return `
    <li class="songNames"><i class="fa fa-play fa-xs hide-play"></i><a href="${url}">${name}</a></li>
    `
};