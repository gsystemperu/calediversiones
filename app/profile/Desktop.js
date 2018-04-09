Ext.define('juegosmecanicos.profile.Desktop', {
    extend: 'Ext.app.Profile',
    //mainView: 'App.view.desktop.Main',
    isActive: function () {
        return Ext.os.is.Desktop;
    },
    controllers:[
        'DataStatica'
    ],
    stores: [
        'juegosmecanicos.store.Productos',
        'juegosmecanicos.store.DataTemp',
        'juegosmecanicos.store.Empleados',
        'juegosmecanicos.store.Ventas',
        'juegosmecanicos.store.Clientes',

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
    launch: function () {
        Ext.util.Format.decimalSeparator = '.';
        Ext.util.Format.thousandSeparator = ' ';

        Ext.getBody().on('keydown', function(ev){
            if(ev.getKey() === ev.self.F2){
                Ext.ComponentQuery.query('#codigobarra')[0].focus(1);
                // megafilmperu.util.Util.crearWindowOpenMantenimiento('Tipo de Cambio','wfrmTipoCambio',450,130,null,'wTipoCambio');
              }
        });

        Ext.create('juegosmecanicos.view.main.Login');
        //Ext.create('wMain');

    }
});
