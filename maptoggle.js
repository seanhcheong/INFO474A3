function map() {
    var width = 750,
        height = 500;

    // set projection
    var projection = d3.geo.mercator();

    // create path variable
    var path = d3.geo.path()
        .projection(projection);


    d3.json("us.json", function(error, topo) { 
        states = topojson.feature(topo, topo.objects.states).features

        // set projection parameters
        projection
        .scale(4200)
        .center([-119, 47.5])

        // create svg variable
        var svg = d3.select("#map").append("svg")
                        .attr("width", width)
                        .attr("height", height);
       
        // var airportLocations = [];
        // d3.json("coordinates.json", function(error, airportsCoordinates) {
        //     airportLocations = airportsCoordinates.airp;
        //     console.log(airportsCoordinates);
        //     console.log(airportLocations);
        // })

        var airportPoints = [
            {
                "airport":"bellingham",
                "latitude": 48.7925,
                "longitude":-122.53
            },
            {  "airport" :"AJ Eisenberg",
                "latitude": 48.2516,
                "longitude": -122.67
            },
            {
                "airport":"Orcas Island",
                "latitude": 48.7080,
                "longitude": -122.91
            },
            {
                "airport":"Pangborn Memorial",
                "latitude": 47.3980,
                "longitude": -120.20
            }, 
            {   
                "airport":"Boeing Field",
                "latitude": 47.53,
                "longitude": -122.30
            }, 
            {
                "airport":"Sea tac",
                "latitude": 47.4488,
                "longitude": -122.30
            }, 
            {
                "airport":"Spokane International Airport",
                "latitude": 47.62,
                "longitude": -117.53
            }, 
            {
                "airport":"Tri-Cities Airport",
                "latitude": 46.2646,
                "longitude": -119.11
            }, 
            {
                "airport":"Yakima",
                "latitude": 46.5681,
                "longitude": -120.5442
            }, 
            {
                "airport":"Pullman",
                "latitude": 46.4438,
                "longitude": -117.0634
            },
            {
                "airport":"Olympia",
                "latitude": 46.5933,
                "longitude": -122.4940
            },
            {
                "airport":"Harvey Field",
                "latitude": 47.9082,
                "longitude": -122.1054
            },   
            {
                "airport":"Chehalis",
                "latitude": 46.4062,
                "longitude": -122.5896
            },
            {
                "airport":"Ocean Shores",
                "latitude": 46.5957,
                "longitude": -124.0832
            },
            {
                "airport":"Friday Harbor",
                "latitude": 48.5219,
                "longitude": -123.0244
            },
            {
                "airport":"Decatur",
                "latitude": 39.8344,
                "longitude": -88.8656
            },
            {
                "airport":"Decatur",
                "latitude": 46.0947,
                "longitude": -118.2889
            },
            {
                "airport":"McChord",
                "latitude": 47.0816,
                "longitude": -122.2835
            },
            {
                "airport":"Bowerman",
                "latitude": 46.9711,
                "longitude": -123.9367
            },
            {
                "airport":"Snohomish",
                "latitude": 47.9061,
                "longitude": -122.2814
            },
            {
                "airport":"Renton",
                "latitude": 47.4931,
                "longitude": -122.2158
            },
            {
                "airport":"Grant",
                "latitude": 47.1231,
                "longitude": -119.1909
            }       
        ]

        // console.log(projection(aa),projection(bb));

        // add states from topojson
        svg.selectAll("path")
        .data(states).enter()
        .append("path")
        .attr("class", "feature")
        .style("fill", "#cccccc")
        .attr("d", path);

        // put boarder around states 
        svg.append("path")
        .datum(topojson.mesh(topo, topo.objects.states, function(a, b) { 
            return a !== b; }))
        .attr("class", "mesh")
        .attr("d", path);



        // add circles to svg, data from coordinates.json
        svg.selectAll("circle")
            .data(airportPoints).enter()
            .append("circle")
            .attr("cx", function (d, i) { 
                return projection([d.longitude, d.latitude])[0]; })
            .attr("cy", function (d) { 
                return projection([d.longitude, d.latitude])[1]; })
            .attr("r", "8px")
            .attr("fill", "#0099cc")
            .style("opacity", 0.4)

    });

}