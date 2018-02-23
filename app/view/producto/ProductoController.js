Ext.define('juegosmecanicos.view.producto.ProductoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.productos',
    accionClickItem :function(  listview , record,item,index,e , eOpts){
      console.log(record);
       var lista      = listview.itemId.toString();
       var numeromesa = lista.substr(lista.length - 1,lista.length);
       var _data = {
              idprod : record.get('idprod'),
              descripcion :  record.get('nombre'),
              cantidad : 1,
              precio :  record.get('precioventa'),
              total :    record.get('precioventa') * 1,
              minutos : record.get('minutos')
       };
       var _grid = Ext.ComponentQuery.query('#dgvDetallePedidoMesa'+numeromesa.toString())[0];
       //*******************************
       // @ Validar si esta el item en la lista
       //if (_grid.getStore().findRecord('idprod', parseInt( record.get('idprod') ))) {
       //     Ext.Msg.alert("AVISO", "EL PRODUCTO YA ESTA EN LISTA, MODIFICAR LA CANTIDAD ? ");
       //     return false;
       // }
       _grid.getStore().insert(0,_data);
       this.onCalcularTotalVenta(numeromesa);
    },
    onCalcularTotalVenta: function (_numeromesa)
    {
        me = this;
        var store = Ext.ComponentQuery.query('#dgvDetallePedidoMesa'+_numeromesa.toString())[0].getStore();
        var _tot = 0;

        store.each(function (record) {
            _tot = parseFloat(_tot) + record.get('total');
        });
        Ext.ComponentQuery.query('#txtTotalVenta'+_numeromesa.toString())[0].setValue(
              _tot.toFixed(2)
          //  Ext.util.Format.number(_tot.toFixed(2), "0,000.00")
        );
    },
    onSelectCategoria:function ( combo, record, eOpts ) {
      var combo      = combo.itemId.toString();
      var numeromesa = combo.substr(combo.length - 1,combo.length);
      var lista     = Ext.ComponentQuery.query('#dvListaMesa'+numeromesa.toString())[0];
      var store     = lista.getStore();
      store.load({
        params : {
            idcategoria    : record.get('idcate') ,
            idsubcategoria : 0
        }
      });
    },
    onClickNuevoProducto : function(){
        var frm = this.lookupReference('myFrmProducto');
        frm.reset();
        Ext.ComponentQuery.query('#txtNombreProd')[0].focus(this);
    },
    onClickGuardarProducto:function(){
       var frm = this.lookupReference('myFrmProducto');
       if(frm.isValid()){
          frm.submit({
               waitMsg: 'Guardando información...',
               success: function (form, action) {
                   _dgv = Ext.ComponentQuery.query('#dgvProductos')[0];
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
    onClickItemProducto: function (obj, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var form = this.lookupReference('myFrmProducto');
        form.loadRecord(record);
        if(record.get('imagen')){
            this.lookupReference('fotoproducto').setSrc('resources/images/productos/'+ record.get('idprod').toString() +'.jpg?'+Ext.id().toString() );
        }else {
            this.lookupReference('fotoproducto').setSrc('resources/images/no-img.jpg');
        }

    }
});
