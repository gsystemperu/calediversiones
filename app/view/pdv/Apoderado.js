Ext.define('juegosmecanicos.view.pdv.Apoderado', {
    extend: 'Ext.window.Window',
    xtype: 'wRegApoderado',
    alias: 'widget.wRegApoderado',
    requires: [
        'Ext.layout.container.HBox',
        'Ext.grid.*',
        'Ext.form.field.Number',
        'juegosmecanicos.store.Apoderados',
        'juegosmecanicos.view.pdv.AccionesNinosMembresia'
    ],
    layout: {
        type: 'hbox',
        pack: 'start',
        align: 'stretch'
    },
    bodyPadding: 5,
    defaults: {
        frame: false,
        bodyPadding: 5
    },
    config: {
        indice : 0,
        idapo  : 0,
        idprod : 0
    },
    modal: true,
    autoShow: true,
    width: 1300,
    height: 500,
    title: '.:: Registro de Apoderados ::.',
    controller: 'accionesninosmembresia',
    initComponent: function () {
        me = this;
        var storeApoderados = Ext.create('juegosmecanicos.store.Apoderados');
        Ext.apply(this, {
            items: [
              {
                    flex: 3,
                    margin: '0 3 0 0',
                    layout: 'fit',
                    items: [
                    {
                        xtype:'hiddenfield',
                        value :me.getIdprod(),
                        itemId : 'txtIdProducto'
                    },
                    {
                        xtype: 'grid',
                        itemId: 'dgvApoderados',
                        store: storeApoderados,
                        reference: 'dgvNinos',
                        sortableColumns: false,
                        emptyText: 'No existen registros',
                        columns: [
                            {
                                xtype: 'templatecolumn',
                                text: 'Nombres/Apellidos',
                                tpl: '{nombres}  {apellidos}',
                                flex: 2
                            },
                            {
                                text: 'D.N.I.',
                                dataIndex: 'dni',
                                flex: 1
                            },
                            {
                                text: 'Telefono',
                                dataIndex: 'telefono',
                                flex: 1
                            },
                            {
                                text: 'Correo',
                                dataIndex: 'correo',
                                flex: 1
                            },


                            {
                                xtype: 'widgetcolumn',
                                flex: 0.5,
                                widget: {
                                    xtype: 'button',
                                    flex: 1,
                                    glyph: 0xf014,
                                    handler: 'onClickEliminarNino'

                                }

                            }
                        ],
                        tbar: [
                            {
                                xtype: 'fieldset',
                                layout: 'hbox',
                                flex: 1,
                                defaults:{
                                    labelWidth:130,
                                    labelAlign:'right'
                                },
                                items: [{
                                        xtype: 'textfield',
                                        reference: 'txtBuscarCodigoProd',
                                        itemId : 'txtBuscarCodigoProd',
                                        fieldLabel: 'Nombres y Apellidos',
                                        enableKeyEvents: true,
                                        flex: 3,
                                        listeners: {
                                            keypress: 'onKeyPressTextoDeBusquedaApoderado'
                                        }
                                    },
                                    {
                                      xtype:'button',
                                      text : 'Exportar Lista',
                                      handler:function(){
                                        var _url = 'resources/api/exportarpadreshijos';
                                        var obj  = window.open(_url);
                                      }
                                    }
                                    /*{
                                        xtype: 'timefield',
                                        reference : 'txtHDesde',
                                        fieldLabel: 'Desde',
                                        flex: 1,
                                        minValue: '8:00 AM',
                                        maxValue: '10:00 PM',
                                        increment: 1,
                                        value : new Date(),
                                        hidden:true

                                    },
                                    {
                                        xtype: 'timefield',
                                        fieldLabel: 'Hasta',
                                        reference : 'txtHHasta',
                                        flex: 1,
                                        minValue: '8:00 AM',
                                        maxValue: '10:00 PM',
                                        increment: 1,
                                        hidden:true
                                    },
                                    { xtype:'hiddenfield',itemId:'txtDesdeMenbresia'},
                                    { xtype:'hiddenfield',itemId:'txtHastaMenbresia'}
                                    */
                                ]


                            }


                        ],
                        listeners: {
                            rowclick: 'seleccionarRegistroApoderado',
                           // rowdblclick: 'seleccionarRegistroNinoVenta'
                        }

                    }]
                },
              ,{
                    flex: 1,
                    margin: '0 10 0 0',
                    autoScroll: true,
                    items: [{
                        xtype: 'form',
                        //reference: 'myFrmNino',
                        //itemId: 'myFrmNino',
                        itemId: 'frmGuardarApoderado',
                        reference :'frmGuardarApoderado',
                        //url: juegosmecanicos.util.Rutas.ninoGuardar,
                        url: juegosmecanicos.util.Rutas.apoderadoGuardar,
                        layout: {
                            type: 'vbox',
                            pack: 'start',
                            align: 'stretch'
                        },
                        items: [
                            {
                                xtype: 'hiddenfield',
                                reference: 'txfIdApoderado',
                                name: 'idapo',
                            },

                            {
                                xtype: 'textfield',
                                fieldLabel: '<b>DNI</b>',
                                anchor: '100%',
                                name: 'dni',
                                itemId: 'dniapoderado',
                                enableKeyEvents: true,
                                /*listeners: {
                                    keypress: 'accionKeyPresDniApoderado'
                                },*/
                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: '<b>Nombres</b>',
                                anchor: '100%',
                                name: 'nombres',
                                itemId: 'nombresapoderado',
                                enableKeyEvents: true,
                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: '<b>Apellidos</b>',
                                anchor: '100%',
                                name: 'apellidos',
                                itemId: 'apellidosapoderado',
                                enableKeyEvents: true,
                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: '<b>Teléfono</b>',
                                anchor: '100%',
                                name: 'telefono',
                                itemId: 'telefonoapoderado',
                                enableKeyEvents: true,
                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: '<b>Correo</b>',
                                anchor: '100%',
                                name: 'correo',
                                itemId: 'correoapoderado',
                                enableKeyEvents: true,
                            },

                        ],


                        bbar: [
                            '->',
                            {
                                xtype: 'button',
                                text: 'Nuevo',
                                iconCls: 'fa fa-file fa-2x',
                                scale: 'medium',
                                handler: 'onClickNuevoApoderado'
                            },
                            {
                                xtype: 'button',
                                text: 'Grabar',
                                iconCls: 'fa fa-thumbs-o-up fa-2x',
                                scale: 'medium',
                                handler: 'onClickGuardarApoderado'
                            }

                        ]

                    }]

                }

            ]
        });
        this.callParent();
    }
});
