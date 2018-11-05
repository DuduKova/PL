// validation step 1

function validateFirstStep() {
    if (playlistName.hasClass('is-valid') && playlistImg.hasClass('is-valid')) {
        btnNext.removeAttr('disabled');
    }
}

function validatePlaylistName() {
    if (playlistName.val() !== "") {
        validationGoodFeedback(playlistName);
        validateFirstStep();
    } else {
        validationBadFeedback(playlistName);
        btnNext.attr('disabled', 'disabled');
    }
}

function validatePlaylistImg() {
    let check = playlistImg.val();
    if (is_url(check)) {
        imgPriview.attr('src', check);
        validationGoodFeedback(playlistImg);
        validateFirstStep();
    } else {
        validationBadFeedback(playlistImg);
        imgPriview.attr('src', 'img/default.png');
        btnNext.attr('disabled', 'disabled');
    }
}

function is_url(str) {
    let regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    return (regexp.test(str));
}

// validation step 2

let songsUrlAreOkToSave = false;
let songsNameAreOkToSave = false;
/*
function checkIfMp3(id) {
    let check = $(`#${id}`);
    if (check.val().slice(-4) === '.mp3') {
        validationGoodFeedback(check);
    } else {
        validationBadFeedback(check);
        btnSave.attr('disabled', 'disabled');
    }
}
*/

function checkIfMp3() {
    songsUrlAreOkToSave = true;
    $('#addSongsForm .songUrl').each(function () {
        if ($(this).val().slice(-4) === '.mp3') {
            validationGoodFeedback($(this));
        } else {
            validationBadFeedback($(this));
            btnSave.attr('disabled', 'disabled');
            songsUrlAreOkToSave = false;
            return false;
        }
    });
   okToSave();
}

function checkSongNameVal() {
    songsNameAreOkToSave = true;
    $('#addSongsForm .songName').each(function () {
        if ($(this).val() !== '') {
            validationGoodFeedback($(this));
        } else {
            validationBadFeedback($(this));
            btnSave.attr('disabled', 'disabled');
            songsNameAreOkToSave = false;
            return false;
        }
    });
    okToSave();
}

function okToSave() {
    if (songsNameAreOkToSave === true && songsUrlAreOkToSave === true) {
        btnSave.removeAttr('disabled');
    }
}

function validatePlaylist(name, image, songs) {
    if (name === "" || image === "" || songs.length < 1) {
        errorAlert.removeClass('d-none');
    }
    return false;
}

function createPlaylist() {
    const name = playlistName.val();
    const img = playlistImg.val();

    if (validatePlaylist(name, img, getValOfNewSongsToUpload())) {
        return;
    }
    createPlaylistRequest(name, img, getValOfNewSongsToUpload());
}

// =============== validation styles

function validationGoodFeedback(id) {
    id.removeClass('is-invalid');
    id.addClass('is-valid');
}

function validationBadFeedback(id) {
    id.removeClass('is-valid');
    id.addClass('is-invalid');
    id.focus();
    id.addClass('shake-vertical');
}

function validationBResetFeedback(id) {
    id.removeClass('is-valid');
    id.removeClass('is-invalid');
    id.removeClass('shake-vertical');
}

