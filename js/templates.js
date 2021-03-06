//variables
const mediaPlayerDiv = $('#mediaContainer');
const errorAlert = $('#errorAlert');
const errorAlertStep2 = $('#errorAlertStep2');
const playlistContainer = $('#playlists');
const playlistSection = $('#playlistsSection');

// modal

const modal = $('#modal-1');
const modalHeader = $('#modalTitle');
const modalHeaderSongs = $('#modalTitleSongs');
const playlistName = $('#playlistName');
const playlistImg = $('#playlistImg');
const imgPriview = $('#imgPreview');
const addSongsFrom = $('#addSongsForm');
const btnNext = $('#next');
const btnSave = $('#save');
const btnConfirmDelete = $('#btnConfirmDelete');
const deleteModal = $('#confirmDelete');
const bodies = modal.find('div.modal-body');
const total_num_steps = bodies.length;

//templates

const playlistTemp = function () {
    const now = new Date();
    const discElementId = now.getMilliseconds() + this.id;

    return `<div class="roll-in-left col-lg-3 col-md-4 col-sm-6 playlist" id="${discElementId}">
            <option value="${this.name}" id="check + ${this.name}" hidden></option>
            <div class="curveMe ${discElementId}">${this.name}</div>
            <div class="d-flex justify-content-center align-items-center">
                <div class="position-absolute be-at-the-top">
                    <button class="btn btn-danger btn-sm rounded-circle" onclick="confirmDelete(${this.id},${discElementId})"><i class="fa fa-times-circle"></i></button>
                    <button class="btn btn-info btn-sm rounded-circle" data-target="#modal-1" data-toggle="modal" name="${discElementId}" id="${this.id}"><i class="fa fa-pencil-alt"></i></button>
                </div>
                <div class="rounded-circle position-absolute center-dot"></div>
                <img src=${this.image} class="rounded-circle shadow-lg playListImage" name="${discElementId}">
                <button class="btn btn-primary rounded-circle position-absolute" onclick="getSongsToMedia(${this.id},'${this.image}',${discElementId})"><i
                        class="fa fa-play"></i></button>
            </div>
        </div>
    </div>`
};

const addSongTemp = function (name, url, i) {
    if (name === undefined && url === undefined && i === undefined) {
        name = "";
        url = "";
        i = "";
    }
    const now = new Date();
    const uniqeId = now.getMilliseconds() + i;
    const uniqeId2 = now.getTime() + now.getSeconds() + i;

    return `<div class="row m-2 scale-in-center">
    <div class="col-sm-6">
        <input id="${uniqeId}"  class="input-group songUrl form-control" type="text" placeholder="Song URL" value="${url}" onchange="validateOneMp3Url('${uniqeId}')" minlength="1" required>
        <div class="invalid-feedback scale-in-center">
        The url you entered is not type of mp3.
        </div>
        <div class="valid-feedback scale-in-center">
        Looks good!
      </div>
         </div>
          <div class="col-sm-4">
            <input id="${uniqeId2}" class="input-group songName form-control" type="text" placeholder="Name" value="${name}" minlength="1" onchange="validateOneSongName('${uniqeId2}')" required>
             <div class="invalid-feedback scale-in-center">
        Enter Name please.
        </div>
        <div class="valid-feedback scale-in-center">
        Looks good!
      </div>
           </div>
           <div class="col-sm-2">
              <button class="rounded-circle btn btn-outline-danger btn-sm mt-1" type="button" onclick="$(this).closest('.m-2').remove()"><i class="fa fa-times"></i></button>
          </div>
    </div>`
};

const mediaPlayerTemp = function (id, img, songs, discElementId) {
    return `<div id="${'md' + id}" class="mediaPlayer row justify-content-center align-items-center shadow bounce-in-bck">
        <div class="col-sm-5 d-flex justify-content-center align-items-center">
            <img src="${img}" class="rounded-circle rotate-center" id="playingDisc">
            <button class="btn btn-primary btn-sm rounded-circle position-absolute d-none" onclick="playMusic()" id="btnPlayMusic">
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
            <h6>NOW PLAYING:  <span id="nowPlaying"> ${songs[0].name}</span></h6>
            <ol class="list-group pl-4" id="myList">
    
            </ol>
        </div>
        <div class="col-sm-1">

        </div>
    </div>
    <div class="float-right ml-5" id="floatRightBtns">
        <div class="row mb-5">
            <button class="btn btn-danger btn-sm rounded-circle" onclick="confirmDelete(${id},${discElementId})"><i class="fa fa-times-circle"></i></button>
        </div>

        <div class="row">
            <button class="btn btn-info btn-sm rounded-circle btn-mediaplayer-edit" data-target="#modal-1" data-toggle="modal" name="${discElementId}" id="${id}"><i class="fa fa-pencil-alt"></i></button>
        </div>
    </div>`
};

const listSongItem = function (name, url) {
    return `<li class="songNames"><a href="${url}"></a><i class="fa fa-play fa-xs hide-play" href="${url}"></i>${name}</li>`
};