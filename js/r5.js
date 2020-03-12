data = {
  RECORDS: [
    {
      genre: "Action",
      count: "64"
    },
    {
      genre: "Animation",
      count: "66"
    },
    {
      genre: "Children",
      count: "60"
    },
    {
      genre: "Classics",
      count: "57"
    },
    {
      genre: "Comedy",
      count: "58"
    },
    {
      genre: "Documentary",
      count: "68"
    },
    {
      genre: "Drama",
      count: "62"
    },
    {
      genre: "Family",
      count: "69"
    },
    {
      genre: "Foreign",
      count: "73"
    },
    {
      genre: "Games",
      count: "61"
    },
    {
      genre: "Horror",
      count: "56"
    },
    {
      genre: "Music",
      count: "51"
    },
    {
      genre: "New",
      count: "63"
    },
    {
      genre: "Sci-Fi",
      count: "61"
    },
    {
      genre: "Sports",
      count: "74"
    },
    {
      genre: "Travel",
      count: "57"
    }
  ]
};

data2 = {
  RECORDS1: [
    { date: "1/25/20", num: 50 },
    { date: "2/10/20", num: 500 },
    { date: "2/25/20", num: 700 },
    { date: "3/9/20", num: 200 }
  ]

  //   RECORDS2: [
  //     { date: "1/25/20", num: area[dates[1]] },
  //     { date: "2/10/20", num: area[dates[2]] },
  //     { date: "2/25/20", num: area[dates[3]] },
  //     { date: "3/09/20", num: area[dates[4]] }
  //   ]
};

// set the dimensions of the canvas
var margin = { top: 20, right: 20, bottom: 70, left: 40 },
  width = 600 - margin.left - margin.right,
  height = 300 - margin.top - margin.bottom;

// add the SVG element
var svg = d3
  .select("body")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

const x = d3
    .scaleBand()
    .rangeRound([0, width])
    .padding(0.2),
  y = d3.scaleLinear().rangeRound([height, 0]),
  g = svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

data2 = data2.RECORDS1;

x.domain(data2.map(d => d.date));
y.domain([0, d3.max(data2, d => d.num)]);

g.append("g")
  .attr("class", "axis axis-x")
  .attr("transform", `translate(0,${height})`)
  .call(d3.axisBottom(x));

g.append("g")
  .attr("class", "axis axis-y")
  .call(d3.axisLeft(y).ticks(10));

g.selectAll(".bar")
  .data(data2)
  .enter()
  .append("rect")
  .attr("class", "bar")
  .attr("x", d => x(d.date))
  .attr("y", d => {
    if (d.num.isNaN) {
      return 0;
    }
    return y(d.num);
  })
  .attr("width", x.bandwidth())
  .attr("height", d => height - y(d.num));
