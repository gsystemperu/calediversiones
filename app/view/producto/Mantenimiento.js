Ext.define('juegosmecanicos.view.producto.Mantenimiento', {
    extend: 'Ext.panel.Panel',
    xtype: 'wRegProducto',
    alias: 'widget.wRegProducto',
    requires: [
        'Ext.layout.container.HBox',
        'juegosmecanicos.view.producto.ProductoController',
        'Ext.grid.*',
        'Ext.form.field.Number',
        'Ext.data.StoreManager'
    ],
    layout: {
        type: 'hbox',
        pack: 'start',
        align: 'stretch'
    },
     defaults: {
        frame: false,
    },
    controller:'productos',
    initComponent: function () {
        storeProducto  = Ext.create('juegosmecanicos.store.Productos');
        storeProducto.load({
            params : {idlocal  : Ext.util.Cookies.get('idlocal')}
       });
        storeCategoria = Ext.create('juegosmecanicos.store.Categorias');
         Ext.apply(this, {
            items: [{
                    ///title: 'Registros',
                    flex: 3,
                    margin: '0 3 0 0',
                    layout: 'fit',
                    items: [{
                        xtype: 'grid',
                        itemId: 'dgvProductos',
                        store: storeProducto,
                        reference: 'dgvProductos',
                        sortableColumns: false,
                        columns: [
                           /*{
                                text: 'Codigo',
                                dataIndex: 'idprod',
                                flex: 1,
                                align: 'center'
                            },*/
                            {
                                text: 'Descripcion',
                                dataIndex: 'nombre',
                                flex: 2
                            },
                            {
                                text: 'Categoria',
                                dataIndex: 'categoria',
                                flex: 1
                            },
                            {
                                text: 'Minutos',
                                dataIndex: 'minutos',
                                flex: 0.5
                            },
                            {
                                text: 'Orden',
                                dataIndex: 'orden',
                                flex: 0.5
                            },

                            {
                                xtype: 'numbercolumn', format:'0.00',
                                text: 'Precio',
                                dataIndex: 'precioventa',
                                flex: 1,
                                align: 'right'
                            },
                            {
                                xtype: 'widgetcolumn',
                                flex: 0.5,
                                widget: {
                                    xtype: 'button',
                                    flex: 1,
                                    glyph: 0xf014,
                                    handler: 'onClickEliminarProducto'

                                }

                            }
                        ],

                        listeners: {
                             cellclick: 'onClickItemProducto'
                        }

                    }]
                },
                {
                    title: 'Informacion',
                    flex: 1.5,
                    margin: '0 10 0 0',
                    autoScroll: true,
                    items: [{
                        xtype: 'form',
                        reference: 'myFrmProducto',
                        padding : 10,
                        url : juegosmecanicos.util.Rutas.productoGuardar,
                        layout: {
                            type: 'vbox',
                            pack: 'start',
                            align: 'stretch'
                        },
                        items: [{
                                xtype: 'hiddenfield',
                                name: 'idprod',
                                itemId:'idprod'

                            },
                            {
                                xtype :'hiddenfield',
                                name  : 'idlocal',
                                value :   Ext.util.Cookies.get('idlocal')
                            },
                            {
                                xtype: 'label',
                                text: 'Nombre del Producto'
                            },
                            {
                                xtype: 'textarea',
                                name: 'nombre',
                                itemId:'txtNombreProd',
                                allowBlank: false,
                            },
                            {
                              xtype:'container',
                              layout:'hbox',
                              padding:'5px 5px 5px 5px',
                              items:[
                                {
                                    xtype: 'combo',
                                    name: 'idcate',
                                    fieldLabel:'Categoria',
                                    store:storeCategoria,
                                    queryMode: 'local',
                                    displayField: 'descripcion',
                                    valueField: 'idcate',
                                    editable: false,
                                    flex: 2,
                                    itemId:'cboCategoria'

                                },
                                {
                                  xtype: 'button',
                                  glyph: juegosmecanicos.util.Glyphs.getGlyph('nuevo'),
                                //  handler: 'onClickNuevoProducto',
                                  flex: 0.5
                                }
                              ]
                            },
                            {
                             xtype:'container',
                             layout:'hbox',
                             padding:'5px 5px 5px 5px',
                             hidden:true,
                             items:[
                               {
                                  xtype: 'combo',
                                  name: 'idsubcate',
                                  fieldLabel:'Sub Categoria',
                                  //store: storeUM,
                                  queryMode: 'local',
                                  displayField: 'descripcion',
                                  valueField: 'id',
                                  editable: false,
                                  flex: 2
                              },
                               {
                                 xtype: 'button',
                                 glyph: juegosmecanicos.util.Glyphs.getGlyph('nuevo'),
                                 //handler: 'onClickMantenimiento',
                                 flex: 0.5
                               }
                             ]
                           },
                           {

                               xtype:'numberfield',
                               fieldLabel:'Precio Compra',
                               name : 'preciocompra',
                               flex: 1,
                               allowDecimals: true,
                               decimalSeparator: '.',
                               decimalPrecision:2,
                               step:'0.1',
                               value : 0,
                               hidden:true

                            },
                            {
                                xtype:'container',
                                layout:'hbox',
                                flex: 1,
                                padding : '0 0 5 0',
                                items:[
                                  {
                                    xtype:'checkbox',
                                    boxLabel : '* LLEVAR CONTROL DE SERVICIO',
                                    name : 'llevacontrol',
                                    reference :'llevacontrol',
                                    readOnly:true,
                                    value : true
                                  },

                                  {
                                    xtype:'checkbox',
                                    boxLabel : 'Maneja Stock',
                                    name : 'manejastock',
                                    reference :'chkManejaStock',
                                    hidden : true
                                  },

                                  {
                                     xtype:'numberfield',
                                     name : 'stock',
                                     fieldLabel:'Stock',
                                     labelAlign:'right',
                                     flex: 1,
                                     align:'right',
                                     value : 0,
                                     allowNegative: true,
                                     hideTrigger: true,
                                     hidden:true
                                 },

                                ]
                            },
                            {
                              xtype:'checkbox',
                              boxLabel : '* ES UNA PROMOCIÓN DE MEMBRESIA',
                              name : 'esmembresia',
                            },
                            {
                              xtype:'checkbox',
                              boxLabel : '* CONTARDOR DE VISITAS',
                              name : 'contarvisita'
                            },
                            {

                                xtype:'numberfield',
                                fieldLabel:'Precio Venta',
                                name : 'precioventa',
                                flex: 1,
                                allowDecimals: true,
                                decimalSeparator: '.',
                                decimalPrecision:2,
                                step:'0.1',
                                value : 0,
                             },
                             {
                               xtype:'container',
                               layout:'hbox',
                               padding : '5 0 5 0',
                               items:[
                                 {
                                   xtype:'numberfield',
                                   fieldLabel :'Tiempo (min.)',
                                   flex :1,
                                   allowDecimals: false,
                                   decimalSeparator: '.',
                                   decimalPrecision:0,
                                   step:'1',
                                   value : 0,
                                   name : 'minutos'
                                 },
                                 {
                                   xtype:'numberfield',
                                   fieldLabel :'Orden',
                                   labelAlign : 'right',
                                   flex :1,
                                   allowDecimals: false,
                                   decimalSeparator: '.',
                                   decimalPrecision:0,
                                   step:'1',
                                   name : 'orden',
                                   value : 0
                                 },

                               ]
                             },


                             {
                                 xtype      :'filefield',
                                 name       :'fotoproducto',
                                 buttonText :'Seleccionar Imagen...',
                                 flex       : 1,
                                 hidden     :true
                             },
                             {
                                  xtype: 'image',
                                  reference: 'fotoproducto',
                                  padding: '20 50 20 50',
                                  width: 70,
                                  height: 300
                             }

                        ],
                        bbar: [
                          '->',
                          {
                                xtype: 'button',
                                text: 'Nuevo',
                                iconCls: 'fa fa-file fa-2x',
                                scale: 'medium',
                                handler: 'onClickNuevoProducto'
                            },
                            {
                                xtype: 'button',
                                text: 'Grabar',
                                iconCls: 'fa fa-thumbs-o-up fa-2x',
                                scale: 'medium',
                                handler: 'onClickGuardarProducto'
                            }

                        ]

                    }]

                }

            ]
        });
        this.callParent();
    }
});
