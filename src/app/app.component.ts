import { Component, AfterViewInit, ViewChild, ElementRef} from '@angular/core';

import createScatterplot from 'regl-scatterplot';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('myCanvas')
  canvas: ElementRef = {} as ElementRef;
  width: number = 600;
  height: number = 400;

  constructor() { }
    
  ngAfterViewInit() {  
    const canvas = this.canvas.nativeElement;
    const width = this.width;
    const height = this.height;

    const scatterplot = createScatterplot({
      canvas,
      width,
      height,
      pointSize: 5,
    });

    const points = new Array(10000)
      .fill(null)
      .map(() => [-1 + Math.random() * 2, -1 + Math.random() * 2, 0.5]);

    scatterplot.draw(points);
  }    
}
