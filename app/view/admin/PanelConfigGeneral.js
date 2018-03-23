Ext.define('juegosmecanicos.view.admin.PanelConfigGeneral', {
    extend: 'Ext.panel.Panel',
    xtype: 'wRegConfigGeneral',
    itemId: 'wRegConfigGeneral',
    alias: 'widget.wRegConfigGeneral',
    requires: [
        'Ext.layout.container.HBox',
    ],
    defaults: {},
    initComponent: function () {
        Ext.apply(this, {
                items: [
                        {
                        xtype: 'form',
                        itemId: 'frmGuardarConfigGeneral',
                        flex: 1,
                        url: juegosmecanicos.util.Rutas.configuracionesGuardar,
                        layout: {
                            type: 'vbox',
                            align :'stretch'
                        },
                        items: [
                            {
                                xtype: 'textfield',
                                fieldLabel: '<b>Nombre de empresa</b>',
                                flex: 1,
                                name: 'nombreimpresion',
                                itemId: 'nombreimpresion',
                                readOnly: true,
                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: '<b>Codigo Impresora</b>',
                                flex: 1,
                                name: 'codigoimpresora',
                                itemId: 'codigoimpresora',
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: '<b>Serie impresora</b>',
                              flex: 1,
                                name: 'serieimpresora',
                                itemId: 'serieimpresora',
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: '<b>Direccion</b>',
                                flex: 1,
                                name: 'direccion',
                                itemId: 'direccion',
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: '<b>RUC</b>',
                                flex: 1,
                                name: 'ruc',
                                itemId: 'ruc',
                                readOnly: true
                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: '<b>Clave de administrador</b>',
                                inputType: 'password',
                              flex: 1,
                                name: 'claveadmin',
                                itemId: 'claveadmin',
                                readOnly: true
                            }

                        ],
                        buttons:[
                          {
                              xtype: 'button',
                              text: 'Guardar',
                              reference: 'btnGuardarConfigGeneral',
                              glyph: juegosmecanicos.util.Glyphs.getGlyph('diskete'),
                              handler: 'accionbtnGuardarConfigGeneral'
                          },
                          {
                              xtype: 'button',
                              text: 'Editar',
                              reference: 'btnEditarConfigGeneral',
                              itemId: 'btnEditarConfigGeneral',
                              glyph: juegosmecanicos.util.Glyphs.getGlyph('editar'),
                              handler: 'accionbtnEditarConfigGeneral',
                              margin: '0 5 0 5'
                          }
                        ]

                    }
                ]
            }


        );
        this.callParent();

        Ext.Ajax.request({
            url: juegosmecanicos.util.Rutas.mostrarConfig,
            params: {
            },
            success: function(response){
                var rsp = juegosmecanicos.util.Json.decodeJSON(response.responseText);
                Ext.ComponentQuery.query('#nombreimpresion')[0].setValue(rsp.data[0].nombreimpresion);
                Ext.ComponentQuery.query('#codigoimpresora')[0].setValue(rsp.data[0].codigoimpresora);
                Ext.ComponentQuery.query('#serieimpresora')[0].setValue(rsp.data[0].serieimpresora);
                Ext.ComponentQuery.query('#direccion')[0].setValue(rsp.data[0].direccion);
                Ext.ComponentQuery.query('#ruc')[0].setValue(rsp.data[0].ruc);


            }
        });


    }
});
