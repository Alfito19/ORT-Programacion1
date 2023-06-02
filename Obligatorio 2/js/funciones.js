// Alfonso Saizar - 306859
window.addEventListener('load', inicio);

var listaEmpresas=[];
var listaReclamos=[];
var hayEmpresas = true;

function inicio(){
    // document.getElementById("id").addEventListener("click", function)
    document.getElementById("header_principal").addEventListener("click",function(){mostrarSections("section_principal"),mostrarHTML("principal_content")});
    document.getElementById("header_reclamos").addEventListener("click",function(){mostrarSections("section_ver_reclamos")});
    document.getElementById("header_estadisticas").addEventListener("click",function(){mostrarSections("section_estadisticas")});
    document.getElementById("header_agregar_empresa").addEventListener("click",function(){mostrarSections("section_agregar_empresa")});
    document.getElementById("reclamo_agregarTuReclamoAqui").addEventListener("click",agregarReclamoAqui);
    document.getElementById("agregar_reclamos_volver").addEventListener("click",function(){mostrarSections("section_principal"),mostrarHTML("principal_content")})
    
    document.getElementById("agregar_reclamos_agregar").addEventListener("click", nuevoReclamo)
    
}

function mostrarHTML(idSection){
    document.getElementById(idSection).classList.remove("noMostrarEnHTML");
}

function noMostrarHTML(idSection){
    document.getElementById(idSection).classList.add("noMostrarEnHTML");
}

function ocultarTodo(){
    noMostrarHTML("section_principal");
    noMostrarHTML("section_agregar_reclamos");
    noMostrarHTML("section_ver_reclamos");
    noMostrarHTML("section_estadisticas");
    noMostrarHTML("section_agregar_empresa");
}

function mostrarSections(mostrar){
    ocultarTodo()
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

function nuevoReclamo(){
    let valida = document.getElementById("agregar_reclamos_form");
    if(valida.reportValidity()){
        let nombre = document.getElementById("agregar_reclamos_nombre").value;
        let empresa = document.getElementById("agregar_reclamos_empresa").value;
        let reclamo = document.getElementById("agregar_reclamos_reclamo").value;
        let reclamo_area = document.getElementById("agregar_reclamos_reclamo_area").value;
        let nuevoReclamo = new Reclamo(nombre,empresa,reclamo,reclamo_area);
        listaReclamos.push(nuevoReclamo);
        valida.reset();
    }
}

function mostrarReclamos(){
    let reclamos = document.getElementById("lista_reclamos");
    reclamos.innerHTML = "";
    for(let datos of listaReclamos){
        let nodo = document.createElement("li");
        let nodetext = document.createTextNode(datos);
    }
}

// Alfonso Saizar - 306859