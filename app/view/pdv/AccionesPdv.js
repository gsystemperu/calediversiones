Ext.define('juegosmecanicos.view.pdv.AccionesPdv', {
    extend: 'Ext.app.ViewController',
    requires: [
        'Ext.window.MessageBox',
        'Ext.tab.Panel',
        'Ext.tree.Panel',
        'juegosmecanicos.view.pdv.Main',
        'juegosmecanicos.view.pdv.IngresarCliente'
    ],
    alias: 'controller.accionespdv',
    /*init:function(){
         var _panel = Ext.ComponentQuery.query('#dvContenedorMesas')[0];
         var mesas = 8;

        _panel.add({
                title: 'Caja : ',
                closable: false,
                id: 'stand01',
                layout: 'fit',
                items: [{ xtype: 'wPdv'}]
            });

         _panel.setActiveTab('stand01');

    },*/
    //@ Accion boton Cliente
    accionClienteMesa:function(btn){
        /*var win = Ext.create('Ext.window.Window',{
            width : 300,
            height : 300,
            title : 'Registrar Cliente',
            autoShow:true
        });*/
        var _win = Ext.create('juegosmecanicos.view.pdv.IngresarCliente');
        _win.show();
    },
    accionPagoMesa :function(btn){
        var _btn = btn.itemId.toString();
        var numeromesa = _btn.substr(_btn.length - 1 , _btn.length + 2);
        var _idper     = Ext.ComponentQuery.query('#txtCodigoPersona')[0].getValue();;
        var _idlocal   = 1;
        var _idemp     = 0; //Ext.ComponentQuery.query('#cboEmpleado'+numeromesa.toString())[0].getValue();
        var _store     = Ext.ComponentQuery.query('#dgvDetallePedidoMesa'+numeromesa.toString())[0].getStore();
        var _dataDetalle = [];
        _store.each(function (record) {
                
                if(record.get("hmenbresiadesde")){
                  _memdesde = record.get("hmenbresiadesde");
                  _memhasta =  record.get("hmenbresiahasta");
                }else{
                  _memdesde = '01/01/0001';
                  _memhasta = '01/01/0001';
                }
                if (record.get('cantidad') != 0) {
                    _reg = {
                        "idprod": record.get('idprod'),
                        "cantidad": record.get('cantidad'),
                        "precio": record.get("precio"),
                        "total": record.get("total"),
                        "idnino":record.get("idnino"),
                        "hdesde" : record.get("hdesde"),
                        "hhasta" : record.get("hhasta"),
                        "hmenbresiadesde" :_memdesde,    //record.get("hmenbresiadesde") ,
                        "hmenbresiahasta" :_memhasta    //record.get("hmenbresiahasta"),
                    };
                    _dataDetalle.push(_reg);
                }

            });

        //_txt1[0].setValue(JSON.stringify(_dataDetalle));
        var _jsonTexto = JSON.stringify(_dataDetalle);
        var win = Ext.create('juegosmecanicos.view.pdv.Pago',{ mesa : numeromesa,persona:_idper,local:_idlocal, detalle : _jsonTexto, empleado : _idemp });
        win.show();
    },
    onClickEliminarItem:function(btn){
      var _btn = btn.itemId.toString();
      var numeromesa = _btn.substr(_btn.length - 1 , _btn.length + 2);
      var rec = btn.getWidgetRecord();
      var store = Ext.ComponentQuery.query('#dgvDetallePedidoMesa'+numeromesa.toString())[0].getStore();
      store.remove(rec);
      this.onCalcularTotalVenta(numeromesa);
    },
    onCalcularTotalVenta: function (_numeromesa)
    {
        me = this;
        var store = Ext.ComponentQuery.query('#dgvDetallePedidoMesa'+_numeromesa.toString())[0].getStore();
        var _tot = 0;
        store.each(function (record) {
            _tot = _tot + record.get('total');
        });
        Ext.ComponentQuery.query('#txtTotalVenta'+_numeromesa.toString())[0].setValue(
            _tot.toFixed(2)
            //Ext.util.Format.number(_tot.toFixed(2), "0,000.00")
        );
    },
    onSelectEmpleado: function(cbo){
        var _btn = cbo.itemId.toString();
        var numeromesa = _btn.substr(_btn.length - 1 , _btn.length + 2);
       /* Ext.Ajax.request({
            url :juegosmecanicos.util.Rutas.mesaValidarReserva,
            params:{
              idmesa : numeromesa,
              idemp  : parseInt(cbo.getValue())
            },
            success:function(response){
               var obj = juegosmecanicos.util.Json.decodeJSON(response.responseText);
               Ext.each(obj,function(row,i){
                    if(row.error == 1){
                      Ext.Msg.alert("Aviso","La mesa esta pendiente de pago, mesero encargado : "+ row.empleado);
                      Ext.ComponentQuery.query('#btnPagoMesa'+numeromesa)[0].setDisabled(true);
                      return false;
                    }else{
                      Ext.ComponentQuery.query('#btnPagoMesa'+numeromesa)[0].setDisabled(false);
                    }
               });
            }
        });*/

    },
    onClickBotonCalculadora:function(btn){
        var _btn = btn.itemId.toString();
        var numeromesa = _btn.substr(_btn.length - 1 , _btn.length + 2);
        var valorBoton = btn.value;
        var _grid      = Ext.ComponentQuery.query("#dgvDetallePedidoMesa"+numeromesa.toString())[0];
        var _posicion  = _grid.getSelectionModel().getSelection()[0].get('id');
        var _record    = _grid.getStore().findRecord("id",_posicion);
        me = this;
        if(_record)
        {
            if( Ext.ComponentQuery.query('#txtAccionCalculadora'+numeromesa)[0].getValue() == '1' ){
                 _record.set("cantidad" ,  parseInt(valorBoton));
                 _record.set("total", _record.get('precio') * parseInt(valorBoton));
                 _record.endEdit();
                 _record.commit();
                 me.onCalcularTotalVenta(numeromesa);
            }
        }else{
            Ext.Msg.alert("Aviso","Seleccionar un item de la lista!");return false;
        }
    },
    accionSelectApoderado :function(btn){

        var win = Ext.create('juegosmecanicos.view.pdv.PopupApoderado',{});
        win.show();
    },
    onEditorCalcularTotal:function(editor,e){
        _cant = e.record.get('cantidad');
        _pre = e.record.get('precio');
        _tot = _pre * _cant;
        e.record.set('total', _tot.toFixed(2));
        this.onCalcularTotalVenta(1);
    },

    onClickVerNinosMembresia:function(){
          var win = Ext.create('juegosmecanicos.view.pdv.NinoMenbresia',{});
        win.show();
    },
    onClickVerApoderados:function(){
          var win = Ext.create('juegosmecanicos.view.pdv.Apoderado',{});
        win.show();
    },

    /*
        Metodo para agregar nuevo niño
     */
      onClickAgregarNino:function(btn)
      {
      var _btn = btn.itemId.toString();
      var numeromesa = _btn.substr(_btn.length - 1 , _btn.length + 2);
      var rec = btn.getWidgetRecord();
      Ext.create('juegosmecanicos.view.pdv.Nino',{
          idapo :Ext.ComponentQuery.query('#txtCodigoPersona')[0].getValue(),
          idprod : rec.get('idprod'),
          minutos : rec.get('minutos')
      });


    },




});
