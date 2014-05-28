"use strict"
var ACSAppPart = window.ACSAppPart || {}
ACSAppPart.ProfileStatusViewModel = function () {
    // Private members
    var profileStats = ko.observableArray(),
    get_profileStats = function () { return profileStats; },
    load = function () {
        $.ajax(
        {
            url: 'https://acssolr:acssolr@cv.altran.se/solr/acs/select?q=oscar.arnez@altran.com&wt=json&indent=true&fl=rendered',
            type: "GET",
            headers: {
                "accept": "application/json;odata=verbose",
            },
            success: onSuccess,
            error: onError
        }
        );
    },
    onSuccess = function (data) {
        var results = data.d.results;
        profileStats.removeAll();
        for (var i = 0; i < results.length; i++) {
            contacts.push(
            new ACSAppPart.ProfileStatus(
            results[i].Percent,
            results[i].LastUpdated));
        }
    },
    onError = function (err) {
        alert(JSON.stringify(err));
    };
    //public interface
    return {
        load: load,
        get_profileStats: get_profileStats
    };
}();

