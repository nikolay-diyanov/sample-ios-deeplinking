var application = require("application");
var imageSourceModule = require("image-source");
var modelModule = require("./hotels-view-model");
var model = modelModule.hotelsModel;

application.mainModule = "main-page";
application.cssFile = "./app.css";

application.addEventListener("applicationContinueUserActivityRestorationHandler", function(args) {
	
    console.log("Restoring the app to navigate to a page");

    var userActivity = args.userActivity;

    var frameModule = require("ui/frame");
    var topMost = frameModule.topmost();

    if (userActivity.activityType == "com.myCompany.services") {
        if (userActivity.userInfo.objectForKey("id") == "hotelsID")
        {
            topMost.navigate({ 
                moduleName: "hotels-page"
            });
        }
        else if (userActivity.userInfo.objectForKey("id") == "carsID")
        {
            topMost.navigate({ 
                moduleName: "cars-page"
            });
        }
    }

    if (userActivity.activityType == CSSearchableItemActionType) {

        var uniqueIdentifier = userActivity.userInfo.objectForKey(CSSearchableItemActivityIdentifier);
        
        for (i = 0; i<model.hotels.length;i++)
        {
            if (uniqueIdentifier == model.hotels.getItem(i).id)
            {
                topMost.navigate({
                    moduleName: "details-page",
                    context: model.hotels.getItem(i)
                });
            }
        }
    };

    return true;
});

application.start();
