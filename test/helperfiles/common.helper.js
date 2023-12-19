class CommonHelper {
    getNumberFromString(StringToWorkOn) {
        return Number(StringToWorkOn.match(/\d+/)[0]);
    }
}
module.exports = new CommonHelper();