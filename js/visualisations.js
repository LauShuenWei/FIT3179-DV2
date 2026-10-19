var chart06 = "vegalite/06_group_month_heatmap.json";

vegaEmbed("#chart06", chart06, {
    actions: false
}).then(function(result) {
    console.log("Chart 06 loaded successfully");
}).catch(console.error);