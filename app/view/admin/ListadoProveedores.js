Ext.define('juegosmecanicos.view.admin.ListadoProveedores', {
    extend: 'Ext.panel.Panel',
    xtype: 'wRegProveedores',
    alias: 'widget.wRegProveedores',
    requires: [
        'Ext.layout.container.HBox',
        'juegosmecanicos.view.producto.ProductoController',
        'Ext.grid.*',
        'Ext.form.field.Number'
    ],
    layout: {
        type: 'hbox',
        pack: 'start',
        align: 'stretch'
    },
    bodyPadding: 5,
    defaults: {
        frame: true,
        bodyPadding: 5
    },
    controller:'productos',
    initComponent: function () {
        /*var storeProductos = Ext.create('LabClinica.store.Productos');
        var storeUM = Ext.create('LabClinica.store.UnidadMedida');
        var storePR = Ext.create('LabClinica.store.Presentacion');
        var storeCA = Ext.create('LabClinica.store.Categoria');*/
       // storeProductos.load();
        Ext.apply(this, {
            items: [{
                  //  title: 'Registros',
                    flex: 3,
                    margin: '0 3 0 0',
                    layout: 'fit',
                    items: [{
                        xtype: 'grid',
                        itemId: 'dgvProductos',
                      //  store: storeProductos,
                        reference: 'dgvProductos',
                        sortableColumns: false,
                        columns: [{
                                text: 'Codigo',
                                dataIndex: 'codprod',
                                flex: 1,
                                align: 'center'
                            },
                            {
                                text: 'Descripcion',
                                dataIndex: 'desprod',
                                flex: 5
                            },
                            /*{
                                text: 'Stock Fisico',
                                dataIndex: 'stockprod',
                                flex: 1,
                                align: 'right'
                            },*/
                            {
                                xtype: 'numbercolumn', format:'0.00',
                                text: 'Precio Lima',
                                dataIndex: 'precioprod',
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
                        tbar: [{
                                xtype: 'fieldset',
                                title: '<b>Buscar Por</b>',
                                layout: 'hbox',
                                flex: 1,
                                padding: '0 5 10 5',
                                items: [{
                                        xtype: 'textfield',
                                        reference: 'txtBuscarCodigoProd',
                                        fieldLabel: 'Buscar Codigo',
                                        flex: 1,
                                        enableKeyEvents:true,
                                        listeners:{
                                         // focus:'onFocusTextoDeBusquedaProducto',
                                          keypress:'onKeyPressTextoDeBusquedaProducto'
                                        }
                                    },
                                    {
                                        xtype: 'button',
                                        glyph: juegosmecanicos.util.Glyphs.getGlyph('buscar'),
                                        handler: 'onClickBuscarProductoCodigo'
                                    },
                                   {
                                        xtype: 'textfield',
                                        reference: 'txtBuscarDescripcionProd',
                                        fieldLabel: 'Buscar Descripcion',
                                        flex: 1,
                                        labelWidth: 150,
                                        labelAlign: 'right',
                                        /*listeners:{
                                          focus:'onFocusTextoDeBusquedaProducto'
                                        }*/
                                    },
                                    {
                                        xtype: 'button',
                                        glyph: juegosmecanicos.util.Glyphs.getGlyph('buscar'),
                                      //  handler: 'onClickBuscarProductoDescripcion'
                                    }
                                ]


                            },

                        ],
                        listeners: {
                             itemclick: 'onClickItemProducto'
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
                        //url : juegosmecanicos.util.Rutas.productoGuardar,
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
                                xtype: 'label',
                                text: 'Codigo',

                            },
                            {
                                xtype: 'textfield',
                                name: 'codprod',
                                itemId:'codprod',
                                allowBlank: false,

                            },
                            {
                                xtype: 'label',
                                text: 'Nombre del Producto'
                            },
                            {
                                xtype: 'textarea',
                                name: 'desprod',
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
                                    //store: storePR,
                                    queryMode: 'local',
                                    displayField: 'descripcion',
                                    valueField: 'id',
                                    editable: false,
                                    flex: 2,
                                    itemId:'cboPresentacion'
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
                             xtype:'container',
                             layout:'hbox',
                             padding:'5px 5px 5px 5px',
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
                                xtype:'container',
                                layout:'hbox',
                                flex: 1,
                                padding : '0 0 5 0',
                                items:[
                                    {

                                        xtype:'numberfield',
                                        fieldLabel:'Precio Compra',
                                        name : 'precioprod',
                                        flex: 1,
                                        allowDecimals: true,
                                        decimalSeparator: '.',
                                        decimalPrecision:2,
                                        step:'0.1',
                                        value : 0

                                     },{
                                        xtype:'numberfield',
                                        name : 'stockprod',
                                        fieldLabel:'Stock',
                                        labelAlign:'right',
                                        flex: 1,
                                        align:'right',
                                        value : 0,
                                        allowNegative: true,
                                        hideTrigger: true,

                                    }
                                ]
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
                                 xtype:'filefield',
                                 name : 'fotoproducto',
                                 buttonText: 'Seleccionar Imagen...',
                                 flex : 1
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
