//Ext.define('megafillsperu.store.StoreMantenimientos', {extend: 'Ext.data.Store',fields: ["id", "descripcion"],data: [{ id: 'test' }],proxy: { type: 'memory' }});

/*
@DataSet :
Stores para los mantenimientos de las tablas maestras
==============================================================
*/
Ext.define('juegosmecanicos.store.Productos', {
    extend: 'Ext.data.Store',
    storeId : 'storeProductos',
    requiere:['juegosmecanicos.model.DataModels'],
    model   :'juegosmecanicos.model.Producto',
    autoLoad: true,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    extraParams : {idcategoria : 0 , idsubcategoria : 0},
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/producto_lista'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});

Ext.define('juegosmecanicos.store.Categorias', {
    extend: 'Ext.data.Store',
    requiere:['juegosmecanicos.model.DataModels'],
    model   :'juegosmecanicos.model.Categoria',
    autoLoad: true,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/categoria_lista'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});


Ext.define('juegosmecanicos.store.SubCategorias', {
    extend: 'Ext.data.Store',
    requiere:['juegosmecanicos.model.DataModels'],
    model   :'juegosmecanicos.model.SubCategoria',
    autoLoad: false,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    extraParams : { idcategoria : 0 , idsubcategoria : 0 },
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/subcategoria_lista'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});


Ext.define('juegosmecanicos.store.FormaPagos', {
    extend: 'Ext.data.Store',
    requiere:['juegosmecanicos.model.DataModels'],
    model   :'juegosmecanicos.model.FormaPago',
    autoLoad: true,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/formapago_lista'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});
