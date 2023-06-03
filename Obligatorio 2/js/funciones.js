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
    document.getElementById("agregar_reclamos_volver").addEventListener("click",function(){mostrarSections("section_principal"),mostrarHTML("principal_content")});
    document.getElementById("agregar_reclamos_agregar").addEventListener("click", nuevoReclamo);


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
        mostrarReclamos();
        valida.reset();
    }
}

function contador(Nreclamo){
    listaReclamos[listaReclamos.length-Nreclamo].ReclamoContador();
    mostrarReclamos();
}

function mostrarReclamos(){
    let reclamos = document.getElementById("lista_reclamos");
    reclamos.innerHTML = "";
    let count = listaReclamos.length+1
    for(let datos of listaReclamos){
        count--;
        //Creo li
        let newLi = document.createElement("li");
        reclamos.appendChild(newLi);
        //Creo h3 y su contenido.
        let newH3 = document.createElement("h3");
        let H3text = document.createTextNode("Reclamo No. "+count);
        newH3.appendChild(H3text);
        newLi.appendChild(newH3);
        //Creo div
        let newDiv = document.createElement("div");
        newLi.appendChild(newDiv);
        newDiv.classList.add("reclamo")
        //Creo p1
        let newP1 = document.createElement("p");
        newDiv.appendChild(newP1);
        newP1.innerHTML = datos.ReclamoNombreCliente()+": <mark class=mark_naranja>"+datos.ReclamoTitulo()+"</mark>";
        //Creo p2
        let newP2 = document.createElement("p");
        newDiv.appendChild(newP2);
        newP2.innerHTML = "Empresa: <mark class=mark_verde>"+datos.ReclamoNombreEmpresa()+"</mark>";
        //Creo p3
        let newP3 = document.createElement("p");
        let p3text = document.createTextNode(datos.ReclamoCuerpo());
        newDiv.appendChild(newP3);
        newP3.appendChild(p3text)

        //Creo button
        let newButton = document.createElement("button");
        newDiv.appendChild(newButton);
        newButton.setAttribute('id','reclamo_botton_aMiTambien_'+count);
        newButton.setAttribute('onclick','contador('+count+')');
        newButton.textContent = "¡A mi también me pasó!";

        //Creo el contador
        let contadorA = document.createElement("p");
        contadorA.setAttribute('id','contadorAmitambien'+count);
        contadorA.innerHTML = "Contador "+datos.ReclamoContadorAmiTambien();
        newDiv.appendChild(contadorA);
    }
}

// Alfonso Saizar - 306859