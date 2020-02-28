// dropins/widgets/gmaps.js
$.widget("sv.gmaps_map", $.sv.widget, {
    initSelector: 'div[data-widget="gmaps_map"]',

    options: {
        'traffic': null,
    },

    _create: function () {
        this._super();
        this._create_map();
    },

    _create_map: function () {
        try {
            this.map = new google.maps.Map(this.element[0], {
                zoom: 11,
                disableDefaultUI: false,
                clickableIcons: false,
                mapTypeControl: false,
                streetViewControl: false
            });
        }
        catch (e) {
            if (e.name == "ReferenceError") { // google maps script not loaded yet
                var that = this;
                // google maps script is already loading in another widget
                if (window.google_maps_loading) {
                    window.setTimeout(function () {
                        that._create_map()
                    }, 100)
                    return;
                }
                // google maps script is not loading
                window.google_maps_loading = true;
                $.ajax({
                    url: 'https://maps.googleapis.com/maps/api/js?key=<your_api_key>',
                    dataType: "script",
                    complete: function () {
                        window.google_maps_loading = false;
                        that._create_map()
                    }
                });
                return;
            }
            else  // other exceptions should be thrown
                throw e;
        }

        this.directionsService = new google.maps.DirectionsService;
        this.directionsDisplay = new google.maps.DirectionsRenderer();
        this.directionsDisplay.setMap(this.map);

        if (this.options['traffic']) {
            var trafficLayer = new google.maps.TrafficLayer();
            trafficLayer.setMap(this.map);
        }

        var pinColorGreen = "20d24a";
        var pinImageGreen = new google.maps.MarkerImage("https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColorGreen,
            new google.maps.Size(21, 34),
            new google.maps.Point(0,0),
            new google.maps.Point(10, 34));
        var pinImageMyself = new google.maps.MarkerImage("<path_to_your_pic>" ,
            null, null, null, new google.maps.Size(40, 40));
        var pinShadow = new google.maps.MarkerImage("https://chart.apis.google.com/chart?chst=d_map_pin_shadow",
            new google.maps.Size(40, 37),
            new google.maps.Point(0, 0),
            new google.maps.Point(12, 35));

        this.marker_home = new google.maps.Marker({
            map: this.map,
            icon: pinImageGreen,
            shadow: pinShadow,
            title:' Home '
        });

        this.marker_myself = new google.maps.Marker({
            map: this.map,
            icon: pinImageMyself,
            title:' René',
            zIndex:99999999
        });
    },

    _update: function(response) {
        if(!this.map) {
            var that = this;
            window.setTimeout(function() { that._update(response) }, 100)
            return;
        }

        this.map.setCenter({lat: response[0], lng: response[1]});
        var pos = new google.maps.LatLng(parseFloat(response[0]),parseFloat(response[1]));
        this.marker_myself.setPosition(pos);
        if (response[2] && response[3]) {
            var pos_home = new google.maps.LatLng(parseFloat(response[2]), parseFloat(response[3]));
            this.marker_home.setPosition(pos_home);

            if (response[6] && response[7] && (response[4] == 1 || response[5] == 1)) {
                if (response[4] == 1) {
                    var destination = {lat: parseFloat(response[2]), lng: parseFloat(response[3])};
                } else if (response[5] == 1) {
                    var destination = {lat: parseFloat(response[6]), lng: parseFloat(response[7])};
                }
                ;
                var directionsDisplay = this.directionsDisplay;
                this.directionsDisplay.setMap(this.map);
                this.directionsService.route({
                    origin: pos,
                    //provideRouteAlternatives: true,
                    destination: destination,
                    travelMode: google.maps.TravelMode.DRIVING
                }, function (result, status) {
                    if (status === google.maps.DirectionsStatus.OK) {
                        directionsDisplay.setDirections(result);
                    } else {
                        console.log('Directions request failed due to ' + status);
                    }
                });
            } else {
                if (this.directionsDisplay != null) {
                    this.directionsDisplay.setMap(null);
                }
            }
        }
    }
});

$.widget("sv.gmaps_simplemap", $.sv.widget, {
    initSelector: 'div[data-widget="gmaps_simplemap"]',

    _create: function () {
        this._super();
        this._create_map();
    },

    _create_map: function () {
        try {
            this.map = new google.maps.Map(this.element[0], {
                zoom: 11,
                disableDefaultUI: false,
                clickableIcons: false,
                mapTypeControl: false,
                streetViewControl: false
            });
        }
        catch (e) {
            if (e.name == "ReferenceError") { // google maps script not loaded yet
                var that = this;
                // google maps script is already loading in another widget
                if (window.google_maps_loading) {
                    window.setTimeout(function () {
                        that._create_map()
                    }, 100)
                    return;
                }
                // google maps script is not loading
                window.google_maps_loading = true;
                $.ajax({
                    url: 'https://maps.googleapis.com/maps/api/js?key=<your_api_key>',
                    dataType: "script",
                    complete: function () {
                        window.google_maps_loading = false;
                        that._create_map()
                    }
                });
                return;
            }
            else  // other exceptions should be thrown
                throw e;
        }

        var pinColorGreen = "20d24a";
        var pinImageGreen = new google.maps.MarkerImage("https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColorGreen,
            new google.maps.Size(21, 34),
            new google.maps.Point(0,0),
            new google.maps.Point(10, 34));
        this.marker_myself = new google.maps.Marker({
            map: this.map,
            icon: pinImageGreen,
            title:' <Mein Name>',
            zIndex:99999999
        });
    },

    _update: function(response) {
        if(!this.map) {
            var that = this;
            window.setTimeout(function() { that._update(response) }, 100)
            return;
        }

        this.map.setCenter({lat: response[0], lng: response[1]});
        var pos = new google.maps.LatLng(parseFloat(response[0]),parseFloat(response[1]));
        this.marker_myself.setPosition(pos);
    }
});