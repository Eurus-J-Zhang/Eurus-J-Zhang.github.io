
    $(".submitbutton").click(function(){
        const values = [];
        $("#leftValues option").each(function()
        {
            // Add $(this).val() to your list
            values.push($(this).val());
        });
        alert("Submitted: " + values.join(', '));
    })


    $("#btnLeft").click(function () {
        var selectedItem = $("#rightValues option:selected");
        $("#leftValues").append(selectedItem);
    });
    
    $("#btnRight").click(function () {
        var selectedItem = $("#leftValues option:selected");
        $("#rightValues").append(selectedItem);
    });
    

    $("#btnLeft").click(function(){
        const random_number = Math.floor(Math.random() * 8)+1;
        const random_value = "X".concat(random_number.toString());
        $("#recommendataion").innerHTML = "Variable review recommendation: ".concat(random_value);
        const myDataAI = generateDataPairFromX(allData[random_value],allData.Y);
        const myChartAI = createChart(myDataAI, 'chart-container-AI', random_value, 'Y');
        console.log('ready :)');
        $('#trybuttontwo').style.visibility="visible";
        $("#trybuttontwo").click(function(){
            const myData = generateDataPairFromX(allData[random_value], allData.Y);
            const myDataTwo = generateDataPairFromX(allData[random_value], allData[random_value]);
            const myChart = createChart(myData, 'chart-container', random_value, 'Y');
            const myChartTwo = createChart(myDataTwo, 'chart-container-two',random_value, random_value);
            console.log('ready :)');
            console.log(random_value);
        })
    });

    $("#btnRight").click(function(){
        const random_number = Math.floor(Math.random() * 8)+1;
        const random_value = "X".concat(random_number.toString());
        $("recommendataion").innerHTML = "Variable review recommendation: ".concat(random_value);
        const myDataAI = generateDataPairFromX(allData[random_value],allData.Y);
        const myChartAI = createChart(myDataAI, 'chart-container-AI', random_value, 'Y');
        console.log('ready :)');
        $('#trybuttontwo').style.visibility="visible";
        $("#trybuttontwo").click(function(){
            const myData = generateDataPairFromX(allData[random_value], allData.Y);
            const myDataTwo = generateDataPairFromX(allData[random_value], allData[random_value]);
            const myChart = createChart(myData, 'chart-container', random_value, 'Y');
            const myChartTwo = createChart(myDataTwo, 'chart-container-two',random_value, random_value);
            console.log('ready :)');
            console.log(random_value);
        })
    });


    let m1,m2,n=[],
        mainObj = {};

    let datapairxy =[];
    let datapairxx =[];

    let allData;


    function generateDataPairFromX(x, y){
        const data = [];
        for (var i=0; i<x.length;i++){
            data.push({
                x: x[i],
                y: y[i]
            })
        }
        return data;
    };

function createChart(data, containerId, xID, yID){
    var container = document.getElementById(containerId);
    container.innerHTML = '';
    var canvas = document.createElement('canvas');
    container.appendChild(canvas);
    return new Chart(canvas, {
        type: 'scatter',
        data: {     
            datasets: [{
                label: 'Dataset',
                data: data,

            }]
        },
        options: {
            scales:{
                xAxes:[{
                    scaleLabel: {
                      display: true,
                      labelString: xID,
                    }
                }],
                yAxes:[{
                    scaleLabel: {
                      display: true,
                      labelString: yID
                    }
                }]
            }
        }   
    });
}


$('select#variable-one').click(function(){
    const userSelectedX = document.getElementById("variable-one").value;
    const myData = generateDataPairFromX(allData[userSelectedX], allData.Y);
    console.log(allData)
    const myChart = createChart(myData, 'chart-container', userSelectedX, 'Y');
    console.log('ready :)');
})

$("select#variable-two").click(function(){
    const userSelectedXleft = document.getElementById("variable-two").value;
    const userSelectedXbottom = document.getElementById("variable-three").value;
    const myDataTwo = generateDataPairFromX(allData[userSelectedXbottom],allData[userSelectedXleft]);
    const myChartTwo = createChart(myDataTwo, 'chart-container-two',userSelectedXbottom, userSelectedXleft);
    console.log('ready :)');
})

$('select#variable-three').click(function(){
    const userSelectedXleft = document.getElementById("variable-two").value;
    const userSelectedXbottom = document.getElementById("variable-three").value;
    const myDataTwo = generateDataPairFromX(allData[userSelectedXbottom],allData[userSelectedXleft]);
    const myChartTwo = createChart(myDataTwo, 'chart-container-two',userSelectedXbottom, userSelectedXleft);
    console.log('ready :)');
})

document.querySelector('#trybuttontwo').style.visibility="hidden";

fetch("./data.json")
    .then(response => response.json())
    .then(data=>{
        allData = data;
        const myData = generateDataPairFromX(allData.X1, allData.Y);
        const myChart = createChart(myData, 'chart-container', 'X1', 'Y');
        const myDataTwo = generateDataPairFromX(allData.X1, allData.X1);
        const myChartTwo = createChart(myDataTwo, 'chart-container-two','X1', 'X1');
    });

