//Ext.define('megafillsperu.store.StoreMantenimientos', {extend: 'Ext.data.Store',fields: ["id", "descripcion"],data: [{ id: 'test' }],proxy: { type: 'memory' }});

/* 
@DataSet :
Stores para los mantenimientos de las tablas Personal 
==============================================================
*/
Ext.define('juegosmecanicos.store.Empleados', {
    extend: 'Ext.data.Store',
    requiere:['juegosmecanicos.model.DataModels'],
    model   :'juegosmecanicos.model.Persona',
    autoLoad: true,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/personal_lista'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});

