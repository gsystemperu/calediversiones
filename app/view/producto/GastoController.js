Ext.define('juegosmecanicos.view.producto.GastoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.gastos',
    onClickNuevoGasto : function(){
        var frm = this.lookupReference('myFrmGasto');
        frm.reset();
        Ext.ComponentQuery.query('#descripcion')[0].focus(this);
    },
    onClickGuardarGasto:function(){
       var frm = this.lookupReference('myFrmGasto');
       if(frm.isValid()){
          frm.submit({
               waitMsg: 'Guardando información...',
               success: function (form, action) {
                   _dgv = Ext.ComponentQuery.query('#dgvGastos')[0];
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
    onClickItemGasto: function (obj, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var form = this.lookupReference('myFrmGasto');
        form.loadRecord(record);
    },
    onClickBuscarPorFechas:function(){
      __desde =  Ext.ComponentQuery.query('#dfDesde')[0].getRawValue();
      __hasta =  Ext.ComponentQuery.query('#dfHasta')[0].getRawValue();
      __store = Ext.ComponentQuery.query('#dgvGastos')[0].getStore();
      __store.load({
        params :{
          desde : __desde,
          hasta : __hasta
        }
      });

    },
    onClickEliminarGasto:function(btn){
      _dgv = Ext.ComponentQuery.query('#dgvGastos')[0];
      rec = btn.getWidgetRecord();

      Ext.Msg.confirm("Aviso", "Desea anular el gasto?", function(btn){
      if (btn == 'yes'){
          Ext.Ajax.request({
            url: juegosmecanicos.util.Rutas.gastoAnular,
            params: {
                idgasto: rec.get('idgasto')
            },
            success: function(response){
                var respuesta = juegosmecanicos.util.Json.decodeJSON(response.responseText);
                if(respuesta.error!=0)
                {
                    //_dgv.getStore().reload();
                    _store = _dgv.getStore()
                    _totalVenta = 0;
                    _store.reload({
                      params : {
                          desde  : Ext.ComponentQuery.query("#dfDesde")[0].getRawValue(),
                          hasta  : Ext.ComponentQuery.query("#dfHasta")[0].getRawValue(),
                      },
                      /*callback : function(records, operation, success){
                          if(success == true){
                            _store.each(function(record) {
                                  if(record.data.estadopagostr !='ANULADO')
                                      _totalVenta = _totalVenta + record.data.totalventa;
                            });
                             Ext.ComponentQuery.query('#txtTotalGeneral')[0].setValue(_totalVenta);
                          }
                      }*/
                    });

                }

            }
        });
      }
    });
  },
  onClickReporteGastos:function(){
        desde    = Ext.ComponentQuery.query("#dfDesde")[0].getRawValue();
        hasta    = Ext.ComponentQuery.query("#dfHasta")[0].getRawValue();
        var _url = 'resources/api/gastos_exportar?desde=' + desde+"&hasta="+ hasta;
        var obj  = window.open(_url);

    }
});
