var chart04 = "vegalite/04_state_group_lollipop.json";

vegaEmbed("#chart04", chart04, {
    actions: false
}).then(function(result) {
    console.log("Chart 04 loaded successfully");
}).catch(console.error);

var chart06 = "vegalite/06_group_month_heatmap.json";

vegaEmbed("#chart06", chart06, {
    actions: false
}).then(function(result) {
    console.log("Chart 06 loaded successfully");
}).catch(console.error);

var chart07 = "vegalite/07_seasonal_composition.json";

vegaEmbed("#chart07", chart07, {
    actions: false
}).then(function(result) {
    console.log("Chart 07 loaded successfully");
}).catch(console.error);

var chart08 = "vegalite/08_annual_group_trend.json";

vegaEmbed("#chart08", chart08, {
    actions: false
}).then(function(result) {
    console.log("Chart 08 loaded successfully");
}).catch(console.error);