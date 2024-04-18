document.addEventListener("DOMContentLoaded", function() {
    const svg = d3.select("svg");
    const margin = {top: 20, right: 20, bottom: 30, left: 40};
    const width = +svg.attr("width") - margin.left - margin.right;
    const height = +svg.attr("height") - margin.top - margin.bottom;
    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    const data = [
        {name: "A", value: 30},
        {name: "B", value: 80},
        {name: "C", value: 45},
        {name: "D", value: 60},
        {name: "E", value: 40},
        {name: "F", value: 65}
    ];

    const x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
    const y = d3.scaleLinear().rangeRound([height, 0]);

    x.domain(data.map(d => d.name));
    y.domain([0, d3.max(data, d => d.value)]);

    g.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

    g.append("g")
        .call(d3.axisLeft(y).ticks(10))
        .append("text")
        .attr("fill", "#000")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Value");

    g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.name))
        .attr("y", d => y(d.value))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d.value))
        .on("mouseover", function(event, d) {
            d3.select(this).attr("fill", "red");
        })
        .on("mouseout", function(event, d) {
            d3.select(this).attr("fill", "steelblue");
        });

    // Initial bar color
    g.selectAll(".bar").attr("fill", "steelblue");
});
