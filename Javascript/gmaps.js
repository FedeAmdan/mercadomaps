if (window.addEventListener) {
    window.addEventListener("load", initialize, false);
}
else if (window.attachEvent) {
    window.attachEvent("onload", initialize);
}
else {
    window["onload"] = initialize;
}

var map = undefined;
function initialize() {
    var mapOptions = {
        center: new google.maps.LatLng(-34.609, -58.446),
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDoubleClickZoom:true,
        mapTypeControl:false,
        streetViewControl:false,
        panControl:false

    };

     map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
}


