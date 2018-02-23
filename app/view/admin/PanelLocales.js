Ext.define('juegosmecanicos.view.admin.PanelLocales', {
    extend: 'Ext.panel.Panel',
    xtype: 'wRegLocales',
    alias: 'widget.wRegLocales',
    requires: [
        'Ext.layout.container.HBox',
        /*'juegosmecanicos.view.admin.ListadoLocalesController',
        'Ext.grid.*',
        'Ext.form.field.Number'*/
    ],
    layout: {
        type: 'hbox',
        pack: 'start',
        align: 'stretch'
    },
    defaults: {},
    //controller: 'admin-listadoLocales',
    initComponent: function () {
        var storeLocales = Ext.create('juegosmecanicos.store.Locales');

        Ext.apply(this, {
            items: [{
                flex: 3,
                margin: '0 10 0 0',
                layout: 'fit',
                items: [{
                    xtype: 'grid',
                    itemId: 'dgvLocales',
                    store: storeLocales,
                    reference: 'dgvLocales',
                    sortableColumns: false,
                    emptyText: 'No se han registro locales',
                    columns: [{
                        text: 'Codigo',
                        dataIndex: 'idlocal',
                        flex: 1,
                        align: 'center'
                    },
                    {
                        text: 'Dirección',
                        dataIndex: 'direccion',
                        flex: 5
                    },
                    {
                        text: 'Teléfono',
                        dataIndex: 'telefono',
                        flex: 5
                    },
                    {
                        text: 'Celular',
                        dataIndex: 'celular',
                        flex: 5
                    },
                    {
                        text: 'Estado',
                        dataIndex: 'estado',
                        flex: 5
                    },
                    {
                        text: 'Descripción',
                        dataIndex: 'descripcion',
                        flex: 5
                    },
                    {
                        xtype: 'widgetcolumn',
                        flex: 0.5,
                        widget: {
                            xtype: 'button',
                            flex: 1,
                            glyph: 0xf014,
                            handler: 'onClickEliminarCliente'

                        }

                    }
                    ],
                    dockedItems: [{
                        xtype: 'pagingtoolbar',
                        //store: storeLocales, // same store GridPanel is using
                        dock: 'bottom',
                        displayInfo: true
                    }],
                    listeners: {
                        rowclick: 'seleccionarRegistroCliente'
                    }

                }]
            },
            {
                flex: 1.5,
                margin: '0 10 0 0',
                autoScroll: true,
                items: [{
                    xtype: 'form',
                    reference: 'myFrmCliente',
                    itemId: 'myFrmCliente',
                    url : juegosmecanicos.util.Rutas.clienteGuardar,
                    layout: {
                        type: 'vbox',
                        pack: 'start',
                        align: 'stretch'
                    },
                    items: [{
                        xtype: 'hiddenfield',
                        name: 'idclie',
                        itemId: 'idclie'

                    },
                    
                    {
                        xtype: 'label',
                        text: 'Nombre del Producto'

                    },
                    {
                        xtype: 'textfield',
                        name: 'nombres',
                        allowBlank: false,
                    },
                    {
                        xtype: 'label',
                        text: 'DNI'
                    },
                    {
                        xtype: 'textfield',
                        name: 'dni',
                        allowBlank: true,
                    },


                    ],
                    bbar: [
                        '->',
                        {
                            xtype: 'button',
                            text: 'Nuevo',
                            iconCls: 'fa fa-file fa-2x',
                            scale: 'medium',
                            handler: 'onClickNuevoCliente'
                        },
                        {
                            xtype: 'button',
                            text: 'Grabar',
                            iconCls: 'fa fa-thumbs-o-up fa-2x',
                            scale: 'medium',
                            handler: 'onClickGuardarCliente'
                        }

                    ]

                }]

            }

            ]
        });
        this.callParent();
    }
});
