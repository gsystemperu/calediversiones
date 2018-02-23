
Ext.define('juegosmecanicos.Application', {
    extend: 'Ext.app.Application',
    name: 'juegosmecanicos',
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
        'main.Login'

    ],
     models: [
        'juegosmecanicos.model.DataModels'
     ],
    launch: function () {
        Ext.util.Format.decimalSeparator = '.';
        Ext.util.Format.thousandSeparator = ' ';
         //Ext.create('wMain');
         Ext.create('main-login');
    }
});
