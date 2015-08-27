var frameModule = require("ui/frame");

function pageNavigatingTo(args) {
    var page = args.object;
    page.bindingContext = page.navigationContext;

    frameModule.topmost().ios.navBarVisibility = "always";

    page.ios.title = page.bindingContext.hotelText;
}

exports.pageNavigatingTo = pageNavigatingTo;