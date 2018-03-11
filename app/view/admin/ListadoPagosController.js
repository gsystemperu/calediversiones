Ext.define('juegosmecanicos.view.admin.ListadoPagosController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.admin-listadopagos',

    onClickBuscarPorFechas:function(){

      _totalVenta = 0;
      _store = this.lookupReference('dgvVentas').getStore();
      _store.load({
        params : {
            desde  : Ext.ComponentQuery.query("#dfDesdeCaja")[0].getRawValue(),
            hasta  : Ext.ComponentQuery.query("#dfHastaCaja")[0].getRawValue(),
        },
        callback : function(records, operation, success){
            if(success == true){
              _store.each(function(record) {
                if(record.data.estadopagostr !='ANULADO')
                    _totalVenta = _totalVenta + record.data.totalventa;
              });
               Ext.ComponentQuery.query('#txtTotalGeneral')[0].setValue(_totalVenta);
            }
        }
      });


    },
    onClickImprimirTicket:function(){
      var _record = Ext.ComponentQuery.query('#dgvVentas')[0].getSelectionModel().getSelection()[0];
      // Impresion
      // =========
      var _url = 'resources/api/impresion/imprimirboleta/'+ _record.get('idven').toString();
      xpos = (screen.width / 2) - (1000 / 2);
      ypos = (screen.height / 2) - (600 / 2);
      my = window.open(_url, "mywindow",
          "location=1,status=1,scrollbars=1,  width=1000,height=600");
      my.moveTo(xpos, ypos);
      Ext.ComponentQuery.query('#dgvVentas')[0].getStore().load({
        params : {
            desde  : Ext.ComponentQuery.query("#dfDesdeCaja")[0].getRawValue(),
            hasta  : Ext.ComponentQuery.query("#dfHastaCaja")[0].getRawValue(),
        }
      });
    },
    onSelectedDetalle:function( grid, td, cellIndex, record, tr, rowIndex, e, eOpts){
        var _store = this.lookupReference('dgvDetallePedido').getStore();
        _store.load({
          params:{
            idven : record.get('idven')
          }
        });
    },
    onClickEliminarVenta:function(btn){
        _dgv = Ext.ComponentQuery.query('#dgvVentas')[0];
        rec = btn.getWidgetRecord();

        Ext.Msg.confirm("Aviso", "Desea anular la venta?", function(btn){
        if (btn == 'yes'){
            Ext.Ajax.request({
              url: juegosmecanicos.util.Rutas.ventaAnular,
              params: {
                  id: rec.get('idven')
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
                            desde  : Ext.ComponentQuery.query("#dfDesdeCaja")[0].getRawValue(),
                            hasta  : Ext.ComponentQuery.query("#dfHastaCaja")[0].getRawValue(),
                        },
                        callback : function(records, operation, success){
                            if(success == true){
                              _store.each(function(record) {
                                    if(record.data.estadopagostr !='ANULADO')
                                        _totalVenta = _totalVenta + record.data.totalventa;
                              });
                               Ext.ComponentQuery.query('#txtTotalGeneral')[0].setValue(_totalVenta);
                            }
                        }
                      });

                  }

              }
          });
        }
      });

    },
    onClickImprimirPDFVentasDiarias:function()
    {

      desde  = Ext.ComponentQuery.query("#dfDesdeCaja")[0].getRawValue();
      hasta  = Ext.ComponentQuery.query("#dfHastaCaja")[0].getRawValue();
      var _url = 'resources/api/imprimirventasdiarias?desde=' + desde+"&hasta="+ hasta;

     _panel = Ext.ComponentQuery.query("#tabPrincipal")[0];
     if (_panel.getChildByElement('pdfventasdiarias')) {
         _panel.remove('pdfventasdiarias');
     }
     if (!_panel.getChildByElement('pdfventasdiarias')) {
         _panel.add({
             xtype: 'panel',
             closable: true,
             id: 'pdfventasdiarias',
             title: 'PDF: Ventas Diarias',
             layout: 'fit',
             bodyPadding: '5px 5px 5px 5px',
             items: [{
                 xtype: 'component',
                 itemId: 'xiframe',
                 autoScroll: true,
                 autoEl: {
                     tag: 'iframe',
                     style: 'height: 100%; width: 100%;',
                     src: _url
                 }
             }]
         });
     }
     _panel.setActiveTab('pdfventasdiarias');

   },
   onClickImprimirExcelVentasDiarias:function(){
    desde    = Ext.ComponentQuery.query("#dfDesdeCaja")[0].getRawValue();
    hasta    = Ext.ComponentQuery.query("#dfHastaCaja")[0].getRawValue();
    var _url = 'resources/api/exportarventasdiarias?desde=' + desde+"&hasta="+ hasta;
    var obj  = window.open(_url);

   },
   onClickImprimirExcelListadoNinos:function(btn){
     var _url = 'resources/api/exportarpadreshijos';
     var obj  = window.open(_url);
   }

});
