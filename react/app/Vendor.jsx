// Modernizr
import '../bower_components/modernizr/modernizr.custom.js';
// jQuery
import '../bower_components/jquery/dist/jquery.js';
// jQuery-Storage-API
import '../bower_components/jQuery-Storage-API/jquery.storageapi.js';
// jquery.easing
import '../bower_components/jquery.easing/js/jquery.easing.js';
// Whirl
import '../bower_components/whirl/dist/whirl.css';
// Animo
import '../bower_components/animo.js/animo.js';
// Font Awesome
import '../bower_components/fontawesome/css/font-awesome.min.css';
// Animate.CSS
import '../bower_components/animate.css/animate.min.css';
// Simple line icons
import '../bower_components/simple-line-icons/css/simple-line-icons.css';
// Localization
import '../bower_components/jquery-localize-i18n/dist/jquery.localize.js';
// Screenfull
window.screenfull = require('../bower_components/screenfull/dist/screenfull.js');
// Weather Icons
import '../bower_components/weather-icons/css/weather-icons.min.css';
import '../bower_components/weather-icons/css/weather-icons-wind.min.css';
// fastclick
import '../bower_components/fastclick/lib/fastclick.js';
// jQuery UI
import '../bower_components/jquery-ui/jquery-ui.js';
import '../bower_components/jqueryui-touch-punch/jquery.ui.touch-punch.min.js';
// Slimscroll
import '../bower_components/slimScroll/jquery.slimscroll.min.js';
// Gmap
import '../bower_components/jQuery-gMap/jquery.gmap.min.js';
// Vector Maps
import '../bower_components/ika.jvectormap/jquery-jvectormap-1.2.2.min.js';
import '../bower_components/ika.jvectormap/jquery-jvectormap-world-mill-en.js';
import '../bower_components/ika.jvectormap/jquery-jvectormap-us-mill-en.js';
import '../bower_components/ika.jvectormap/jquery-jvectormap-1.2.2.css';
// Datatables
$.fn.dataTable = require('datatables.net-bs')(window, $);
require('datatables.net-buttons')(window, $);
require('datatables.net-buttons-bs')(window, $);
require('datatables.net-responsive')(window, $);
require('datatables.net-responsive-bs')(window, $);
require('datatables.net-buttons/js/buttons.colVis.js')(window, $); // Column visibility
require('datatables.net-buttons/js/buttons.html5.js')(window, $); // HTML 5 file export
require('datatables.net-buttons/js/buttons.flash.js')(window, $); // Flash file export
require('datatables.net-buttons/js/buttons.print.js')(window, $); // Print view button
import '../bower_components/dataTables.fontAwesome/index.css';
// JQ Grid
import '../bower_components/jqgrid/css/ui.jqgrid.css';
import '../bower_components/jqgrid/js/jquery.jqGrid.js';
import '../bower_components/jqgrid/js/i18n/grid.locale-en.js';
import '../bower_components/jquery-ui/themes/smoothness/jquery-ui.css';
// Fileupload
import '../bower_components/blueimp-file-upload/css/jquery.fileupload.css';
import '../bower_components/blueimp-file-upload/js/jquery.fileupload.js';
// Wizard
import '../bower_components/jquery.steps/build/jquery.steps.js';
// Validation
import '../bower_components/jquery-validation/dist/jquery.validate.js';
import '../bower_components/bootstrap/js/tooltip.js';
import '../bower_components/bootstrap/js/popover.js';
// Parsley
import '../bower_components/parsleyjs/dist/parsley.min.js';
// Datetime picker
import '../bower_components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js';
import '../bower_components/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css';
// Colorpicker
import '../bower_components/mjolnic-bootstrap-colorpicker/dist/css/bootstrap-colorpicker.css';
import '../bower_components/mjolnic-bootstrap-colorpicker/dist/js/bootstrap-colorpicker.js';
// Image Cropper
import '../bower_components/cropper/dist/cropper.css';
import '../bower_components/cropper/dist/cropper.js';
// Select 2
import '../bower_components/select2/dist/css/select2.css';
import '../bower_components/select2/dist/js/select2.js';
import '../bower_components/select2-bootstrap-theme/dist/select2-bootstrap.css';
// Input Mask
import '../bower_components/jquery.inputmask/dist/jquery.inputmask.bundle.js';
// Chosen
import '../bower_components/chosen_v1.2.0/chosen.jquery.min.js';
import '../bower_components/chosen_v1.2.0/chosen.min.css';
// Bootstrap slider
import '../bower_components/seiyria-bootstrap-slider/dist/bootstrap-slider.min.js';
import '../bower_components/seiyria-bootstrap-slider/dist/css/bootstrap-slider.min.css';
// Bootstrap wysiwig
import '../bower_components/bootstrap-wysiwyg/bootstrap-wysiwyg.js';
import '../bower_components/bootstrap-wysiwyg/external/jquery.hotkeys.js';
// Filestyle
import '../bower_components/bootstrap-filestyle/src/bootstrap-filestyle.js';
// Tags Input
import '../bower_components/bootstrap-tagsinput/dist/bootstrap-tagsinput.css';
import '../bower_components/bootstrap-tagsinput/dist/bootstrap-tagsinput.min.js';
// X-Editable
import '../bower_components/x-editable/dist/bootstrap3-editable/js/bootstrap-editable.js';
import '../bower_components/x-editable/dist/bootstrap3-editable/css/bootstrap-editable.css';
// Sweet Alert (global access for other scripts)
import '../bower_components/sweetalert/dist/sweetalert.css';
window.swal = require('../bower_components/sweetalert/lib/sweetalert.js');
// CSS Loaders
import '../bower_components/loaders.css/loaders.css';
import '../bower_components/spinkit/css/spinkit.css';
// Bootstrap Tour
import '../bower_components/bootstrap-tour/build/css/bootstrap-tour-standalone.css';
// import '../bower_components/bootstrap-tour/build/js/bootstrap-tour-standalone.js';
// Sortable
window.sortable = require('../bower_components/html.sortable/dist/html.sortable.js');
// Nestable
import '../bower_components/nestable/jquery.nestable.js';
// Flot Charts
import '../bower_components/flot/jquery.flot.js';
import '../bower_components/flot.tooltip/js/jquery.flot.tooltip.min.js';
import '../bower_components/flot/jquery.flot.resize.js';
import '../bower_components/flot/jquery.flot.pie.js';
import '../bower_components/flot/jquery.flot.time.js';
import '../bower_components/flot/jquery.flot.categories.js';
import '../bower_components/flot-spline/js/jquery.flot.spline.min.js';
// ChartJS
window.Chart = require('../bower_components/chart.js/dist/Chart.js');
// Rickshaw
import '../bower_components/rickshaw/rickshaw.min.css';
window.Rickshaw = require('../bower_components/rickshaw/rickshaw.js');
// Morris JS
window.Raphael = require('../bower_components/raphael/raphael.js');
import '../bower_components/morris.js/morris.js';
import '../bower_components/morris.js/morris.css';
// Chartist
import '../bower_components/matchMedia/matchMedia.js';
import '../bower_components/chartist/dist/chartist.min.css';
window.Chartist = require('../bower_components/chartist/dist/chartist.js');
// Knob charts
import '../bower_components/jquery-knob/js/jquery.knob.js';
// Easypie charts
import '../bower_components/jquery.easy-pie-chart/dist/jquery.easypiechart.js';
// Sparkline chart
import '../bower_components/sparkline/index.js';
// Blueimp
import '../bower_components/blueimp-load-image/js/load-image.all.min.js';
import '../bower_components/blueimp-canvas-to-blob/js/canvas-to-blob.js';
import '../bower_components/blueimp-tmpl/js/tmpl.js';
// Fullcalendar
import '../bower_components/fullcalendar/dist/fullcalendar.min.js';
import '../bower_components/fullcalendar/dist/fullcalendar.css';
import '../bower_components/fullcalendar/dist/gcal.js';
// JQ Cloud
import '../bower_components/jqcloud2/dist/jqcloud.css';
import '../bower_components/jqcloud2/dist/jqcloud.js';
// Flatdocs
import '../bower_components/flatdoc/flatdoc.js';
