var application = require("application");
var imageSourceModule = require("image-source");

application.mainModule = "main-page";
application.cssFile = "./app.css";

application.addEventListener(application.launchEvent, function(options) {
	
    console.log("Defining CoreSpotlight items");

    var hotelsImg = imageSourceModule.fromResource("hotels").ios;
    var hotelsData = UIImagePNGRepresentation(hotelsImg);
    var hotelsImgData = NSData.dataWithData(hotelsData);

    var carsImg = imageSourceModule.fromResource("cars").ios;
    var carsData = UIImagePNGRepresentation(carsImg);
    var carsImgData = NSData.dataWithData(carsData);

    var defaultSearchableIndex = CSSearchableIndex.defaultSearchableIndex();

	var hotelsAttributeSet = CSSearchableItemAttributeSet.alloc().initWithItemContentType(kUTTypeItem);

    // Set properties that describe attributes of the item such as title, description, and image.
    hotelsAttributeSet.title = "Hotels";
    hotelsAttributeSet.contentDescription = "Book your room now!";
    hotelsAttributeSet.keywords = ["accommodation, hotel, book, checkin"];
    hotelsAttributeSet.thumbnailData = hotelsImgData;
    
    // Create a searchable item, specifying its ID, associated domain, and the attribute set you created earlier.
    var hotelsItem = CSSearchableItem.alloc().initWithUniqueIdentifierDomainIdentifierAttributeSet("hotelsID", "org.NativeScript.Deeplinking", hotelsAttributeSet);

    // Index the item.
    defaultSearchableIndex.indexSearchableItemsCompletionHandler([hotelsItem], function (error) {} );

    var carsAttributeSet = CSSearchableItemAttributeSet.alloc().initWithItemContentType(kUTTypeItem);

    // Set properties that describe attributes of the item such as title, description, and image.
    carsAttributeSet.title = "Cars";
    carsAttributeSet.contentDescription = "Just drive!";
    carsAttributeSet.keywords = ["rent-a-car, car, rent, vehicle"];
    carsAttributeSet.thumbnailData = carsImgData;
    
    // Create a searchable item, specifying its ID, associated domain, and the attribute set you created earlier.
    var carsItem = CSSearchableItem.alloc().initWithUniqueIdentifierDomainIdentifierAttributeSet("carsID", "org.NativeScript.Deeplinking", carsAttributeSet);

    // Index the item.
    defaultSearchableIndex.indexSearchableItemsCompletionHandler([carsItem], function (error) {} );
});

application.addEventListener("applicationContinueUserActivityRestorationHandler", function(args) {
	
    console.log("Restoring the app to navigate to a page");

    var userActivity = args.userActivity;

    if (userActivity.activityType == CSSearchableItemActionType) {
        var uniqueIdentifier = userActivity.userInfo.objectForKey(CSSearchableItemActivityIdentifier);
        
        var frameModule = require("ui/frame");
        var topMost = frameModule.topmost();

        if (uniqueIdentifier == "hotelsID") {
            var navigatedPage = {
                moduleName: "hotels-page",
            };
        }

        if (uniqueIdentifier == "carsID") {
            var navigatedPage = {
                moduleName: "cars-page",
            };
        }

        topMost.navigate(navigatedPage);

        return true;
    };
});

application.start();
