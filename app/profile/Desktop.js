Ext.define('juegosmecanicos.profile.Desktop', {
    extend: 'Ext.app.Profile',
    //mainView: 'App.view.desktop.Main',
    isActive: function () {
        return Ext.os.is.Desktop;
    },
    controllers:[
        'juegosmecanicos.controller.DataStatica'
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
        'juegosmecanicos.view.pdv.Contenedor',
        'juegosmecanicos.view.main.Main',
        'juegosmecanicos.view.producto.Listado',
        'juegosmecanicos.view.producto.Mantenimiento',
        'juegosmecanicos.view.admin.ListadoClientes',
        'juegosmecanicos.view.admin.Dashboard',
        'juegosmecanicos.view.admin.ListadoProveedores',
        'juegosmecanicos.view.admin.ListadoPagos',
        'juegosmecanicos.view.admin.ListadoConfig',
        'juegosmecanicos.view.pdv.Nino',
        'juegosmecanicos.view.pdv.NinoMenbresia',
        'juegosmecanicos.view.pdv.Apoderado',
        'juegosmecanicos.view.producto.RegistroGastos',
        'juegosmecanicos.view.main.Login',
        'juegosmecanicos.view.pdv.ContenedorVenta',
        'juegosmecanicos.view.pdv.MainVenta',
        'juegosmecanicos.view.producto.MantenimientoVenta'

    ],
     models: [
        'juegosmecanicos.model.DataModels'
     ],
    launch: function () {
        Ext.util.Format.decimalSeparator = '.';
        Ext.util.Format.thousandSeparator = ' ';
        //Ext.create('wMain');
        Ext.create('juegosmecanicos.view.main.Login');
    }
});