// Alfonso Saizar - 306859


class Sistema{
    constructor(){
        this.listaEmpresas = [];
        this.listaReclamos = [];
    }

    //Metodos Empresas
    agregarEmpresa(nombre,direccion,rubro){
        let nuevaEmpresa = new Empresa(nombre,direccion,rubro);
        this.listaEmpresas.push(nuevaEmpresa)
    }
    //Metodos Reclamos
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
            if(empresa == this.listaEmpresas[i].nombre){
                this.listaEmpresas[i].empresa_reclamos.push(nuevoReclamo);
            }
        }
    }

    cantPorRubro(){
        let listaRubros = [];
        let rubrosEnUso = [];
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
        return rubrosEnUso;
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

}

// Alfonso Saizar - 306859