"use strict"
var ACSAppPart = window.ACSAppPart || {}
window.ACSAppPart.ProfileStatus = function (fl,pc, lu) {
    // Private members
    var percent = 'undefined',
        lastupdated = 'undefined',
        statusflag = 'undefined',
        get_percent = function () { return percent; },
        get_lastupdated = function () { return lastupdated; },
        get_statusflag = function () { return statusflag; };

    // Constructor
    // Status flag
    statusflag = fl;
    // Profile completeness in percent
    percent = pc;
    // Date when the profile was last updated
    lastupdated = lu;

    // Public interface
    return {
        get_statusflag: get_statusflag,
        get_percent: get_percent,
        get_lastupdated: get_lastupdated
    };
}