// get the query URL

var url="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"

//creating map object
var myMap = L.map("map", {
    center: [45.09, -122.71],
    zoom: 11
});


L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: API_KEY
    }).addTo(myMap);

function color(magnitude){
    switch(magnitude){
    case magnitude > 5:
        return "darkgreen";
    case magnitude > 4:
        return "lightgreen";
    case magnitude >3:
        return "green";
    case magnitude >2:
        return "lightred";
    case magnitude >1:
        return "lightpink";
    default:
        return "black";
    }
}
function radius(magnitude){
    if (magnitude === 0){
        return 1;
    }
    return magnitude *4 ;
}


d3.json(url, function (error, data){
    var features= data.features;
    console.log(data);
    // geoJson=L.geoJson(data,{
    //     style:function(feature){
    //         return{
    //             color:"black",
    //             fillColor:color(feature.properties.mag),
    //             fillOpacity:1,
    //             radius:radius(feature.properties.mag)
    //         }
    //     }
    // }).addTo(myMap);

//     //     //dept of each location
//     //     console.log(feature.geometry.coordinates[2]);
    features.forEach(function(feature){ 
        L.circle(features.geometry, {
            fillOpacity: 0.75,
            color: "white",
            fillColor: color(feature.properties.mag),
            radius:radius(feature.properties.mag)
        }) .addTo(myMap);
        })

//     // })
    // L.geoJson(data).addTo(myMap);

});