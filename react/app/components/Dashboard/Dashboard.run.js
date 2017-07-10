import initSparkLine from "../Common/sparkline";
import Cookies from "universal-cookie";

export default function(chartSpline) {
  if (typeof Rickshaw === "undefined") return;

  // Graph 1
  // -----------------------------------

  if (document.querySelector("#rickshaw1")) {
    var graph1 = new Rickshaw.Graph({
      element: document.querySelector("#rickshaw1"),
      renderer: "area",
      stroke: true,
      series: [
        {
          data: [
            {
              x: 0,
              y: 10
            },
            {
              x: 1,
              y: 29
            },
            {
              x: 2,
              y: 38
            },
            {
              x: 3,
              y: 40
            },
            {
              x: 4,
              y: 52
            }
          ],
          color: "#42c1e8"
        },
        {
          data: [
            {
              x: 0,
              y: 10
            },
            {
              x: 1,
              y: 29
            },
            {
              x: 2,
              y: 38
            },
            {
              x: 3,
              y: 40
            },
            {
              x: 4,
              y: 52
            }
          ],
          color: "#675bb1"
        }
      ]
    });
    graph1.render();
  }

  // Graph 1
  // -----------------------------------

  var seriesData = [[], [], []];
  var random = new Rickshaw.Fixtures.RandomData(150);

  for (var i = 0; i < 150; i++) {
    random.addData(seriesData);
  }

  var series1 = [
    {
      color: "#c05020",
      data: seriesData[0],
      name: "New York"
    },
    {
      color: "#30c020",
      data: seriesData[1],
      name: "London"
    },
    {
      color: "#6060c0",
      data: seriesData[2],
      name: "Tokyo"
    }
  ];

  if (document.querySelector("#rickshaw2")) {
    var graph2 = new Rickshaw.Graph({
      element: document.querySelector("#rickshaw2"),
      series: series1,
      renderer: "area"
    });

    graph2.render();
  }

  // Graph 3
  // -----------------------------------

  if (document.querySelector("#rickshaw3")) {
    var graph3 = new Rickshaw.Graph({
      element: document.querySelector("#rickshaw3"),
      renderer: "line",
      series: [
        {
          data: [
            {
              x: 0,
              y: 10
            },
            {
              x: 1,
              y: 10
            },
            {
              x: 2,
              y: 20
            },
            {
              x: 3,
              y: 30
            },
            {
              x: 4,
              y: 32
            }
          ],
          color: "#7266ba"
        },
        {
          data: [
            {
              x: 0,
              y: 8
            },
            {
              x: 1,
              y: 9
            },
            {
              x: 2,
              y: 19
            },
            {
              x: 3,
              y: 25
            },
            {
              x: 4,
              y: 46
            }
          ],
          color: "#23b7e5"
        }
      ]
    });
    graph3.render();
  }
  // Graph 4
  // -----------------------------------

  if (document.querySelector("#rickshaw4")) {
    var graph4 = new Rickshaw.Graph({
      element: document.querySelector("#rickshaw4"),
      renderer: "area",
      series: [
        {
          data: [
            {
              x: 0,
              y: 20
            },
            {
              x: 1,
              y: 19
            },
            {
              x: 2,
              y: 38
            },
            {
              x: 3,
              y: 30
            },
            {
              x: 4,
              y: 52
            }
          ],
          color: "#675bb1"
        }
      ]
    });
    graph4.render();
  }

  var datav3 = [
    {
      label: "Publications",
      color: "#1ba3cd",
      data: [
        ["0", 30],
        ["1", 38],
        ["2", 40],
        ["3", 42],
        ["4", 48],
        ["5", 50],
        ["6", 70],
        ["7", 145],
        ["8", 70],
        ["9", 59],
        ["10", 48],
        ["11", 38],
        ["12", 29],
        ["13", 30],
        ["14", 22],
        ["15", 20],
        ["16", 21],
        ["17", 18],
        ["18", 29],
        ["19", 40],
        ["20", 22],
        ["21", 49],
        ["22", 23],
        ["23", 60]
      ]
    }
  ];

  var options = {
    series: {
      lines: {
        show: false
      },
      points: {
        show: true,
        radius: 4
      },
      splines: {
        show: true,
        tension: 0.4,
        lineWidth: 1,
        fill: 0.5
      }
    },
    grid: {
      borderColor: "#eee",
      borderWidth: 1,
      hoverable: true,
      backgroundColor: "#fcfcfc"
    },
    tooltip: true,
    tooltipOpts: {
      content: function(label, x, y) {
        return x + " : " + y;
      }
    },
    xaxis: {
      tickColor: "#fcfcfc",
      mode: "categories"
    },
    yaxis: {
      min: 0,
      max: 150, // optional: use it for a clear represetation
      tickColor: "#eee",
      //position: 'right' or 'left',
      tickFormatter: function(v) {
        return v /* + ' visitors'*/;
      }
    },
    shadowSize: 0
  };

  if (chartSpline) {
    $(chartSpline).height($(chartSpline).data("height") || 250);
    $.plot(chartSpline, datav3, options);
  }

  // Sparkline
  $("[data-sparkline]").each(initSparkLine);

  // Classyloader

  $("[data-classyloader]").each(function() {
    $(this).ClassyLoader($(this).data());
  });


}
