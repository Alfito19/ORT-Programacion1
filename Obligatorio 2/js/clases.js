// Alfonso Saizar - 306859


class Sistema{
    constructor(){

    }
}

class Reclamo{
    constructor(reclamo_nombreCliente, reclamo_nombreEmpresa, reclamo_titulo, reclamo_cuerpo){
        this.nombreCliente = reclamo_nombreCliente;
        this.nombreEmpresa = reclamo_nombreEmpresa;
        this.tituloReclamo = reclamo_titulo;
        this.cuerpoReclamo = reclamo_cuerpo;
        this.contadorAmiTambien = 1;
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

class Rubros{
    constructor(rubro){
        this.rubro = rubro;
        this.cantidad = 1;
    }

    TipoRubro(){
        return this.rubro;
    }
    
    aumentarCantidadRubro(){
        this.cantidad++;
    }
}
// Alfonso Saizar - 306859