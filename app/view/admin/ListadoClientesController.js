Ext.define('juegosmecanicos.view.admin.ListadoClientesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.admin-listadoclientes',
    seleccionarRegistroCliente : function  (grid, record, element, rowIndex, e, eOpts ){
        //console.log(record);
      var formClientes = this.lookupReference('myFrmCliente');
      formClientes.loadRecord(record);

    },

    onClickNuevoCliente: function(){
        this.lookupReference('myFrmCliente').reset();
    },

    onClickGuardarCliente:function(){
        var frm = this.lookupReference('myFrmCliente');
        if(frm.isValid()){
           frm.submit({
                waitMsg: 'Guardando información...',
                success: function (form, action) {
                    _dgv = Ext.ComponentQuery.query('#dgvClientes')[0];
                    _dgv.getStore().load();
               },
                failure: function () {
                    Ext.Msg.alert("Aviso", action.result.msg);
                }
            });

        }else{
          Ext.Msg.alert("Aviso","Ingresar los campos!");return false;
        }
    },

    onClickEliminarCliente: function(btn){
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
    },

    onKeyPressTextoDeBusquedaCliente : function ( txt, e, eOpts ){
        if(e.keyCode == 13){
            this.lookupReference('dgvClientes').getStore().load({
                params : { nombre : txt.getValue()}
            })
        }
    }
    
    
});
