import * as am5 from '@amcharts/amcharts5';
/* eslint-disable camelcase */
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
/* eslint-disable camelcase */
import * as am5xy from '@amcharts/amcharts5/xy';
import { ChartAxisData } from '../../model/types/stat';

export const drawChart = (chartId: string, statData: ChartAxisData[]) => {
  const root = am5.Root.new(chartId);
  /* eslint-disable camelcase */
  root.setThemes([am5themes_Animated.new(root)]);
  /* eslint-disable camelcase */
  const chart = root.container.children.push(
    am5xy.XYChart.new(root, {
      panX: true,
      panY: true,
      wheelX: 'panX',
      wheelY: 'zoomX',
      pinchZoomX: true,
    }),
  );

  const cursor = chart.set('cursor', am5xy.XYCursor.new(root, {}));
  cursor.lineY.set('visible', false);

  const xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 60 });
  xRenderer.labels.template.setAll({
    rotation: -90,
    centerY: am5.p50,
    centerX: am5.p100,
    paddingRight: 15,
  });

  const xAxis = chart.xAxes.push(
    am5xy.CategoryAxis.new(root, {
      maxDeviation: 0.3,
      categoryField: 'label',
      renderer: xRenderer,
      tooltip: am5.Tooltip.new(root, {}),
    }),
  );

  const yAxis = chart.yAxes.push(
    am5xy.ValueAxis.new(root, {
      maxDeviation: 0.3,
      renderer: am5xy.AxisRendererY.new(root, {}),
    }),
  );

  const series = chart.series.push(
    am5xy.ColumnSeries.new(root, {
      name: 'Series 1',
      xAxis,
      yAxis,
      valueYField: 'value',
      sequencedInterpolation: true,
      categoryXField: 'label',
      tooltip: am5.Tooltip.new(root, {
        labelText: '{valueY}',
      }),
    }),
  );

  series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5 });
  series.columns.template.adapters.add('fill', (fill, target) => chart.get('colors')?.getIndex(series.columns.indexOf(target)));

  series.columns.template.adapters.add('stroke', (stroke, target) => chart.get('colors')?.getIndex(series.columns.indexOf(target)));

  xAxis.data.setAll(statData);
  series.data.setAll(statData);

  series.appear(500);
  chart.appear(500, 100);
};

export const drawFullChart = (chartId: string, chartData: unknown[]) => {
  const root = am5.Root.new(chartId);
  /* eslint-disable camelcase */
  root.setThemes([am5themes_Animated.new(root)]);
  /* eslint-disable camelcase */
  const chart = root.container.children.push(
    am5xy.XYChart.new(root, {
      panX: false,
      panY: false,
      wheelX: 'panX',
      wheelY: 'zoomX',
    }),
  );

  const cursor = chart.set(
    'cursor',
    am5xy.XYCursor.new(root, {
      behavior: 'zoomX',
    }),
  );
  cursor.lineY.set('visible', false);

  const xAxis = chart.xAxes.push(
    am5xy.DateAxis.new(root, {
      maxDeviation: 0,
      baseInterval: {
        timeUnit: 'day',
        count: 1,
      },
      renderer: am5xy.AxisRendererX.new(root, {}),
      tooltip: am5.Tooltip.new(root, {}),
    }),
  );

  const yAxis = chart.yAxes.push(
    am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererY.new(root, {}),
    }),
  );

  const series = chart.series.push(
    am5xy.ColumnSeries.new(root, {
      name: 'Series',
      xAxis,
      yAxis,
      valueYField: 'value',
      valueXField: 'date',
      tooltip: am5.Tooltip.new(root, {
        labelText: '{valueY}',
      }),
    }),
  );

  chart.set(
    'scrollbarX',
    am5.Scrollbar.new(root, {
      orientation: 'horizontal',
    }),
  );

  series.data.setAll(chartData);

  series.appear(1000);
  chart.appear(1000, 100);
};
