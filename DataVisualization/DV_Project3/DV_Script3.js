const width = 1000;
const height = 500;
const margin = { top: 20, right: 30, bottom: 50, left: 60 };

const svg = d3.select("#graph").attr("width", width).attr("height", height);
const svgLegend = d3.select('#legend').attr('width',300).attr('height',100);

async function heatMap() {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json"
    );
    
    const data = await response.json();
    const uniqueYears = [...new Set(data.monthlyVariance.map((d) => d.year))]; //Needed to create a Set to filter out the recurring same year from the data in the API
    const legendData = [2.8,3.9,5.0,6.1,7.2,8.3,9.5,10.6,11.7,12.8];
    
    data.monthlyVariance.forEach((d) => {
      d.year = new Date(d.year, 0, 1);
      d.month = d.month - 1;
    });
    
//Heat Map
    const xScale = d3
      .scaleTime()
      .domain([
        d3.min(data.monthlyVariance, (d) => d.year),
        d3.max(data.monthlyVariance, (d) => d.year)
      ])
      .range([margin.left, width - margin.right]);

    const yScale = d3
      .scaleBand()
      .domain(d3.range(11, -1, -1)) 
      .range([margin.top, height - margin.bottom]) 
      .padding(0.05);

    const colorScale = (temp) => { //Made this before my legend data set so yes its just a big else-if block, and I'm too tired to change it.
      temp = Number(((8.66 + temp) * 10) / 10).toFixed(1);
      if (temp <= 2.8) {
        return "rgb(100, 100, 255)"; // Dark Blue
      } else if (temp <= 3.9) {
        return "rgb(135, 165, 255)"; // Blue
      } else if (temp <= 5.0) {
        return "rgb(173, 216, 230)"; // Light Blue
      } else if (temp <= 6.1) {
        return "rgb(220, 220, 220)"; // White/Grayish
      } else if (temp <= 7.2) {
        return "rgb(255, 255, 153)"; // Yellowish
      } else if (temp <= 8.3) {
        return "rgb(255, 204, 153)"; // Light Orange
      } else if (temp <= 9.5) {
        return "rgb(255, 179, 102)"; // Orange
      } else if (temp <= 10.6) {
        return "rgb(255, 140, 0)"; // Dark Orange
      } else if (temp <= 11.7) {
        return "rgb(255, 127, 127)"; // Red
      } else {
        return "rgb(157, 11, 11)"; 
      }
    };

    svg
      .selectAll("rect")
      .data(data.monthlyVariance)
      .enter()
      .append("rect")
      .attr('class','cell')
      .attr("x", (d) => xScale(d.year))
      .attr("y", (d) => yScale(d.month))
      .attr("width", (width - margin.left - margin.right) / uniqueYears.length)
      .attr("height", yScale.bandwidth())
      .attr("fill", (d) => colorScale(d.variance))
      .on('mouseover', function(event, d) {
        const year = d.year.getFullYear(); 
        const month = d3.timeFormat("%b")(new Date(0, d.month)); 
        const temperature = (8.66 + d.variance).toFixed(1); 
        const variance = d.variance.toFixed(1); 
        const tooltip = d3.select("#tooltip");
        tooltip
          .style("visibility", "visible")
          .html(`${year} - ${month}<br>${temperature}°C<br>${variance}°C`)
          .attr("data-year", year)
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 10 + "px");
    
        d3.select(this)
          .attr("stroke", "black")
          .attr("stroke-width", 2);
      })
      .on("mouseout", function () {
        d3.select("#tooltip").style("visibility", "hidden");
    
        d3.select(this)
          .attr("stroke", "none");
      });

    svg
      .append("g")
      .attr("id", "y-axis")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(
        d3
          .axisLeft(yScale)
          .tickFormat((d) => d3.timeFormat("%B")(new Date(0, d)))
      );

    svg
      .append("g")
      .attr("id", "x-axis")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(
        d3
          .axisBottom(xScale)
          .ticks(d3.timeYear.every(10))
          .tickFormat(d3.timeFormat("%Y"))
      );
    
//Legend
const legendBreakpoints = legendData; //Listen I've been up for awhile doing this, and this just works okay
const legendColorScale = d3.scaleThreshold()
  .domain(legendBreakpoints.slice(1))  
  .range([
    "rgb(100, 100, 255)",  // Dark Blue (2.8)
    "rgb(135, 165, 255)",  // Blue (3.9)
    "rgb(173, 216, 230)",  // Light Blue (5.0)
    "rgb(220, 220, 220)",  // White/Grayish (6.1)
    "rgb(255, 255, 153)",  // Yellowish (7.2)
    "rgb(255, 204, 153)",  // Light Orange (8.3)
    "rgb(255, 179, 102)",  // Orange (9.5)
    "rgb(255, 140, 0)",    // Dark Orange (10.6)
    "rgb(255, 127, 127)",  // Red (11.7)
    "rgb(157, 11, 11)"     // Dark Red (Max)
  ]);

const legendScaleX = d3.scaleLinear()
  .domain([d3.min(legendBreakpoints), d3.max(legendBreakpoints)]) 
  .range([7, 250]);

const rectWidth = (250 - 7) / legendBreakpoints.length;  

svgLegend.selectAll('rect')
  .data(legendBreakpoints)
  .enter()
  .append('rect')
  .attr('x', (d, i) => 7 + i * rectWidth)  
  .attr('y', 0)
  .attr('width', rectWidth)  
  .attr('height', 20)
  .attr("fill", d => legendColorScale(d));

svgLegend.append('g')
  .attr("transform", 'translate(0, 20)') 
  .call(
    d3.axisBottom(legendScaleX)
      .tickValues(legendBreakpoints) 
      .tickFormat(d3.format(".1f"))  
  );
    
  } catch (error) {
    console.error(error);
  }
}

heatMap();
