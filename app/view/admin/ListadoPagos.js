
Ext.define('juegosmecanicos.view.admin.ListadoPagos',{
    extend: 'Ext.panel.Panel',
    xtype: 'wListadoPagos',
    alias: 'widget.wListadoPagos',
    controller: 'admin-listadopagos',
    requires: [
        'Ext.layout.container.HBox',
        'Ext.container.ButtonGroup',
        'Ext.grid.column.*',
        'Ext.form.field.*',
        'Ext.panel.Panel',
        'juegosmecanicos.view.admin.ListadoPagosController'

    ],
    layout: {
        type: 'hbox',
        pack: 'start',
        align: 'stretch'
    },
    bodyPadding: 0,
    defaults: {
        bodyPadding: 0,
        border: false
    },
    tbar: [
        {
          xtype:'button',
          text: 'Imprimir Ticket',
          handler:'onClickImprimirTicket'
        },
        {
          xtype:'button',
          text: 'Reporte PDF',
         handler:'onClickImprimirPDFVentasDiarias'
        },
        {
            xtype:'button',
            text: 'Exportar Excel',
            handler:'onClickImprimirExcelVentasDiarias'
        },
        {
            xtype:'button',
            text: 'Listado de Niños',
            handler:'onClickImprimirExcelListadoNinos'
        }


    ],
    initComponent: function () {

        var storePedidos    = Ext.create('juegosmecanicos.store.Pedidos');
        var storePedidoDet  = Ext.create('juegosmecanicos.store.PedidoDetalle');

        var _date = Ext.Date.format(new Date(), 'd/m/Y')
        storePedidos.load({
          params : {
              desde   : _date,
              hasta   : _date,
              idlocal : Ext.util.Cookies.get('idlocal')
          }
        });

        var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false
        });

        Ext.apply(this, {
            items: [{
                xtype: 'panel',
                title: 'Registro de Ventas',
                flex: 1,
                margin: '0 3 0 0',
                layout: 'fit',
                items: [{
                    xtype: 'grid',
                    itemId: 'dgvVentas',
                    reference: 'dgvVentas',
                    store: storePedidos,
                    columnLines: true,
                    sortableColumns: false,
                    emptyText: 'NO HAY REGISTROS PARA MOSTRAR SEGUN EL RANGO DE FECHAS',
                    columns: [{
                            text: 'Fecha ',
                            dataIndex: 'fechaventa',
                            flex: 1.5,
                            align: 'center'
                        },
                        {
                            text: 'Cliente',
                            dataIndex: 'cliente',
                            flex: 2,
                              align: 'left'
                        },
                        {
                            xtype:'numbercolumn',
                            text: 'Total Pedido',
                            dataIndex: 'totalventa',
                            flex: 0.5,
                            align: 'right'



                        },
                         {
                            text: 'Estado',
                            dataIndex: 'estadopagostr',
                            flex: 1,
                            align: 'center',
                            renderer: function(value,st){
                              if(value=='ANULADO'){
                                return '<span style="color:red">'+ value.toString()+'</span>';
                              }else{
                                return value;
                              }
                            }
                        },
                        {
                            xtype: 'widgetcolumn',
                            width: 50,
                            widget: {
                                xtype: 'button',
                                width: 30,
                                glyph: 0xf014,
                                handler: 'onClickEliminarVenta'

                            }

                        }
                    ],

                    listeners: {
                        cellclick: 'onSelectedDetalle',
                    }


                }],
                tbar: [{
                    xtype: 'container',
                    bodyPadding: 0,
                    layout: 'hbox',
                    columnWidth: 10,
                    items: [{
                            xtype: 'label',
                            text: 'Fecha Desde',
                            padding: '5px 0 0 0',
                            border: true,
                            width: 100,
                            height: 25,
                            style: {
                                background: '#6A4B5A',
                                color: 'white',
                                textAlign: 'center',
                                fontWeight: 'bold',
                                fontSize: '13px'
                            }
                        }, {
                            xtype: 'datefield',
                            value: new Date(),
                            reference: 'dfDesdeCaja',
                            itemId: 'dfDesdeCaja',
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
                                background: '#6A4B5A',
                                color: 'white',
                                textAlign: 'center',
                                fontWeight: 'bold',
                                fontSize: '13px'
                            }
                        }, {
                            xtype: 'datefield',
                            value: new Date(),
                            reference: 'dfHastaCaja',
                            itemId: 'dfHastaCaja',
                            width: 100
                        },
                        {
                            xtype: 'button',
                            glyph: juegosmecanicos.util.Glyphs.getGlyph('buscar'),
                            tooltip: 'Buscador por rangos de fechas : { Desde , Hasta }',
                            handler: 'onClickBuscarPorFechas'
                        },

                    ]
                }],
                bbar: [
                    '->',
                    {
                        xtype: 'numberfield',
                        fieldLabel: '<b><div style="font-size:20px;margin-top:16px;">Total </div></b>',
                        itemId: 'txtTotalGeneral',
                        readOnly: true,
                        fieldStyle: 'text-align: right;font-size:20px;font-weight:bold; ',

                    }
                ],
            }, {
                xtype: 'panel',
                layout: 'fit',
                collapseDirection: 'right',
                border: true,
                title: 'Detalle del Ticket',
                flex: 1,
                items: [{
                    xtype: 'grid',
                    reference: 'dgvDetallePedido',
                    store: storePedidoDet,
                    columnLines: true,
                    sortableColumns: false,
                    requires: [
                        'Ext.grid.selection.SpreadsheetModel',
                        'Ext.grid.plugin.Clipboard'
                    ],
                    columns: [
                        {
                            text: 'Producto',
                            dataIndex: 'nombre',
                            flex: 1.5,
                            align: 'left'
                        },
                        {
                            text: 'Niño',
                            dataIndex: 'nino',
                            flex: 1.5,
                            align: 'left'
                        },

                        {
                            text: 'Desde',
                            dataIndex: 'hdesde',
                            flex: 0.5,
                            align: 'right'
                        },

                        {
                            text: 'Hasta',
                            dataIndex: 'hhasta',
                            flex: 0.5,
                            align: 'right'
                        },

                      /*  {
                            text: 'Precio',
                            dataIndex: 'precio',
                            flex: 0.5,
                            align: 'right'
                        },*/
                        {
                            text: 'Total',
                            dataIndex: 'total',
                            flex: 0.5,
                            align: 'right'
                        }

                    ]
                }]



            }]
        });
        this.callParent();

        var _date = Ext.Date.format(new Date(), 'd/m/Y')
        Ext.Ajax.request({
            url :juegosmecanicos.util.Rutas.totalVentaSumatoria,
            params:{
                desde  : _date,
                hasta  : _date,
                idlocal :   Ext.util.Cookies.get('idlocal')
            },
            success:function(response){
               var data = juegosmecanicos.util.Json.decodeJSON(response.responseText);
               Ext.each(data,function(row,i){
                 if(row._total){
                   Ext.ComponentQuery.query('#txtTotalGeneral')[0].setValue(row._total);
                 }
               });
            }
        });
    }
});
