Ext.define('juegosmecanicos.util.Rutas',
{
        statics:
        {
            required: '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>',
            //@ Acciones => Formularios
            ventaGuardar:'resources/api/venta_guardar',
            productoGuardar:'resources/api/producto_guardar',
            clienteGuardar:'resources/api/cliente_guardar',
            clienteEliminar:'resources/api/cliente_eliminar',
            mesaValidarReserva:'resources/api/mesa_validar_atension',
            buscarApoderado: 'resources/api/apoderado_listado',
            apoderadoGuardar: 'resources/api/apoderado_guardar',
            configuracionesGuardar: 'resources/api/config_guardar',
            mostrarConfig: 'resources/api/mostrar_config',
            ninoGuardar   : 'resources/api/nino_guardar',
            ninoGuardarMembresia   : 'resources/api/nino_guardar2',
            ninoEliminar  : 'resources/api/nino_eliminar',
            ventaAnular  : 'resources/api/venta_anular',
            totalVentaSumatoria  : 'resources/api/ventas_sumatoria',
            membresiaBaja  : 'resources/api/membresia_baja',
            gastoGuardar  : 'resources/api/gasto_guardar',
            gastoAnular   : 'resources/api/gastos_eliminar',
            productoEliminar   : 'resources/api/producto_eliminar',
            localActualizar   : 'resources/api/local_actualizar',
            validAdmin : 'resources/api/valid_admin'
            //@ Acciones => Listados
        }

});
