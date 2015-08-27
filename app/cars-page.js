var frameModule = require("ui/frame");
var imageSourceModule = require("image-source");

function pageLoaded(args) {
    frameModule.topmost().ios.navBarVisibility = "always";

    var page = args.object;
    page.ios.title = "Cars";

    var carsImg = imageSourceModule.fromResource("cars").ios;
    var carsData = UIImagePNGRepresentation(carsImg);
    var carsImgData = NSData.dataWithData(carsData);

	var carsAttributeSet = CSSearchableItemAttributeSet.alloc().initWithItemContentType(kUTTypeItem);
    carsAttributeSet.title = "Cars";
    carsAttributeSet.contentDescription = "Rent your car now and drive!";
    carsAttributeSet.keywords = ["rent-a-car, car, rent, vehicle"];
    carsAttributeSet.thumbnailData = carsImgData;

    var activity = NSUserActivity.alloc().initWithActivityType("com.myCompany.services");
	activity.title = "Cars";
	activity.userInfo = {[ {"id": "carsID"} ]};
	activity.contentAttributeSet = carsAttributeSet;
	activity.eligibleForSearch = true;
	activity.eligibleForPublicIndexing = true;
	activity.becomeCurrent();
}
exports.pageLoaded = pageLoaded;
