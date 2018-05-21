import {Component, ElementRef, Inject, Input, OnInit, Optional, ViewChild, ViewRef} from '@angular/core';
import * as d3 from 'd3';
import {RadarService} from "../radar-chart/radar.service";
import {MAT_DIALOG_DATA} from "@angular/material";

@Component({
  selector: 'pharos-spider-chart',
  templateUrl: './spider-chart.component.html',
  styleUrls: ['./spider-chart.component.css']
})
export class SpiderChartComponent implements OnInit {
  @Input() id : any;
  @Input() data? : any;
  @Input() options?: any;
  @Input() size?: string;
  @ViewChild('spiderChart') chartContainer: ElementRef;
  height: number;
  width: number;
  radius: number;
  constructor(
    private radarDataService: RadarService,
    @Optional() @Inject(MAT_DIALOG_DATA) public modalData: any
  ) { }

  ngOnInit() {

    if(this.modalData){
      Object.keys(this.modalData).forEach(key => this[key] = this.modalData[key]);
    }
    if(this.size){
      this.options = this.radarDataService.getOptions(this.size);
    }
    // this.triangle();
  //  this.points();
    if(!this.data){
      this.data = this.radarDataService.getData(this.id).subscribe(res=> {
        this.data = res;
        this.radarChart();
      });
    }else{
      this.data.forEach(graph => this.radarDataService.setData(graph.className, graph));
      this.radarChart();
    }
  }

  points() {
    var size = 200;
    var dotSize = 1;
    var margin = 40;

    const parent = d3.select(this.chartContainer.nativeElement);
    const elem = this.chartContainer.nativeElement;
    var circles = [];

    circles.push(this.pointsOnCircle(3));
    console.log(circles);


    const scale = d3.scaleLinear()
      .range([0, size])
      .domain([-1, 1]);

    //Remove whatever chart with the same id/class was present before
    parent.select("svg").remove();

    //Initiate the radar chart SVG
    let svg = parent.append("svg")
      .attr("width", 200)
      .attr("height", 200)
      .attr("class", "radar")
    /* let g = svg.append('circle')
       .attr("class", "radar")
       .attr("r", size/2)
       .attr("cx",size/2)
       .attr("cy", size/2)
       .attr("transform","rotate(33)")*/

    var newg = svg.append("g")
      .attr("transform", "translate(60,0) rotate(30)");
    newg.selectAll('.dot').data(circles[0])
      .enter()
      .append('circle')
      .attr("class", 'dot')
      .attr("r", dotSize)
      .attr("cx", d => {
        console.log(d);
        return scale(d.x)
      })
      .attr("cy", d => scale(d.y));


    const center = svg.append("g")
      .attr("transform", "translate(60,0) rotate(30)");
    center.selectAll('.lines').data(circles[0])
      .enter()
      .append('line')
      .attr("stroke-width", "1")
      .attr("stroke", "black")
      .attr("x1", d => scale(d.x))
      .attr("y1", d => scale(d.y))
      .attr("x2", d => {
        console.log(d);
       return d.x + 100;
      })
      .attr("y2", d => d.y + 100);

    const edges = svg.append("g")
      .attr("transform", "translate(60,0) rotate(30)");
    edges.selectAll('.lines').data(circles[0])
      .enter()
      .append('line')
      .attr("stroke-width", "1")
      .attr("stroke", "black")
      .attr("x1", d => d.x)
      .attr("y1", d => d.y)
      .attr("x2", d => {
        console.log(d);
       return d.x + 100;
      })
      .attr("y2", d => d.y + 100);

  }
   pointsOnCircle(num){
    console.log('---')
    var angle = (2 * Math.PI)/num;
    var points = [];
    var i=0;
    for(var a = 0; a<(2*Math.PI); a+=angle){
      i++;
      points.push({
        x:Math.cos(a),
        y:Math.sin(a),
        rotation:a,
        label:'point' + i
      })
    }
    return points;
  }

   populateConnections( numPoints, connectionChance?){
    var c = [];
    for (var i= 0; i<numPoints; i++){
      c[i] = [];
      for ( var j=0; j<numPoints; j++){
        if(i==j){
          c[i][j] = 0;
        }else if(Math.random() <= connectionChance ){
          c[i][j] = 1;
        }else{
          c[i][j] = 0;
        }
      }
    }
    //flatten connection
    var connections = [];


    return c;
  }






triangle(){
  function Point(x,y) {
    this.x = x || 0;
    this.y = y || 0;
  };
  Point.prototype.x = null;
  Point.prototype.y = null;
  Point.prototype.add = function(v){
    return new Point(this.x + v.x, this.y + v.y);
  };
  function equiTriangle (cp, width, color){
    this.type = "equiTriangle";
    this.cp = cp;
    this.cx = cp.x;
    this.cy = cp.y;
    this.w = width;
    this.color = color;
    this.angle = Math.PI/3.0
    this.p1 = new Point(0 - this.w, 0 - this.w/Math.sqrt(3));
    this.p2 = new Point(0, 0 + this.w*2/Math.sqrt(3));
    this.p3 = new Point(0 + this.w, 0 - this.w/Math.sqrt(3));

  }
  equiTriangle.prototype.getPoints = function () {
/*    p1 = this.p1;
    p2 = this.p2;
    p3 = this.p3;*/
    var pointArray = [this.p1, this.p2, this.p3];
    return pointArray;
  };
  const parent = d3.select(this.chartContainer.nativeElement);
  const elem = this.chartContainer.nativeElement;

  //Remove whatever chart with the same id/class was present before
  parent.select("svg").remove();

  //Initiate the radar chart SVG
  let svg = parent.append("svg")
    .attr("width",  elem.offsetWidth)
    .attr("height", elem.offsetHeight)
    .attr("class", "radar");

    const scaleX = d3.scaleLinear()
      .domain([-25,25])
      .range([250,500]),
    scaleY = d3.scaleLinear()
      .domain([-25,25])
      .range([750,500]);
//color = d3.scale.category10();
  var p1 = new Point(0,0);
  var t1 = new equiTriangle(p1, 25, "pink");
  var t2 = new equiTriangle(p1, 15, "red");
  var t3 = new equiTriangle(p1, 5, "green");
  var arrayOfPolygons =  [
    t1, t2, t3
  ];
  var newg = svg.append("g")
  newg.selectAll("polygon")
    .data(arrayOfPolygons)
    .enter().append("polygon")
    .attr("points",function(d) {
      var pointStr = "";
      console.log(d.getPoints().length);
      for(var i = 0; i<d.getPoints().length; i++){
        console.log([scaleX(d.getPoints()[i].x),scaleY(d.getPoints()[i].y)]);
        pointStr+= [scaleX(d.getPoints()[i].x),scaleY(d.getPoints()[i].y)].join(",");
        pointStr+=" ";
      }
      console.log(pointStr);
      return pointStr;
    })
    .attr("fill", function(d){return d.color})
    .attr("stroke","#666")
    .attr("stroke-width",2);
}




  radarChart() {
    const max = Math.max;
    const sin = Math.sin;
    const cos = Math.cos;
    const HALF_PI: number = Math.PI / 2;

    // todo: clean this up with es6
    //Wraps SVG text - Taken from http://bl.ocks.org/mbostock/7555321
    const wrap = (text, width) => {
      text.each(function() {
        const text = d3.select(this);
        const words = text.text().split(/\s+/).reverse();
        let word;
        let line = [];
        let lineNumber = 0;
        let lineHeight = 1.4; // ems
        const y = text.attr("y");
        const x = text.attr("x");
        const dy = parseFloat(text.attr("dy"));
        let tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");

        while (word = words.pop()) {

          line.push(word);
          tspan.text(line.join(" "));
          if (tspan.node().getComputedTextLength() > width) {
            line.pop();
            tspan.text(line.join(" "));
            line = [word];
            tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
          }
        }
      });
    }//wrap

    const cfg = {
      w: 600,				//Width of the circle
      h: 600,				//Height of the circle
      margin: {top: 20, right: 20, bottom: 20, left: 20}, //The margins of the SVG
      levels: 3,				//How many levels or inner circles should there be drawn
      maxValue: 0, 			//What is the value that the biggest circle will represent
      labelFactor: 1.01, 	//How much farther than the radius of the outer circle should the labels be placed
      wrapWidth: 60, 		//The number of pixels after which a label needs to be given a new line
      opacityArea: 0.35, 	//The opacity of the area of the blob
      dotRadius: 2, 			//The size of the colored circles of each blog
      opacityCircles: 0.1, 	//The opacity of the circles of each blob
      strokeWidth: 2, 		//The width of the stroke around each blob
      roundStrokes: false,	//If true the area and stroke will follow a round path (cardinal-closed)
      color: d3.scaleOrdinal().range(["#23364e"]),
      format: '.2%',
      unit: '',
      axisLabels: true,
      labels: true,
      legend: false
    };

    //Put all of the options into a variable called cfg
    if(this.options){
      Object.keys(this.options).forEach(key => {
        cfg[key] = this.options[key];
      })
    }

    //If the supplied maxValue is smaller than the actual one, replace by the max in the data
    // var maxValue = max(cfg.maxValue, d3.max(data, function(i){return d3.max(i.map(function(o){return o.value;}))}));
    let maxValues: number[] = [cfg.maxValue];
    for(let data of this.data) {
      maxValues.push(Math.max(...data.axes.map(o => o.value)));
    }
    const maxValue: number = Math.max(...maxValues);

    const allAxis = this.data[0].axes.map((i, j) => i.axis),	//Names of each axis
      total = allAxis.length,					//The number of different axes
      radius = Math.min(cfg.w/2, cfg.h/2), 	//Radius of the outermost circle
      format = d3.format(cfg.format),			 	//Formatting
      angleSlice = Math.PI * 2 / total;		//The width in radians of each "slice"

    //Scale for the radius
    const rScale = d3.scaleLinear()
      .range([0, radius])
      .domain([0, maxValue]);

    /////////////////////////////////////////////////////////
    //////////// Create the container SVG and g /////////////
    /////////////////////////////////////////////////////////
    const parent = d3.select(this.chartContainer.nativeElement);

    //Remove whatever chart with the same id/class was present before
    parent.select("svg").remove();

    //Initiate the radar chart SVG
    let svg = parent.append("svg")
      .attr("width",  cfg.w + cfg.margin.left + cfg.margin.right)
      .attr("height", cfg.h + cfg.margin.top + cfg.margin.bottom)
      .attr("class", "radar");

    //Append a g element
    let g = svg.append("g")
      .style('transform', 'translate(50%, 50%)');
    //.attr("transform", "translate(" + (cfg.w/2 + cfg.margin.left) + "," + (cfg.h/2 + cfg.margin.top) + ")");



   /* svg.append("g")
      .attr("transform","translate(" + (cfg.w/2) + "," + (cfg.h/2) + ")")
      .append("path")
      .attr("d", "M 0 " + (-cfg.h/2) + " L " + (-cfg.w/2) + " " + (cfg.h/2) + "L " + (cfg.w/2) + " " + (cfg.h/2) + " Z")
      .style("fill","#dd4237");
  */  /////////////////////////////////////////////////////////
    ////////// Glow filter for some extra pizzazz ///////////
    /////////////////////////////////////////////////////////

    //Filter for the outside glow
    let filter = g.append('defs').append('filter').attr('id','glow'),
      feGaussianBlur = filter.append('feGaussianBlur').attr('stdDeviation','2.5').attr('result','coloredBlur'),
      feMerge = filter.append('feMerge'),
      feMergeNode_1 = feMerge.append('feMergeNode').attr('in','coloredBlur'),
      feMergeNode_2 = feMerge.append('feMergeNode').attr('in','SourceGraphic');

    /////////////////////////////////////////////////////////
    /////////////// Draw the Circular grid //////////////////
    /////////////////////////////////////////////////////////

    //Wrapper for the grid & axes
    let axisGrid = g.append("g").attr("class", "axisWrapper");

    //Draw the background circles
    axisGrid.selectAll(".levels")
      .data(d3.range(1,(cfg.levels+1)).reverse())
      .enter()
      .append("path")
      .attr("d", d =>
        "M 0 " + ((-cfg.h/2)/ cfg.levels * d) +
        " L " + ((-cfg.w/2)/ cfg.levels * d) +
        " " + ((cfg.h/2)/ cfg.levels * d) +
        "L " + ((cfg.w/2)/ cfg.levels * d) +
        " " + ((cfg.h/2)/ cfg.levels * d) + " Z")
      .style("fill", "#F3F3F3")
      .style("stroke", "#CDCDCD")
      .style("fill-opacity", cfg.opacityCircles)
      .style("filter" , "url(#glow)");

    //Text indicating at what % each level is
    if(cfg.axisLabels) {
      axisGrid.selectAll(".axisLabel")
        .data(d3.range(1, (cfg.levels + 1)).reverse())
        .enter().append("text")
        .attr("class", "axisLabel")
        .attr("x", 4)
        .attr("y", d => -d * radius / cfg.levels)
        .attr("dy", "0.4em")
        .style("font-size", "10px")
        .attr("fill", "#737373")
        .text(d => format(maxValue * d / cfg.levels) + cfg.unit);
    }
    /////////////////////////////////////////////////////////
    //////////////////// Draw the axes //////////////////////
    /////////////////////////////////////////////////////////

    //Create the straight lines radiating outward from the center
    var axis = axisGrid.selectAll(".axis")
      .data(allAxis)
      .enter()
      .append("g")
      .attr("class", "axis");
    //Append the lines
    axis.append("line")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", (d, i) => rScale(maxValue) * cos(angleSlice * i - HALF_PI))
      .attr("y2", (d, i) => rScale(maxValue) * sin(angleSlice * i - HALF_PI))
      .attr("class", "line")
      .style("stroke", "f7f7f7")
      .style("stroke-width", "1px");

    //Append the labels at each axis
    // todo: rotate? https://stackoverflow.com/questions/42581308/d3-js-rotate-axis-labels-around-the-middle-point
    if(cfg.labels) {
      axis.append("text")
        .attr("class", "legend")
        .style("font-size", "11px")
        .attr("text-anchor", "middle")
        .attr("dy", "0.35em")
        .attr("x", (d, i) => rScale(maxValue * cfg.labelFactor) * cos(angleSlice * i - HALF_PI))
        .attr("y", (d, i) => rScale(maxValue * cfg.labelFactor) * sin(angleSlice * i - HALF_PI))
        .text(d => d)
        .call(wrap, cfg.wrapWidth);
    }
    /////////////////////////////////////////////////////////
    ///////////// Draw the radar chart blobs ////////////////
    /////////////////////////////////////////////////////////

    //The radial line function
    const radarLine = d3.radialLine()
      .curve(d3.curveLinearClosed)
      .radius(d => rScale(d.value))
      .angle((d,i) => i * angleSlice);

    if(cfg.roundStrokes) {
      radarLine.curve(d3.curveCardinalClosed)
    }

    //Create a wrapper for the blobs
    const blobWrapper = g.selectAll(".radarWrapper")
      .data(this.data)
      .enter().append("g")
      .attr("class", "radarWrapper");

    //Append the backgrounds
    blobWrapper
      .append("path")
      .attr("class", "radarArea")
      .attr("d", d => radarLine(d.axes))
      .style("fill", (d,i) => cfg.color(i))
      .style("fill-opacity", cfg.opacityArea)
      .on('mouseover', function(d, i) {
        //Dim all blobs
        parent.selectAll(".radarArea")
          .transition().duration(200)
          .style("fill-opacity", 0.1);
        //Bring back the hovered over blob
        d3.select(this)
          .transition().duration(200)
          .style("fill-opacity", 0.7);
      })
      .on('mouseout', () => {
        //Bring back all blobs
        parent.selectAll(".radarArea")
          .transition().duration(200)
          .style("fill-opacity", cfg.opacityArea);
      });

    //Create the outlines
    blobWrapper.append("path")
      .attr("class", "radarStroke")
      .attr("d", function(d,i) { return radarLine(d.axes); })
      .style("stroke-width", cfg.strokeWidth + "px")
      .style("stroke", (d,i) => cfg.color(i))
      .style("fill", "none")
      .style("filter" , "url(#glow)");

    //Append the circles
    blobWrapper.selectAll(".radarCircle")
      .data(d => d.axes)
      .enter()
      .append("circle")
      .attr("class", "radarCircle")
      .attr("r", cfg.dotRadius)
      .attr("cx", (d,i) => rScale(d.value) * cos(angleSlice * i - HALF_PI))
      .attr("cy", (d,i) => rScale(d.value) * sin(angleSlice * i - HALF_PI))
      .style("fill", (d) => cfg.color(d.id))
      .style("fill-opacity", 0.8);

    /////////////////////////////////////////////////////////
    //////// Append invisible circles for tooltip ///////////
    /////////////////////////////////////////////////////////

    //Wrapper for the invisible circles on top
    const blobCircleWrapper = g.selectAll(".radarCircleWrapper")
      .data(this.data)
      .enter().append("g")
      .attr("class", "radarCircleWrapper");

    //Append a set of invisible circles on top for the mouseover pop-up
    blobCircleWrapper.selectAll(".radarInvisibleCircle")
      .data(d => d.axes)
      .enter().append("circle")
      .attr("class", "radarInvisibleCircle")
      .attr("r", cfg.dotRadius * 1.5)
      .attr("cx", (d,i) => rScale(d.value) * cos(angleSlice*i - HALF_PI))
      .attr("cy", (d,i) => rScale(d.value) * sin(angleSlice*i - HALF_PI))
      .style("fill", "none")
      .style("pointer-events", "all")
      .on("mouseover", function(d,i) {
        tooltip
          .attr('x', this.cx.baseVal.value - 10)
          .attr('y', this.cy.baseVal.value - 10)
          .transition()
          .style('display', 'block')
          .text(d.axis + " "+ format(d.value) + cfg.unit);
      })
      .on("mouseout", function(){
        tooltip.transition()
          .style('display', 'none').text('');
      });

    const tooltip = g.append("text")
      .attr("class", "tooltip")
      .attr('x', 0)
      .attr('y', 0)
      .style("font-size", "12px")
      .style('display', 'none')
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em");

    /*if (cfg.legend !== false && typeof cfg.legend === "object") {
      let legendZone = svg.append('g');
      let names = data.map(el => el.name);
      if (cfg.legend.title) {
        let title = legendZone.append("text")
          .attr("class", "title")
          .attr('transform', `translate(${cfg.legend.translateX},${cfg.legend.translateY})`)
          .attr("x", cfg.w - 70)
          .attr("y", 10)
          .attr("font-size", "12px")
          .attr("fill", "#404040")
          .text(cfg.legend.title);
      }
      let legend = legendZone.append("g")
        .attr("class", "legend")
        .attr("height", 100)
        .attr("width", 200)
        .attr('transform', `translate(${cfg.legend.translateX},${cfg.legend.translateY + 20})`);
      // Create rectangles markers
      legend.selectAll('rect')
        .data(names)
        .enter()
        .append("rect")
        .attr("x", cfg.w - 65)
        .attr("y", (d,i) => i * 20)
        .attr("width", 10)
        .attr("height", 10)
        .style("fill", (d,i) => cfg.color(i));
      // Create labels
      legend.selectAll('text')
        .data(names)
        .enter()
        .append("text")
        .attr("x", cfg.w - 52)
        .attr("y", (d,i) => i * 20 + 9)
        .attr("font-size", "11px")
        .attr("fill", "#737373")
        .text(d => d);
    }*/
    return svg;
  }

}