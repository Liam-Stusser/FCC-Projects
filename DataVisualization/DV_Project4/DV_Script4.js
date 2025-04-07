const educationDataUrl = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json";
const countyDataUrl = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json";

let countyData;
let educationData;

const width = 960;
const height = 600;

const svg = d3.select("#choropleth-map")
    .attr("width", width)
    .attr("height", height);

let drawMap = () => {

    svg.selectAll('path')
    .data(countyData)
    .enter()
    .append('path')
    .attr('d', d3.geoPath())
    .attr('class', 'county')
    .attr('fill', (countyDataItem) => {
        let id = countyDataItem['id'];
        let county = educationData.find(item => {
            return item['fips'] === id
        });
        let percentage = county['bachelorsOrHigher'];
        if(percentage <= 12){
            return '#8B0000'
        }
        else if(percentage <= 21){
            return '#B22222'
        }
        else if(percentage <= 30){
            return '#DC143C'
        }
        else if(percentage <= 39){
            return '#4682B4'
        }
        else if(percentage <= 48){
            return '#1E3A8A'
        }
        else if (percentage <= 57){
            return '#A9A9A9'
        }else{
            return '#5A5A5A'
        }
    })
    .attr('stroke-width', 0.4)
    .attr('data-fips', (d => d['id']))
    .attr('data-education', countyDataItem => {
        let id = countyDataItem['id'];
        let county = educationData.find(item => {
            return item['fips'] === id
        });
        let percentage = county['bachelorsOrHigher'];
        return percentage;
    })
    .on('mouseover', function (event, countyDataItem) {
        const tooltip = d3.select("#tooltip");
        let id = countyDataItem['id'];
        let county = educationData.find(item => {
            return item['fips'] === id
        });
        tooltip
          .style("visibility", "visible")
          .html(`${county['area_name']}(${county['state']})<br></br>County Code:${county['fips']}<br></br>Bachelors degree:${county['bachelorsOrHigher']}%`)
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 10 + "px")
          .attr('data-education', county['bachelorsOrHigher']);
    })
    .on("mouseout", function () {
        d3.select("#tooltip").style("visibility", "hidden");
      });
}

const drawLegend = () => {

    const legendWidth = 200;  
    const legendHeight = 10; 
    const axisHeight = 25;  

    const legendColors = [
        { color: '#8B0000', label: 3 },
        { color: '#B22222', label: 12 },
        { color: '#DC143C', label: 21 },
        { color: '#4682B4', label: 30 },
        { color: '#1E3A8A', label: 39 },
        { color: '#A9A9A9', label: 48 },
        { color: '#5A5A5A', label: 57 }
    ]; 

    const legendLabels = [3, 12, 21, 30, 39, 48, 57, 66]; 

    const legendScale = d3.scaleLinear()
        .domain([3, 66]) 
        .range([0, legendWidth]);

    const legendSvg = d3.select("#legend")
        .attr("width", legendWidth + 40)  
        .attr("height", legendHeight + axisHeight);

    legendSvg.selectAll("rect")
        .data(legendColors)
        .enter()
        .append("rect")
        .attr("x", (d, i) => (legendWidth / legendColors.length) * i) 
        .attr("y", 0)
        .attr("width", legendWidth / legendColors.length)  
        .attr("height", legendHeight)
        .attr("fill", d => d.color)
        .attr("stroke", "white");

    const legendAxis = d3.axisBottom(legendScale)
        .tickValues(legendLabels)  
        .tickFormat(d => d + "%") 
        .tickSize(4)
        .tickPadding(5);

    legendSvg.append("g")
        .attr("transform", `translate(0, ${legendHeight})`) 
        .call(legendAxis)
        .selectAll("text")
        .style("fill", "white")  
        .style("font-size", "9px");

        legendSvg.selectAll(".domain, .tick line")
        .style("stroke", "white");

        legendSvg.selectAll(".tick text")
        .attr("dx", (d, i) => (i === 0 ? "8px" : "0"));  
};

d3.json(countyDataUrl).then(
    (data,error) => {
        if(error){
            console.log(log)
        }else {
            countyData = topojson.feature(data, data.objects.counties).features;
            console.log(countyData);

            d3.json(educationDataUrl).then(
                (data,error) => {
                    if(error){
                        console.log(error);
                    }else{
                        educationData = data;
                        drawMap();
                        drawLegend();
                        console.log(educationData);
                    }
                }
            )
        }
    }
)