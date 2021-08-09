import {Component, Input, OnInit} from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

@Component({
  selector: 'app-widget-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {
  Highcharts = Highcharts;
  chartConstructor: any;
  chartOptions: {};
  @Input()data: [];
  constructor() { }

  ngOnInit(): void {
    this.chartOptions = {
      chart: {
        type: 'area'
      },
      title: {
        text: 'Les données recueillies par Gstoreplus dans le monde sur les articles les plus demandées'
      },
      subtitle: {
        text: 'GSTOREPLUS'
      },
      tooltip: {
        split: true,
        valueSuffix: ' millions'
      },
      credits: {
        enable: false
      },
      exporting: {
        enable: true,
      },
      plotOptions: {
        area: {
          stacking: 'normal',
          lineColor: '#666666',
          lineWidth: 1,
          marker: {
            lineWidth: 1,
            lineColor: '#666666'
          }
        }
      },
      series: this.data

    };
    HC_exporting(Highcharts);
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

}
