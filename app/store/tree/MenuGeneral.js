Ext.define('juegosmecanicos.store.tree.MenuGeneral', {
    extend: 'Ext.data.Store',fields: ["id", "descripcion"],
    data: [{ id: 'test' }],proxy: { type: 'memory' }
});

Ext.define('juegosmecanicos.store.tree.juegosmecanicos', {
    extend: 'Ext.data.TreeStore',
    root: {
        expanded: true,
        children: [
            {
              text: 'Ingresar Venta',
              leaf: true,
              itemId: "wPdvContenedor",
              titulo: "Punto Venta" ,
              glyph: 'xf155'
            },
            {
              text: 'Productos',
              leaf: true,
              itemId: "wRegProducto",
              titulo: "Productos",
              glyph:'xf000'
            }

        ]
    }
});



Ext.define('juegosmecanicos.store.tree.Administrador', {
    extend: 'Ext.data.TreeStore',
    root: {
        expanded: true,
        children: [
            /*{
              text: 'Panel de Control',
              leaf: true,
              itemId: "wAdminDashBoard",
              titulo: "Panel de Control",
              glyph :'xf084'
            },*/
            {
              text: 'Listado Proveedores',
              leaf: true,
              itemId: "wRegProveedores",
              titulo: "Registro Proveedores",
              glyph :'xf084'
            },
            {
              text: 'Listado Clientes',
              leaf: true,
              itemId: "wRegClientes",
              titulo: "Registro Clientes",
              glyph :'xf084'
            },
        ]
    }
});

Ext.define('juegosmecanicos.store.tree.Usuarios', {
    extend: 'Ext.data.TreeStore',
    root: {
        expanded: true,
        children: [
            {
              text: 'Registro Usuarios',
              leaf: true,
              //itemId: "wRegUsuarios",
              titulo: "Registro Usuarios",
              glyph :'xf084'
            },
        ]
    }
});
