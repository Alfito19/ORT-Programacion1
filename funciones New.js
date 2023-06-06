// Alfonso Saizar - 306859
window.addEventListener('load', inicio);

let sistema = new Sistema();

// var listaEmpresas = [];
// var listaReclamos = [];
var listaReclamosInvertida = [];
var hayEmpresas = false;

var listaRubros = [];
var rubrosEnUso = [];
var rubrosEnUsoCant = [];

function inicio(){
    document.getElementById("header_principal").addEventListener("click",function(){mostrarSections("section_principal"),mostrarHTML("principal_content")});
    document.getElementById("header_reclamos").addEventListener("click",function(){mostrarSections("section_ver_reclamos")});
    document.getElementById("header_estadisticas").addEventListener("click",function(){mostrarSections("section_estadisticas")});
    document.getElementById("header_agregar_empresa").addEventListener("click",function(){mostrarSections("section_agregar_empresa")});
    document.getElementById("reclamo_agregarTuReclamoAqui").addEventListener("click",agregarReclamoAqui);
    document.getElementById("agregar_reclamos_volver").addEventListener("click",function(){mostrarSections("section_principal"),mostrarHTML("principal_content")});
    document.getElementById("agregar_reclamos_agregar").addEventListener("click", nuevoReclamo);
    document.getElementById("agregar_empresa_agregar").addEventListener("click", nuevaEmpresa);

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
        let reclamo_rubro;
        sistema.agregarReclamo(nombre,empresa,reclamo,reclamo_area,reclamo_rubro);
        // listaReclamosInvertida = invertirLista(sistema.listaReclamos);
        mostrarReclamos();
        valida.reset();
    }
}

function invertirLista(listaInvertir){
    let cant = listaInvertir.length;
    for(i=0; i<cant/2;i++){
        let aux= listaInvertir[i];
        let j = cant -i -1;
        listaInvertir[i] = listaInvertir[j];
        listaInvertir[j] = aux;
    }
    return listaInvertir;
}

function contador(Nreclamo){
    sistema.listaReclamos[sistema.listaReclamos.length-Nreclamo].ReclamoContador();
    mostrarReclamos();
}

function mostrarReclamos(){
    let padre = document.getElementById("lista_reclamos");
    padre.innerHTML = "";
    let count = sistema.listaReclamos.length+1;
    for(let i = sistema.listaReclamos.length; i >= 0; i--){
        //Creo li
        let newLi = document.createElement("li");
        padre.appendChild(newLi);
        //Creo h3 y su contenido.
        let newH3 = document.createElement("h3");
        let H3text = document.createTextNode("Reclamo No. "+count);
        newH3.appendChild(H3text);
        newLi.appendChild(newH3);
        //Creo div
        let newDiv = document.createElement("div");
        newLi.appendChild(newDiv);
        newDiv.classList.add("reclamo");
        //Creo p1
        let newP1 = document.createElement("p");
        newDiv.appendChild(newP1);
        newP1.innerHTML = sistema.listaReclamos[i].nombreCliente+": <mark class=mark_naranja>"+sistema.listaReclamos[i].tituloReclamo+"</mark>";
        //Creo p2
        let newP2 = document.createElement("p");
        newDiv.appendChild(newP2);
        newP2.innerHTML = "Empresa: <mark class=mark_verde>"+sistema.listaReclamos[i].nombreEmpresa+"</mark>";
        //Creo p3
        let newP3 = document.createElement("p");
        let p3text = document.createTextNode(sistema.listaReclamos[i].cuerpoReclamo);
        newDiv.appendChild(newP3);
        newP3.appendChild(p3text);
    }
    // for(let datos of listaReclamosInvertida){
    //     count--;
    //     //Creo li
    //     let newLi = document.createElement("li");
    //     padre.appendChild(newLi);
        // //Creo h3 y su contenido.
        // let newH3 = document.createElement("h3");
        // let H3text = document.createTextNode("Reclamo No. "+count);
        // newH3.appendChild(H3text);
        // newLi.appendChild(newH3);
        // //Creo div
        // let newDiv = document.createElement("div");
        // newLi.appendChild(newDiv);
        // newDiv.classList.add("reclamo");
        // //Creo p1
        // let newP1 = document.createElement("p");
        // newDiv.appendChild(newP1);
        // newP1.innerHTML = datos.ReclamoNombreCliente()+": <mark class=mark_naranja>"+datos.ReclamoTitulo()+"</mark>";
        // //Creo p2
        // let newP2 = document.createElement("p");
        // newDiv.appendChild(newP2);
        // newP2.innerHTML = "Empresa: <mark class=mark_verde>"+datos.ReclamoNombreEmpresa()+"</mark>";
        // //Creo p3
        // let newP3 = document.createElement("p");
        // let p3text = document.createTextNode(datos.ReclamoCuerpo());
        // newDiv.appendChild(newP3);
        // newP3.appendChild(p3text);
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
        contadorA.innerHTML = "Contador "+datos.ReclamoContadorAmiTambien();
        newContainer.appendChild(contadorA);
        actualizarEstadisticas();
    }
}

function nuevaEmpresa(){
    let valida = document.getElementById("agregar_empresa_form");
    if(valida.reportValidity()){
        let nombre = document.getElementById("agregar_empresa_nombre").value;
        let direccion = document.getElementById("agregar_empresa_direccion").value;
        let rubro = document.getElementById("agregar_empresa_rubro").value;
        // let nuevaEmpresa = new Empresa(nombre,direccion,rubro);
        // listaEmpresas.push(nuevaEmpresa);
        sistema.agregarEmpresa(nombre,direccion,rubro);
        hayEmpresas = true;
        valida.reset();
        actualizarEmpresas(nombre);
        actualizarEstadisticas();
    }
}

function actualizarEmpresas(nombreEmpresa){
    let padre = document.getElementById("agregar_reclamos_empresa");
    let newOption = document.createElement("option");
    newOption.innerHTML = nombreEmpresa;
    padre.appendChild(newOption);
}

// function estadisticasBotonFiltro(){
//     let padre = document.getElementById("estadisticas_seleccion_letra");
//     let newButton 
// }

// function estadisticasActualizarTabla(){
//     estadisticasBotonFiltro();
// }

function estadisticasInformacionGeneral(){
    let padre = document.getElementById("estadisticas_informacion_general");
    padre.innerHTML = "";
    let newH3 = document.createElement("h3");
    newH3.innerHTML = "Información General"
    padre.appendChild(newH3);
    let newP1 = document.createElement("p");
    newP1.innerHTML = "El promedio de las cantidades considerando todos los reclamos de todas las empresas es: "+((sistema.listaReclamos.length)/(sistema.listaEmpresas.length));
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
            padre.appendChild(newLi)
        }
    }
}

function estadisticasMaximoRubro(){
    let padre = document.getElementById("estadisticas_empresas_max_reclamos");
    padre.innerHTML = "";
    //En caso de que haya 0 reclamo:
    if(sistema.listaReclamos.length == 0){
        let newLi1 = document.createElement("li");
        newLi1.innerHTML = "Aun no hay reclamos"
        padre.appendChild(newLi1);
    }
    //En caso de que haya 1 reclamo o mas:
    else{
        listaRubros = [];
        rubrosEnUso = [];
        rubrosEnUsoCant = [];
        for(let i = 0; i < sistema.listaReclamos.length; i++){
            for(let j = 0; j < sistema.listaReclamos[i].ReclamoContadorAmiTambien(); j++){
                listaRubros.push(sistema.listaReclamos[i].rubroReclamo);
            }
        }
        //Ordeno la lista 
        listaRubros.sort();
        //Recorro la lista nuevamente analizando cuantos hay de cada uno
        let aparece = 1;
        for(let i = 0; i < listaRubros.length; i++){
            if(listaRubros[i+1] == listaRubros[i]){
                aparece++;
            }
            else{
                rubrosEnUso.push(listaRubros[i]);
                rubrosEnUsoCant.push(aparece);
                aparece = 1;
            }
        }
        //Creo el li para mostrar el mayor.
        let max1 = Math.max(...rubrosEnUsoCant);
        let hayMas = true;
        let newRubrosEnUsoCant = rubrosEnUsoCant;
        let newRubrosEnUso = rubrosEnUso;
        // while(hayMas){
        //     let indiceMax = newRubrosEnUsoCant.indexOf(max1);
        //     if(Math.max(...newRubrosEnUsoCant) == max1){
        //         let newLi = document.createElement("li");
        //         newLi.innerHTML = newRubrosEnUso[indiceMax]+": cantidad "+newRubrosEnUsoCant[indiceMax];
        //         padre.appendChild(newLi);
        //     }
        //     else{
        //         break;
        //     }
        //     newRubrosEnUsoCant.splice(indiceMax,1);
        //     newRubrosEnUso.splice(indiceMax,1);
        // }
    }
}

function actualizarEstadisticas(){
    // estadisticasBotonFiltro();
    // estadisticasActualizarTabla();
    estadisticasEmpresasSinReclamos();
    estadisticasInformacionGeneral();
    estadisticasMaximoRubro();
}
// Alfonso Saizar - 306859