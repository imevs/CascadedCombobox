var isWindows = /^win/i.test(navigator.platform)
var noColor = false

var ARGV = require('system').args
var baseDir = isWindows ? ARGV[ 1 ].replace(/.$/, '') : ARGV[ 1 ] + '/'
console.log(baseDir);

phantom.injectJs(baseDir + 'launcher-common.js')

var safePrint = function (text) {
    if (noColor) text = text.replace(/\x1B\[\d+m([\s\S]*?)\x1B\[\d+m/g, '$1')

    console.log(text)
}

var isDebug = false

var debug = function (text) {
    if (isDebug) safePrint(text)
}


// starting from 1.3 phantom segfaults when doing "phantom.exit" in the `onConsoleMessage` handler
// so need to delay the exit
var safeExit = function (code) {
    setTimeout(function () {
        phantom.exit(code || 0)
    }, 0)
}

var args = processArguments(ARGV)
var options = args.options

if (options.version) {
    var fs = require('fs')

    var siestaAll = fs.read(baseDir + 'siesta-all-trial.js')
    var match = /^\/\*[\s\S]*?Siesta (\d.+)\n/.exec(siestaAll)

    console.log("PhantomJS : " + phantom.version.major + '.' + phantom.version.minor + '.' + phantom.version.patch)
    if (match) console.log("Siesta    : " + match[ 1 ])

    phantom.exit(8);
}

if (args.argv.length == 2 || options.help) {
    console.log([
        'Usage: phantomjs url [OPTIONS]',
        'The `url` should point to your `tests/index.html` file',
        '',
        'Options (all are optional):',
        '--help                     - prints this help message',
        '--version                  - prints versions of Siesta and PhantomJS',
        '',
        '--filter filter_value      - a text of regexp to filter the urls of tests',
        '--verbose                  - enable the output from all assertions (not only from failed ones)',
        '--debug                    - enable diagnostic messages',
        '--report-format            - create a report after the test suite execution',
        '                             recognizable formats are: "JSON, JUnit"',
        '--report-file              - required when `report-format` is provided. ',
        '                             Specifies the file to save the report to.',
        '--width                    - width of the viewport, in pixels',
        '--height                   - height of the viewport, in pixels',
        '--no-color                 - disable the coloring of the output',
        '--pause                    - pause between individual tests, in milliseconds',

        // empty line to add the line break at the end
        ''
    ].join('\n'));

    phantom.exit(6);
}


var harnessURL = args.argv[ 2 ]

var reportFormat = options[ 'report-format' ]
var reportFile = options[ 'report-file' ]

isDebug = options.debug || false

noColor = options[ 'no-color' ] || isWindows


if (reportFormat && reportFormat != 'JSON' && reportFormat != 'JUnit') {
    console.log([
        'Unrecognized report format: ' + reportFormat
    ].join('\n'));

    phantom.exit(6)
}

if (reportFormat && !reportFile) {
    console.log([
        '`report-file` option is required, when `report-format` option is specified'
    ].join('\n'));

    phantom.exit(6)
}

if (reportFile && !reportFormat) reportFormat = 'JSON'

console.log("Launching PhantomJS " + phantom.version.major + '.' + phantom.version.minor + '.' +
    phantom.version.patch + " at " + constructURL(harnessURL, {}));


var pollPage = function (iface, callback) {
    var timeoutCheckerId = setInterval(function () {
        // end the test suite after 3 mins of inactivity
        if (new Date() - iface.lastActivity > 3 * 60 * 1000) {
            safePrint('TIMEOUT: Exit after 3 minutes of inactivity');

            phantom.exit(2)
        }
    }, 10 * 1000)


    var isDoneCheckerId = setInterval(function () {
        if (iface.exitCode != null) {
            clearInterval(timeoutCheckerId)
            clearInterval(isDoneCheckerId)

            callback({
                exitCode: iface.exitCode,
                pageCount: iface.pageCount,
                summaryMessage: iface.summaryMessage,
                combinedReport: iface.combinedReport
            })
        }
    }, 1000)
}


var runPage = function (iface, params, callback) {

    iface.setWindowSize(params.viewportWidth, params.viewportHeight);

    iface.debug("Opening harness page: " + params.url)

    iface.open(params.url, function () {

        iface.debug("Page opened successfully: " + params.url)

        pollPage(iface, function (pageResult) {

            var result = {
                exitCode: pageResult.exitCode,
                pageCount: pageResult.pageCount,
                summaryMessage: pageResult.summaryMessage,
                combinedReport: pageResult.combinedReport
            }

            iface.close()

            callback && callback(result)
        })
    })
}


var getProceduralInterface = function (reportOptions) {

    var currentPage
    var width, height

    var iface = {
        exitCode: null,
        lastActivity: new Date(),
        pageCount: null,

        summaryMessage: null,

        pageReports: [],
        combinedReport: null,

        browserName: 'PhantomJS',

        debug: function (text) {
            debug(text)
        },


        print: function (text) {
            safePrint(text)
        },


        open: function (url, callback) {

            currentPage = new WebPage({

                settings: {
                    localToRemoteUrlAccessEnabled: true
                },

                viewportSize: {
                    width: width,
                    height: height
                },

                // Check for server error during page load. Log status code, then exit.
                onResourceReceived: function (resource) {
                    if (resource.url === url && resource.status > 400) {
                        console.log('Failed to load URL: ' + url + '(status: ' + resource.status + ')');
                        phantom.exit(5)
                    }
                },

                onInitialized: function () {
                    currentPage.evaluate(function (pageReports, reportOptions) {
                        __PAGE_REPORTS__ = pageReports;
                        __REPORT_OPTIONS__ = reportOptions;
                    }, iface.pageReports, reportOptions)
                },

                onConsoleMessage: function (msg) {
                    var match

                    if (match = msg.match(/^__PHANTOMJS__:([\s\S]*)/)) {
                        var command = match[ 1 ]

                        debug('Received command: ' + command)

                        if (match = command.match(/exit:(\d+)/)) {
                            iface.exitCode = Number(match[ 1 ])

                            return
                        }

                        if (match = command.match(/pageCount:(\d+)/)) {
                            iface.pageCount = Number(match[ 1 ])

                            return
                        }

                        if (match = command.match(/pageReport:([\s\S]*)/)) {
                            iface.pageReports.push(JSON.parse(match[ 1 ]))

                            return
                        }

                        if (match = command.match(/summaryMessage:([\s\S]*)/)) {
                            iface.summaryMessage = String(match[ 1 ])

                            return
                        }

                        if (match = command.match(/combinedReport:([\s\S]*)/)) {
                            iface.combinedReport = String(match[ 1 ])

                            return
                        }

                        if (match = command.match(/keepAlive/)) {
                            iface.lastActivity = new Date()

                            return
                        }

                        if (match = command.match(/log:([\s\S]+)/)) {
                            safePrint(match[ 1 ])

                            return
                        }

                        throw "Unknown phantomjs command: " + command
                    } else
                        console.log(msg)
                }
            })

            // see http://code.google.com/p/phantomjs/issues/detail?id=504
            var initialOpen = true

            currentPage.open(url, function (status) {
                if (!initialOpen) return

                initialOpen = false

                if (status !== "success") {
                    console.log("Failed to load the URL: " + url)

                    phantom.exit(5)
                }

                setTimeout(function () {
                    if (iface.executeScript("var parent = window.opener || window.parent; " +
                        "return typeof Siesta == 'undefined' && (!parent || typeof parent.Siesta == 'undefined')")) {
                        console.log("[ERROR] Can't find Siesta on the harness page - page loading failed?")

                        iface.close()

                        phantom.exit(5)
                    }

                    var siestaIsAutomated = iface.executeScript("var parent = window.opener || window.parent; " +
                        "try { return typeof Siesta.Harness.Browser.Automation != 'undefined' } catch(e) { " +
                        "try { return typeof parent.Siesta.Harness.Browser.Automation != 'undefined' } catch(e) { return false } }")

                    if (!siestaIsAutomated) {
                        console.log("[ERROR] The harness page you are targeting contains Siesta Lite distribution. " +
                            "To use automation facilities, " +
                            "\nmake sure harness page uses `siesta-all-trial.js` from Standard or Trial packages")

                        iface.close()

                        phantom.exit(5)
                    }

                    callback && callback()
                }, 100)
            })
        },


        close: function () {
            currentPage.release()

            currentPage = null

            iface.lastActivity = null
            iface.exitCode = null
        },


        setWindowSize: function (w, h) {
            width = w
            height = h
        },


        executeScript: function (text) {
            var func = eval('(function() {' + text + '})')

            return currentPage.evaluate(func)
        },


        sleep: function (timeout, func) {
            setTimeout(func, timeout)
        },


        saveReport: function (content) {
            var fs = require('fs')

            fs.write(reportOptions.file, content, 'w')
        }
    }

    return iface
}
// eof `getProceduralInterface`


var reportOptions = reportFormat ? {
    format: reportFormat,
    file: reportFile
} : null


var iface = getProceduralInterface(reportOptions)

runBrowser(iface, {
    harnessURL: harnessURL,
    query: {
        phantom: true,
        verbose: options.verbose,
        filter: options.filter,
        pause: options.pause
    },
    viewportWidth: options.width || 1200,
    viewportHeight: options.height || 800,
    reportOptions: reportOptions
}, function (exitCode) {
    safeExit(exitCode)
})
