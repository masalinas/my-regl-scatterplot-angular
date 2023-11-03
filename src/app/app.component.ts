import { Component, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import { Numeric } from 'd3';

import createScatterplot from 'regl-scatterplot';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('canvasPlot')
  canvas: ElementRef = {} as ElementRef;

  @ViewChild('canvasTooltip')
  tooltip: ElementRef = {} as ElementRef;

  colorGroups = ['#52FF33', '#FF5E33', '#337AFF'];
  
  dataset: any[] = [
    {
      x: 0.2,
      y: -0.1,
      code: 'COD01',
      description: 'Sample 01',
      type: 'Type A',
      group: 'A'
    },
    {
      x: 0.3,
      y: 0.1,
      code: 'COD02',
      description: 'Sample 02',
      type: 'Type B',
      group: 'B'
    },
    {
      x: -0.9,
      y: 0.8,
      code: 'COD03',
      description: 'Sample 03',
      type: 'Type B',
      group: 'B'
    },
        {
      x: 0.0,
      y: 0.0,
      code: 'COD04',
      description: 'Sample 04',
      type: 'Type C',
      group: 'C'
    },
  ];
      
  pointSamples: Array<Array<number>> = [];
  points: any = [];
  pointHover: any = {};
  pointPosition: any;
  tooltipPointX: number = 0;
  tooltipPointY: number = 0;
  width: number = 600;
  height: number = 400;

  constructor() { 
    window.addEventListener('mousemove', function() {
    }, { passive: false });
    
    this.parseDataset();
  }
    
  parseDataset() {
    for (let i = 0; i < this.dataset.length; i++) {
      if (this.dataset[i].group == 'A') {
        this.pointSamples.push([this.dataset[i].x, this.dataset[i].y, 0]);
      } else if (this.dataset[i].group == 'B') {
        this.pointSamples.push([this.dataset[i].x, this.dataset[i].y, 1]);
      } else if (this.dataset[i].group == 'C') {
        this.pointSamples.push([this.dataset[i].x, this.dataset[i].y, 2]);
      }
    }
  }
  
  ngAfterViewInit() {    
    const canvas = this.canvas.nativeElement;
    const width = this.width;
    const height = this.height;
    
    const scatterplot = createScatterplot({
      canvas,
      width,
      height,
      backgroundColor: "#000000" // not works!!
    });

    scatterplot.subscribe("select", ({ points: selectedPoints }) => {
      canvas.value = selectedPoints;
      canvas.dispatchEvent(new Event("input"));

      this.points = [];
      for (let i = 0; i < selectedPoints.length; i++) {
        this.points.push(this.dataset[selectedPoints[i]]);
      }

      console.log(this.points);
    });
    
    scatterplot.subscribe("pointOver", (point) => {
      // set the index hovered point
      this.pointHover = this.dataset[point];

      //console.log(this.pointHover);      
 
      // get position of the hovered point
      this.pointPosition = scatterplot.getScreenPosition(point)
      //this.tooltipPointX = this.pointPosition[0];
      //this.tooltipPointY = this.pointPosition[1];
      //console.log(this.pointPosition);

      // show the tooltip
      this.tooltip.nativeElement.style.visibility = 'visible';
      this.tooltip.nativeElement.style.position = 'absolute';
      this.tooltip.nativeElement.style.left = this.pointPosition[0] + 170 + "px";
      this.tooltip.nativeElement.style.top = this.pointPosition[1] + 10 + "px";
    });      
    
    scatterplot.subscribe("pointOut", (point) => {
      // hide the tooltip
      this.tooltip.nativeElement.style.visibility = 'hidden';
    });     
        
    // setting random points
    /*const points = new Array(10000)
      .fill(null)
      .map(() => [-1 + Math.random() * 2, -1 + Math.random() * 2, 0.5]);
    
    scatterplot.draw(points);*/
    
    // setting continues colors
    /*scatterplot.set({
      opacityBy: 'valueA',
      sizeBy: 'valueA',
      colorBy: 'valueB', 
    });

    scatterplot.set({
      pointColor: ['#000000', '#52FF33', '#FF5E33', '#337AFF', '#ffffff'],
      pointSize: [8, 8, 8],
      opacity: [1, 1, 1],
    });
    
    scatterplot.draw([
      [0.2, -0.1, 0, 0.1337],
      [0.3, 0.1, 1, 0.3371],
      [-0.9, 0.8, 2, 0.9],
    ]);*/
    
    // setting discrete colors
    scatterplot.set({
      opacityBy: 'valueA',
      sizeBy: 'valueA',
      colorBy: 'valueA', 
    });

    scatterplot.set({
      pointColor: this.colorGroups,
      pointSize: [8, 8, 8],
      opacity: [1, 1, 1],
    });

    scatterplot.draw(this.pointSamples);
  }    

  onClear() {
    this.points = [];
  }
}
