Ext.define('juegosmecanicos.view.producto.ProductoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.productos',
    accionClickItem :function(  listview , record,item,index,e , eOpts){
      console.log(record);
        lista      = listview.itemId.toString();
        numeromesa = lista.substr(lista.length - 1,lista.length);
        mem = 0;
        if(record.get('esmembresia')){
          mem = 1;
        }
        _data = {
              idprod : record.get('idprod'),
              descripcion :  record.get('nombre'),
              cantidad : 1,
              precio :  record.get('precioventa'),
              total :    record.get('precioventa') * 1,
              minutos : record.get('minutos'),
              membresia : mem

       };
        _grid = Ext.ComponentQuery.query('#dgvDetallePedidoMesa'+numeromesa.toString())[0];
       //*******************************
       // @ Validar si esta el item en la lista
       //if (_grid.getStore().findRecord('idprod', parseInt( record.get('idprod') ))) {
       //     Ext.Msg.alert("AVISO", "EL PRODUCTO YA ESTA EN LISTA, MODIFICAR LA CANTIDAD ? ");
       //     return false;
       // }
       _grid.getStore().insert(0,_data);
       this.onCalcularTotalVenta(numeromesa);
    },
    onClickEliminarProducto:function(btn){
        s = this.lookupReference('dgvProductos').getStore();
        r =  btn.getWidgetRecord().get('idprod');
        Ext.Msg.confirm("Ventas", "Desea eliminar el SERVICIO seleccionado", function(btn){
            if (btn == 'yes')
            {
                Ext.Ajax.request({
                    url: juegosmecanicos.util.Rutas.productoEliminar,
                    params: {
                        idprod: r
                    },
                    success: function(response){
                        r = juegosmecanicos.util.Json.decodeJSON(response.responseText);
                        console.log(r);
                        if(r.data[0].error==0){
                            s.reload();
                        }
                    }
                });
            }
        });
    },
    onCalcularTotalVenta: function (_numeromesa)
    {
        me = this;
         store = Ext.ComponentQuery.query('#dgvDetallePedidoMesa'+_numeromesa.toString())[0].getStore();
         _tot = 0;

        store.each(function (record) {
            _tot = parseFloat(_tot) + record.get('total');
        });
        Ext.ComponentQuery.query('#txtTotalVenta'+_numeromesa.toString())[0].setValue(
              _tot.toFixed(2)
        );
    },
    onSelectCategoria:function ( combo, record, eOpts ) {
       combo      = combo.itemId.toString();
       numeromesa = combo.substr(combo.length - 1,combo.length);
       lista     = Ext.ComponentQuery.query('#dvListaMesa'+numeromesa.toString())[0];
       store     = lista.getStore();
      store.load({
        params : {
            idcategoria    : record.get('idcate') ,
            idsubcategoria : 0
        }
      });
    },
    onClickNuevoProducto : function(){
         frm = this.lookupReference('myFrmProducto');
        frm.reset();
        Ext.ComponentQuery.query('#txtNombreProd')[0].focus(this);
    },
    onClickGuardarProducto:function(){
       frm = this.lookupReference('myFrmProducto');
       if(Ext.util.Cookies.get('sa')==0 && Ext.ComponentQuery.query('#idprod')[0].getValue()!=0){
         Ext.Msg.alert("Seguridad","Usted no tiene permiso para actualizar,llamar al administrador");
         return false;
       }
       if(frm.isValid()){
          frm.submit({
               waitMsg: 'Guardando información...',
               success: function (form, action) {
                   _dgv = Ext.ComponentQuery.query('#dgvProductos')[0];
                   _dgv.getStore().reload();
              },
               failure: function () {
                   Ext.Msg.alert("Aviso", action.result.msg);
               }
           });
       }else{
         Ext.Msg.alert("Aviso","Ingresar los campos!");return false;
       }
    },
    onClickItemProducto: function (obj, td, cellIndex, record, tr, rowIndex, e, eOpts) {
         form = this.lookupReference('myFrmProducto');
        form.loadRecord(record);
        if(record.get('imagen')){
            this.lookupReference('fotoproducto').setSrc('resources/images/productos/'+ record.get('idprod').toString() +'.jpg?'+Ext.id().toString() );
        }else {
            this.lookupReference('fotoproducto').setSrc('resources/images/no-img.jpg');
        }
    },
    onChangeBuscarCodigoBarrasUnidad:function( obj, newValue, oldValue, eOpts){
          st  = this.lookupReference('dgvProducto').getStore();
          c   = this.lookupReference('codigobarra').getValue().trim();
          if(c){
            r = st.findRecord('codigobarra', c);
            if(r){
                numeromesa = 1;
                _data = {
                        idprod : r.get('idprod'),
                        descripcion :  r.get('nombre'),
                        cantidad : 1,
                        precio :  r.get('precioventa'),
                        total :    r.get('precioventa') * 1,
                        minutos : r.get('minutos')
                };
                _grid = Ext.ComponentQuery.query('#dgvDetallePedidoMesa1')[0];
                _grid.getStore().insert(0,_data);
                this.onCalcularTotalVenta(numeromesa);
                this.lookupReference('codigobarra').setValue('');
            }else{
                this.lookupReference('codigobarra').setValue('');
                Ext.Msg.alert("Aviso","El codigo seleccionado no existe"); return false;
            }
        }
    }
});
