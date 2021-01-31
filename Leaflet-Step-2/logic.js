// get the query URL

// All Earthquake summary feed of past day 
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"

//creating map object
var myMap = L.map("map", {
    center: [45.10, -122.75],
    zoom: 5
});


L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
}).addTo(myMap);


function color(magnitude) {
    switch (true) {
        case magnitude > 5:
            return "#ea2c2c";
        case magnitude > 4:
            return "#ea822c";
        case magnitude > 3:
            return "#ee9c00";
        case magnitude > 2:
            return "#eecc00";
        case magnitude > 1:
            return "#d4ee00";
        default:
            return "#98ee00";
    }
}

function radius(magnitude) {
    if (magnitude === 0) {
        return 1;
    }
    return magnitude * 4;
}


d3.json(queryUrl, function (error, data) {
    // var features = data.features;
    console.log(data);



    L.geoJson(data, {

        // circle style
        style: function(feature) {
            return {
                opacity: 1,
                fillOpacity: 1,
                fillColor: color(feature.properties.mag),
                color: "red",
                radius: radius(feature.properties.mag),
                stroke: true,
                weight: 0.5
            };
        },

        // Maken cricles
        pointToLayer: function (feature, latlng) {
            return L.circleMarker([feature.geometry.coordinates[1],feature.geometry.coordinates[0]]);
        },


        // popup for each marker

        onEachFeature: function (feature, layer) {
            layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place+"<br>Time:"+new Date(feature.properties.time));
        },

    

    }).addTo(myMap);

    // creating legend

    var legend= L.control({position:"bottomright"});

    legend.onAdd=function(){
        var div = L.DomUtil.create("div", "info legend");
        var grades=[0,1,2,3,4,5];
        var colors =["#98ee00","#d4ee00","#eecc00","#ee9c00","#ea822c","#ea2c2c"];

        for (var i=0; i < grades.length; i++ ){
            div.innerHTML +=
            '<i style="background:' + color(grades[i]+1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');

            // div.innerHTML +=
            // '<i style="background:' + color(i) + '"></i> ' +
            // grades[i]+ '<br>';

        }
        return div;
    };
    legend.addTo(myMap);
});