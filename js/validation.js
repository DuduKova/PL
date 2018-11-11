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
    return regexp.test(str);
}

// validation step 2

function validateOneMp3Url(id) {
    let check = $(`#${id}`);
    if (check.val().slice(-4) === '.mp3') {
        validationGoodFeedback(check);
    } else {
        validationBadFeedback(check);
    }
}

function validateOneSongName(id) {
    let check = $(`#${id}`);
    if (check.val() !== '') {
        validationGoodFeedback(check);
    } else {
        validationBadFeedback(check);
    }
}


function checkAllMp3Inputs() {
    let isvalid = true;
    $('#addSongsForm .songUrl').each(function () {
        if ($(this).val().slice(-4) === '.mp3') {
            validationGoodFeedback($(this));
        } else {
            validationBadFeedback($(this));
            isvalid = false;
        }
    });
    return isvalid;
}

function checkAllSongNameInputs() {
    let isvalid = true;
    $('#addSongsForm .songName').each(function () {
        if ($(this).val() !== '') {
            validationGoodFeedback($(this));
        } else {
            validationBadFeedback($(this));
            isvalid = false;
        }
    });
    return isvalid;
}

function validateSecondStep() {
    if (checkAllSongNameInputs() === true && checkAllMp3Inputs() === true && validateMinimumOneSong(getValOfNewSongsToUpload()) === true) {
        modal.modal('hide');
    } else {
        errorAlertStep2.removeClass('d-none');
        return false;
    }
}

function validateMinimumOneSong(songs) {
    let isvalid = true;
    if (songs.length < 1 || songs.length === undefined) {
        errorAlert.removeClass('d-none');
        isvalid = false;
        return isvalid
    }
    return isvalid;
}

function createPlaylist() {
    if (validateMinimumOneSong(getValOfNewSongsToUpload())) {
     createPlaylistRequest(playlistName.val(), playlistImg.val(), getValOfNewSongsToUpload());
    } else {
        return false;
    }
}

// =============== validation styles

function validationGoodFeedback(el) {
    el.removeClass('is-invalid');
    el.addClass('is-valid');
}

function validationBadFeedback(el) {
    el.removeClass('is-valid');
    el.addClass('is-invalid');
    el.focus();
    el.addClass('shake-bottom');
}

function validationResetFeedback(el) {
    el.removeClass('is-valid');
    el.removeClass('is-invalid');
    el.removeClass('shake-bottom');
}