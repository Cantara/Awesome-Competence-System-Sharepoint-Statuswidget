"use strict"
var ACSAppPart = window.ACSAppPart || {}
window.ACSAppPart.ProfileStatus = function (pc, lu) {
    // Private members
    var cstatus = 'undefined'
    var percent = 'undefined'
    var lastupdated = 'undefined'

    // Constructor
    // Profile completeness in percent
    percent = pc;
    // Date when the profile was last updated
    lastupdated = lu;
    // Number of days since last update
    cstatus = Math.ceil((new Date().getTime() - lu.getTime()) / (1000 * 60 * 60 * 24));

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