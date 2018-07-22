Ext.define('juegosmecanicos.view.calendario.CalendarioController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.calendario',
    onClickGuardar:function(btn){
         f = this.lookupReference('frmevento');
         me = this;
         if(f.isValid()){
            f.submit({
                waitMsg: 'Guardando información...',
                success: function (form, action) {
                    _dgv = me.lookupReference('dgvevento');
                    _dgv.getStore().reload();
               },
                failure: function () {
                    Ext.Msg.alert("Aviso", action.result.msg);
                }
            });
        
         }else{
            Ext.Msg.alert("Aviso","Ingrese los datos para cargar la información");
         }


    },
    onSelectDia:function(obj, date, eOpts ){
        me.lookupReference('dgvevento').getStore().load({
            params:{
                fecha:Ext.Date.format(obj.getValue(), 'Y-m-d')
            }
        });
    },
    onClickCliente:function(b){
        win = Ext.create('juegosmecanicos.view.pdv.PopupApoderado',{});
        win.show();
    },
    onClickNuevo:function(b){
        this.lookupReference('frmevento').reset();
    },
    onClickEliminar:function(b){
        
    }
});
