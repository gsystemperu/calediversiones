Ext.define('juegosmecanicos.view.admin.ListadoConfig', {
    extend: 'Ext.tab.Panel',
    xtype: 'wRegConfig',
    alias: 'widget.wRegConfig',
    requires: [
        'Ext.layout.container.HBox',
        'juegosmecanicos.view.admin.ListadoConfigController',
        'Ext.grid.*',
        'Ext.form.field.Number',
        'juegosmecanicos.view.admin.PanelConfigGeneral',
        'juegosmecanicos.view.admin.PanelLocales'
    ],
    layout: {
        type: 'hbox',
        pack: 'start',
        align: 'stretch'
    },
    bodyPadding: 5,
    defaults: {}
    ,
    controller: 'admin-listadoconfig',
    initComponent: function () {
        Ext.apply(this, {
            items: [
                this.getConfigGeneral(),
                this.getPanelLocales()
            ]
        });
        this.callParent();
    },

    getConfigGeneral:function(){
        return obj = {
            title: 'General',
            xtype: 'wRegConfigGeneral'
        };
    },

    getPanelLocales:function(){
        return obj = {
            title: 'Locales',
            xtype: 'wRegLocales'
        };
    }



});
