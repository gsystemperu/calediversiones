//Ext.define('megafillsperu.store.StoreMantenimientos', {extend: 'Ext.data.Store',fields: ["id", "descripcion"],data: [{ id: 'test' }],proxy: { type: 'memory' }});

/*
@DataSet :
Stores para los mantenimientos de las tablas maestras
==============================================================
*/
Ext.define('juegosmecanicos.store.Clientes', {
    extend: 'Ext.data.Store',
    storeId : 'storeClientes',
    requiere: ['juegosmecanicos.model.DataModels'],
    model   :'juegosmecanicos.model.Cliente',
    autoLoad: true,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    extraParams : {nombre : null},
    pageSize: 50,
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/cliente_listado'},
        reader: {
            type: 'json',

            rootProperty: 'data',
            totalProperty: 'total'
        }
    }
});
