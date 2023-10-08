import ReactECharts from "echarts-for-react";

type ChartGeneratorProps = {
  xAxisData: string[];
  yAxisData: number[];
};
function ChartGenerator({
  xAxisData = [],
  yAxisData = [],
}: ChartGeneratorProps) {
  const options = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
        label: {
          show: true,
        },
      },
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: false, readOnly: false },
        magicType: { show: true, type: ["line", "bar"] },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    calculable: true,
    title: {
      text: "Your expenses",
      textStyle: {
        color: "#fff", // Set the color of the title here
      },
    },
    xAxis: {
      type: "category",
      data: xAxisData,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: yAxisData,
        type: "bar",
        itemStyle: {
          shadowBlur: 10,
          shadowColor: "rgba(120, 36, 50, 0.5)",
          shadowOffsetY: 5,
          color: function (params) {
            // Definiuj kolor na podstawie wartości
            let value = params.value;
            if (value < 0) {
              return {
                type: "radial",
                x: 0.4,
                y: 0.3,
                r: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgb(251, 118, 123)",
                  },
                  {
                    offset: 1,
                    color: "rgb(204, 46, 72)",
                  },
                ],
              };
            } else {
              return {
                type: "radial",
                x: 0.4,
                y: 0.3,
                r: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgb(131,251,118)",
                  },
                  {
                    offset: 1,
                    color: "rgb(46,204,67)",
                  },
                ],
              };
            }
          },
        },
      },
    ],
    grid: {
      top: "12%",
      left: "1%",
      right: "10%",
      containLabel: true,
    },
    dataZoom: [
      {
        type: "slider",
        start: -9999, // Początkowy punkt przybliżania (0%)
        end: 90000000000, // Końcowy punkt przybliżania (50%)
      },
      {
        type: "inside", // Typ suwaka
        start: -9999, // Początkowy punkt przybliżania (0%)
        end: 900000000000, // Końcowy punkt przybliżania (50%)
      },
      {
        show: true,
        yAxisIndex: 0,
        filterMode: "empty",
        width: 30,
        height: "80%",
        showDataShadow: false,
        left: "93%",
      },
    ],
  };

  return (
    <ReactECharts
      option={options}
      style={{
        width: "clamp(400px, 100%, 1200px)",
        height: "100%",
      }}
    />
  );
}

export default ChartGenerator;
