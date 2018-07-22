Ext.define('juegosmecanicos.store.Ventas', {extend: 'Ext.data.Store',fields: ["id", "descripcion"],data: [{ id: 'test' }],proxy: { type: 'memory' }});

/*
@DataSet :
Stores para los mantenimientos de las tablas maestras
==============================================================
*/
Ext.define('juegosmecanicos.store.Pedidos', {
    extend: 'Ext.data.Store',
    storeId : 'storePedidos',
    requiere:['juegosmecanicos.model.DataModels'],
    model   :'juegosmecanicos.model.Pedidos',
    autoLoad: false,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    extraParams : {desde : null , hasta: null,idlocal:0},
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/pedidos_listado'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});

/**
 * Detalle de Venta
 * @DataSet
 * @type {store}
 */
Ext.define('juegosmecanicos.store.PedidoDetalle', {
    extend: 'Ext.data.Store',
    storeId : 'storePedidoDetalle',
    requiere:['juegosmecanicos.model.DataModels'],
    model   :'juegosmecanicos.model.DetallePedido',
    autoLoad: false,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    extraParams : {idven : 0},
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/pedido_detalle'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});




/**
 * Control de listado de niños jugando
 * @DataSet
 * @type {store}
 */
Ext.define('juegosmecanicos.store.Control', {
    extend: 'Ext.data.Store',
    storeId : 'storePedidoDetalle',
    requiere:['juegosmecanicos.model.DataModels'],
    model   :'juegosmecanicos.model.Control',
    autoLoad: false,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    extraParams : {idlocal: 0 },
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/control_ninos'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});

/**
 * Control de listado de gastos del administrador
 * @DataSet
 * @type {store}
 */
Ext.define('juegosmecanicos.store.Gastos', {
    extend: 'Ext.data.Store',
    storeId : 'storePedidos',
    requiere:['juegosmecanicos.model.DataModels'],
    model   :'juegosmecanicos.model.Gasto',
    autoLoad: true,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    extraParams : {desde : '' , hasta: ''},
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/gastos_listar'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});



/*
@DataSet :
Stores para los eventos
==============================================================
*/
Ext.define('juegosmecanicos.store.Eventos', {
    extend: 'Ext.data.Store',
    storeId : 'storeEventos',
    requiere:['juegosmecanicos.model.DataModels'],
    model   :'juegosmecanicos.model.Evento',
    autoLoad: true,
    extraParams : {fecha : null },
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/evento_listar'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});
