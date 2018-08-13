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
        Ext.apply(this, 
        {
            items: me.getRenderForm(st)        
        });
        this.callParent();
      },
        
      getRenderForm:function(st){
          
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
                        padding:20,
                        items:[
                            {
                                xtype:'datepicker',
                                name : 'fecha',
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
                        flex: 2,
                        columns:[
                            {
                                text:'Evento',
                                flex:3,
                                dataIndex: 'nomevento'
                            },
                            {text:'Hora Inicio',dataIndex:'horainicio', flex:1},
                            {text:'Hora Termino',dataIndex:'horatermino',flex:1},
                            
                            {
                                xtype: 'widgetcolumn',
                                flex: 0.5,
                                widget: {
                                    xtype: 'button',
                                    flex: 1,
                                    glyph: 0xf014,
                                    handler: ' onClickEliminarEvento'
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
                flex : 1.5,
                title : 'Detalle del Evento',
                layout:{
                    type:'vbox',
                    pack: 'start',
                    align: 'stretch'
                },
                bbar :[
                    '->',
                    {text:'Nuevo',handler:'onClickNuevo'},
                    {text :'Guardar',handler:'onClickGuardar'}
                ],
                defaultType:'textfield',
                items:[
                    {xtype:'hiddenfield',name:'id',value:0},
                    {xtype:'hiddenfield',name:'idclie',value:0},
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
                            {xtype:'textfield',fieldLabel:'Cliente',name:'cliente',flex:2,allowBlank:false},
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
                        ]
                    },
                    
                    {
                        xtype:'numberfield',
                        value : 0,
                        name : 'total',
                        fieldLabel:'<b>Total</b>',
                        fieldStyle :'fontSize:20px;',
                        minValue:1
                    },
                    {
                        xtype:'numberfield',
                        value : 0,
                        name : 'adelantos',
                        fieldLabel:'<b>Adelantos</b>',
                        fieldStyle :'fontSize:20px;'
                    }
                ]

            }
        ];
        return f;
      }
    
});
