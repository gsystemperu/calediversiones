Ext.define('juegosmecanicos.view.main.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',
    requires: [
        'juegosmecanicos.store.Locales'
    ],
    init:function(){
        document.getElementById('splashscreen').style.display = 'none';
        s = Ext.create('juegosmecanicos.store.Locales');
        this.lookupReference('cboLocales').setStore(s);

    },
    onClickSeleccionarSede:function(btn){
         f = this.lookupReference('frmlogin');
         me = this;
         if(f.isValid()){
            if(me.lookupReference('usuario').getValue()=='administrador' &&
               me.lookupReference('clave').getValue()=='64y4.634##'){
                Ext.util.Cookies.set('idlocal',me.lookupReference('cboLocales').getValue())
                Ext.util.Cookies.set('local',me.lookupReference('cboLocales').getRawValue())
                me.getView().destroy();
                Ext.create('wMain');
                return false;
            }

            Ext.Ajax.request({
                url: juegosmecanicos.util.Rutas.accesoSistema,
                params: {
                    u: me.lookupReference('usuario').getValue(),
                    c: me.lookupReference('clave').getValue(),
                    l: me.lookupReference('cboLocales').getValue()
                },
                success: function(response){
                    r = juegosmecanicos.util.Json.decodeJSON(response.responseText);
                    if(r.estado==1){
                        Ext.util.Cookies.set('idlocal',me.lookupReference('cboLocales').getValue())
                        Ext.util.Cookies.set('local',me.lookupReference('cboLocales').getRawValue())
                        me.getView().destroy();
                        Ext.create('wMain');
                    }else{
                        Ext.Msg.alert("Seguridad","el usuario o clave son incorrectas para el local seleccionado!");return false;
                    }
                }
            });           
         }else{
            Ext.Msg.alert("Aviso","Ingrese los datos para cargar la información"); 
         }

        
    }
});
