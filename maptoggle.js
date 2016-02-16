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

        // points
        aa = [-122.53, 48.19];
        
        var airportLocations = [];
        d3.json("coordinates", function(error, airportsCoordinates) {
            airportLocations = airportsCoordinates;
        })

        // console.log(projection(aa),projection(bb));

        // add states from topojson
        svg.selectAll("path")
        .data(states).enter()
        .append("path")
        .attr("class", "feature")
        .style("fill", "steelblue")
        .attr("d", path);

        // put boarder around states 
        svg.append("path")
        .datum(topojson.mesh(topo, topo.objects.states, function(a, b) { return a !== b; }))
        .attr("class", "mesh")
        .attr("d", path);



        // add circles to svg, data from coordinates.json
        svg.selectAll("circle")
            .data(airportLocations).enter()
            .append("circle")
            .attr("cx", function (d) { console.log("cx is " + projection(d)[0]); return projection(d)[0]; })
            .attr("cy", function (d) { return projection(d)[1]; })
            .attr("r", "8px")
            .attr("fill", "red")

    });

}