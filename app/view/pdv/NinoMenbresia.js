Ext.define('juegosmecanicos.view.pdv.NinoMenbresia', {
    extend: 'Ext.window.Window',
    xtype: 'wRegNinoMenbresia',
    alias: 'widget.wRegNinoMenbresia',
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
    autoShow: true,
    width: 1300,
    height: 500,
    modal : true,
    title: '.:: Registro de niños Con Menbresia::.',
    controller: 'accionesninosmembresia',
    initComponent: function () {
        me = this;
        var storeNinos = Ext.create('juegosmecanicos.store.Ninos');
        Ext.apply(this, {
            items: [{
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
                        itemId: 'dgvNinos',
                        store: storeNinos,
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
                                text: 'Edad',
                                dataIndex: 'edad',
                                flex: 0.5
                            },
                            /*{
                                text: 'D.N.I.',
                                dataIndex: 'dni',
                                flex: 1
                            },*/
                            {
                                text: 'VISITAS',
                                dataIndex: 'ultimavisita',
                                flex: 0.5,
                                align: 'center'
                            },
                            {
                                text: 'USO MENBRESIA',
                                dataIndex: 'usumenbre',
                                flex: 0.5,
                                align: 'center',
                                renderer:function(value,style){
                                  if(value == 1){
                                    return '<strong style="color:red;">SI</strong>';
                                  }else{
                                    return '<strong>NO</strong>';
                                  }
                                }
                            },

                             {
                                text: 'DESDE',
                                dataIndex: 'membresiadesde',
                                flex: 0.5,
                                align: 'center',

                                renderer:function(data){
                                    return '<strong style="color:blue">'+data.toString()+'</strong>';
                                }
                            },
                             {
                                text: 'HASTA',
                                dataIndex: 'membresiahasta',
                                flex: 0.5,
                                align: 'center',

                                 renderer:function(data){
                                    return '<strong style="color:blue">'+data.toString()+'</strong>';
                                }
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
                        /*dockedItems: [{
                            xtype: 'pagingtoolbar',
                            store: storeNinos, // same store GridPanel is using
                            dock: 'bottom',
                            displayInfo: true
                        }],*/
                        tbar: [
                            {
                                xtype: 'fieldset',
                                layout: 'hbox',
                                flex: 1,
                                defaults:{
                                    labelWidth:40,
                                    labelAlign:'right'
                                },
                                items: [{
                                        xtype: 'textfield',
                                        reference: 'txtBuscarCodigoProd',
                                        itemId : 'txtBuscarCodigoProd',
                                        fieldLabel: 'Niño',
                                        enableKeyEvents: true,
                                        flex: 3,
                                        listeners: {
                                            keypress: 'onKeyPressTextoDeBusquedaNino'
                                        }
                                    },
                                    {
                                      xtype:'button',
                                      text :'Exportar',
                                      handler:'onClickExportarMembresia'
                                    },
                                    {
                                        xtype: 'timefield',
                                        reference : 'txtHDesde',
                                        fieldLabel: 'Desde',
                                        flex: 1,
                                        minValue: '8:00 AM',
                                        maxValue: '10:00 PM',
                                        increment: 1,
                                        value : new Date(),
                                        hidden:true,


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
                                ]


                            }


                        ],
                        listeners: {
                            rowclick: 'seleccionarRegistroNino',
                           // rowdblclick: 'seleccionarRegistroNinoVenta'
                        }

                    }]
                },
                {
                    flex: 1,
                    margin: '0 10 0 0',
                    autoScroll: true,
                    items: [{
                        xtype: 'form',
                        reference: 'myFrmNino',
                        itemId: 'myFrmNino',
                        url: juegosmecanicos.util.Rutas.ninoGuardarMembresia,
                        layout: {
                            type: 'vbox',
                            pack: 'start',
                            align: 'stretch'
                        },
                        items: [{
                                xtype: 'hiddenfield',
                                name: 'id',

                            },
                            {
                                    xtype: 'hiddenfield',
                                    name: 'idapoderado',
                                    value : this.getIdapo()

                            },
                            {
                              xtype :'hiddenfield',
                              name :'idmembre',
                              itemId :'idmembre',
                              value : 0
                            },
                            {
                                xtype: 'label',
                                text: 'Nombres'

                            },
                            {
                                xtype: 'textfield',
                                name: 'nombres',
                                reference :'txtnombres',
                                allowBlank: false,
                            },
                            {
                                xtype: 'label',
                                text: 'Apellidos'

                            },
                            {
                                xtype: 'textfield',
                                name: 'apellidos',
                                allowBlank: false,
                            },
                            {
                                xtype: 'label',
                                text: 'Fecha Nacimiento'

                            },
                            {
                                xtype: 'datefield',
                                name: 'fechanaci',
                                allowBlank: false,
                                value : new Date(),
                                format : 'd/m/Y',
                                /*listeners : {
                                  change : 'onChangeValidarNacimiento'
                                }*/

                            },

                            {
                                xtype: 'label',
                                text: 'Edad'

                            },
                            {
                                xtype: 'numberfield',
                                name: 'edad',
                                allowBlank: true,
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

                            {
                                xtype: 'label',
                                text: 'MEMBRESIA'
                            },
                            {
                                xtype: 'datefield',
                                name: 'membresiadesde',
                                fieldLabel :'Desde',
                                allowBlank: true,
                                readOnly:true
                            },
                            {
                                xtype: 'datefield',
                                name: 'membresiahasta',
                                fieldLabel :'Hasta',
                                allowBlank: true,
                                readOnly:true
                            },


                        ],
                        bbar: [
                            '->',
                            {
                                xtype: 'button',
                                text: 'Actualiar',
                                iconCls: 'fa fa-thumbs-o-up fa-2x',
                                scale: 'medium',
                                handler: 'onClickGuardarNino'
                            },
                            {
                                xtype: 'button',
                                text: 'Baja Membresia',
                                iconCls: 'fa fa-thumbs-o-up fa-2x',
                                scale: 'medium',
                                handler: 'onClickBajaMembresia'
                            }

                        ]

                    }]

                }

            ]
        });
        this.callParent();
    }
});
