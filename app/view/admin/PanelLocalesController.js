Ext.define('juegosmecanicos.view.admin.PanelLocalesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.admin-localescontroller',
    seleccionarRegistroLocal : function  (grid, record, element, rowIndex, e, eOpts ){
      var formClientes = this.lookupReference('myFrmLocales');
      formClientes.loadRecord(record);

    },
    onClickNuevoLocal: function(){
        this.lookupReference('myFrmLocales').reset();
    },
    onClickGuardarLocal:function(){
        var frm = this.lookupReference('myFrmLocales');
        if(frm.isValid()){
           frm.submit({
                waitMsg: 'Guardando información...',
                success: function (form, action) {
                    _dgv = Ext.ComponentQuery.query('#dgvLocales')[0];
                    _dgv.getStore().load();
                    frm.reset();
               },
                failure: function () {
                    Ext.Msg.alert("Aviso", action.result.msg);
                }
            });

        }else{
          Ext.Msg.alert("Aviso","Ingresar los campos!");return false;
        }
    },

    onClickEliminarLocal: function(btn){
        _dgv = Ext.ComponentQuery.query('#dgvClientes')[0];
        record = btn.getWidgetRecord();

        Ext.Ajax.request({
            url: juegosmecanicos.util.Rutas.clienteEliminar,
            params: {
                idclie: record.get('idclie')
            },
            success: function(response){
                var respuesta = juegosmecanicos.util.Json.decodeJSON(response.responseText);
                console.log(respuesta.msg);
                if(respuesta.error>0){
                    var frm = Ext.ComponentQuery.query('#myFrmCliente')[0];
                    frm.reset();
                    _dgv.getStore().load();
                }

            }
        });
    }
});
