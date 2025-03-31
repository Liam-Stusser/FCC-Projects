const width = 800;
const height = 400;
const margin = { top: 20, right: 30, bottom: 50, left: 60 };

const svg = d3
  .select('#graph')
  .attr('width', width)
  .attr('height', height);

async function display() {
  const response = await fetch("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json");
  const data = await response.json();
  console.log(data);
  data.forEach(d => {
    d.Time = new Date(`1945-12-03T00:${d.Time}Z`);
    d.Year = new Date(d.Year, 0, 1); 
  });

  const xScale = d3.scaleTime()
    .domain([d3.min(data, d => d.Year), d3.max(data, d => d.Year)])
    .range([margin.left, width - margin.right]);

  const yScale = d3.scaleTime()
    .domain([d3.max(data, d => d.Time), d3.min(data, d => d.Time)])
    .range([height - margin.bottom, margin.top]);

  svg.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('r', 5)
    .attr('cx', d => xScale(d.Year))
    .attr('cy', d => yScale(d.Time))
    .attr('data-xvalue', d => d.Year)
    .attr('data-yvalue', d => d.Time)
    .attr('fill', d => d.Doping ? 'blue':'orange')
    .attr('class', 'dot')
    .style('opacity', '75%')
    .on('mouseover', function(event, d) {
      const tooltip = d3.select('#tooltip');
      const year = new Date(d.Year).getFullYear();
      const timeFormatted = d3.timeFormat('%M:%S')(d.Time);
      const allegation = d.Doping ? `<br>${d.Doping}` : '';
      tooltip.style('visibility','visible')
        .html(`Year: ${year}<br>Name: ${d.Name}(${d.Nationality})<br>Time: ${timeFormatted}${allegation}`)
        .attr('data-year', year) 
        .style('left', event.pageX + 10 +'px')
        .style('top', event.pageY - 10 + 'px');
    })
    .on("mouseout", function () {
      d3.select("#tooltip").style("visibility", "hidden");
    });

  svg.append('g')
    .attr('id', 'y-axis')
    .attr('transform', `translate(${margin.left-6}, 0)`)
    .call(d3.axisLeft(yScale).tickFormat(d3.timeFormat('%M:%S')));

  svg.append('g')
    .attr('id', 'x-axis')
    .attr('transform', `translate(0, ${height - margin.bottom})`)
    .call(d3.axisBottom(xScale).tickFormat(d3.timeFormat('%Y'))); 
  
  svg.append('text')
    .attr('transform', 'rotate(-90)')  
    .attr('x', -(height / 2))          
    .attr('y', margin.left-42)           
    .style('text-anchor', 'middle')    
    .style('fill', 'white')            
    .style('font-size', '24px') 
    .text('Time in Minutes');
}

display();

