// Alfonso Saizar - 306859


class Sistema{
    constructor(){
        this.listaEmpresas = [];
        this.listaReclamos = [];
    }

    agregarEmpresa(nombre,direccion,rubro){
        let noExiste = true;
        for(let i = 0; i < this.listaEmpresas.length; i++){
            if(this.listaEmpresas[i].empresa_nombre == nombre){
                alert("Empresa ya ingresada")
                noExiste = false;
                break;
            }
            else{
                noExiste = true;
            }
        }
        if(noExiste || this.listaEmpresas.length == 0){
            let nuevaEmpresa = new Empresa(nombre,direccion,rubro);
            this.listaEmpresas.push(nuevaEmpresa);
        }
    }

    agregarReclamo(nombre,empresa,reclamo,reclamo_area){
        let reclamo_rubro;
        for(let j=0;j<this.listaEmpresas.length;j++){
            if(empresa == this.listaEmpresas[j].empresa_nombre){
                reclamo_rubro = this.listaEmpresas[j].empresa_rubro;
            }
        }
        let reclamo_id = this.listaReclamos.length+1;
        let nuevoReclamo = new Reclamo(nombre,empresa,reclamo,reclamo_area,reclamo_rubro,reclamo_id);
        this.listaReclamos.push(nuevoReclamo);

        for(let i=0;i<this.listaEmpresas.length;i++){
            if(empresa == this.listaEmpresas[i].empresa_nombre){
                this.listaEmpresas[i].empresa_reclamos.push(nuevoReclamo);
            }
        }
    }

    reclamosTotales(){
        let respuesta = 0;
        for(let i=0; i < this.listaReclamos.length; i++){
            for(let j = 0; j < sistema.listaReclamos[i].contadorAmiTambien; j++){
                respuesta++;
            } 
        }
        return respuesta;
    }

    inicialesEmpresas(){
        let respuesta = ['*'];
        for(let j = 0; j < this.listaEmpresas.length; j++){
            let noEsta = true;
            let inicial = this.listaEmpresas[j].empresa_nombre.charAt(0);
            for(let i = 0; i < respuesta.length; i++){
                if(respuesta[i].toUpperCase() == inicial.toUpperCase()){
                    noEsta = false;
                }
            }
            if(noEsta){
                inicial = inicial.toUpperCase();
                respuesta.push(inicial);
            }
        }
        respuesta.sort();
        return respuesta;
    }

    filtroEmpresas(letra){
        let respuesta = [];
        for(let i = 0; i < this.listaEmpresas.length; i++){
            let empresa = this.listaEmpresas[i].empresa_nombre.charAt(0);
            empresa = empresa.toUpperCase();
            if(letra == "*"){
                respuesta.push(this.listaEmpresas[i]);
            }
            else if(empresa == letra){
                respuesta.push(this.listaEmpresas[i]);
            }
        }
        return respuesta;
    }

    cantPorRubro(){
        let respuesta = [];
        let listaRubros = [];
        let rubrosEnUso = [];
        let indicesMax = [];
        let indiceMayorcantidad = -1;
        let maxRubrosCantidad = -1;
        for(let i=0; i < this.listaReclamos.length; i++){
            for(let j = 0; j < sistema.listaReclamos[i].contadorAmiTambien; j++){
                listaRubros.push(this.listaReclamos[i].rubroReclamo);
            } 
        }
        listaRubros.sort();
        let aparece = 1;
        for(let i = 0; i < listaRubros.length; i++){
            if(listaRubros[i+1] == listaRubros[i]){
                aparece++;
            }
            else{
                rubrosEnUso.push(listaRubros[i]);
                rubrosEnUso.push(aparece);
                aparece = 1;
            }
        }
        for(let i = 1; i <= rubrosEnUso.length; i = i+2){
            if(rubrosEnUso[i] > maxRubrosCantidad){
                maxRubrosCantidad = rubrosEnUso[i];
                indiceMayorcantidad = i;
            }
        }
        for(let i = 1; i <= rubrosEnUso.length; i = i+2){
            if(rubrosEnUso[i] == maxRubrosCantidad){
                indicesMax.push(i - 1);
            }
        }
        for(let i = 0; i < indicesMax.length; i++){
            respuesta.push(rubrosEnUso[indicesMax[i]]);
            respuesta.push(rubrosEnUso[indicesMax[i] + 1]);
        }
        return respuesta;
    }
}

class Reclamo{
    constructor(reclamo_nombreCliente, reclamo_nombreEmpresa, reclamo_titulo, reclamo_cuerpo,reclamo_rubro,reclamo_id){
        this.nombreCliente = reclamo_nombreCliente;
        this.nombreEmpresa = reclamo_nombreEmpresa;
        this.tituloReclamo = reclamo_titulo;
        this.cuerpoReclamo = reclamo_cuerpo;
        this.rubroReclamo = reclamo_rubro;
        this.contadorAmiTambien = 1;
        this.idReclamo = reclamo_id;
    }

    ReclamoContador(){
        this.contadorAmiTambien++;
    }
}

class Empresa{
    constructor(empresa_nombre, empresa_direccion, empresa_rubro){
        this.empresa_nombre = empresa_nombre;
        this.empresa_direccion = empresa_direccion;
        this.empresa_rubro = empresa_rubro;
        this.empresa_reclamos = [];
    }

    reclamosTotalesEmpresa(){
        let respuesta = 0;
        for(let i = 0; i < this.empresa_reclamos.length; i++){
            respuesta += this.empresa_reclamos[i].contadorAmiTambien;
        }
        return respuesta;
    }
}

// Alfonso Saizar - 306859