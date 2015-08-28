var frameModule = require("ui/frame");
var imageSourceModule = require("image-source");

var modelModule = require("./hotels-view-model");
var model = modelModule.hotelsModel;

function pageLoaded(args) {
	var page = args.object;
	page.bindingContext = model;

    frameModule.topmost().ios.navBarVisibility = "always";

    var page = args.object;
    page.ios.title = "Hotels";

    var hotelsImg = imageSourceModule.fromResource("hotels").ios;
    var hotelsData = UIImagePNGRepresentation(hotelsImg);
    var hotelsImgData = NSData.dataWithData(hotelsData);

	var hotelsAttributeSet = CSSearchableItemAttributeSet.alloc().initWithItemContentType(kUTTypeItem);
    hotelsAttributeSet.title = "Hotels";
    hotelsAttributeSet.contentDescription = "Book your room now!";
    hotelsAttributeSet.keywords = ["accommodation", "hotel", "book", "checkin"];
    hotelsAttributeSet.thumbnailData = hotelsImgData;

    var activity = NSUserActivity.alloc().initWithActivityType("com.myCompany.services");
	activity.title = "Hotels";
	activity.userInfo = { "id": "hotelsID" };
	activity.contentAttributeSet = hotelsAttributeSet;
	activity.eligibleForSearch = true;
	activity.eligibleForPublicIndexing = true;
	activity.becomeCurrent();
}

function listViewItemTap(args) {
    frameModule.topmost().navigate({
        moduleName: "details-page",
        context: model.hotels.getItem(args.index)
    });
}

function favButtonTap(args) {

    var hotelItem = args.object.bindingContext;

    var hotelImg = hotelItem.hotelImage.ios
    var hotelMidImgData = UIImagePNGRepresentation(hotelImg);
    var hotelImgData = NSData.dataWithData(hotelMidImgData);

    var defaultSearchableIndex = CSSearchableIndex.defaultSearchableIndex();

    var hotelAttributeSet = CSSearchableItemAttributeSet.alloc().initWithItemContentType(kUTTypeContact);

    // Set properties that describe attributes of the item such as title, description, and image.
    hotelAttributeSet.title = hotelItem.hotelText;
    hotelAttributeSet.contentDescription = hotelItem.hotelDescription + " Book your room now!";
    hotelAttributeSet.keywords = ["accommodation", "hotel", "book", "checkin", hotelItem.hotelText, hotelItem.hotelDescription];
    hotelAttributeSet.thumbnailData = hotelImgData;
    hotelAttributeSet.supportsPhoneCall = 1;
    hotelAttributeSet.phoneNumbers = [hotelItem.hotelPhoneNumber];
    
    // Create a searchable item, specifying its ID, associated domain, and the attribute set you created earlier.
    var hotelCSItem = CSSearchableItem.alloc().initWithUniqueIdentifierDomainIdentifierAttributeSet(hotelItem.id, "org.NativeScript.Deeplinking", hotelAttributeSet);

    // Index the item.
    defaultSearchableIndex.indexSearchableItemsCompletionHandler([hotelCSItem], function (error) {} );    
}

exports.listViewItemTap = listViewItemTap;
exports.pageLoaded = pageLoaded;
exports.favButtonTap = favButtonTap;