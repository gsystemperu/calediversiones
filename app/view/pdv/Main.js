Ext.define('juegosmecanicos.view.pdv.Main', {
    extend: 'Ext.container.Container',
    alias: 'wPdv',
    xtype: 'wPdv',
    requires: [
        'Ext.grid.plugin.*',
        'Ext.grid.Panel',
        'Ext.grid.column.Number',
        'Ext.grid.column.Date',
        'Ext.grid.column.Boolean',
        'Ext.view.Table',
        'Ext.tab.Panel',
        'Ext.tab.Tab',
    ],
    layout: 'border',
    numeromesa: 0,
    initComponent: function () {
        me = this;
        var _storeDetalle = Ext.create('juegosmecanicos.store.tmpRegistroVenta');
        Ext.apply(me, {
            items: me.getItems(_storeDetalle, 1)
        });
        this.callParent(arguments);
    },
    getItems: function (_storeDetalle, _numeromesa) {
        var storeNinos = Ext.create('juegosmecanicos.store.NinosTodos');
        var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false
        });
        var _obj = [{
                xtype: 'container',
                flex: 1.5,
                region: 'west',
                layout: {
                    type: 'vbox',
                    align: 'stretch',
                    pack: 'center'
                },
                items: [{
                        xtype: 'panel',
                        flex: 1,
                        layout: 'fit',
                        items: [{
                            xtype: 'gridpanel',
                            itemId: 'dgvDetallePedidoMesa' + _numeromesa.toString(),
                            store: _storeDetalle,
                            plugins: [rowEditing],
                            selModel: 'cellmodel',
                            plugins: {
                                ptype: 'cellediting',
                                clicksToEdit: 1
                            },
                            columns: [{
                                    //xtype: 'gridcolumn',
                                    dataIndex: 'descripcion',
                                    text: 'Producto',
                                    flex: 3,

                                },
                                {
                                    // xtype: 'gridcolumn',
                                    dataIndex: 'cantidad',
                                    text: 'Horas.',
                                    flex: 1,
                                    align: 'center',
                                    editor: {
                                        xtype: 'numberfield',
                                        value: 0,
                                        maxValue: 1000,
                                        minValue: 0,
                                        itemId: 'txtCantidadUnidad'

                                    },


                                },
                                {
                                    xtype: 'numbercolumn',
                                    dataIndex: 'precio',
                                    text: 'Precio',
                                    flex: 1,
                                    align: 'right',

                                },
                                {
                                    xtype: 'numbercolumn',
                                    dataIndex: 'total',
                                    text: 'Total',
                                    flex: 1.5,
                                    align: 'right',

                                },
                                {
                                    dataIndex: 'infante',
                                    text: 'Niño',
                                    flex: 2,
                                    dataIndex: 'nino',
                                },
                                {
                                    xtype: 'widgetcolumn',
                                    flex: 0.5,
                                    widget: {
                                        xtype: 'button',
                                        flex: 1,
                                        itemId: 'btnNino' + _numeromesa.toString(),
                                        glyph: 0xf007,
                                        handler: 'onClickAgregarNino'
                                    },


                                },
                                {
                                    xtype: 'widgetcolumn',
                                    flex: 0.5,
                                    widget: {
                                        xtype: 'button',
                                        flex: 1,
                                        itemId: 'btnEliminar' + _numeromesa.toString(),
                                        glyph: 0xf014,
                                        handler: 'onClickEliminarItem'
                                    },


                                },
                                {

                                    dataIndex: 'hdesde',
                                    text: 'Desde',
                                    flex: 1,


                                },
                                {
                                    dataIndex: 'hhasta',
                                    text: 'hasta',
                                    flex: 1,


                                },
                            ],
                            listeners: {
                                edit: 'onEditorCalcularTotal'
                            }
                        }],
                        tbar: [
                            /*
                                @ Acciones de Mesa para la calculadora
                                =======================================
                                1 => Cantidad
                                2 => Descuento
                                3 => Precio
                                4 => Limpiar
                            */
                            {
                                xtype: 'hiddenfield',
                                itemId: 'txtCodigoPersona',
                                value: 0,
                            },

                            {
                                xtype: 'hiddenfield',
                                itemId: 'txtAccionCalculadora' + _numeromesa.toString(),
                                value: "1"
                            },
                            {
                                xtype: 'button',
                                itemId: 'btnPagoMesa' + _numeromesa.toString(),
                                text: 'Ingresar Pago',
                                scale: 'small',
                                handler: 'accionPagoMesa'
                            },
                            {
                                xtype: 'button',
                                itemId: 'btnSelectApoderado',
                                text: 'Apoderado',
                                scale: 'small',
                                handler: 'accionSelectApoderado'
                            },
                            {
                                xtype: 'label',
                                itemId: 'txtNombrePersona',
                                text: '',
                            },
                            '->',
                            {
                                xtype:'button',
                                text :'Ver Membresia',
                                handler :'onClickVerNinosMembresia'
                            },
                            {
                                xtype:'button',
                                text :'Ver Apoderados',
                                handler :'onClickVerApoderados'
                            }


                        ],
                        bbar: [
                            '->',
                            {
                                xtype: 'numberfield',
                                fieldLabel: '<b><div style="font-size:20px;margin-top:16px;">Total :</div></b>',
                                itemId: 'txtTotalVenta' + _numeromesa.toString(),
                                decimalSeparator: '.',
                                readOnly: true,
                                fieldStyle: 'text-align: right;font-size:35px;font-weight:bold; ',

                            }
                        ],
                    },

                ]
            },
            {


                xtype: 'panel',
                flex: 1,
                region: 'center',
                layout: 'fit',
                title: 'Lista de juegos',
                items: [{
                    xtype: 'wListadoProducto',
                    numeromesa: _numeromesa.toString(),
                }]

            }


        ];

        return _obj;


    }




});
