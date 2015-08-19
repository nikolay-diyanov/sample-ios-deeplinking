var frameModule = require("ui/frame");

function pageLoaded(args) {
    frameModule.topmost().ios.navBarVisibility = "always";

    var page = args.object;
    page.ios.title = "Services";
}

function hotelsTap(args) {
    var topMost = frameModule.topmost();

    var navigatedPage = {
        moduleName: "hotels-page",
    };

    topMost.navigate(navigatedPage);
}

function carsTap(args) {
    var topMost = frameModule.topmost();

    var navigatedPage = {
        moduleName: "cars-page",
    };

    topMost.navigate(navigatedPage);
}

exports.pageLoaded = pageLoaded;
exports.hotelsTap = hotelsTap;
exports.carsTap = carsTap;
