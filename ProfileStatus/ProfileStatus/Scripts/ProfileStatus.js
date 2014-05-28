"use strict"
var ACSAppPart = window.ACSAppPart || {}
window.ACSAppPart.ProfileStatus = function (pc, lu) {
    // Private members
    var cstatus = 'undefined'
    var percent = 'undefined'
    var lastupdated = 'undefined'

    // Constructor
    percent = pc;
    lastupdated = lu;
    cstatus = lu - (new Date().getTime() / 1000);

    get_percent = function () { return percent; },
    get_lastupdated = function () { return lastupdated; },
    get_cstatus = function () { return cstatus; };

    // Public interface
    return {
        get_cstatus: get_cstatus,
        get_percent: get_percent,
        get_lastupdated: get_lastupdated
    };
}