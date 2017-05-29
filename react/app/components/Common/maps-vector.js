// VectorMap
// -----------------------------------

var seriesData = {
    'CA': 11100,   // Canada
    'DE': 2510,    // Germany
    'FR': 3710,    // France
    'AU': 5710,    // Australia
    'GB': 8310,    // Great Britain
    'RU': 9310,    // Russia
    'BR': 6610,    // Brazil
    'IN': 7810,    // India
    'CN': 4310,    // China
    'US': 839,     // USA
    'SA': 410      // Saudi Arabia
};

var markersData = [
    { latLng:[52.50, 13.14],     name:'Berlin'                },
    { latLng:[40.70, -74.25],    name:'New York'              },
    { latLng:[39.93, 115.83],    name:'Beijing'               },    
    { latLng:[55.74, 37.35],     name:'Moscow'                },
    { latLng:[41.0, -71.06],     name:'New England'           },
    { latLng:[-35.28, 149.120],  name:'Canberra'              },
    { latLng:[-23.68, -46.87],   name:'Sao Paulo'             },
    { latLng:[42.5,1.51],        name:'Andorra'               }
];


var defaultColors = {
    markerColor:  '#23b7e5',      // the marker points
    bgColor:      'transparent',      // the background
    scaleColors:  ['#878c9a'],    // the color of the region in the serie
    regionFill:   '#bbbec6'       // the base region color
};

// Class definition
class VectorMap {

    constructor(element, seriesData, markersData) {

        if (!element || !element.length) return;

        var attrs = element.data(),
        mapHeight = attrs.height || '300',
        options = {
            markerColor: attrs.markerColor || defaultColors.markerColor,
            bgColor: attrs.bgColor || defaultColors.bgColor,
            scale: attrs.scale || 1,
            scaleColors: attrs.scaleColors || defaultColors.scaleColors,
            regionFill: attrs.regionFill || defaultColors.regionFill,
            mapName: attrs.mapName || 'world_mill_en'
        };

        element.css('height', mapHeight);

        this.init(element, options, seriesData, markersData);
    }

    init($element, opts, series, markers) {

        $element.vectorMap({
            map: opts.mapName,
            backgroundColor: opts.bgColor,
            zoomMin: 1,
            zoomMax: 8,
            zoomOnScroll: false,
            regionStyle: {
                initial: {
                    'fill': opts.regionFill,
                    'fill-opacity': 1,
                    'stroke': 'none',
                    'stroke-width': 1.5,
                    'stroke-opacity': 1
                },
                hover: {
                    'fill-opacity': 0.8
                },
                selected: {
                    fill: 'blue'
                },
                selectedHover: {}
            },
            focusOn: {
                x: 0.4,
                y: 0.6,
                scale: opts.scale
            },
            markerStyle: {
                initial: {
                    fill: opts.markerColor,
                    stroke: opts.markerColor
                }
            },
            onRegionLabelShow: function(e, el, code) {
                if (series && series[code])
                    el.html(el.html() + ': ' + series[
                        code] + ' visitors');
            },
            markers: markers,
            series: {
                regions: [{
                    values: series,
                    scale: opts.scaleColors,
                    normalizeFunction: 'polynomial'
                }]
            },
        });

    } // end init
};


export default function () {

    var element = $(this);
    // New vector map instance
    new VectorMap(element, seriesData, markersData);

}
