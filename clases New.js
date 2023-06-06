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
    agregarReclamo(nombre,empresa,reclamo,reclamo_area,reclamo_rubro){
        for(let j=0;j<this.listaEmpresas.length;j++){
            if(empresa == this.listaEmpresas[j].nombre){
                reclamo_rubro = this.listaEmpresas[j].rubro;
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
    
    ReclamoNombreCliente(){
        return this.nombreCliente;
    }

    ReclamoTitulo(){
        return this.tituloReclamo;
    }

    ReclamoNombreEmpresa(){
        return this.nombreEmpresa;
    }

    ReclamoCuerpo(){
        return this.cuerpoReclamo;
    }

    ReclamoRubro(){
        return this.reclamo_rubro;
    }

    ReclamoContadorAmiTambien(){
        return this.contadorAmiTambien;
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

    EmpresaNombre(){
        return this.empresa_nombre;
    }

    EmpresaRubro(){
        return this.empresa_rubro;
    }

}

// Alfonso Saizar - 306859