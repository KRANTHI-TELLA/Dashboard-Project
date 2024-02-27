import * as d3 from 'd3'; // Import d3 library

export class pie_chart {
  constructor(data, colors, elementId) {
    this.data = data;
    this.colors = colors;
    this.elementId = elementId;
    this.createPieChart();
  }

  createPieChart() {
    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2;

    const color = d3.scaleOrdinal().range(this.colors);

    const svg = d3
      .select(`#${this.elementId}`)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    const pie = d3.pie().value(d => d);

    const arcs = svg.selectAll('arc').data(pie(this.data)).enter().append('g').attr('class', 'arc');

    arcs
      .append('path')
      .attr('fill', (d, i) => color(i))
      .attr('d', arc);

    // Add labels
    arcs
      .append('text')
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .text(d => d.data);
  }
}
