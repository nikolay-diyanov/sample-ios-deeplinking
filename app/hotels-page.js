var frameModule = require("ui/frame");

function pageLoaded(args) {
    frameModule.topmost().ios.navBarVisibility = "always";

    var page = args.object;
    page.ios.title = "Hotels";
}
exports.pageLoaded = pageLoaded;
