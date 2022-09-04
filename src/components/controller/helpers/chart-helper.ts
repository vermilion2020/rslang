import * as am5 from '@amcharts/amcharts5';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5xy from '@amcharts/amcharts5/xy';
import { ChartAxisData } from '../../model/types';

export const drawChart = (chartId: string, statData: ChartAxisData[]) => {
  let root = am5.Root.new(chartId);

  root.setThemes([am5themes_Animated.new(root)]);

  let chart = root.container.children.push(
    am5xy.XYChart.new(root, {
      panX: true,
      panY: true,
      wheelX: 'panX',
      wheelY: 'zoomX',
      pinchZoomX: true,
    })
  );

  let cursor = chart.set('cursor', am5xy.XYCursor.new(root, {}));
  cursor.lineY.set('visible', false);

  let xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 60 });
  xRenderer.labels.template.setAll({
    rotation: -90,
    centerY: am5.p50,
    centerX: am5.p100,
    paddingRight: 15,
  });

  let xAxis = chart.xAxes.push(
    am5xy.CategoryAxis.new(root, {
      maxDeviation: 0.3,
      categoryField: 'label',
      renderer: xRenderer,
      tooltip: am5.Tooltip.new(root, {}),
    })
  );

  let yAxis = chart.yAxes.push(
    am5xy.ValueAxis.new(root, {
      maxDeviation: 0.3,
      renderer: am5xy.AxisRendererY.new(root, {}),
    })
  );

  let series = chart.series.push(
    am5xy.ColumnSeries.new(root, {
      name: 'Series 1',
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: 'value',
      sequencedInterpolation: true,
      categoryXField: 'label',
      tooltip: am5.Tooltip.new(root, {
        labelText: '{valueY}',
      }),
    })
  );

  series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5 });
  series.columns.template.adapters.add('fill', function (fill, target) {
    return chart.get('colors')?.getIndex(series.columns.indexOf(target));
  });

  series.columns.template.adapters.add('stroke', function (stroke, target) {
    return chart.get('colors')?.getIndex(series.columns.indexOf(target));
  });

  xAxis.data.setAll(statData);
  series.data.setAll(statData);

  series.appear(500);
  chart.appear(500, 100);
};

export const drawFullChart = (chartId: string, chartData: unknown[]) => {
  let root = am5.Root.new(chartId);
  root.setThemes([am5themes_Animated.new(root)]);

  let chart = root.container.children.push(
    am5xy.XYChart.new(root, {
      panX: false,
      panY: false,
      wheelX: 'panX',
      wheelY: 'zoomX',
    })
  );

  let cursor = chart.set(
    'cursor',
    am5xy.XYCursor.new(root, {
      behavior: 'zoomX',
    })
  );
  cursor.lineY.set('visible', false);

  let xAxis = chart.xAxes.push(
    am5xy.DateAxis.new(root, {
      maxDeviation: 0,
      baseInterval: {
        timeUnit: 'day',
        count: 1,
      },
      renderer: am5xy.AxisRendererX.new(root, {}),
      tooltip: am5.Tooltip.new(root, {}),
    })
  );

  let yAxis = chart.yAxes.push(
    am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererY.new(root, {}),
    })
  );

  let series = chart.series.push(
    am5xy.ColumnSeries.new(root, {
      name: 'Series',
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: 'value',
      valueXField: 'date',
      tooltip: am5.Tooltip.new(root, {
        labelText: '{valueY}',
      }),
    })
  );

  chart.set(
    'scrollbarX',
    am5.Scrollbar.new(root, {
      orientation: 'horizontal',
    })
  );

  series.data.setAll(chartData);

  series.appear(1000);
  chart.appear(1000, 100);
};
