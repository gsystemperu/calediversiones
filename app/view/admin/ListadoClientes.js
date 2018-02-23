Ext.define('juegosmecanicos.view.admin.ListadoClientes', {
    extend: 'Ext.panel.Panel',
    xtype: 'wRegClientes',
    alias: 'widget.wRegClientes',
    requires: [
        'Ext.layout.container.HBox',
        'juegosmecanicos.view.admin.ListadoClientesController',
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
    controller: 'admin-listadoclientes',
    initComponent: function () {
        var storeClientes = Ext.create('juegosmecanicos.store.Clientes');
        /*var storeUM = Ext.create('LabClinica.store.UnidadMedida');
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
                    itemId: 'dgvClientes',
                    store: storeClientes,
                    reference: 'dgvClientes',
                    sortableColumns: false,
                    emptyText: 'No existen registros',
                    columns: [{
                        text: 'Codigo',
                        dataIndex: 'idclie',
                        flex: 1,
                        align: 'center'
                    },
                    {
                        text: 'Nombre',
                        dataIndex: 'nombres',
                        flex: 5
                    },
                    {
                        text: 'DNI',
                        dataIndex: 'dni',
                        flex: 5
                    },
                    /*{
                        text: 'Stock Fisico',
                        dataIndex: 'stockprod',
                        flex: 1,
                        align: 'right'
                    },*/
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
                        store: storeClientes, // same store GridPanel is using
                        dock: 'bottom',
                        displayInfo: true
                    }],
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
                            enableKeyEvents: true,
                            listeners: {

                                keypress: 'onKeyPressTextoDeBusquedaCliente'
                            }
                        }
                    ]


                    },

                    ],
                    listeners: {
                        rowclick: 'seleccionarRegistroCliente'
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
                        text: 'Nombre del cliente'

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
