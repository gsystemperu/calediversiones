
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
    tiposervicio: 0,
    codigobarra:false,
    initComponent:function(){
         me = this;
         _storeProducto     = Ext.create('juegosmecanicos.store.Productos');
         _storeProducto.load({
                 params : {idlocal  : Ext.util.Cookies.get('idlocal'),idcategoria: me.tiposervicio }
         });
         Ext.apply(this,{
             items:[{
                   xtype: 'dataview',
                   layout:'fit',
                   reference : 'dgvProducto',
                    autoScroll :true,
                    itemId:'dvListaMesa'+ me.numeromesa.toString(),
                    tpl: [
                        '<tpl for=".">',
                            '<div class="cuarto">',
                                    '<table style="width:100%;" border="0" ><tr>',
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
             tbar:[
                 {
                     xtype:'textfield',
                     reference : 'codigobarra',
                     itemId : 'codigobarra',
                     fieldLabel : 'Codigo Barra',
                     flex: 1,
                     hidden: me.codigobarra,
                     enableKeyEvents: true,
                     fieldStyle: 'text-align: center;font-size:20px;font-weight:bold;',
                     listeners: {
                         change: 'onChangeBuscarCodigoBarrasUnidad'
                     }
                 }
                 /*{
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
                 }*/
             ]
         });
        this.callParent(arguments);
        
    },

});
