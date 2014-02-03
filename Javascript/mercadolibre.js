var form;
var itemId;

var ultimaBusqueda = undefined;
var total = undefined;
var paginaActual = 1;
var offsetActual = undefined;
var busquedaActual = undefined;
var buscarMercado = function (busqueda, limit, offset, modoCompra) {
    var imagen;
    var btnAnterior = document.getElementById("anterior");
    var btnSgte = document.getElementById("siguiente");
    var lblNroPag = document.getElementById("nropagina");

    btnAnterior.disabled = (offset === 0);
    busquedaActual = busqueda;
    var stringBusqueda;
    if (modoCompra !== "todo")
        stringBusqueda = "/sites/MLA/search?state=AR-C&sort=price_asc&buying_mode=" + modoCompra + "&limit=" + limit + "&offset=" + offset + "&q=" + busqueda;
    else
        stringBusqueda = "/sites/MLA/search?state=AR-C&sort=price_asc&limit=" + limit + "&offset=" + offset + "&q=" + busqueda;
    MercadoLibre.get(stringBusqueda, function (response) {
        offsetActual = parseInt(response[2].paging.offset);
        total = parseInt(response[2].paging.total);
        var totaldepaginas = Math.ceil(total / parseInt(limit));
        var nropaginaactual = Math.ceil(parseInt(offset) / limit);
        if (totaldepaginas === 0) {
            btnSgte.disabled = true;
            lblNroPag.innerHTML = "0 / 0";
            return;
        }
        btnSgte.disabled = ((nropaginaactual + 1) === totaldepaginas);

        lblNroPag.innerHTML = (nropaginaactual + 1) + " / " + totaldepaginas;

        ultimaBusqueda = response[2].results;

        setearCeroContadorProductos();
        for (var i = 0; i < ultimaBusqueda.length; i++) {

            var item = ultimaBusqueda[i];
            var preciomin = document.getElementById("precioMin").value;
            var preciomax = document.getElementById("precioMax").value;
            if (parseInt(preciomin) > parseInt(item.price) || (parseInt(preciomax) < parseInt(item.price) && parseInt(preciomax) !== 0))
                continue;
            item.address.city_name = item.address.city_name.toUpperCase();
            var espacio = item.address.city_name.search(/\s/g);

            if (espacio !== -1)
                item.address.city_name = item.address.city_name.replace(/\s/g, "_");
            if (item.address.city_name === "ONCE")
                contadorProductos['BALVANERA'] = contadorProductos['BALVANERA'] + 1;
            else if (item.address.city_name === "MICROCENTRO")
                contadorProductos['SAN_NICOLAS'] = contadorProductos['SAN_NICOLAS'] + 1;
            else
                contadorProductos[item.address.city_name] = contadorProductos[item.address.city_name] + 1;
            imagen = item.thumbnail;
            if (item.thumbnail == null || item.thumbnail == '')
                imagen = "http://search-ar.mlstatic.com/images/nopic90x90.gif";
        }


        for (var nombre in contadorProductos) {
            if (contadorProductos[nombre] > 0) {
                activarBarrio(nombre);
            }
        }

    });

    return false;
};

 
document.getElementById("botonBuscar").addEventListener("click", buscarConBoton, false);
document.getElementById("siguiente").addEventListener("click", irAPaginaSgte, false);
document.getElementById("anterior").addEventListener("click", irAPaginaAnterior, false);

function irAPaginaSgte() {
    var limite = parseInt(document.getElementById("limiteTxtbox").value);
    var selectBM = document.getElementById("selectBuyingMode");
    buscarMercado(busquedaActual, limite, offsetActual + limite, selectBM.options[selectBM.selectedIndex].value);
}

function irAPaginaAnterior() {
    var limite = parseInt(document.getElementById("limiteTxtbox").value);
    var selectBM = document.getElementById("selectBuyingMode");
    buscarMercado(busquedaActual, limite, offsetActual - limite, selectBM.options[selectBM.selectedIndex].value);
}


jQuery("#buscar").keypress(function (event) {
    //Si fue un enter
    if (event.keyCode === 13) {
        event.preventDefault();
        buscarConBoton();

    }
});


function buscarConBoton() {

    var limite = parseInt(document.getElementById("limiteTxtbox").value);
    var selectBM = document.getElementById("selectBuyingMode");
    buscarMercado(document.getElementById("buscar").value, limite, 0, selectBM.options[selectBM.selectedIndex].value);
}

function buscarBarrio(nombreBarrio) {
var $ul = $("#"+ nombreBarrio);

for (var i = 0; i < ultimaBusqueda.length; i++) {
    var item = ultimaBusqueda[i];
    if (item.address.city_name === nombreBarrio || (nombreBarrio === "BALVANERA" && item.address.city_name === "ONCE") || (nombreBarrio === "SAN_NICOLAS" && item.address.city_name === "MICROCENTRO")) {
        imagen = item.thumbnail;
        if (item.thumbnail == null || item.thumbnail == '')
            imagen = "http://search-ar.mlstatic.com/images/nopic90x90.gif";

        $ul.append(
            "<tr><th><img src='" + imagen + "' width='60' height='60'></th><td><a href='" + item.permalink + "' target='_blank'>" + item.title +"</a></td><td>$"+item.price+"</td></tr>");

    }
}
}

