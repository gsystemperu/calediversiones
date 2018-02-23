Ext.define('juegosmecanicos.view.admin.ListadoConfigController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.admin-listadoconfig',
    
    accionbtnGuardarConfigGeneral: function(){
        _form = Ext.ComponentQuery.query('#frmGuardarConfigGeneral')[0];

        if (_form.isValid()) {
            _form.submit({
                waitMsg: 'Guardando informacion...',
                success: function (form, action) {

                    //Ext.Msg.alert("Aviso", action.result.msg);
                },
                failure: function () {
                    Ext.Msg.alert("Aviso", action.result.msg);
                    _view.close();
                }
            });
        } else {
           Ext.Msg.alert("GSytem Peru",'Ingresar los datos de la venta!');
           return false;
        }
    },

    accionbtnEditarConfigGeneral: function(){
        _formulario = Ext.ComponentQuery.query('#frmGuardarConfigGeneral')[0];
        Ext.each(_formulario.items.items,function(obj){

            var tipo = obj.getXType();
            if(tipo == 'textfield'){
                obj.setReadOnly(false); 
            }

        });

        Ext.ComponentQuery.query('#btnEditarConfigGeneral')[0].setHidden(true);

    },
    onClickEliminarVenta:function(){
        
    }
    
});
