Ext.define('juegosmecanicos.view.calendario.Calendario',{
    extend: 'Ext.panel.Panel',
    xtype: 'wcalendario',
    requires: [
        'Ext.layout.container.HBox',
        'Ext.grid.*',
        'Ext.form.field.Number',
        'juegosmecanicos.view.calendario.CalendarioController'
    ],
    layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    bodyPadding: 2,
    defaults: {
        frame: false,
        bodyPadding: 5
    },
    controller : 'calendario',
    initComponent: function () {   
        me = this;
        st = Ext.create('juegosmecanicos.store.Eventos');
        l  = Ext.create('juegosmecanicos.store.Locales');
        sp = Ext.create('juegosmecanicos.store.Pagos');
        f = new Date();
        st.load({
            params:{
                fecha : f.toLocaleDateString()
            }
        });
        Ext.apply(this, 
        {
            items: me.getRenderForm(st,l,sp)        
        });
        this.callParent();
      },
        
      getRenderForm:function(st,l,sp){
        var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false
        });
        var f = [
            {
                xtype:'panel',
                flex : 1,
                layout:{
                    type:'hbox',
                    pack: 'start',
                    align: 'stretch'
                },
                items:[
                    {
                        xtype:'panel',
                        layout:'fit',
                        flex : 1,
                        items:[
                            {
                                xtype:'datepicker',
                                name : 'fecha',
                                bodyPadding : 50,
                                flex: 1,
                                value : new Date(),
                                listeners:{
                                    select :'onSelectDia' 
                                }
                            }
                        ]
                    },
                    {
                        xtype:'grid',
                        reference:'dgvevento',
                        store : st,
                        flex: 2.5,
                        columns:[
                            {
                                text:'Evento',
                                flex:4,
                                xtype: 'templatecolumn',
                                tpl: '</br><b style="color:dimgrey;font-size:30px;padding-top:15px;">{nomevento}</b> ' +
                                '<div style="color:dimgrey;padding-top:4px;"> Local :  {direccion} </div> ' + 
                                '<div style="color:dimgrey;padding-top:4px;">Desde : {horainicio} ' +
                                'Hasta :  {horatermino}</div>',
                            },
                            {
                                xtype: 'widgetcolumn',
                                flex: 0.5,
                                widget: {
                                    xtype: 'button',
                                    flex: 1,
                                    glyph: 0xf014,
                                    handler: 'onClickEliminarEvento',
                                    tooltip : 'Eliminar el evento'
                                }
                            },
                            {
                                xtype: 'widgetcolumn',
                                flex: 0.5,
                                widget: {
                                    xtype: 'button',
                                    flex: 1,
                                    glyph: 0xf02f,
                                    handler: 'onClickImprimirContrato',
                                    tooltip : 'Imprimir contrato del evento'
                                }
                            },
                            {
                                xtype: 'widgetcolumn',
                                flex: 0.5,
                                widget: {
                                    xtype: 'button',
                                    flex: 1,
                                    glyph: 0xf003,
                                    handler: 'onClickEMail',
                                    tooltip : 'Enviar el contrato al cliente'
                                }
                            }
                        ],
                        emptyText :'NO HAY EVENTOS REGISTRADOS',
                        listeners : {
                            rowclick :'onClickEvento'
                        }
                    }
                ]
            },
            {
                xtype:'form',
                frame :false,
                url : juegosmecanicos.util.Rutas.eventoGuardar,
                reference : 'frmevento',
                padding : 5,
                flex : 1.8,
                title : 'Detalle del Evento',
                layout:{
                    type:'vbox',
                    pack: 'start',
                    align: 'stretch'
                },
                tbar:[
                    '->',
                    {text:'Guardar los pagos e imprimir',handler:'onClickRegPag'}
                ],
                bbar :[
                    '->',
                    {text:'Nuevo',handler:'onClickNuevo'},
                    {text :'Guardar',handler:'onClickGuardar'}
                ],
                defaultType:'textfield',
                items:[
                    {xtype:'hiddenfield',name:'id',value:0},
                    {xtype:'hiddenfield',name:'idclie',value:0},
                    {xtype:'hiddenfield',name:'jsondata',value:''},
                    {xtype:'hiddenfield',name:'pos',value:0},
                    {
                        xtype:'container',
                        padding :'0 0 5 0',
                        layout:{
                            type:'hbox',
                            pack: 'start',
                            align: 'stretch'
                        },
                        items:[
                            {xtype:'datefield' ,flex:1,name:'fecha',value:new Date(),fieldLabel:'Fecha',editable:false},
                            {xtype:'textfield',fieldLabel:'Evento Nombre',flex:2,name:'nomevento',fieldStyle:'font-size:20px;background-color:#818181,color:white',allowBlank:false}
                        ]
                    },
                    {
                        xtype:'container',
                        padding :'0 0 5 0',
                        layout:{
                            type:'hbox',
                            pack: 'start',
                            align: 'stretch'
                        },
                        items:[
                            {
                                xtype:'textfield',fieldLabel:'Cliente',
                                name:'cliente',
                                flex:2,allowBlank:false},
                            {xtype:'button',text:'Buscar',flex:0.5,handler:'onClickCliente'}
                        ]
                    },
                    
                    {
                        xtype:'container',
                        layout:'hbox',
                        padding:'0 0 5 0',
                        items:[
                            {
                                xtype: 'timefield',
                                name: 'horainicio',
                                fieldLabel:'Hora Inicio',
                                value : '9:00 AM',
                                minValue: '9:00 AM',
                                maxValue: '9:00 PM'
                            },
                            {
                                
                                xtype: 'timefield',
                                name: 'horatermino',
                                fieldLabel:'Hora Termino',
                                minValue: '9:00 AM',
                                maxValue: '9:00 PM',
                                value : '9:00 AM'
                            },
                            {
                                xtype:'combo',
                                fieldLabel: '<b style="color:red;">Local</b>',
                                labelAlign :'right',
                                flex: 1,
                                name : 'idlocal',
                                editable:false,
                                store : l,
                                queryMode: 'local',
                                displayField : 'direccion',
                                valueField : 'idlocal',
                                value : Ext.util.Cookies.get('idlocal') 
                            }
                        ]
                    },
                    {
                        xtype:'container',
                        layout:'hbox',
                        padding : '0 0 5 0',
                        items:[
                            {
                                xtype:'numberfield',
                                value : 0,
                                name : 'total',
                                fieldLabel:'<b>Total</b>',
                                fieldStyle :'fontSize:15px;',
                                minValue:1,
                                flex :1
                            },
                            {
                                xtype:'numberfield',
                                value : 0,
                                name : 'adelantos',
                                fieldLabel:'<b>Total Adelantos</b>',
                                fieldStyle :'fontSize:15px;',
                                minValue:0,
                                labelWidth:150,
                                flex :1,
                                readOnly:true
                            }
                        ]
                    },
                    
                    {
                        xtype:'grid',
                        title : 'Adelantos',
                        store : sp,
                        itemId :'dgvAdelantos',
                        plugins: [rowEditing],
                        selModel: 'cellmodel',
                        plugins: {
                            ptype: 'cellediting',
                            clicksToEdit: 1
                        },
                        flex : 1,
                        columns:[
                            {
                             xtype:'numbercolumn',
                             text : 'Monto',flex:1,
                             dataIndex:'monto',
                             editor:{
                                xtype:'numberfield',
                                minValue: 0
                             },
                            },
                            {
                                xtype:'datecolumn',
                                flex:1,
                                align:'center',
                                text:'Fecha',
                                dataIndex:'fecha',
                                format: 'd/m/Y',
                                editor:{
                                 xtype:'datefield',
                                 value : new Date(),
                                 format :'d/m/Y'
                               }
                             },
                            {
                                xtype: 'widgetcolumn',
                                width: 50,
                                widget: {
                                    xtype: 'button',
                                    width: 30,
                                    glyph: 0xf014,
                                    handler: 'onClickEliminarPago'
    
                                }
    
                            }
                        ],
                        itemPosition:0,
                        tools: [ 
                        {
                            type: 'plus',
                            callback: 'onClickAdelanto' 
                        }],
                        listeners: {
                            edit: 'onEditorCalcularPagos'
                        }
                    }
                   /* {
                        xtype :'container',
                        layout:'hbox',
                        padding : '5 0 5 0',
                        flex: 1,
                        items:[
                            {
                                xtype:'numberfield',
                                value : 0,
                                name : 'adelantos',
                                fieldLabel:'<b>Adelantos</b>',
                                fieldStyle :'fontSize:15px;'
                            },
                            {xtype:'datefield' ,flex:1,name:'fechaadelanto',fieldLabel:'Fecha',editable:true},
                            {
                                xtype:'numberfield',
                                value : 0,
                                name : 'adelanto2',
                                fieldLabel:'<b>Adelantos</b>',
                                fieldStyle :'fontSize:15px;'
                            },
                            {xtype:'datefield' ,flex:1,name:'fechaadelanto2',fieldLabel:'Fecha',editable:true},
                           
        
                        ]
                    },
                    {
                        xtype :'container',
                        layout:'hbox',
                        padding : '5 0 5 0',
                        flex: 1,
                        items:[
                            {
                                xtype:'numberfield',
                                value : 0,
                                name : 'adelanto3',
                                fieldLabel:'<b>Adelantos</b>',
                                fieldStyle:'font-size:15px;',
                            },
                            {xtype:'datefield' ,flex:1,name:'fechaadelanto3',fieldLabel:'Fecha',editable:true},
                            {
                                xtype:'numberfield',
                                value : 0,
                                name : 'adelanto4',
                                fieldLabel:'<b>Adelantos</b>',
                                fieldStyle :'fontSize:15px;'
                            },
                            {xtype:'datefield' ,flex:1,name:'fechaadelanto4',fieldLabel:'Fecha',editable:true},
                           
                        ]
                    }*/
                    
                ]

            }
        ];
        return f;
      }
    
});
