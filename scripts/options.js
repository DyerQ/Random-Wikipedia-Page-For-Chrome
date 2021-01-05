// Used prefix w_r_ not to clash with other extension's variables in the storage.

// Temporarily disables and updates text on pressed save button.
function notify_options(msg) {
    var status = document.getElementById('save');
    if (status != null) {
        status.textContent = msg;
        status.disabled = true;
        setTimeout(function () {
            status.textContent = 'Save';
            status.disabled = false;
        }, 1000);
    } else {
        message(msg);
    }
}

// Saves options to chrome.storage
function save_options() {
    var domain = document.getElementById('domain').value;
    var isNewTab = document.getElementById('open_in_new_tab').checked;

    if (!domain) {
        notify_options('Error: no Domain value!');
        return;
    }

    chrome.storage.sync.set({
        w_r_domain: domain,
        w_r_open_in_new_tab: isNewTab
    }, function () {
        notify_options('Options saved.');
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    // Use default value domain = 'simple' and open_in_new_tab = false.
    chrome.storage.sync.get({
        w_r_domain: 'simple',
        w_r_open_in_new_tab: false
    }, function (items) {
        document.getElementById('domain').value = items.w_r_domain;
        document.getElementById('open_in_new_tab').checked = items.w_r_open_in_new_tab;
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
