Ext.define('juegosmecanicos.view.admin.PanelLocales', {
    extend: 'Ext.panel.Panel',
    xtype: 'wRegLocales',
    alias: 'widget.wRegLocales',
    requires: [
        'Ext.layout.container.HBox','juegosmecanicos.view.admin.PanelLocalesController'
    ],
    layout: {
        type: 'hbox',
        pack: 'start',
        align: 'stretch'
    },
    defaults: {},
    controller: 'admin-localescontroller',
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
                    columns: [
                    {
                        text: 'Dirección',
                        dataIndex: 'direccion',
                        flex: 2
                    }, {
                        text: 'Encargado',
                        dataIndex: 'descripcion',
                        flex: 1
                    },
                
                    {
                        xtype: 'widgetcolumn',
                        flex: 0.5,
                        widget: {
                            xtype: 'button',
                            flex: 1,
                            glyph: 0xf014,
                            handler: 'onClickEliminarLocal'

                        }

                    }
                    ],
                
                    listeners: {
                        rowclick: 'seleccionarRegistroLocal'
                    }

                }]
            },
            {
                flex: 1.5,
                margin: '0 10 0 0',
                autoScroll: true,
                items: [{
                    xtype: 'form',
                    reference: 'myFrmLocales',
                    url : juegosmecanicos.util.Rutas.localActualizar,
                    layout: {
                        type: 'vbox',
                        pack: 'start',
                        align: 'stretch'
                    },
                    items: [{
                        xtype: 'hiddenfield',
                        name: 'idlocal'

                    },
                    
                    {
                        xtype: 'label',
                        text: 'Direccion'

                    },
                    {
                        xtype: 'textfield',
                        name: 'direccion',
                        allowBlank: false,
                    },
                    {
                        xtype: 'label',
                        text: 'Telefono'
                    },
                    {
                        xtype: 'textfield',
                        name: 'telefono',
                        allowBlank: true,
                    },
                    {
                        xtype: 'label',
                        text: 'Celular'
                    },
                    {
                        xtype: 'textfield',
                        name: 'celular',
                        allowBlank: true,
                    },

                    {
                        xtype: 'label',
                        text: 'Encargdo'
                    },
                    {
                        xtype: 'textfield',
                        name: 'descripcion',
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
                            handler: 'onClickNuevoLocal'
                        },
                        {
                            xtype: 'button',
                            text: 'Grabar',
                            iconCls: 'fa fa-thumbs-o-up fa-2x',
                            scale: 'medium',
                            handler: 'onClickGuardarLocal'
                        }

                    ]

                }]

            }

            ]
        });
        this.callParent();
    }
});
