Ext.define('juegosmecanicos.profile.Mobile', {
    extend: 'Ext.app.Profile',
    //mainView: 'juegosmecanicos.view.mobil.AdminCajas',
    isActive: function () {
        return  !Ext.os.is.Desktop;
    },
    launch:function(){
        alert("aaa");
    }
    /*controllers:[
        'juegosmecanicos.controller.DataStatica'
    ],*/
    /*stores: [
        'juegosmecanicos.store.Ventas'
    ],
    views:[
        'juegosmecanicos.view.mobil.AdminCajas'
    ],
     models: [
        'juegosmecanicos.model.DataModels'
     ],*/
    /*launch: function () {
       Ext.util.Format.decimalSeparator = '.';
       Ext.util.Format.thousandSeparator = ' ';
       Ext.create('juegosmecanicos.view.mobil.AdminCajas');
    }*/
    
});