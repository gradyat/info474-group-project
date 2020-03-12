const m = {
    width: 800,
    height: 600
}

const svg = d3.select("article").append('svg')
    .attr('width', m.width)
    .attr('height', m.height)

const g = svg.append('g')

const pointSizeScalePow = d3.scalePow()
    .exponent(0.15)
    .domain([40, 1945804])
    .range([1.5, 30])

// make tooltip
let div = d3.select("article").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

function numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}  

d3.json('data/chinageo.json').then(function (data) {

    d3.json('data/china-confirmed-cases-for-map.json').then(function (pointData) {

        const albersProj = d3.geoAlbers()
            .scale(850)
            .rotate([-103.23, 0])
            .center([0, 35.33])
            .translate([m.width / 2, m.height / 2]);

        const geoPath = d3.geoPath()
            .projection(albersProj)

        g.selectAll('path')
            .data(data.features)
            .enter()
            .append('path')
            .attr('opacity', 0)
            .attr('fill', '#ccc')
            .attr('d', geoPath)
            .transition()
            .duration(1000)
            .attr('opacity', 1)

        var dots = g.selectAll('.circle')
            .data(pointData)
            .enter()
            .append('circle')
            .attr('cx', function (d) {
                let scaledPoints = albersProj([d['Long'], d['Lat']])
                return scaledPoints[0]
            })
            .attr('cy', function (d) {
                let scaledPoints = albersProj([d['Long'], d['Lat']])
                return scaledPoints[1]
            })
            .attr('opacity', 0)
            .attr('r', function (d) { return pointSizeScalePow(d['Total']) })
            .attr('stroke', '#999')
            .attr('stroke-width', '0.25')
            .attr('fill', 'steelblue')

        dots.transition()
            .delay(1000)
            .duration(2000)
            .attr('opacity', 1)

        dots.on('mouseover', function(d, i){
            div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div.html(d["Province/State"] + "<br/> Total Cases: " + numberWithCommas(d["Total"]))
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on('mouseout', function(d, i){
                div.transition()
                .duration(500)
                .style("opacity", 0);
            })
        })
            
            // .attr('opacity', 1)
            // .on("mouseover", function () {
                // d3.select(this)
                //     .attr("opacity", 1)
                //     .transition()
                //     .duration(2000)
                //     .attr("cx", Math.round(Math.random()))
                //     .attr("cy", Math.round(Math.random()))
                //     .attr('r', 25)
                //     .attr('fill', 'red')
                //     .attr("opacity", 0)
                //     .on("end", function () {
                //         d3.select(this).remove();
                //     })
            // });
            // .on("mouseover", (d) => {
            //     div.transition()
            //         .duration(200)
            //         .style("opacity", .9);
            //     div.html(d["Province/State"] + "<br/> Total Cases: " + numberWithCommas(d["Total"]))
            //         .style("left", (d3.event.pageX) + "px")
            //         .style("top", (d3.event.pageY - 28) + "px");
            // })
            // .on("mouseout", (d) => {
            //     div.transition()
            //         .duration(500)
            //         .style("opacity", 0);
            // });

    // })

})
