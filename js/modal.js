modal.on('show.bs.modal', function (event) {
    if ($(event.relatedTarget).hasClass('btn-info')) {
        getOneForUpdate(event.relatedTarget.id);
        btnNext.removeAttr('disabled');
        btnSave.removeAttr('disabled');
        modalHeader.html('Edit Playlist');
        modalHeaderSongs.html('Edit Playlist Songs');
        btnNext.html('Edit & Next');
        btnNext.attr('onclick', `updateStepOne(${event.relatedTarget.id} ,${event.relatedTarget.value})`);
        btnSave.attr('onclick', `updateSongs(${event.relatedTarget.id} ,${event.relatedTarget.value}); validateSecondStep()`);
    } else {
        btnNext.attr('disabled', 'disabled');
        btnNext.html('Next');
        playlistName.val("");
        playlistImg.val("");
        imgPriview.attr('src', "img/default.png");
        modalHeader.html('Add new playlist');
        modalHeaderSongs.html('Add Playlist Songs');
        addSongsFrom.html(addSongTemp());
        btnSave.attr('onclick', 'validateSecondStep(); createPlaylist()');
        btnNext.attr('onclick', `sendEvent('#modal-1', 2);`);
    }
});

modal.on('hidden.bs.modal', function () {
    validationResetFeedback(playlistName);
    validationResetFeedback(playlistImg);
    errorAlert.addClass('d-none');
    modal.find('.step').hide();
    modal.find('[data-step]').hide();
    modal.find('.step-1').show();
});

sendEvent = function (sel, step) {
    if (playlistName.val() === "" || playlistImg.val() === "") {
        errorAlert.removeClass('d-none');
        return;
    }
    errorAlert.addClass('d-none');
    $(sel).trigger('next.m.' + step);
};

function bindEventsToModal(modal) {
    let dataSteps = [];
    $('[data-step]').each(function () {
        let step = $(this).data().step;
        if (step && $.inArray(step, dataSteps) === -1) {
            dataSteps.push(step);
        }
    });

    $.each(dataSteps, function (i, v) {
        modal.on('next.m.' + v, {step: v}, function (e) {
            goToStep(e.data.step);
        });
    });
}

function goToStep(step) {
    reset();
    let to_show = modal.find('.step-' + step);
    if (to_show.length === 0) {
        return;
    }
    to_show.show();
}

function reset() {
    modal.find('.step').hide();
    modal.find('[data-step]').hide();
}

function initialize() {
    reset();
    modal.find('.step-1').show();
    bindEventsToModal(modal, total_num_steps);
    modal.data({
        total_num_steps: bodies.length,
    });
}

function resetFields() {
    playlistName.val('');
    playlistImg.val('');
    validationResetFeedback(playlistName);
    validationResetFeedback(playlistImg);
    btnNext.attr('disabled', 'disabled');
}

function addMoreSong() {
    //$('#save').attr('disabled', 'disabled');
    addSongsFrom.append(addSongTemp());
}

// ============= update mode functions ========

function openUpdateModal(data) {
    playlistName.val(data.name);
    playlistImg.val(data.image);
    imgPriview.attr('src', data.image);
}

// ============ delete modal

function confirmDelete(id,uniqeId) {
    btnConfirmDelete.attr('onclick', `deletePlaylist(${id},${uniqeId})`);
    deleteModal.modal();
}