var commonTools = require('../base/commonTools');
module.exports = {
    'leaflet_03_themeGraduatedSymbol': function (browser) {
        var type = 'leaflet';
        var exampleName = '03_themeGraduatedSymbol';
        commonTools.openExampleAndLoadMap(browser, type, exampleName);
        /*check elements exist*/
        browser.waitForElementPresent('.leaflet-pane.leaflet-map-pane', 10000);
        browser.waitForElementPresent('.leaflet-pane.leaflet-tile-pane', 10000);
        browser.waitForElementPresent('.leaflet-layer', 10000);
        browser.pause(3000);
        browser.elements('class name', 'leaflet-layer', function (result) {
            this.assert.equal(result.value.length, 2, "expect Number of leaflet-layer to be 2, actual is " + result.value.length);
        });
        browser.elements('class name', 'leaflet-tile-container', function (result) {
            this.assert.equal(result.value.length, 2, "expect Number of leaflet-tile-container to be 2, actual is " + result.value.length);
        });
        browser.end();
    }
};