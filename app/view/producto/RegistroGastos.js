Ext.define('juegosmecanicos.view.producto.RegistroGastos', {
    extend: 'Ext.panel.Panel',
    xtype: 'wRegGastos',
    alias: 'widget.wRegGastos',
    requires: [
        'Ext.layout.container.HBox',
        'juegosmecanicos.view.producto.GastoController',
        'Ext.grid.*',
        'Ext.form.field.Number',
        'Ext.data.StoreManager'
    ],
    layout: {
        type: 'hbox',
        pack: 'start',
        align: 'stretch'
    },
   // bodyPadding: 5,
    defaults: {
        frame: false,
      //  bodyPadding: 5
    },
    controller:'gastos',
    initComponent: function () {
        var store  = Ext.create('juegosmecanicos.store.Gastos');

         Ext.apply(this, {
            items: [{
                    //title: 'Registros',
                    flex: 3,
                    margin: '0 3 0 0',
                    layout: 'fit',
                    items: [{
                        xtype: 'grid',
                        itemId: 'dgvGastos',
                        store: store,
                        sortableColumns: false,
                        columns: [
                           /*{
                                text: 'Codigo',
                                dataIndex: 'idprod',
                                flex: 1,
                                align: 'center'
                            },*/
                            {
                                text: 'Fecha',
                                dataIndex: 'fecha',
                                flex: 0.5
                            },
                            {
                                text: 'Descripcion',
                                dataIndex: 'descripcion',
                                flex: 3
                            },

                            {
                                xtype: 'numbercolumn', format:'0.00',
                                text: 'Monto',
                                dataIndex: 'montogasto',
                                flex: 0.5,
                                align: 'right'
                            },
                            {
                                xtype: 'widgetcolumn',
                                flex: 0.5,
                                widget: {
                                    xtype: 'button',
                                    flex: 1,
                                    glyph: 0xf014,
                                    handler: 'onClickEliminarGasto'

                                }

                            }
                        ],
                       tbar: [{
                               xtype: 'container',
                               bodyPadding: 0,
                               layout: 'hbox',
                               columnWidth: 10,
                                items: [
                                  {
                                        xtype: 'label',
                                        text: 'Fecha Desde',
                                        padding: '5px 0 0 0',
                                        border: true,
                                        width: 100,
                                        height: 25,
                                        style: {
                                            background: '#6a4b5a',
                                            color: 'white',
                                            textAlign: 'center',
                                            fontWeight: 'bold',
                                            fontSize: '13px'
                                        }
                                    }, {
                                        xtype: 'datefield',
                                        value: new Date(),
                                        reference: 'dfDesde',
                                        itemId: 'dfDesde',
                                        width: 100
                                    },
                                    {
                                        xtype: 'label',
                                        text: 'Fecha Hasta',
                                        padding: '5px 0 0 0',
                                        border: true,
                                        width: 100,
                                        height: 25,
                                        style: {
                                            background: '#6a4b5a',
                                            color: 'white',
                                            textAlign: 'center',
                                            fontWeight: 'bold',
                                            fontSize: '13px'
                                        }
                                    }, {
                                        xtype: 'datefield',
                                        value: new Date(),
                                        reference: 'dfHasta',
                                        itemId: 'dfHasta',
                                        width: 100
                                    },
                                    {
                                        xtype: 'button',
                                        glyph: juegosmecanicos.util.Glyphs.getGlyph('buscar'),
                                        tooltip: 'Buscador por rangos de fechas : { Desde , Hasta }',
                                        handler: 'onClickBuscarPorFechas'
                                    },{
                                      xtype:'button',
                                      tooltip: 'Reporte de gastos',
                                      text  : 'Exportar',
                                      handler: 'onClickReporteGastos'
                                    }
                                ]


                        },

                    ],
                        listeners: {
                             cellclick: 'onClickItemGasto'
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
                        reference: 'myFrmGasto',
                        padding : 10,
                        url : juegosmecanicos.util.Rutas.gastoGuardar,
                        layout: {
                            type: 'vbox',
                            pack: 'start',
                            align: 'stretch'
                        },
                        items: [{
                                xtype: 'hiddenfield',
                                name: 'idgasto',
                                itemId:'idgasto',
                                value : 0

                            },

                            {
                                xtype: 'datefield',
                                name: 'fecha',
                                allowBlank: false,
                                value : new Date(),
                                fieldLabel :'Fecha'
                            },
                            {
                                xtype: 'textarea',
                                name: 'descripcion',
                                itemId : 'descripcion',
                                allowBlank: false,
                                fieldLabel :'Descripcion'
                            },
                           {

                               xtype:'numberfield',
                               fieldLabel:'Monto',
                               name : 'montogasto',
                               flex: 1,
                               allowDecimals: true,
                               decimalSeparator: '.',
                               decimalPrecision:2,
                               step:'0.1',
                               value : 0,

                            }

                        ],
                        bbar: [
                          '->',
                          {
                                xtype: 'button',
                                text: 'Nuevo',
                                //iconCls: 'fa fa-file fa-2x',
                                scale: 'medium',
                                handler: 'onClickNuevoGasto'
                            },
                            {
                                xtype: 'button',
                                text: 'Grabar',
                                //iconCls: 'fa fa-thumbs-o-up fa-2x',
                                scale: 'medium',
                                handler: 'onClickGuardarGasto'
                            }

                        ]

                    }]

                }

            ]
        });
        this.callParent();
    }
});
