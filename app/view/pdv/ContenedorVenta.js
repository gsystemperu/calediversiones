Ext.define('juegosmecanicos.view.pdv.ContenedorVenta',{
    extend: 'Ext.panel.Panel',
    alias : 'wPdvContenedorVenta',
    xtype : 'wPdvContenedorVenta',
    itemId :'dvContenedorMesas',
    requires:[
        'juegosmecanicos.view.pdv.AccionesPdvVenta',
        'juegosmecanicos.view.pdv.Main',
        'juegosmecanicos.view.pdv.IngresarCliente'
    ],
    controller :'accionespdvventa',
    layout:'fit',
    initComponent:function(){
        me = this;
        Ext.apply(me,{
            items : me.getItems()
        });        
        this.callParent(arguments);

    },
    getItems:function(){
        var _obj = [
            {
                xtype: 'wPdvVenta'
            }
        ];
        return _obj;
    },
    getAcciones:function(){
    }

});