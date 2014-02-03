
var divs = [getDiv("inicio"), getDiv("mision"), getDiv("quienSoy")];

function getDiv(nombre) {
    return document.getElementById(nombre);
};

function limpiarDivs(divs) {
    for (var i = 0; i < 3; i++)
        divs[i].style.visibility = "hidden";
};

function hacerDivVisible(nombre) {
    limpiarDivs(divs);
    var d = getDiv(nombre);
    d.style.visibility = "visible";
};

function accionesIniciales() {

    document.getElementById("li1").addEventListener("click",
    function () {
        limpiarDivs(divs);
        getDiv("inicio").style.visibility = "visible";
    }, false);

    document.getElementById("li2").addEventListener("click",
    function () {
        limpiarDivs(divs);
        getDiv("mision").style.visibility = "visible";
    }, false);

    document.getElementById("li3").addEventListener("click",
    function () {
        limpiarDivs(divs);
        getDiv("quienSoy").style.visibility = "visible";
    }, false);

    limpiarDivs(divs);
    getDiv("inicio").style.visibility = "visible";
    document.getElementById("anterior").disabled = true;
    document.getElementById("siguiente").disabled = true;
}



if (window.addEventListener) {
    window.addEventListener("load", accionesIniciales, false);
}
else if (window.attachEvent) {
    window.attachEvent("onload", accionesIniciales);
}
else {
    window["onload"] = accionesIniciales;
}
