var hodnotaX = [];
var hodnotaY1 = [];
var hodnotaY2 = [];
var updateData = true;
var cosinus = true;
var sinus = true;


if (typeof (EventSource) !== "undefined") {
    var source = new EventSource("http://vmzakova.fei.stuba.sk/sse/sse.php");

    source.addEventListener("message", function (e) {
        var data = JSON.parse(e.data);
        document.getElementById("result").innerHTML = e.data;
        ziskanieHodnot(data);
    }, false);

} else {
    document.getElementById("result").innerHTML = "Sorry, your browser does not support server-sent events...";
}

function ziskanieHodnot(data) {

    var hodnota = document.getElementById('posuvanie').value;
    hodnotaX.push(data.x);
    hodnotaY1.push(data.y1*hodnota);
    hodnotaY2.push(data.y2*hodnota);


    if (updateData == true) {
        nakresliGraf();
    }
}


function nakresliGraf() {


    var trace1 = {
        x: hodnotaX,
        y: hodnotaY1,
        type: 'scatter',
        name: 'Sinus',
        mode: 'line',
        line: {
            color: 'rgb(255, 0, 0)',
            width: 2
        }
    };

    var trace2 = {
        x: hodnotaX,
        y: hodnotaY2,
        type: 'scatter',
        name: 'Cosinus',
        mode: 'line',
        line: {
            color: 'rgb(0, 0, 255)',
            width: 2
        }
    };




    Plotly.newPlot(graf, []);
    if (sinus == true) {
        Plotly.addTraces(graf, trace1);
    }
    if (cosinus == true) {
        Plotly.addTraces(graf, trace2);
    }

}


function vzSinus() {
    var check = document.getElementById('sinus').checked;

    if (check == true) {
        console.log("zakliknute");
        sinus = true;
    } else {
        console.log("nezakliknute");
        sinus = false;
    }
    nakresliGraf();
}

function vzCosinus() {
    var check = document.getElementById('cosinus').checked;

    if (check == true) {
        console.log("zakliknute");
        cosinus = true;
    } else {
        console.log("nezakliknute");
        cosinus = false;
    }
    nakresliGraf();
}

function ukonciVykreslovanie() {
    updateData = false;
}

function zobraz(x) {
    if (x === 1) {
        var check = document.getElementById('vstupText').checked;
        if (check == true) {
            document.getElementById('cislo').style.display = "block";
        } else {
            document.getElementById('cislo').style.display = "none";
        }
    } else if (x === 2) {
        var check = document.getElementById('vstupSlider').checked;
        if (check == true) {
            document.getElementById('posuvanie').style.display = "block";
        } else {
            document.getElementById('posuvanie').style.display = "none";
        }
    }

}
function zmena1(){
    var text = document.getElementById('hodnota');
    var hodnota =document.getElementById("cislo");
    if (hodnota.value>25){
        hodnota.value=25;
    }
    var zmenSlider = document.getElementById("posuvanie");
    zmenSlider.value = hodnota.value;
    text.innerHTML = "Hodnota amplitudy je " + zmenSlider.value;
    console.log(zmenSlider.value);
}
function zmena2(){
    var text = document.getElementById('hodnota');
    var hodnota =document.getElementById("posuvanie");
    var zmenCislo = document.getElementById("cislo");
    zmenCislo.value = hodnota.value;
    text.innerHTML = "Hodnota amplitudy je " + zmenCislo.value;
    console.log(zmenCislo.value);
}

class MojComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
    <div class="container" id="amplituda">
        <input type="checkbox" id="vstupText" name="vstupText" onclick="zobraz(1)" checked>
        <label for="vstupText">Cislo</label>
        
        
        <input type="checkbox" id="vstupSlider" name="vstupSlider" onclick="zobraz(2)" checked>
        <label for="vstupSlider">Slider</label><br>
        
        <input type="number" min="0" max="25" value="1" id="cislo" onchange="zmena1()"><br>
        <input type="range" min="0" max="25"  value="1" id="posuvanie" onchange="zmena2()">
        <span id="hodnota"></span><br>
        
    </div>`;
    }



}

if (!customElements.get('moj-component')) {
    customElements.define('moj-component', MojComponent);
}