Ext.define('juegosmecanicos.view.pdv.Contenedor',{
    extend: 'Ext.panel.Panel',
    alias : 'wPdvContenedor',
    xtype : 'wPdvContenedor',
    itemId :'dvContenedorMesas',
    requires:[
        'juegosmecanicos.view.pdv.AccionesPdv',
        'juegosmecanicos.view.pdv.Main',
        'juegosmecanicos.view.pdv.IngresarCliente'
    ],
    controller :'accionespdv',
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
                xtype: 'wPdv'
            }
        ];
        return _obj;
    },
    getAcciones:function(){
    }

});