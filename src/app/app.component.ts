import { Component, AfterViewInit, ViewChild, ElementRef} from '@angular/core';

import createScatterplot from 'regl-scatterplot';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('canvasPlot')
  canvas: ElementRef = {} as ElementRef;

  colorGroups = ['#52FF33', '#FF5E33', '#337AFF'];
  
  dataset: any[] = [
    {
      x: 0.2,
      y: -0.1,
      code: 'Code 01',
      group: 'A'
    },
    {
      x: 0.3,
      y: 0.1,
      code: 'Code 02',
      group: 'B'
    },
    {
      x: -0.9,
      y: 0.8,
      code: 'Code 03',
      group: 'B'
    }
  ];
      
  pointSamples: Array<Array<number>> = [];
  pointSelected: any;
  pointHover: any;

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
      backgroundColor: "#000000"
    });

    scatterplot.subscribe("select", ({ points }) => {
      canvas.value = points;
      canvas.dispatchEvent(new Event("input"));

      this.pointSelected = [];
      for (let i = 0; i < points.length; i++) {
        this.pointSelected.push(this.dataset[points[i]]);
      }

      console.log(this.pointSelected);
    });
    
    scatterplot.subscribe("pointOver", (point) => {
      this.pointHover = this.dataset[point];

      console.log(this.dataset[point]);
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
}
