export default function() {
  if (typeof Rickshaw === "undefined") return;

  // Graph 1
  // -----------------------------------

  if (document.querySelector("#rickshaw1")) {
    var graph1 = new Rickshaw.Graph({
            element: document.querySelector("#rickshaw1"),
            renderer: 'area',
            stroke: true,
            series: [{
                data: [{
                    x: 0,
                    y: 10
                }, {
                    x: 1,
                    y: 29
                }, {
                    x: 2,
                    y: 38
                }, {
                    x: 3,
                    y: 40
                }, {
                    x: 4,
                    y: 52
                }],
                color: '#42c1e8'
            }, {
                data: [{
                    x: 0,
                    y: 10
                }, {
                    x: 1,
                    y: 29
                }, {
                    x: 2,
                    y: 38
                }, {
                    x: 3,
                    y: 40
                }, {
                    x: 4,
                    y: 52
                }],
                color: '#675bb1'
            }]
        });
    graph1.render();
  }

  // Graph 1
  // -----------------------------------

    var seriesData = [
        [],
        [],
        []
    ];
    var random = new Rickshaw.Fixtures.RandomData(150);

    for (var i = 0; i < 150; i++) {
        random.addData(seriesData);
    }

    var series1 = [{
        color: "#c05020",
        data: seriesData[0],
        name: 'New York'
    }, {
        color: "#30c020",
        data: seriesData[1],
        name: 'London'
    }, {
        color: "#6060c0",
        data: seriesData[2],
        name: 'Tokyo'
    }];

    if (document.querySelector("#rickshaw2")) {
        var graph2 = new Rickshaw.Graph({
            element: document.querySelector("#rickshaw2"),
            series: series1,
            renderer: 'area'
        });

        graph2.render();

    }

  // Graph 3
  // -----------------------------------

  if (document.querySelector("#rickshaw3")) {
    var graph3 = new Rickshaw.Graph({
            element: document.querySelector("#rickshaw3"),
            renderer: 'line',
            series: [{
                data: [{
                    x: 0,
                    y: 10
                }, {
                    x: 1,
                    y: 10
                }, {
                    x: 2,
                    y: 20
                }, {
                    x: 3,
                    y: 30
                }, {
                    x: 4,
                    y: 32
                }],
                color: '#7266ba'
            }, {
                data: [{
                    x: 0,
                    y: 8
                }, {
                    x: 1,
                    y: 9
                }, {
                    x: 2,
                    y: 19
                }, {
                    x: 3,
                    y: 25
                }, {
                    x: 4,
                    y: 46
                }],
                color: '#23b7e5'
            }]
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
}
