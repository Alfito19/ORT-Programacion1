// Alfonso Saizar - 306859
window.addEventListener('load', inicio);

let sistema = new Sistema();
var hayEmpresas = false;

function inicio(){
    document.getElementById("header_principal").addEventListener("click",function(){mostrarSections("section_principal"),mostrarHTML("principal_content")});
    document.getElementById("header_reclamos").addEventListener("click",function(){mostrarSections("section_ver_reclamos")});
    document.getElementById("header_estadisticas").addEventListener("click",function(){mostrarSections("section_estadisticas")});
    document.getElementById("header_agregar_empresa").addEventListener("click",function(){mostrarSections("section_agregar_empresa")});
    document.getElementById("reclamo_agregarTuReclamoAqui").addEventListener("click",agregarReclamoAqui);
    document.getElementById("agregar_reclamos_volver").addEventListener("click",function(){mostrarSections("section_principal"),mostrarHTML("principal_content")});
    document.getElementById("agregar_reclamos_agregar").addEventListener("click", nuevoReclamo);
    document.getElementById("agregar_empresa_agregar").addEventListener("click", nuevaEmpresa);
    document.getElementById("lupabusqueda").addEventListener("click", filtroBusqueda);
}

function mostrarHTML(idSection){
    document.getElementById(idSection).classList.remove("noMostrarEnHTML");
}

function noMostrarHTML(idSection){
    document.getElementById(idSection).classList.add("noMostrarEnHTML");
}

function mostrarSections(mostrar){
    noMostrarHTML("section_principal");
    noMostrarHTML("section_agregar_reclamos");
    noMostrarHTML("section_ver_reclamos");
    noMostrarHTML("section_estadisticas");
    noMostrarHTML("section_agregar_empresa");
    mostrarHTML(mostrar);
}

function agregarReclamoAqui(){
    if(!hayEmpresas){
        alert("Debe ingresar empresas primero.");
    }
    else{
        mostrarHTML("section_principal");
        noMostrarHTML("principal_content");
        mostrarHTML("section_agregar_reclamos");
    }
}

function filtroBusqueda(){
    busqueda = document.getElementById("textobusqueda");
    mostrarReclamos(sistema.busquedaEnReclamo(busqueda.value));
    mostrarSections("section_ver_reclamos")
    busqueda.innerHTML = "";
}

function nuevoReclamo(){
    let valida = document.getElementById("agregar_reclamos_form");
    if(valida.reportValidity()){
        let nombre = document.getElementById("agregar_reclamos_nombre").value;
        let empresa = document.getElementById("agregar_reclamos_empresa").value;
        let reclamo = document.getElementById("agregar_reclamos_reclamo").value;
        let reclamo_area = document.getElementById("agregar_reclamos_reclamo_area").value;
        sistema.agregarReclamo(nombre,empresa,reclamo,reclamo_area);
        valida.reset();
        mostrarReclamos(sistema.listaReclamos);
    }
}

function nuevaEmpresa(){
    let valida = document.getElementById("agregar_empresa_form");
    if(valida.reportValidity()){
        let nombre = document.getElementById("agregar_empresa_nombre").value;
        let direccion = document.getElementById("agregar_empresa_direccion").value;
        let rubro = document.getElementById("agregar_empresa_rubro").value;
        sistema.agregarEmpresa(nombre,direccion,rubro);
        hayEmpresas = true;
        valida.reset();
        let padre = document.getElementById("agregar_reclamos_empresa");
        let newOption = document.createElement("option");
        newOption.innerHTML = nombre;
        padre.appendChild(newOption);
        actualizarEstadisticas();
    }
}

function contador(Nreclamo){
    sistema.listaReclamos[sistema.listaReclamos.length-Nreclamo].ReclamoContador();
    mostrarReclamos(sistema.listaReclamos);
}

function mostrarReclamos(listaReclamosAMostrar){
    let padre = document.getElementById("lista_reclamos");
    padre.innerHTML = "";
    for(let i = listaReclamosAMostrar.length; i > 0; i--){
        let count = listaReclamosAMostrar.length-i+1;
        let indice = i-1;
        //Creo li
        let newLi = document.createElement("li");
        padre.appendChild(newLi);
        //Creo h3 y su contenido.
        let newH3 = document.createElement("h3");
        let H3text = document.createTextNode("Reclamo No. "+listaReclamosAMostrar[indice].idReclamo);
        newH3.appendChild(H3text);
        newLi.appendChild(newH3);
        //Creo div
        let newDiv = document.createElement("div");
        newLi.appendChild(newDiv);
        newDiv.classList.add("reclamo");
        //Creo p1
        let newP1 = document.createElement("p");
        newDiv.appendChild(newP1);
        newP1.innerHTML = listaReclamosAMostrar[indice].nombreCliente+": <mark class=mark_naranja>"+listaReclamosAMostrar[indice].tituloReclamo+"</mark>";
        //Creo p2
        let newP2 = document.createElement("p");
        newDiv.appendChild(newP2);
        newP2.innerHTML = "Empresa: <mark class=mark_verde>"+listaReclamosAMostrar[indice].nombreEmpresa+"</mark>";
        //Creo p3
        let newP3 = document.createElement("p");
        let p3text = document.createTextNode(listaReclamosAMostrar[indice].cuerpoReclamo);
        newDiv.appendChild(newP3);
        newP3.appendChild(p3text);
        //Creo div para contener button y contador
        let newContainer = document.createElement("div");
        newContainer.classList.add("buttonYcontador");
        newDiv.appendChild(newContainer);
        //Creo button
        let newButton = document.createElement("button");
        newContainer.appendChild(newButton);
        newButton.setAttribute('id','reclamo_botton_aMiTambien_'+count);
        newButton.setAttribute('onclick','contador('+count+')');
        newButton.textContent = "¡A mi también me pasó!";
        //Creo el contador
        let contadorA = document.createElement("p");
        contadorA.setAttribute('id','contadorAmitambien'+count);
        contadorA.innerHTML = "Contador "+listaReclamosAMostrar[indice].contadorAmiTambien;
        newContainer.appendChild(contadorA);
        actualizarEstadisticas();
    }
}

function estadisticasBotonFiltro(){
    let iniciales = sistema.inicialesEmpresas();
    let padre = document.getElementById("estadisticas_seleccion_letra");
    padre.innerHTML = "";
    for(let i = 0; i < iniciales.length; i++){
        let newButton = document.createElement("button");
        newButton.innerHTML = iniciales[i];
        newButton.setAttribute('id','filtro_'+iniciales[i]);
        newButton.setAttribute('onclick','estadisticasActualizarTabla("'+iniciales[i]+'")');
        padre.appendChild(newButton);
    }
}

function estadisticasActualizarTabla(letra){
    estadisticasBotonFiltro();
    let filtro = sistema.filtroEmpresas(letra);
    // if(valor de radio es creciente){
    filtro.sort(estadisticasSortCreciente);
    // }
    // else if(valor de radio es decreciente){
        filtro.sort(estadisticasSortDecreciente);
    // }
    let padre = document.getElementById("estadisticas_table_body");
    padre.innerHTML = "";
    for(let i = 0; i < filtro.length; i++){
        let fila = padre.insertRow();
        let nombre = fila.insertCell();
        let direccion = fila.insertCell();
        let rubro = fila.insertCell();
        let reclamos = fila.insertCell();
        nombre.innerHTML = filtro[i].empresa_nombre;
        direccion.innerHTML = filtro[i].empresa_direccion;
        rubro.innerHTML = filtro[i].empresa_rubro;
        reclamos.innerHTML = filtro[i].reclamosTotalesEmpresa();
    }
    document.getElementById('filtro_'+letra).classList.add("selected");
}

function estadisticasInformacionGeneral(){
    let padre = document.getElementById("estadisticas_informacion_general");
    padre.innerHTML = "";
    let newH3 = document.createElement("h3");
    newH3.innerHTML = "Información General"
    padre.appendChild(newH3);
    let newP1 = document.createElement("p");
    newP1.innerHTML = "El promedio de las cantidades considerando todos los reclamos de todas las empresas es: "+Math.round((sistema.reclamosTotales())/(sistema.listaEmpresas.length));
    padre.appendChild(newP1);
    let newP2 = document.createElement("p");
    newP2.innerHTML = "Total empresas registradas: "+sistema.listaEmpresas.length;
    padre.appendChild(newP2);
}

function estadisticasEmpresasSinReclamos(){
    let padre = document.getElementById("estadisticas_empresas_sin_reclamos");
    padre.innerHTML = "";
    for(datos of sistema.listaEmpresas){
        if(datos.empresa_reclamos.length == 0){
            let newLi = document.createElement("li");
            newLi.innerHTML = datos.empresa_nombre+" ("+datos.empresa_direccion+") Rubro: "+datos.empresa_rubro;
            padre.appendChild(newLi);
        }
    }
}

function estadisticasSortDecreciente(a, b){
    if(sistema.listaEmpresas.length > 1){
        if(a.empresa_nombre.toUpperCase() > b.empresa_nombre.toUpperCase()){
            return -1;
        }
        if(a.empresa_nombre.toUpperCase() < b.empresa_nombre.toUpperCase()){
            return 1;
        }
        return 0;
    }
}

function estadisticasSortCreciente(a, b){
    if(sistema.listaEmpresas.length > 1){
        if(a.empresa_nombre.toUpperCase() < b.empresa_nombre.toUpperCase()){
            return -1;
        }
        if(a.empresa_nombre.toUpperCase() > b.empresa_nombre.toUpperCase()){
            return 1;
        }
        return 0;
    }
}

function estadisticasMaximoRubro(){
    let padre = document.getElementById("estadisticas_empresas_max_reclamos");
    padre.innerHTML = "";
    let maxRubros = sistema.cantPorRubro();
    if(maxRubros.length == 0){
        let newLi1 = document.createElement("li");
        newLi1.innerHTML = "Aun no hay reclamos"
        padre.appendChild(newLi1);
    }
    else{
        for(let i = 1; i < maxRubros.length; i = i+2){
            let newLi2 = document.createElement("li");
            newLi2.innerHTML = maxRubros[i-1]+": cantidad "+maxRubros[i];
            padre.appendChild(newLi2);
        }
    }
}

function actualizarEstadisticas(){
    estadisticasActualizarTabla("*");
    estadisticasEmpresasSinReclamos();
    estadisticasInformacionGeneral();
    estadisticasMaximoRubro();
}

// Alfonso Saizar - 306859