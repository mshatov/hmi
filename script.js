function foo(a, i) {
  return `Math.sin((${a} + 0.1 * (${i})) * x) / x`;
}

let xValues = [],
  y1Values = [],
  y2Values = [],
  y3Values = [];

const aElem = document.getElementById("a"),
  i1Elem = document.getElementById("i1"),
  i2Elem = document.getElementById("i2"),
  i3Elem = document.getElementById("i3"),
  xStartElem = document.getElementById("start"),
  xEndElem = document.getElementById("end");

const inputs = document.querySelectorAll("input[type=number]");
inputs.forEach((item) =>
  item.addEventListener("change", function () {
    updateConfigByMutating(chart);
  })
);
console.log(inputs);

let a = aElem.value,
  i1 = i1Elem.value,
  i2 = i2Elem.value,
  i3 = i3Elem.value,
  xStart = xStartElem.value,
  xEnd = xEndElem.value;
// aElem.addEventListener("change", function () {
//   updateConfigByMutating(chart);
// });

generateData(foo, parseInt(xStart), parseInt(xEnd), 0.5);

let chart = new Chart("myChart", {
  type: "line",
  data: {
    labels: xValues,
    datasets: [
      {
        label: "y1",
        fill: false,
        pointRadius: 1,
        borderColor: "rgba(255,0,0,0.5)",
        data: y1Values,
      },
      {
        label: "y2",
        fill: false,
        pointRadius: 1,
        borderColor: "rgba(127,0,0,0.5)",
        data: y2Values,
        // tension: 0.1,
      },
      {
        label: "y3",
        fill: false,
        pointRadius: 1,
        borderColor: "rgba(0,200,0,0.5)",
        data: y3Values,
        // tension: 0,
      },
    ],
  },
  options: {
    legend: {
      display: true,
    },
    title: {
      display: true,
      text: "y(x) = sin((a+0.1i)x)/x",
      fontSize: 16,
    },
  },
});

function updateConfigByMutating(chart) {
  xValues.splice(0, xValues.length);
  y1Values.splice(0, y1Values.length);
  y2Values.splice(0, y2Values.length);
  y3Values.splice(0, y3Values.length);
  a = aElem.value;
  i1 = i1Elem.value;
  i2 = i2Elem.value;
  i3 = i3Elem.value;
  (xStart = xStartElem.value), (xEnd = xEndElem.value);
  generateData(foo, parseInt(xStart), parseInt(xEnd), 0.5);
  chart.update();
}

function generateData(value, start, end, step = 1) {
  for (let x = start; x <= end; x += step) {
    y1Values.push(eval(value(a, i1)));
    y2Values.push(eval(value(a, i2)));
    y3Values.push(eval(value(a, i3)));

    xValues.push(Math.round(x * 10) / 10);
  }
}
