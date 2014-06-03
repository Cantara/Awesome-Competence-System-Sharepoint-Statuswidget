"use strict"
var ACSAppPart = window.ACSAppPart || {}
ACSAppPart.ProfileStatusViewModel = function () {
    // Private members
    var profileStats = ko.observableArray(),
    // Public functions
    get_profileStats = function () { return profileStats; },

    load = function (useremail) {
        var queryx = useremail;
        $.ajax({
            url: 'https://cv.altran.se/solr/acs/select',
            data: { 'wt': 'json', 'q': queryx, 'indent': 'true', 'fl': 'rendered' },
            success: function (data) {
                RenderResults(data);
                ko.applyBindings(ACSAppPart.ProfileStatusViewModel);
            },
            error: function (err) {
                DisplayError(err);
            },
            dataType: 'jsonp',
            jsonp: 'json.wrf'
        });
    }

    function RenderResults(data) {
        profileStats.removeAll();
        if (data.response.numFound > 0) {
            var prf = data.response.docs;
            for (var i = 0, prflength = prf.length; i < prflength; i++) {
                var profile = $.parseJSON(data.response.docs[i].rendered);
                var percentx = profile.completeness.percent + " %";
                var  datex = profile.last_edited;
                var parts = datex.split("/");
                var lasteditedx = new Date(parts[2], parts[0] - 1, parts[1]);
                profileStats.push(
                    new ACSAppPart.ProfileStatus(
                    get_flag(lasteditedx),
                    percentx,
                    profile.last_edited));
            }
        }
        else {
            var lastupdate = new Date();
            var perc = "0" + " %";
            lastupdate.setDate(lastupdate.getDate() - 10);
            var lastupdatefm = lastupdate.yyyymmdd();
            profileStats.push(
                    new ACSAppPart.ProfileStatus(
                    get_flag(lastupdate),
                    perc,
                    lastupdatefm));
        }
    }

    function DisplayError(err) {
        alert(JSON.stringify(err));
    }

    var get_flag = function (lastupdate) {
        // Number of days since last update
        var pictureUrl,
        datenow = new Date().getTime(),
        dateupdated = lastupdate.getTime(),
        numberofdays = (datenow - dateupdated),
        cstatus = Math.ceil(numberofdays / (1000 * 60 * 60 * 24)),
        lowerLimit = parseInt(getQueryStringParameter("LowerLimit"),10),
        upperLimit = parseInt(getQueryStringParameter("UpperLimit"),10);
        if ((upperLimit <= lowerLimit) || (isNaN(lowerLimit) || isNaN(upperLimit) )) {
            // Set default values
            lowerLimit = 90;
            upperLimit = 120;
        }

        // Retrieve flags
        if (cstatus < lowerLimit) {
            // Retrieve green flag
            pictureUrl = "../Images/icon_flagga_green.png";
        }
        else if ((cstatus >= lowerLimit) && (cstatus < upperLimit)) {
            // Retrieve yellow flag
            pictureUrl = "../Images/icon_flagga_yellow.png";
        }
        else {
            // Retrieve red flag
            pictureUrl = "../Images/icon_flagga_red.png";
        }
        return pictureUrl;
    };

    Date.prototype.yyyymmdd = function () {

        var yyyy = this.getFullYear().toString();
        var mm = (this.getMonth() + 1).toString();         
        var dd = this.getDate().toString();

        return yyyy + '-' + (mm[1] ? mm : "0" + mm[0]) + '-' + (dd[1] ? dd : "0" + dd[0]);
    };

    //public interface
    return {
        load: load,
        get_profileStats: get_profileStats
    };
}();

