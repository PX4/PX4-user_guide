---
canonicalUrl: https://docs.px4.io/main/tr/middleware/uorb_graph
---

# uORB Publication/Subscription Graph

This page provides a uORB publication/subscription graph that shows the communication between modules. It is based on information that is extracted directly from the source code. Usage instructions are provided [below](#graph-properties).


Search: <input id="search" type="text" /> Preset: <select id ="select-graph" name="select-graph"> <option value='graph_full_no_mavlink.json'>All Modules (w/o mavlink)</option> <option value='graph_full.json'>All Modules</option> <option value='graph_px4_sitl.json'>SITL Modules</option> <option value='graph_px4_fmu-v5.json'>FMUv5 Modules</option> <option value='graph_px4_fmu-v4.json'>FMUv4 Modules</option> <option value='graph_px4_fmu-v2.json'>FMUv2 Modules</option> </select>
<br/>
<svg id="svg-graph" width="1200" height="1400" style="text-align: center; margin-left: -230px; margin-right: -230px;"></svg>
<script type="application/javascript" src="https://d3js.org/d3.v4.min.js" asysc></script>
<script type="application/javascript" src="uorb_graph.js" asysc></script>

## Graph Properties

The graph has the following properties:

- Modules are shown in gray with rounded corners while topics are displayed as coloured rectangular boxes.
- Associated modules and topics are connected by lines. Dashed lines indicate that the module publishes the topic, solid lines indicate that the module subscribes to the topic, while dot-dashed lines indicate that the module both publishes and subscribes to the topic.
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

