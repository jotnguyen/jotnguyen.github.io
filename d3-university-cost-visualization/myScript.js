var nuSlider = document.getElementById('nuslider');
console.log("noUiSlider"+noUiSlider)

range.style.height = '400px';
range.style.width = '400px';
noUiSlider.create(nuSlider, {
    start: [0, 100],
    step: 1,
    connect: true,
    range: {
        'min': 0,
        'max': 100
    },
    tooltips: true
});

var stepSliderValueElement = document.getElementById('slider-step-value');
// console.log('stepslidervalueelement'+stepSliderValueElement)




var margin = {
    top : 20,
    right : 20,
    bottom : 30,
    left : 40
}, width = 725 - margin.left - margin.right, height = 600 - margin.top - margin.bottom;

var x = d3.scaleLinear()
    .range([0, width]);

var y = d3.scaleLinear()
    .range([height, 0]);

var formatCurrency = d3.format(",");

var div = d3.select("body")
    .append("div")
        .attr("id", "schoolinfo")
        .style("opacity", 0);

//var color = d3.scale.category10();
var color = d3.scaleOrdinal()
    .domain([1, 2, 3])
    .range(["rgb(53,135,212)", "rgb(77, 175, 74)", "rgb(228, 26, 28)"]);

// var xAxis = d3.svg.axis()
//     .scale(x)
//     .orient("bottom");

var x_axis = d3.axisBottom(x)

var y_axis = d3.axisLeft(y)

// Title


var svg = d3.select("#chart")
    .append("svg")
        .attr("class", "chart")
        .attr("viewBox", "0 0 725 700")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom )
    .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", 10 - (margin.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .style("text-decoration", "underline")  
        .text("Undergraduate Costs of Universities in Southern States from 2009 - 2018");
//legend x and y position
var LYP = 300, 
    LXP = 700;
console.log("legend test21")
svg.append("text").attr("class", "label").attr("x", LXP - 5).attr("y", LYP).text("Institution Type").style("font-weight", "bold");

//legend colors
svg.append("circle").attr("cx", LXP).attr("cy", LYP + 20).attr("r", 12).style("fill", "rgb(77, 175, 74)").attr("stroke", "#000");
svg.append("text").attr("class", "label").attr("x", LXP + 15).attr("y", LYP + 25).style("text-anchor", "start").text(function(d) {
    return "Public";
});
svg.append("circle").attr("cx", LXP).attr("cy", LYP + 50).attr("r", 12).style("fill", "rgb(53, 135, 212)").attr("stroke", "#000");
svg.append("text").attr("class", "label").attr("x", LXP + 15).attr("y", LYP + 55).style("text-anchor", "start").text(function(d) {
    return "Private Non-profit";
});
svg.append("circle").attr("cx", LXP).attr("cy", LYP + 80).attr("r", 12).style("fill", "rgb(228, 26, 28)").attr("stroke", "#000");
svg.append("text").attr("class", "label").attr("x", LXP + 15).attr("y", LYP + 85).style("text-anchor", "start").text(function(d) {
    return "Private For-profit";
});
svg.append("text").attr("class", "label").attr("x", LXP - 5).attr("y", LYP + 110).text("Enrollment").style("font-weight", "bold");

//legend sizing
svg.append("circle").attr("cx", LXP).attr("cy", LYP + 30 + 110).attr("r", 20).style("fill", "#bbb").attr("stroke", "#000");
svg.append("text").attr("class", "label").attr("x", LXP + 25).attr("y", LYP + 140).style("text-anchor", "start").text("27,000+");
svg.append("circle").attr("cx", LXP).attr("cy", LYP + 60 + 110).attr("r", 15).style("fill", "#bbb").attr("stroke", "#000");
svg.append("text").attr("class", "label").attr("x", LXP + 25).attr("y", LYP + 170).style("text-anchor", "start").text("18,000+");
svg.append("circle").attr("cx", LXP).attr("cy", LYP + 80 + 110).attr("r", 9).style("fill", "#bbb").attr("stroke", "#000");
svg.append("text").attr("class", "label").attr("x", LXP + 25).attr("y", LYP + 190).style("text-anchor", "start").text("9,000+");
svg.append("circle").attr("cx", LXP).attr("cy", LYP + 93 + 110).attr("r", 4).style("fill", "#bbb").attr("stroke", "#000");
svg.append("text").attr("class", "label").attr("x", LXP + 25).attr("y", LYP + 210).style("text-anchor", "start").text("100+");

var myData = [];
var institutionType = {
    1: "Public",
    2: "Private Non-profit",
    3: "Private For-profit"
}
// Define the div for the tooltip
var tooltip = d3.select("body").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);

const dataset = d3.csv("./data/AllStateDataCombined.csv", function(error, data) {
    // console.log(error)
    // console.log(data)
    myData.push(error)
    x.domain([0, 80000]).nice();
    y.domain([0, 40000]).nice();
    
    // .then((error) => console.log(myData))
    
    //x axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(x_axis)
        .append("text")
            .attr("class", "label")
            .attr("fill", "black")
            .attr("x", width/1.5)
            .attr("y", 35 )
            .style("text-anchor", "end")
            .text("In-District Tuition and Fees ($)");


    //y axis
    svg.append("g")
        .attr("class", "y axis")
        .call(y_axis)
        .append("text")
            .attr("class", "label")
            .attr("fill", "black")
            .attr("transform", "rotate(-90)")
            .attr("x", -270)
            .attr("y", -50)
            // .attr("dy", ".71em")
            .style("text-anchor", "middle")
            .text("Average Student Loan Total ($)")

    var dots = svg.selectAll(".dot")
        .data(myData)
        .enter()
        .append("circle")
            .attr("class", "dot")
            .attr("r", 
                function(d) {
                    // console.log(d.TotalEnrollment)
                    // console.log(d)
                    if(d.IC2009_AY_RV == "" || d.SFA0910_RV == ""){
                        return 0
                    }
                    return (4 + (d.TotalEnrollment * .000655));
                })
            .attr("cx", function(d) {
                    // Tuition and fees IC
                    // console.log(d.IC2009_AY_RV)
                    return x(d.IC2009_AY_RV);
                })
            .attr("cy", function(d) {
                    // Loan data SFA
                    return y(d.SFA0910_RV);
                })
            .style("fill", function(d) {
                    if (d.Control == 3) {
                        // console.log("3")
                        // Private for-profit
                        return "rgb(228, 26, 28)";
                    } else if (d.Control == 2) {
                        // Private non-profit
                        return "rgb(53, 135, 212)";
                    } else {
                        // public
                        return "rgb(77, 175, 74)";
                    }
                })
            .on("mouseover", function(event, d) {	
                console.log("mouseover"+d.Control)	
                tooltip.transition()		
                    .duration(200)		
                    .style("opacity", .9);		
                tooltip.html(d.InstitutionName+" ("+d.State+")<br/>"+institutionType[d.Control] + "<br/>"+d.PercentUndergradAid+"% of Undergrads given Financial Aid")	
                    .style("left", (event.pageX) + "px")		
                    .style("top", (event.pageY - 28) + "px");	
            })
            .on("mouseout", function(event, d) {		
                tooltip.transition()		
                    .duration(500)		
                    .style("opacity", 0);	
            })
                ;
    // console.log(myData);
    // return myData;

}).then((d) => {
    // console.log(myData)
    return myData
    });

const filterFunctions = dataset.then(function(data){
    console.log(data)
     
})




nuSlider.noUiSlider.on('update', function (values, handle) {
    // console.log("values "+values+"  handle "+handle)
    // console.log("value[0] "+values[0])
    // console.log("value[1] "+values[1])
    // stepSliderValueElement.innerHTML = values[handle];
    console.log("calling filterData")
    filterData(values, updatedStates())
    // updateStates()
});


// function to filter by 
function filterData(sliderInput, stateID){
    // console.log("myData "+myData[])
    // myData.filter(function(d){
    //     console.log(d.PercentUndergradAid)
    //     return d.PercentUndergradAid > values[0]
    // })
    console.log(sliderInput)
    var values = [parseInt(sliderInput[0]), parseInt(sliderInput[1])];
    if(stateID !==  "All"){
        d3.selectAll(".dot") 
        // .attr("r", function(d){
        //     if(d.TotalEnrollment >= values[0] && d.TotalEnrollment <= values[1] ){
        //         return (4 + (d.TotalEnrollment * .000655));
        //     }
        //     else{
        //         return 0;
        //     }
        // })
        .attr("r", function(d){
            if(values[0] == -1 ){
                // values = [0,100]
                var nouslider = document.getElementById('nuslider');
                var sliderValues = nouslider.noUiSlider.get();
                values = [parseInt(sliderValues[0]), parseInt(sliderValues[1])]
                console.log("parsed values"+values)
            }
            switch ($("#slider").val()) {
                case "2009":
                    if (d.SFA0910_RV == "" || d.IC2009_AY_RV == "" || d.State != stateID){
                        // console.log("institution name"+d.InstitutionName)
                        return 0
                    }
                    else if (d.PercentUndergradAid >= values[0] && d.PercentUndergradAid <= values[1]){
                        return (4 + (d.TotalEnrollment * .000655));
                    }

                    break;
                case "2010":
                    if (d.SFA1011_RV == "" || d.IC2010_AY_RV == "" || d.State != stateID){
                        return 0
                    }
                    else if (d.PercentUndergradAid >= values[0] && d.PercentUndergradAid <= values[1]){
                        console.log(values)
                        return (4 + (d.TotalEnrollment * .000655));
                    }

                    break;
                case "2011":
                    // console.log("2011")
                    if (d.SFA1112_RV == "" || d.IC2011_AY_RV == "" || d.State != stateID){
                        console.log("0 radius")
                        return 0
                    }
                    else if (d.PercentUndergradAid >= values[0] && d.PercentUndergradAid <= values[1]){
                        return (4 + (d.TotalEnrollment * .000655));
                    }

                    break;
                case "2012":
                    if (d.SFA1213_RV == "" || d.IC2012_AY == "" || d.State != stateID){
                        return 0
                    }
                    else if (d.PercentUndergradAid >= values[0] && d.PercentUndergradAid <= values[1]){
                        return (4 + (d.TotalEnrollment * .000655));
                    }

                    break;
                case "2013":
                    if (d.SFA1314_RV == "" || d.IC2013_AY == "" || d.State != stateID){
                        return 0
                    }
                    else if (d.PercentUndergradAid >= values[0] && d.PercentUndergradAid <= values[1]){
                        return (4 + (d.TotalEnrollment * .000655));
                    }

                    break;
                case "2014":
                    if (d.SFA1415_RV == "" || d.IC2014_AY == "" || d.State != stateID){
                        return 0
                    }
                    else if (d.PercentUndergradAid >= values[0] && d.PercentUndergradAid <= values[1]){
                        return (4 + (d.TotalEnrollment * .000655));
                    }

                    break;
                case "2015":
                    if (d.SFA1516_RV == "" || d.IC2015_AY == "" || d.State != stateID){
                        return 0
                    }
                    else if (d.PercentUndergradAid >= values[0] && d.PercentUndergradAid <= values[1]){
                        return (4 + (d.TotalEnrollment * .000655));
                    }

                    break;
                case "2016":
                    if (d.SFA1617_RV == "" || d.IC2016_AY == "" || d.State != stateID){
                        return 0
                    }
                    else if (d.PercentUndergradAid >= values[0] && d.PercentUndergradAid <= values[1]){
                        return (4 + (d.TotalEnrollment * .000655));
                    }

                    break;
                case "2017":
                    if (d.SFA1718_RV == "" || d.IC2017_AY == "" || d.State != stateID){
                        return 0
                    }
                    else if (d.PercentUndergradAid >= values[0] && d.PercentUndergradAid <= values[1]){
                        return (4 + (d.TotalEnrollment * .000655));
                    }

                    // return y(d.SFA1718_RV);
                    break;
                case "2018":
                    if (d.SFA1819 == "" || d.IC2018_AY == "" || d.State != stateID){
                        return 0
                    }
                    else if (d.PercentUndergradAid >= values[0] && d.PercentUndergradAid <= values[1]){
                        return (4 + (d.TotalEnrollment * .000655));
                    }

                    // return y(d.SFA1819);
                    break;
            }
        })
        .transition()
        .duration(1000)
        .attr("cy", function(d) {
    
            switch ($("#slider").val()) {
                case "2009":
                    return y(d.SFA0910_RV);
                    break;
                case "2010":
                    return y(d.SFA1011_RV);
                    break;
                case "2011":
                    return y(d.SFA1112_RV);
                    break;
                case "2012":
                    return y(d.SFA1213_RV);
                    break;
                case "2013":
                    return y(d.SFA1314_RV);
                    break;
                case "2014":
                    return y(d.SFA1415_RV);
                    break;
                case "2015":
                    return y(d.SFA1516_RV);
                    break;
                case "2016":
                    return y(d.SFA1617_RV);
                    break;
                case "2017":
                    return y(d.SFA1718_RV);
                    break;
                case "2018":
                    return y(d.SFA1819);
                    break;
            }
        })
        .transition()
        .duration(1000)
        .attr("cx", function(d) {
            switch ($("#slider").val()) {
                case "2009":
                    return x(d.IC2009_AY_RV);
                    break;
                case "2010":
                    return x(d.IC2010_AY_RV);
                    break;
                case "2011":
                    return x(d.IC2011_AY_RV);
                    break;
                case "2012":
                    return x(d.IC2012_AY);
                    break;
                case "2013":
                    return x(d.IC2013_AY);
                    break;
                case "2014":
                    return x(d.IC2014_AY);
                    break;
                case "2015":
                    return x(d.IC2015_AY);
                    break;
                case "2016":
                    return x(d.IC2016_AY);
                    break;
                case "2017":
                    return x(d.IC2017_AY);
                    break;
                case "2018":
                    return x(d.IC2018_AY);
                    break;
            }
        });
    }
    else{
        d3.selectAll(".dot") 
        // .attr("r", function(d){
        //     if(d.TotalEnrollment >= values[0] && d.TotalEnrollment <= values[1] ){
        //         return (4 + (d.TotalEnrollment * .000655));
        //     }
        //     else{
        //         return 0;
        //     }
        // })
        .attr("r", function(d){
            if(values[0] == -1 ){
                // values = [0,100]
                var nouslider = document.getElementById('nuslider');
                var sliderValues = nouslider.noUiSlider.get();
                values = [parseInt(sliderValues[0]), parseInt(sliderValues[1])]
                console.log("parsed values"+values)
            }
            switch ($("#slider").val()) {
                case "2009":
                    if (d.SFA0910_RV == "" || d.IC2009_AY_RV == ""){
                        // console.log("institution name"+d.InstitutionName)
                        return 0
                    }
                    else if (d.PercentUndergradAid >= values[0] && d.PercentUndergradAid <= values[1]){
                        return (4 + (d.TotalEnrollment * .000655));
                    }

                    break;
                case "2010":
                    if (d.SFA1011_RV == "" || d.IC2010_AY_RV == ""){
                        return 0
                    }
                    else if (d.PercentUndergradAid >= values[0] && d.PercentUndergradAid <= values[1]){
                        console.log(values)
                        return (4 + (d.TotalEnrollment * .000655));
                    }

                    break;
                case "2011":
                    // console.log("2011")
                    if (d.SFA1112_RV == "" || d.IC2011_AY_RV == ""){
                        console.log("0 radius")
                        return 0
                    }
                    else if (d.PercentUndergradAid >= values[0] && d.PercentUndergradAid <= values[1]){
                        return (4 + (d.TotalEnrollment * .000655));
                    }

                    break;
                case "2012":
                    if (d.SFA1213_RV == "" || d.IC2012_AY == ""){
                        return 0
                    }
                    else if (d.PercentUndergradAid >= values[0] && d.PercentUndergradAid <= values[1]){
                        return (4 + (d.TotalEnrollment * .000655));
                    }

                    break;
                case "2013":
                    if (d.SFA1314_RV == "" || d.IC2013_AY == ""){
                        return 0
                    }
                    else if (d.PercentUndergradAid >= values[0] && d.PercentUndergradAid <= values[1]){
                        return (4 + (d.TotalEnrollment * .000655));
                    }

                    break;
                case "2014":
                    if (d.SFA1415_RV == "" || d.IC2014_AY == ""){
                        return 0
                    }
                    else if (d.PercentUndergradAid >= values[0] && d.PercentUndergradAid <= values[1]){
                        return (4 + (d.TotalEnrollment * .000655));
                    }

                    break;
                case "2015":
                    if (d.SFA1516_RV == "" || d.IC2015_AY == ""){
                        return 0
                    }
                    else if (d.PercentUndergradAid >= values[0] && d.PercentUndergradAid <= values[1]){
                        return (4 + (d.TotalEnrollment * .000655));
                    }

                    break;
                case "2016":
                    if (d.SFA1617_RV == "" || d.IC2016_AY == ""){
                        return 0
                    }
                    else if (d.PercentUndergradAid >= values[0] && d.PercentUndergradAid <= values[1]){
                        return (4 + (d.TotalEnrollment * .000655));
                    }

                    break;
                case "2017":
                    if (d.SFA1718_RV == "" || d.IC2017_AY == ""){
                        return 0
                    }
                    else if (d.PercentUndergradAid >= values[0] && d.PercentUndergradAid <= values[1]){
                        return (4 + (d.TotalEnrollment * .000655));
                    }

                    // return y(d.SFA1718_RV);
                    break;
                case "2018":
                    if (d.SFA1819 == "" || d.IC2018_AY == ""){
                        return 0
                    }
                    else if (d.PercentUndergradAid >= values[0] && d.PercentUndergradAid <= values[1]){
                        return (4 + (d.TotalEnrollment * .000655));
                    }

                    // return y(d.SFA1819);
                    break;
            }
        })
        .transition()
        .duration(1000)
        .attr("cy", function(d) {
    
            switch ($("#slider").val()) {
                case "2009":
                    return y(d.SFA0910_RV);
                    break;
                case "2010":
                    return y(d.SFA1011_RV);
                    break;
                case "2011":
                    return y(d.SFA1112_RV);
                    break;
                case "2012":
                    return y(d.SFA1213_RV);
                    break;
                case "2013":
                    return y(d.SFA1314_RV);
                    break;
                case "2014":
                    return y(d.SFA1415_RV);
                    break;
                case "2015":
                    return y(d.SFA1516_RV);
                    break;
                case "2016":
                    return y(d.SFA1617_RV);
                    break;
                case "2017":
                    return y(d.SFA1718_RV);
                    break;
                case "2018":
                    return y(d.SFA1819);
                    break;
            }
        })
        .transition()
        .duration(1000)
        .attr("cx", function(d) {
            switch ($("#slider").val()) {
                case "2009":
                    return x(d.IC2009_AY_RV);
                    break;
                case "2010":
                    return x(d.IC2010_AY_RV);
                    break;
                case "2011":
                    return x(d.IC2011_AY_RV);
                    break;
                case "2012":
                    return x(d.IC2012_AY);
                    break;
                case "2013":
                    return x(d.IC2013_AY);
                    break;
                case "2014":
                    return x(d.IC2014_AY);
                    break;
                case "2015":
                    return x(d.IC2015_AY);
                    break;
                case "2016":
                    return x(d.IC2016_AY);
                    break;
                case "2017":
                    return x(d.IC2017_AY);
                    break;
                case "2018":
                    return x(d.IC2018_AY);
                    break;
            }
        });
    }

    return "test";
}








var running = false;
var timer;
$("button").on("click", function() {
    console.log("test")
    var duration = 3000,
        maxstep = 2018,
        minstep = 2009;
    
    if (running == true) {
    
        $("button").html("Play");
        running = false;
        clearInterval(timer);
        
    } 
    else if (running == false) {
    
        $("button").html("Pause");
        
        sliderValue = $("#slider").val();
        
        timer = setInterval( function(){
                if (sliderValue < maxstep){
                    sliderValue++;
                    // console.log(sliderValue)
                    $("#slider").val(sliderValue);
                    $('#range').html(sliderValue);
                }
                $("#slider").val(sliderValue);
                // updateStates()
                update();
                filterData(getPercentageSlider(), updatedStates());
            
        }, duration);
        running = true;
        
        
    }

});

$("#slider").on("change", function(){

    update();
    filterData(getPercentageSlider(), updatedStates());
    // updateStates()
    $("#range").html($("#slider").val());
    clearInterval(timer);
    $("button").html("Play");
});

function update() {

    d3.selectAll(".dot")
        .attr("r", function(d){
            switch ($("#slider").val()) {
                case "2009":
                    if (d.SFA0910_RV == "" || d.IC2009_AY_RV == ""){
                        return 0
                    }
                    else{
                        return (4 + (d.TotalEnrollment * .000655));
                    }
                    break;
                case "2010":
                    if (d.SFA1011_RV == "" || d.IC2010_AY_RV == ""){
                        return 0
                    }
                    else{
                        return (4 + (d.TotalEnrollment * .000655));
                    }
                    break;
                case "2011":
                    // console.log("2011")
                    if (d.SFA1112_RV == "" || d.IC2011_AY_RV == ""){
                        console.log("0 radius")
                        return 0
                    }
                    else{
                        // console.log("non-zero radius"+d.SFA1112_RV)

                        return (4 + (d.TotalEnrollment * .000655));
                    }
                    break;
                case "2012":
                    if (d.SFA1213_RV == "" || d.IC2012_AY == ""){
                        return 0
                    }
                    else{
                        return (4 + (d.TotalEnrollment * .000655));
                    }
                    break;
                case "2013":
                    if (d.SFA1314_RV == "" || d.IC2013_AY == ""){
                        return 0
                    }
                    else{
                        return (4 + (d.TotalEnrollment * .000655));
                    }
                    break;
                case "2014":
                    if (d.SFA1415_RV == "" || d.IC2014_AY == ""){
                        return 0
                    }
                    else{
                        return (4 + (d.TotalEnrollment * .000655));
                    }
                    break;
                case "2015":
                    if (d.SFA1516_RV == "" || d.IC2015_AY == ""){
                        return 0
                    }
                    else{
                        return (4 + (d.TotalEnrollment * .000655));
                    }
                    break;
                case "2016":
                    if (d.SFA1617_RV == "" || d.IC2016_AY == ""){
                        return 0
                    }
                    else{
                        return (4 + (d.TotalEnrollment * .000655));
                    }
                    break;
                case "2017":
                    if (d.SFA1718_RV == "" || d.IC2017_AY == ""){
                        return 0
                    }
                    else{
                        return (4 + (d.TotalEnrollment * .000655));
                    }
                    // return y(d.SFA1718_RV);
                    break;
                case "2018":
                    if (d.SFA1819 == "" || d.IC2018_AY == ""){
                        return 0
                    }
                    else{
                        return (4 + (d.TotalEnrollment * .000655));
                    }
                    // return y(d.SFA1819);
                    break;
            }
        })
        .transition()
        .duration(1000)
        .attr("cy", function(d) {
    
            switch ($("#slider").val()) {
                case "2009":
                    return y(d.SFA0910_RV);
                    break;
                case "2010":
                    return y(d.SFA1011_RV);
                    break;
                case "2011":
                    return y(d.SFA1112_RV);
                    break;
                case "2012":
                    return y(d.SFA1213_RV);
                    break;
                case "2013":
                    return y(d.SFA1314_RV);
                    break;
                case "2014":
                    return y(d.SFA1415_RV);
                    break;
                case "2015":
                    return y(d.SFA1516_RV);
                    break;
                case "2016":
                    return y(d.SFA1617_RV);
                    break;
                case "2017":
                    return y(d.SFA1718_RV);
                    break;
                case "2018":
                    return y(d.SFA1819);
                    break;
            }
        })
        .transition()
        .duration(1000)
        .attr("cx", function(d) {
            switch ($("#slider").val()) {
                case "2009":
                    return x(d.IC2009_AY_RV);
                    break;
                case "2010":
                    return x(d.IC2010_AY_RV);
                    break;
                case "2011":
                    return x(d.IC2011_AY_RV);
                    break;
                case "2012":
                    return x(d.IC2012_AY);
                    break;
                case "2013":
                    return x(d.IC2013_AY);
                    break;
                case "2014":
                    return x(d.IC2014_AY);
                    break;
                case "2015":
                    return x(d.IC2015_AY);
                    break;
                case "2016":
                    return x(d.IC2016_AY);
                    break;
                case "2017":
                    return x(d.IC2017_AY);
                    break;
                case "2018":
                    return x(d.IC2018_AY);
                    break;
            }
        });
};


function getPercentageSlider(){
    var nouslider = document.getElementById('nuslider');
    var sliderValues = nouslider.noUiSlider.get();
    values = [parseInt(sliderValues[0]), parseInt(sliderValues[1])]
    return values;
}

//////////////// Dropdown code

function selectStates(element){
    // console.log(element)
    var stateID = element.options[element.selectedIndex].value;
    // console.log(stateID)
    update();
    filterData(getPercentageSlider(), stateID);
}

function updatedStates(){
    var element = document.getElementById("states");
    // console.log(element)
    var stateID = element.options[element.selectedIndex].value;
    return stateID
}

