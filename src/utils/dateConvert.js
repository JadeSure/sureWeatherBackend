
function getLocalTime(unixTime) {
    return new Date(unixTime * 1000).toLocaleTimeString()
}

function getLocalDate(unixTime) {
    return new Date(unixTime * 1000).toLocaleDateString()
}

module.exports = {
    getLocalTime,
    getLocalDate
}