chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.storage.sync.get({
        w_r_domain: 'simple',
        w_r_open_in_new_tab: false
    }, function (items) {
        var url = 'https://' + items.w_r_domain + '.wikipedia.org/api/rest_v1/page/random/summary';
        var isNewTab = items.w_r_open_in_new_tab;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                var targetUrl = data.content_urls.desktop.page;
                if (isNewTab) {
                    chrome.tabs.create({
                        active: true,
                        url: targetUrl
                    });
                } else {
                    chrome.tabs.update(tab.id, {
                        url: targetUrl
                    }, null);
                }
            });
    });
});
