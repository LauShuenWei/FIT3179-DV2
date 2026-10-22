var chart01 = "vegalite/01_observation_density_grid.json";

vegaEmbed("#chart01", chart01, {
    actions: false,
    bind: "#chart01-controls"
}).then(function(result) {

    console.log("Chart 01 loaded successfully");

    var view = result.view;


    function updateChart01Insight(value) {

        var kicker =
            document.getElementById("chart01-kicker");

        var title =
            document.getElementById("chart01-insight-title");

        var bigNumber =
            document.getElementById("chart01-big-number");

        var mainLabel =
            document.getElementById("chart01-main-label");

        var text =
            document.getElementById("chart01-insight-text");

        var highlight =
            document.getElementById("chart01-highlight");


        if (value === "Species richness") {

            kicker.textContent =
                "Recorded species richness";

            title.textContent =
                "Richness follows a broader spatial pattern";

            bigNumber.textContent =
                "399";

            mainLabel.textContent =
                "recorded species in the highest-richness 0.25° grid cell";

            text.innerHTML =
                "High-richness cells are concentrated along parts of " +
                "<strong>eastern Australia</strong>, especially in south-east Queensland, " +
                "but the pattern is broader than the strongest recording hotspots.";

            highlight.innerHTML =
                "Recorded richness is influenced by " +
                "<strong>observation effort</strong>, so darker cells " +
                "should not be interpreted as direct measures of total biodiversity.";

        }

        else {

            kicker.textContent =
                "Observation records";

            title.textContent =
                "Recording activity clusters around major population centres";

            bigNumber.textContent =
                "49,601";

            mainLabel.textContent =
                "records in the highest-recorded 0.25° grid cell";

            text.innerHTML =
                "Prominent recording clusters occur around " +
                "<strong>Melbourne, Canberra, Sydney and Brisbane</strong>, " +
                "with much lower recording activity across large inland areas.";

            highlight.innerHTML =
                "The map mainly reflects " +
                "<strong>where people record wildlife</strong>, not where " +
                "wildlife is most abundant.";
        }
    }


    /* Initial takeaway */
    updateChart01Insight(
        view.signal("measure")
    );


    /* Update takeaway when radio button changes */
    view.addSignalListener(
        "measure",
        function(name, value) {

            updateChart01Insight(value);

        }
    );

}).catch(console.error);

var chart02 = "vegalite/02_state_species_richness.json";

vegaEmbed("#chart02", chart02, {
    actions: false
}).then(function(result) {

    console.log("Chart 02 loaded successfully");

    var view = result.view;
    var lastState = "";

    view.addEventListener(
        "pointermove",
        function(event, item) {

            if (!item || !item.datum) {
                return;
            }

            var stateName = "";

            // Hovering over the map polygon
            if (
                item.datum.properties &&
                item.datum.properties.state_name_2021
            ) {
                stateName =
                    item.datum.properties.state_name_2021;
            }

            // Hovering over the text label
            else if (item.datum.state_name) {
                stateName =
                    item.datum.state_name;
            }

            if (
                stateName &&
                stateName !== lastState
            ) {

                lastState = stateName;

                view.signal(
                    "hoverState",
                    stateName
                );

                view.runAsync();
            }
        }
    );


    document
        .getElementById("chart02")
        .addEventListener(
            "mouseleave",
            function() {

                lastState = "";

                view.signal(
                    "hoverState",
                    ""
                );

                view.runAsync();
            }
        );

}).catch(console.error);

var chart03 = "vegalite/03_overall_group_composition.json";

vegaEmbed("#chart03", chart03, {
    actions: false
}).then(function(result) {
    console.log("Chart 03 loaded successfully");
}).catch(console.error);

var chart04 = "vegalite/04_state_group_lollipop.json";

vegaEmbed("#chart04", chart04, {
    actions: false
}).then(function(result) {
    console.log("Chart 04 loaded successfully");
}).catch(console.error);

var chart05 = "vegalite/05_group_spatial_distribution.json";

vegaEmbed("#chart05", chart05, {
    actions: false
}).then(function(result) {
    console.log("Chart 05 loaded successfully");
}).catch(console.error);

var chart06 = "vegalite/06_group_month_radial.json";

vegaEmbed("#chart06", chart06, {
    actions: false
}).then(function(result) {
    console.log("Chart 06 loaded successfully");
}).catch(console.error);

var chart07 = "vegalite/07_seasonal_composition.json";

vegaEmbed("#chart07", chart07, {
    actions: false,
    bind: "#chart07-controls"
}).then(function(result) {
    console.log("Chart 07 loaded successfully");
}).catch(console.error);

var chart08 = "vegalite/08_annual_group_trend.json";

vegaEmbed("#chart08", chart08, {
    actions: false
}).then(function(result) {

    console.log("Chart 08 loaded successfully");

    var view = result.view;

    var panel = document.getElementById("chart08-insight");
    var yearElement = document.getElementById("chart08-year");
    var groupElement = document.getElementById("chart08-group");
    var countElement = document.getElementById("chart08-count");
    var growthElement = document.getElementById("chart08-growth");
    var textElement = document.getElementById("chart08-text");

    var groupColours = {
        "Bird": "#729fc7",
        "Mammal": "#d5a354",
        "Reptile": "#67a98d",
        "Amphibian": "#c989ae"
    };

    function resetInsight() {

        panel.style.setProperty("--chart08-accent", "#4f7159");

        yearElement.textContent = "2018–2024";

        groupElement.textContent =
            "Compare recording growth";

        countElement.textContent =
            "2018 = 100";

        growthElement.textContent =
            "Indexed to each animal group's own 2018 level";

        textElement.textContent =
            "Hover over a point to compare how recording activity changed for birds, mammals, reptiles and amphibians.";
    }

    function updateInsight(datum) {

        if (
            !datum ||
            !datum.animal_group ||
            datum.animal_group === "All" ||
            datum.year === undefined ||
            datum.observation_count === undefined ||
            datum.growth_index === undefined
        ) {
            return;
        }

        var group = datum.animal_group;
        var year = datum.year;

        var count =
            Number(datum.observation_count);

        var index =
            Number(datum.growth_index);

        var multiple =
            index / 100;

        var percentChange =
            index - 100;


        panel.style.setProperty(
            "--chart08-accent",
            groupColours[group] || "#4f7159"
        );

        yearElement.textContent =
            year;

        groupElement.textContent =
            group;

        countElement.textContent =
            count.toLocaleString() + " records";

        if (Number(year) === 2018) {

            growthElement.textContent =
                "Baseline year · Growth index 100";

            textElement.textContent =
                "2018 is used as the baseline for comparing changes in " +
                group.toLowerCase() +
                " recording activity.";

        } else {

            growthElement.textContent =
                multiple.toFixed(1) +
                "× the 2018 level · " +
                (percentChange >= 0 ? "+" : "") +
                percentChange.toFixed(0) +
                "%";


            textElement.textContent =
                group +
                " recording activity in " +
                year +
                " was about " +
                multiple.toFixed(1) +
                " times its 2018 level.";
        }
    }

    view.addEventListener(
        "pointermove",
        function(event, item) {

            if (
                item &&
                item.datum &&
                item.datum.animal_group
            ) {

                // Highlight this animal group and fade the others
                view.signal(
                    "hoverGroup",
                    item.datum.animal_group
                ).runAsync();


                // Only update the explanation when a yearly point is available
                if (item.datum.year !== undefined) {
                    updateInsight(item.datum);
                }
            }
        }
    );

    document
        .getElementById("chart08")
        .addEventListener(
            "mouseleave",
            function() {

                view.signal(
                    "hoverGroup",
                    ""
                ).runAsync();

                resetInsight();
            }
        );


    resetInsight();

}).catch(console.error);

var chart09 = "vegalite/09_rainfall_temperature_heatmap.json";

vegaEmbed("#chart09", chart09, {
    actions: false,
    bind: "#chart09-controls"
}).then(function(result) {

    console.log("Chart 09 loaded successfully");

    var view = result.view;
    var lastHoverKey = "";

    view.addEventListener(
        "pointermove",
        function(event, item) {

            if (
                item &&
                item.datum &&
                item.datum.temperature_bin !== undefined &&
                item.datum.rainfall_bin !== undefined
            ) {

                var temp =
                    Number(item.datum.temperature_bin);

                var rain =
                    Number(item.datum.rainfall_bin);

                var hoverKey =
                    temp + "-" + rain;

                if (hoverKey !== lastHoverKey) {

                    lastHoverKey = hoverKey;

                    view.signal("hoverTemp", temp);
                    view.signal("hoverRain", rain);

                    view.runAsync();
                }
            }
        }
    );


    document
        .getElementById("chart09")
        .addEventListener(
            "mouseleave",
            function() {

                lastHoverKey = "";

                view.signal("hoverTemp", -999);
                view.signal("hoverRain", -999);

                view.runAsync();
            }
        );

}).catch(console.error);

var chart10 = "vegalite/10_rainfall_by_group.json";

vegaEmbed("#chart10", chart10, {
    actions: false
}).then(function(result) {
    console.log("Chart 10 loaded successfully");
}).catch(console.error);

var chart11 = "vegalite/11_temperature_distribution_by_group.json";

vegaEmbed("#chart11", chart11, {
    actions: false
}).then(function(result) {
    console.log("Chart 11 loaded successfully");
}).catch(console.error);

var chart12 = "vegalite/12_climate_species_richness.json";

vegaEmbed("#chart12", chart12, {
    actions: false
}).then(function(result) {
    console.log("Chart 12 loaded successfully");
}).catch(console.error);