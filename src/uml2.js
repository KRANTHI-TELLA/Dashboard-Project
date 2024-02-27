import React from 'react';
import * as d3 from 'd3'; // Import D3 library

export class pie_chart extends React.Component {
    constructor(labels, data_points) {
        super();
        this.labels = labels;
        this.data_points = data_points;
    }

    create_settings() {
        // D3.js code to create a pie chart
        const width = 400;
        const height = 400;
        const radius = Math.min(width, height) / 2;

        const color = d3.scaleOrdinal()
            .range(['#ba7e7e', '#C2FFFF', '#8672AF', '#54bed8', '#d4d854', '#54d889', '#FFFF00', '#2BFF00', '#D400FF', '#FF4F4F', '#4FFF8A', '#9CB909', '#00099C', '#FF4500', '#FFD700', '#FF69B4', '#00FFFF', '#FF4500', '#FFD700', '#FF69B4', '#00FFFF', '#728FCE', '#8FCF72', '#CF728F']);

        const arc = d3.arc()
            .outerRadius(radius - 10)
            .innerRadius(0);

        const labelArc = d3.arc()
            .outerRadius(radius - 40)
            .innerRadius(radius - 40);

        const pie = d3.pie()
            .sort(null)
            .value(d => d);

        const svg = d3.select(this.area)
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        const data = this.data_points;
        const g = svg.selectAll(".arc")
            .data(pie(data))
            .enter().append("g")
            .attr("class", "arc");

        g.append("path")
            .attr("d", arc)
            .style("fill", (d, i) => color(i));

        g.append("text")
            .attr("transform", d => "translate(" + labelArc.centroid(d) + ")")
            .attr("dy", ".35em")
            .text(d => d.data);

        console.log(this.labels);
        console.log(this.data_points);
    }

    render() {
        this.create_settings();
        return <div ref={node => (this.area = node)}></div>;
    }
}
