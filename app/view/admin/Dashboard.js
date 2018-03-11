Ext.define('juegosmecanicos.view.admin.Dashboard', {
    extend: 'Ext.panel.Panel',
    xtype: 'wAdminDashBoard',
    alias: 'widget.wAdminDashBoard',
    requires: [
        'Ext.layout.container.HBox',
        // 'juegosmecanicos.view.producto.ProductoController',
        'Ext.grid.*',
        'Ext.form.field.Number'
    ],
    layout: {
        type: 'fit',
        pack: 'start',
        align: 'stretch'
    },

    defaults: {
        frame: false
    },
    // controller:'productos',
    initComponent: function () {
        var storeControl = Ext.create('juegosmecanicos.store.Control');


        Ext.apply(this, {
            items: [{
                flex: 3,
                margin: '0 3 0 0',
                layout: 'fit',
                items: [{
                    xtype: 'grid',
                    itemId: 'dgvControl',
                    store: storeControl,
                    reference: 'dgvControl',
                    sortableColumns: false,
                    columns: [{
                            text: 'NIÑO',
                            dataIndex: 'nino',
                            flex: 4,
                            align: 'center',
                            renderer:function(value){
                                return '<h2>' + value +'</h2>'
                            }
                        },
                        {
                            text: 'EDAD',
                            dataIndex: 'edad',
                            flex: 1,
                            align: 'center',
                            renderer:function(value){
                                return '<h2>' + value +'</h2>'
                            }
                        },
                        {
                            text: 'HORA DESDE',
                            dataIndex: 'hdesde',
                            flex: 1,
                            align: 'center',
                             renderer:function(value){
                                return '<h2 style="color:red;">' + value +'</h2>'
                            }
                        },
                        {
                            text: 'HORA HASTA',
                            dataIndex: 'hhasta',
                            flex: 1,
                            align: 'center',
                            renderer:function(value){
                                return '<h2 style="color:red;">' + value +'</h2>'
                            }
                        }

                    ],
                    viewConfig: {
                        stripeRows: false,
                        loadMask: false
                    }


                }]
            }]
        });
        this.callParent();

        var autoLoadControl = {
            run: function () {
                storeControl.load({
                     scope: this,
                     callback: function(records, operation, success) {

                     }
                });
            },
            interval: 10000 //* 1 => segundo => 1000
        }
        Ext.TaskManager.start(autoLoadControl);
    }
});