const yAxis = d3.select("#y-axis");
const xAxis = d3.select("#x-axis");
const width = 800;
const height = 400;
const margin = { top: 20, right: 30, bottom: 50, left: 60 };

const svg = d3
  .select("#chart")
  .attr("width", width)
  .attr("height", height);

let dataArray = [];

async function fetchData() {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"
    );
    const data = await response.json();
    dataArray = data.data;
    drawChart();
  } catch (error) {
    console.error(error);
  }
}

function drawChart() {
  const yearsDate = dataArray.map(function (d) {
    return new Date(d[0]);
  });

  const xMax = new Date(d3.max(yearsDate));
  xMax.setMonth(xMax.getMonth() + 3);

  const xScale = d3
    .scaleTime()
    .domain([d3.min(yearsDate), xMax])
    .range([margin.left, width - margin.right]);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(dataArray.map((d) => d[1]))])
    .range([height - margin.bottom, margin.top]);

  const barWidth = (xScale(new Date(yearsDate[1])) - xScale(new Date(yearsDate[0]))) * 0.8;

  svg
    .selectAll("rect")
    .data(dataArray)
    .enter()
    .append("rect")
    .attr("x", (d) => xScale(new Date(d[0])))
    .attr("y", (d) => yScale(d[1]))
    .attr("width", barWidth)
    .attr("height", (d) => height - margin.bottom - yScale(d[1]))
    .attr("class", "bar")
    .attr("data-date", (d) => d[0]) 
    .attr("data-gdp", (d) => d[1])  
    .on('mouseover', function(event, d) {
      const tooltip = d3.select('#tooltip');
      tooltip.style('visibility','visible')
        .html(`Date: ${formatDate(d[0])}<br>Value: $${d[1]} Billion`)
        .attr('data-date', d[0]) 
        .style('left', event.pageX + 10 +'px')
        .style('top', event.pageY - 10 + 'px');
    })
    .on("mouseout", function () {
      d3.select("#tooltip").style("visibility", "hidden");
    });

  xAxis
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(xScale));

  yAxis
    .attr("transform", `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(yScale));

    function formatDate(dateString) {
        const year = dateString.substring(0, 4);  
        const month = dateString.substring(5, 7);
      
        let quarter;
        if (month === '01') {
          quarter = 'Q1';
        } else if (month === '04') {
          quarter = 'Q2';
        } else if (month === '07') {
          quarter = 'Q3';
        } else if (month === '10') {
          quarter = 'Q4';
        }
      
        return `${year} ${quarter}`;
      }
}

fetchData();