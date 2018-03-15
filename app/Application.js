
Ext.define('juegosmecanicos.Application', {
    extend: 'Ext.app.Application',
    name: 'juegosmecanicos',
    controllers:[
        'DataStatica'
    ],
    stores: [
        'juegosmecanicos.store.Productos',
        'juegosmecanicos.store.DataTemp',
        'juegosmecanicos.store.Empleados',
        'juegosmecanicos.store.Ventas',
        'juegosmecanicos.store.Clientes',
        'juegosmecanicos.store.Locales'
    ],
    views:[
        'pdv.Contenedor',
        'main.Main',
        'producto.Listado',
        'producto.Mantenimiento',
        'admin.ListadoClientes',
        'admin.Dashboard',
        'admin.ListadoProveedores',
        'admin.ListadoPagos',
        'admin.ListadoConfig',
        'pdv.Nino',
        'pdv.NinoMenbresia',
        'pdv.Apoderado',
        'producto.RegistroGastos',
        'main.Login',
        'pdv.ContenedorVenta',
        'pdv.MainVenta',
        'producto.MantenimientoVenta'

    ],
     models: [
        'juegosmecanicos.model.DataModels'
     ],
    init: function () {
        Ext.util.Format.decimalSeparator = '.';
        Ext.util.Format.thousandSeparator = ' ';
        Ext.create('juegosmecanicos.view.main.Login');
        //Ext.create('wMain');
       
    }
});
