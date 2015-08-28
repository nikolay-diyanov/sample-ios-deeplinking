var observable = require("data/observable");
var imageSourceModule = require("image-source");
var fileSystemModule = require("file-system");
var observableArrayModule = require("data/observable-array");
var enums = require("ui/enums");

var hotelsArray = new observableArrayModule.ObservableArray();
var directory = "/res/";

function imageFromSource(imageName) {
    return imageSourceModule.fromFile(fileSystemModule.path.join(__dirname, directory + imageName));
};
var item1 = {
    id: "ampl",
    hotelImage: imageFromSource("01.jpg"),
    hotelText: "Amsterdam Palace",
    hotelDescription: "A great place to stay in Amsterdam!",
    hotelPhoneNumber: "1234567890",
    isFavourite: false
};
var item2 = {
    id: "frkd",
    hotelImage: imageFromSource("02.jpg"),
    hotelText: "Frozen Kingdom",
    hotelDescription: "A great place to stay in Amsterdam!",
    hotelPhoneNumber: "1234567890",
    isFavourite: false
};
var item3 = {
    id: "gtss",
    hotelImage: imageFromSource("03.jpg"),
    hotelText: "Gothic Suites",
    hotelDescription: "For the old-timers!",
    hotelPhoneNumber: "1234567890",
    isFavourite: false
};
var item4 = {
    id: "teh",
    hotelImage: imageFromSource("04.jpg"),
    hotelText: "The Eye Hotel",
    hotelDescription: "A great view for you!",
    hotelPhoneNumber: "1234567890",
    isFavourite: false
};
var item5 = {
    id: "bb",
    hotelImage: imageFromSource("05.jpg"),
    hotelText: "Big Ben",
    hotelDescription: "In the very downtown of London",
    hotelPhoneNumber: "1234567890",
    isFavourite: false
};
var item6 = {
    id: "tgf",
    hotelImage: imageFromSource("06.jpg"),
    hotelText: "The Great Four",
    hotelDescription: "Experience our great service!",
    hotelPhoneNumber: "1234567890",
    isFavourite: false
};
var item7 = {
    id: "srbt",
    hotelImage: imageFromSource("07.jpg"),
    hotelText: "Sanremo Beauty",
    hotelDescription: "Like nothing else!",
    hotelPhoneNumber: "1234567890",
    isFavourite: false
};
var item8 = {
    id: "nplg",
    hotelImage: imageFromSource("08.jpg"),
    hotelText: "Nepal Lodges",
    hotelDescription: "For the thrillseekers!",
    hotelPhoneNumber: "1234567890",
    isFavourite: false
};
hotelsArray.push([item1, item2, item3, item4, item5, item6, item7, item8]);

var hotelsModel = new observable.Observable();

hotelsModel.set("message", "Add new photos");

var backendArray = new observableArrayModule.ObservableArray();

Object.defineProperty(hotelsModel, "hotels", {
    get: function () {
        return hotelsArray;
    },
    enumerable: true,
    configurable: true
});

hotelsModel.tapAction = function () {

};

exports.hotelsModel = hotelsModel;
