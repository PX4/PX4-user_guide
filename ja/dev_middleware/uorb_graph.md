# uORB Publication/Subscription Graph
<!--
Note: this page is disabled for now, as the graph is too incomplete and requires support for uORB::Subscription, uORB::Publication and library code
-->

This page provides a uORB publication/subscription graph that shows the communication between modules. It is based on information that is extracted directly from the source code. Usage instructions are provided [below](#instructions).


Search: <input id="search" type="text" /> Preset: <select id ="select-graph" name="select-graph"> <option value='graph_px4fmu-v4.json'>FMUv4 Modules</option> <option value='graph_px4fmu-v2.json'>FMUv2 Modules</option> <option value='graph_sitl.json'>SITL Modules</option> <option value='graph_runtime_sitl.json'>SITL Runtime Modules</option> <option value='graph_full.json'>All Modules</option> </select>
<br/>
<!-- use an absolute position to allow it to overflow to the left and the right -->
<svg width="1200" height="1200" style="position: absolute; left: -9999px; right: -9999px; margin: auto;"></svg>
<script src="https://d3js.org/d3.v4.min.js"></script>

<!-- the position of the svg is absolute, so we add a div with the necessary spacing -->
<div style="height: 1210px;"></div>

<script>

// the d3.js script might not yet be loaded (because it's not in <head>), so we
// wrap everything in a function and retry until d3 is available
function initializeGraph() {
    if (typeof d3 === 'undefined') {
        // try again later
        setTimeout(initializeGraph, 500);
        return;
    }


var graph_option = document.getElementById("select-graph");
var default_json_file = graph_option.value;
var minOpacity = 0.1; // opacity when a node/link is faded

/* search field: highlight all matching nodes on text change */
var g_filterText = "";
function searchTextChanged() {
    var textField = document.getElementById("search");
    var searchText = textField.value;
    var opacity = minOpacity;
    if (searchText == "" || document.activeElement != textField) {
        opacity = 1;
        g_filterText = "";
    } else {
        g_filterText = searchText;
    }!!crwd_CB_10_BC_dwrc!!}
document.getElementById("search").addEventListener("keyup", searchTextChanged);
document.getElementById("search").addEventListener("focusout", searchTextChanged);
document.getElementById("search").addEventListener("focusin", searchTextChanged);
document.getElementById("select-graph").addEventListener("change", reloadSimulation);



var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");


var collisionForce = rectCollide()
    .size(function (d) { return [d.width+10, d.height+6]; });

var boxForce = boundedBox()
    .bounds([[0, 0], [width, height]])
    .size(function (d) { return [d.width, d.height]; });

var simulation = d3.forceSimulation()
    .velocityDecay(0.3) // default: 0.4
    // alpha: initially 1, then reduced at each step, reducing the forces, so
    // that the simulation comes to a stop eventually
    .alphaMin(0.0001) // default: 0.001
    .alphaDecay(0.0428) // default: 0.0228
    //.alphaTarget(1) // enabling this will make sure the simulation never comes
    // to a stop (and the nodes will either keep fighting for their position, or
    // find an equilibrium)
    .force("link", d3.forceLink().id(function(d) { return d.id; })
    .distance(100)//.strength(0.02) // default: 30, 1 / Math.min(count(link.source), count(link.target));
        // distance: desired link distance
//      .iterations(1) // default: 1, greater = increased rigidity
    )
    .force("charge", d3.forceManyBody().strength(-250)) // decrease to make the
           // graph spread more (distance has a similar effect, but affects the
           // leaf nodes more)
    .force('box', boxForce) // keep the nodes inside the visible area
    .force('collision', collisionForce)
    .force("center", d3.forceCenter(width / 2, height / 2));

// SVG elements
var node = null;
var text = null;
var link = null;

function loadSimulation(json_file_name) {!!crwd_CB_11_BC_dwrc!!}

function reloadSimulation(e) {
    json_file_name = e.target.value;
    console.log(json_file_name);
    d3.selectAll("svg > *").remove();
    loadSimulation(json_file_name);
    simulation.alpha(1).restart();
}

/* initial graph */
loadSimulation(default_json_file);


function rectCollide() {
    var nodes, sizes, masses;
    var size = constant([0, 0]);
    var strength = 0.3;
    var iterations = 20;!!crwd_CB_12_BC_dwrc!!}

function boundedBox() {
    var nodes, sizes;
    var bounds;
    var size = constant([0, 0]);!!crwd_CB_13_BC_dwrc!!}


function constant(_) {
    return function () { return _; }
}

} // initializeGraph()

initializeGraph();

</script>

<a id="instructions"></a>

## Graph Properties
The graph has the following properties:

- Modules are shown in gray with rounded corners while topics are displayed as coloured rectangular boxes.
- Associated modules and topics are connected by lines. Dashed lines indicate that the module publishes the topic, while solid lines indicate that the module subscribes to the topic.
- Some modules and topics are excluded:
  - Topics that are subscribed/published by many modules: `parameter_update`, `mavlink_log` and `log_message`.
  - The set of logged topics.
  - Topics that have no subscriber or no publisher.
  - Modules in **src/examples**.
- Hovering over a module/topic highlights all its connections.
- Double-clicking on a topic opens its message definition.
- Make sure your browser window is wide enough to display the full graph (the sidebar menu can be hidden with the icon in the top-left corner). You can also zoom the image.
- The *Preset* selection list allows you to refine the list of modules that are shown.
- The *Search* box can be used to find particular modules/topics (topics that are not selected by the search are greyed-out).

