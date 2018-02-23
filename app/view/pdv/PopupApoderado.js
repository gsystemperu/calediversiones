Ext.define('juegosmecanicos.view.pdv.PopupApoderado', {
    extend: 'Ext.window.Window',
    alias: 'wPdvPopupApoderado',
    title: 'Registra apoderado',
    modal: true,
    width: 650,
    height: 250,
    iconCls: 'fa fa-money',
    layout: {
        type: 'anchor'
    },
    config: {
        mesa: 0,
        persona: 0,
        local: 0,
        detalle: '',
        empleado: 0
    },
    requires: ['juegosmecanicos.view.pdv.PopupApoderadoController',
                'Ext.grid.plugin.*'],

    controller: 'PopupApoderadoController',
    initComponent: function () {
        me = this;
        var _storeTempHijo = Ext.create('juegosmecanicos.store.tmpRegistroHijo');

        Ext.apply(me, {
            bodyPadding: 5,
            padding: '0 0 0 0',
            items: me.getItems(_storeTempHijo),
            bbar: [
            {
                text: 'Guardar y seleccionar',
                reference: 'btnGuardarSeleccionarApoderado',
                //hidden : true,
                glyph: juegosmecanicos.util.Glyphs.getGlyph('diskete'),
                handler: 'accionGuardarSeleccionarApoderado'
            },{
                text: 'Seleccionar',
                reference: 'btnSeleccionarApoderado',
                //hidden : true,
                glyph: juegosmecanicos.util.Glyphs.getGlyph('diskete'),
                handler: 'accionSeleccionarApoderado'
            }

            ]

        });
        this.callParent(arguments);

    },
    getItems: function (_storeTempHijo) {

        var _obj = [
          {
            xtype: 'form',
            itemId: 'frmGuardarApoderado',
            reference :'frmGuardarApoderado',
            url: juegosmecanicos.util.Rutas.apoderadoGuardar,
            layout: {
                type: 'anchor'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    reference: 'txfIdApoderado',
                    name: 'idapoderado',
                    itemId: 'idapoderado',
                },

                {
                    xtype: 'textfield',
                    fieldLabel: '<b>DNI</b>',
                    anchor: '100%',
                    name: 'dniapoderado',
                    itemId: 'dniapoderado',
                    enableKeyEvents: true,
                    listeners: {
                        keypress: 'accionKeyPresDniApoderado'
                    },
                },
                {
                    xtype: 'textfield',
                    fieldLabel: '<b>Nombres</b>',
                    anchor: '100%',
                    name: 'nombresapoderado',
                    itemId: 'nombresapoderado',
                    enableKeyEvents: true,
                },
                {
                    xtype: 'textfield',
                    fieldLabel: '<b>Apellidos</b>',
                    anchor: '100%',
                    name: 'apellidosapoderado',
                    itemId: 'apellidosapoderado',
                    enableKeyEvents: true,
                },
                {
                    xtype: 'textfield',
                    fieldLabel: '<b>Teléfono</b>',
                    anchor: '100%',
                    name: 'telefonoapoderado',
                    itemId: 'telefonoapoderado',
                    enableKeyEvents: true,
                },
                {
                    xtype: 'textfield',
                    fieldLabel: '<b>Correo</b>',
                    anchor: '100%',
                    name: 'correoapoderado',
                    itemId: 'correoapoderado',
                    enableKeyEvents: true,
                },
                {
                    xtype:'hiddenfield',
                    itemId: 'hdnHijos',
                    name : 'jsonhijos'
                },
              /*  {
                    xtype: 'panel',
                    height: 200,
                    hidden:true,
                    autoScroll : 'auto',
                    reference: 'panelListadoHijos',
                    layout: 'fit',
                    items:[{
                            xtype: 'grid',
                            itemId: 'dgvListaHijos',
                            store: _storeTempHijo,
                            reference: 'dgvListaHijos',
                            sortableColumns: false,
                            emptyText: 'No se han registrado hijos',
                            selModel: 'rowmodel',
                            plugins: {
                                ptype: 'cellediting',
                                clicksToMoveEditor: 1,
                                autoCancel: false,
                            },
                            columns: [{
                                text: 'Nombres',
                                dataIndex: 'nombres',
                                flex: 0.7,
                                align: 'left',
                                editor: {
                                    xtype: 'textfield'
                                }
                            },{
                                text: 'Apellidos',
                                dataIndex: 'apellidos',
                                flex: 1,
                                align: 'left',
                                editor: {
                                    xtype: 'textfield'
                                }
                            },{
                                text: 'Edad',
                                dataIndex: 'edad',
                                flex: 0.2,
                                align: 'center',
                                editor: {
                                    xtype: 'numberfield'
                                }
                            },
                            {
                                xtype: 'widgetcolumn',
                                flex: 0.3,
                                widget: {
                                    xtype: 'button',
                                    flex: 1,
                                    glyph: 0xf014,
                                    handler: 'onClickRemoverHijo'

                                }

                            }],
                            tools:[{
                                type:'plus',
                                tooltip: 'Agregar hijo(a)',
                                // hidden:true,
                                handler: 'agregarHijo'
                            }]
                    }]
                }

                */
            ],


        }


        ];
        return _obj;
    },
    getAcciones: function () { }

});
