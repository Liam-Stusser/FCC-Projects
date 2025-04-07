const width = 1000;
const height = 850;
const lWidth = 450;
const lHeight = 150;

const svg = d3
  .select("#tree-map")
  .attr("width", width)
  .attr("height", height)
  .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;");

const legend = d3
  .select("#legend")
  .attr("width", lWidth)
  .attr("height", lHeight);

const gameSalesUrl =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json";

const customColors = [
  "#4E79A7",
  "#F28E2B",
  "#E15759",
  "#76B7B2",
  "#59A14F",
  "#EDC948",
  "#B07AA1",
  "#FF9DA7",
  "#9C755F",
  "#BAB0AC",
  "#1F77B4",
  "#FF7F0E",
  "#2CA02C",
  "#D62728",
  "#9467BD",
  "#8C564B",
  "#E377C2",
  "#7F7F7F"
];

d3.json(gameSalesUrl)
  .then((data) => {
    const platforms = new Set(data.children.map((d) => d.name));
    drawTree(data, platforms);
  })
  .catch((error) => {
    console.error("Error loading data:", error);
  });

const drawTree = (data, platforms) => {
  const color = d3.scaleOrdinal([...platforms], customColors);

  const root = d3
    .hierarchy(data)
    .sum((d) => d.value)
    .sort((a, b) => b.value - a.value);

  d3
    .treemap()
    .tile(d3.treemapSquarify)
    .size([width, height])
    .padding(1)
    .round(false)(root);

  const leaf = svg
    .selectAll("g")
    .data(root.leaves())
    .enter()
    .append("g")
    .attr("transform", (d) => `translate(${d.x0},${d.y0})`);

  leaf
    .append("rect")
    .attr("class", "tile")
    .attr("data-name", (d) => d.data.name)
    .attr("data-category", (d) => d.data.category)
    .attr("data-value", (d) => d.data.value)
    .attr("fill", (d) => {
      let node = d;
      while (node.depth > 1) node = node.parent;
      return color(node.data.name);
    })
    .attr("width", (d) => d.x1 - d.x0)
    .attr("height", (d) => d.y1 - d.y0)
    .on("mouseover", function (event, d) {
      const tooltip = d3.select("#tooltip");
      tooltip
        .style("visibility", "visible")
        .attr("data-value", d.data.value)
        .html(
          `<strong>${d.data.name}</strong><br>Category: ${d.data.category}<br>Value: ${d.data.value}`
        )
        .style("left", event.pageX + 10 + "px")
        .style("top", event.pageY - 20 + "px");
    })
    .on("mouseout", function () {
      d3.select("#tooltip").style("visibility", "hidden");
    });

  leaf
    .append("text")
    .selectAll("tspan")
    .data((d) => d.data.name.split(/(?=[A-Z][a-z])|\s+/g))
    .enter()
    .append("tspan")
    .attr("x", 4)
    .attr("y", (d, i) => 13 + i * 10)
    .text((d) => d);

  legend
    .selectAll("g")
    .data([...platforms])
    .enter()
    .append("g")
    .attr("transform", (d, i) => {
      const col = Math.floor(i / 6);
      const row = i % 6; 
      const x = col * 140;
      const y = row * 25;
      return `translate(${x},${y})`;
    })
    .each(function (d) {
    const g = d3.select(this);
    
    g.append("rect")
      .attr("width", 15)
      .attr("height", 15)
      .attr("fill", color(d))
      .attr('class', 'legend-item')
    
    g.append("text")
      .attr("x", 20)
      .attr("y", 13)
      .text(d)
      .attr("class", "legend-text")
      .attr('fill', 'white');
  });
};