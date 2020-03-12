/* I used the following page as a boilerplate for the bar chart: https://bl.ocks.org/caravinden/d04238c4c9770020ff6867ee92c7dac1 */

(function() {
  let data = "";
  let orig_Data = "";
  let g = "";
  let tooltipSvg = "";
  let svg = "";
  let days = "";
  let shownDay = "1/22/20";
  let x = "";
  let y = "";

  window.onload = function() {
    (svg = d3.select("svg")),
      (margin = {
        top: 20,
        right: 20,
        bottom: 160,
        left: 50
      }),
      (width = +svg.attr("width") - margin.left - margin.right),
      (height = +svg.attr("height") - margin.top - margin.bottom),
      (g = svg
        .append("g")
        .attr(
          "transform",
          "translate(" + margin.left + "," + margin.top + ")"
        ));

    g = svg
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("./data/recoveries.csv").then(data => doStuff(data));
  };

  function doStuff(data) {
    let headerArray = d3.keys(data[0]);
    days = headerArray.slice(4);
    console.log(days);

    d3.select("#dayMenu")
      .append("select")
      .selectAll("option")
      .data(days)
      .enter()
      .append("option")
      .attr("value", function(d) {
        return d;
      })
      .html(function(d) {
        return d;
      });

    document.getElementById("dayMenu").addEventListener("change", function(d) {
      shownDay = d3.select(this).property("value");

      g.selectAll(".bar").attr("display", "none");
      plotStuff2(data);
    });

    plotStuff(data);
  }

  function plotStuff(data) {
    var parseTime = d3.timeParse("%d-%b-%y");

    x = d3
      .scaleBand()
      .rangeRound([0, width])
      .padding(0.1);

    y = d3.scaleLinear().rangeRound([height, 0]);

    x.domain(
      data.map(function(d) {
        return d["Province/State"];
      })
    );

    y.domain([
      0,
      d3.max(data, function(d) {
        return Number(d[shownDay]);
      })
    ]);

    g.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)");
    //   .attr("transform", "rotate(-90)");

    g.append("g")
      .call(d3.axisLeft(y))
      .append("text")
      .attr("fill", "#000")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Recoveries");

    g.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", function(d) {
        return x(d["Province/State"]);
      })
      .attr("y", function(d) {
        return y(Number(+d[shownDay]));
      })
      .attr("width", x.bandwidth())
      .attr("height", function(d) {
        return height - y(Number(+d[shownDay]));
      });
  }

  function plotStuff2(data) {
    var x = d3
      .scaleBand()
      .rangeRound([0, width])
      .padding(0.1);

    var y = d3.scaleLinear().rangeRound([height, 0]);

    x.domain(
      data.map(function(d) {
        return d["Province/State"];
      })
    );

    y.domain([
      0,
      d3.max(data, function(d) {
        return Number(d[shownDay]);
      })
    ]);

    g.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", function(d) {
        return x(d["Province/State"]);
      })
      .attr("y", function(d) {
        return y(Number(+d[shownDay]));
      })
      .attr("width", x.bandwidth())
      .attr("height", function(d) {
        return height - y(Number(+d[shownDay]));
      });
  }

  function filter() {
    d3.select("#dayMenu")
      .append("select")
      .selectAll("option")
      .data(days)
      .enter()
      .append("option")
      .attr("value", function(d) {
        return d;
      })
      .html(function(d) {
        return d;
      });

    document.getElementById("dayMenu").addEventListener("change", filterDays);
  }

  function filterDays() {
    let fil = document.getElementById("dayMenu").querySelector("select");
    let selected = fil.value;
  }

  function showThings() {
    var dayNum = this.options[this.selectedIndex].__data__;
    console.log(dayNum);
  }
})();
