Ext.define('juegosmecanicos.view.main.Main', {
    //extend: 'Ext.container.Viewport',
    extend: 'Ext.panel.Panel',
    layout: 'border',
    alias: 'wMain',
    requires: [
        'juegosmecanicos.view.main.MainController',
        'juegosmecanicos.view.menu.Tree'
    ],
    controller: 'main',
    items: [
    {
        region: 'west',
        title: '.: Cale Diversiones :.',
        iconCls :'fa fa-cogs',
        titleCollapse: false,
        width: 200,
           collapsed :true,
           collapsible :true,

            //animate: true,
            //activeOnTop: false,
            //fill: false,
            //collapsed :true,
        layout: {
            type: 'accordion',
            titleCollapse: false,
              collapsed :false,
              fill: false,
               animate: true,
        },
        items: [
            {
                title: 'Menu Principal',
                itemId: 'panGestionjuegosmecanicos', //'panGestionCliente',
                layout:'anchor',
                defaultType:'button',
                defaults: {
                  scale : 'large',
                  anchor :'100%',
                  iconAling:'left'
                },
                items: [
                  /*{xtype:'menutree',reference: 'treejuegosmecanicos', //'treeGestionClientes',layout: 'fit',listeners: {itemClick: 'onClickOpcionMenu'}}*/
                  {
                    flex : 1,
                    text: 'Ingresar Servicio',
                    itemId: "wPdvContenedor",
                    titulo: "..: Servicio :.." ,
                    iconAling : 'center',
                    margin: '3 3 1 3',
                    handler:'onClickOpcionBotonMenu'
                  },
                  {
                    flex : 1,
                    text: 'Ingresar Venta',
                    itemId: "wRegVenta",
                    titulo: "..: Venta :.." ,
                    margin: '3 3 1 3',
                    //handler:'onClickOpcionBotonMenu'
                  },
                  {
                    flex : 1,
                    text: 'Control',
                    itemId: "wAdminDashBoard",
                    margin: '3 3 1 3',
                     titulo: "..: Control de Niños :.." ,
                    handler:'onClickOpcionBotonMenu'
                  },
                  {
                    flex : 1,
                    text: 'Configuraciones',
                    itemId: "wRegConfig",
                    titulo: "..: Configuraciones :..",
                    margin: '3 3 1 3',
                    handler: 'onClickOpcionBotonMenu'
                  },
                  {
                    flex : 1,
                    text: 'Caja / Pagos',
                    itemId: "wListadoPagos",
                    titulo: "..: Caja :.." ,
                    margin: '3 3 1 3',
                    handler: 'onClickOpcionBotonMenu'
                  },
                  {
                    flex : 1,
                    text: 'Servicios',
                    itemId: "wRegProducto",
                    titulo: "..: Servicios :..",
                    margin: '3 3 1 3',
                    handler: 'onClickOpcionBotonMenu'
                  },
                  {
                    flex : 1,
                    text: 'Productos',
                    itemId: "wRegProductoNoServicio",
                    titulo: "..: Productos :..",
                    margin: '3 3 1 3',
                    handler: 'onClickOpcionBotonMenu'
                  },
                  {
                    flex : 1,
                    text: 'Gastos',
                    itemId: "wRegGastos",
                    titulo: "Gastos",
                    margin: '3 3 1 3',
                    handler: 'onClickOpcionBotonMenu'
                  },
                  {
                    flex : 1,
                    text: 'Locales',
                    itemId: "wRegLocales",
                    titulo: "..: Locales :..",
                    margin: '3 3 1 3',
                    //handler: 'onClickOpcionBotonMenu'
                  }
                ]
            }
        ]

    }, 
    {
      region: 'center',
      padding: 5,
      reference: 'tabPrincipal',
      defaults: {bodyPadding: 0},
      scrollable: true,
      layout:'fit',
        items: [
          {
            title: 'Nosotros',
            bodyPadding:'200 0 0 300',
            html: '<div style="text-aling:center;"><img src="resources/images/lgsis.png" width="300" height="150" >  </div>'

        }]
       
      }
  ]
});
