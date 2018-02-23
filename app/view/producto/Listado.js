
Ext.define("juegosmecanicos.view.producto.Listado",{
    extend: "Ext.panel.Panel",
    xtype :'wListadoProducto',
    alias : 'wListadoProducto',
    requires: [
        'juegosmecanicos.view.producto.ProductoController',
        'Ext.toolbar.TextItem',
        'Ext.view.View',
        'Ext.ux.DataView.Animated'
    ],
    controller: "productos",
    bodyPadding:3,
    layout:'fit',
    numeromesa : 0,
    initComponent:function(){
         me = this;
         var _storeCategoria    = Ext.create('juegosmecanicos.store.Categorias');
        _storeCategoria.load();
        //var _storeSubCategoria = Ext.create('juegosmecanicos.store.SubCategorias');
        var _storeProducto     = Ext.create('juegosmecanicos.store.Productos');

         //var _store = Ext.create('juegosmecanicos.store.tmpProductos');
         Ext.apply(this,{
             items:[{
                   xtype: 'dataview',
                   layout:'fit',
                    autoScroll :true,
                    itemId:'dvListaMesa'+ me.numeromesa.toString(),
                    tpl: [
                        '<tpl for=".">',
                            '<div class="cuarto">',
                                    '<table style="width:100%;" border="0" ><tr>',
                                       /*'<tpl if="imagen &gt;= true">',
                                            '<td><img src="resources/images/productos/{idprod}.jpg" width=80 height=80 /></td>',
                                       '<tpl else >',
                                            '<td><img src="resources/images/no-img.jpg" width=80 height=80 /></td>',
                                       '</tpl>',*/
                                        '<td><table style="width:100%;" border="0">',
                                            '<tr>',
                                                '<td  align="right"><label class="productoprecio">S./ {precioventa}</label></strong></td>',
                                            '</tr>',
                                            '<tr>',
                                                '<td><label class="productonombre">{nombre}</label></td>',
                                            '</tr>',
                                        '</table>',
                                    '</td>',
                                    '</tr></table>',
                            '</div>',
                        '</tpl>'
                    ],
                    plugins: {
                        xclass: 'Ext.ux.DataView.Animated'
                    },
                    multiSelect:true,
                    store:_storeProducto,
                    //height: 310,
                    trackOver: true,
                    overItemCls: 'x-item-over',
                    itemSelector: 'div.cuarto',
                    emptyText: '<b>SIN DATOS EN CATEGORIA</b>',
                    listeners:{ itemclick :'accionClickItem'}
                }
             ],
            /* tbar:[
                 {
                     xtype:'combo',
                     fieldLabel:'Categoria',
                     flex: 1,
                     store:_storeCategoria,
                     valueField : 'idcate',
                     displayField : 'descripcion',
                     editable :false,
                     queryMode:'local',
                     value : 1,
                     itemId : 'cboCategoria'+ me.numeromesa.toString(),
                     listeners : {
                        select : 'onSelectCategoria'
                     }
                 }
             ]*/
         });




        this.callParent(arguments);

    },

});
