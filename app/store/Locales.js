//Ext.define('megafillsperu.store.StoreMantenimientos', {extend: 'Ext.data.Store',fields: ["id", "descripcion"],data: [{ id: 'test' }],proxy: { type: 'memory' }});

/*
@DataSet :
Stores para los mantenimientos de las tablas maestras
==============================================================
*/
Ext.define('juegosmecanicos.store.Locales', {
    extend: 'Ext.data.Store',
    alias  : 'widget.storelocales',
    storeId : 'storeLocales',
    requiere: ['juegosmecanicos.model.DataModels'],
    model   :'juegosmecanicos.model.Local',
    autoLoad    : true,
    remoteSort  : true,
    autoSync    : true,
    autoDestroy : true,
    extraParams : {idlocal : 0},
    pageSize: 50,
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/locales_listado'},
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'total'
        }
    }
});
