function isDefined(obj) {
    return typeof obj !== 'undefined';
}

function isNullOrUndefined(obj) {
    return typeof obj === 'undefined' || obj == null;
}

function isNotNullOrUndefined(obj) {
    return !isNullOrUndefined(obj);
}

function validObjectPathName(obj, pathName) {
    if (isNullOrUndefined(obj)) return false;
    var names = pathName.split('.');
    for (var i in names) {
        if (isNullOrUndefined(obj[names[i]])) return false;
        obj = obj[names[i]];
    }
    return true;
}
