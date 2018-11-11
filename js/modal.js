modal.on('show.bs.modal', function (event) {
    if ($(event.relatedTarget).hasClass('btn-info')) {
        getOneForUpdate(event.relatedTarget.id);
        btnNext.removeAttr('disabled');
        btnSave.removeAttr('disabled');
        modalHeader.html('Edit Playlist');
        modalHeaderSongs.html('Edit Playlist Songs');
        btnNext.html('Edit & Next');
        btnNext.attr('onclick', `updateStepOne(${event.relatedTarget.id} ,${event.relatedTarget.value})`);
        btnSave.attr('onclick', `updateSongs(${event.relatedTarget.id} ,${event.relatedTarget.value} , ${event.relatedTarget.name}); validateSecondStep()`);
    } else {
        btnNext.attr('disabled', 'disabled');
        btnNext.html('Next');
        playlistName.val("");
        playlistImg.val("");
        imgPriview.attr('src', "img/default.png");
        modalHeader.html('Add new playlist');
        modalHeaderSongs.html('Add Playlist Songs');
        addSongsFrom.html(addSongTemp());
        btnNext.attr('onclick', `sendEvent('#modal-1', 2);`);
        btnSave.attr('onclick', 'validateSecondStep(); createPlaylist()');
    }
});

modal.on('hidden.bs.modal', function () {
    validationResetFeedback(playlistName);
    validationResetFeedback(playlistImg);
    errorAlert.addClass('d-none');
    errorAlertStep2.addClass('d-none');
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
    let toShow = modal.find('.step-' + step);
    if (toShow.length === 0) {
        return;
    }
    toShow.show();
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
    addSongsFrom.append(addSongTemp());
}

// ============ delete modal

function confirmDelete(id,uniqeId) {
    btnConfirmDelete.attr('onclick', `deletePlaylist(${id},${uniqeId})`);
    deleteModal.modal();
}