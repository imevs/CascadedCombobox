var page = require('webpage').create();
var url = 'http://localhost:3000/tests/ui/';
var captureAttempts = 0;
var captured = false;
var locked = false;

var log = function(str) {
    var dt = new Date();
    console.log(dt.toString() + ': ' + str);
};

var pageLoaded = function(status) {
    log('Finished loading ' + url + ' with status: ' + status);

    setTimeout(function() {
        var runnerFrame = page.evaluate(function() {
            return Siesta.my.activeHarness.generateReport();
        });

        if (typeof runnerFrame !== "boolean") {
            console.log(runnerFrame);
            locked = false;
            setTimeout(capture, 1000);
        } else {
            console.log(runnerFrame);
            captured = true;
            phantom.exit(runnerFrame ? 0 : 1);
        }
    }, 5000);
};

var capture = function() {
    if (captureAttempts === 5) {
        log('Failed to capture JSTD after ' + captureAttempts + ' attempts.');
        phantom.exit();
    }

    if (captured || locked) {
        return;
    }

    captureAttempts += 1;
    locked = true;

    log('Attempting (' + captureAttempts + ') to load: ' + url);
    page.open(url, pageLoaded);
};

capture();