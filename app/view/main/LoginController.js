Ext.define('juegosmecanicos.view.main.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',
    init:function(){
        document.getElementById('splashscreen').style.display = 'none';
    },
    onClickSeleccionarSede:function(btn){
        if(this.lookupReference('cboLocales').getValue()){
            Ext.util.Cookies.set('idlocal',this.lookupReference('cboLocales').getValue())
            Ext.util.Cookies.set('local',this.lookupReference('cboLocales').getRawValue())
            this.getView().destroy();
            Ext.create('wMain');
        }else{
            Ext.Msg.alert("Aviso","Seleccionar el local para cargar la información");
        }
        
    }
});
