Ext.define('juegosmecanicos.view.main.Main', {
    extend: 'Ext.container.Viewport',
    layout: 'border',
    alias: 'wMain',
    requires: [
        'juegosmecanicos.view.main.MainController',
        'juegosmecanicos.view.menu.Tree'
    ],
    controller: 'main',
    items:[
        {
        region: 'west',
        title: '.: Cale Diversiones :.',
        iconCls :'fa fa-cogs',
        titleCollapse: false,
        width: 210,
        collapsed :true,
        collapsible :true,
        layout: {
           type: 'accordion',
           titleCollapse: false,
           collapsed :false,
           fill: false,
           animate: true,
        },
        items:
        [
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
                  //{xtype:'menutree',reference: 'treejuegosmecanicos', //'treeGestionClientes',layout: 'fit',listeners: {itemClick: 'onClickOpcionMenu'}}
                  {
                    flex : 1,
                    text: 'Nuevo Servicio',
                    itemId: "wPdvContenedor",
                    titulo: "..: Servicio :.." ,
                    textAlign : 'left',
                    margin: '3 3 1 3',
                    iconCls : 'fa fa-ticket fa-2x',
                    handler:'onClickOpcionBotonMenu'
                  },
                  {
                    flex : 1,
                    text: 'Nueva Venta',
                    itemId: "wPdvContenedorVenta",
                    titulo: "..: Venta :.." ,
                    margin: '3 3 1 3',
                    handler:'onClickOpcionBotonMenu',
                    textAlign : 'left',
                    iconCls : 'fa fa-gift fa-2x',

                  },
                  {
                    flex : 1,
                    text: 'Control',
                    itemId: "wAdminDashBoard",
                    margin: '3 3 1 3',
                     titulo: "..: Control de Niños :.." ,
                    handler:'onClickOpcionBotonMenu',
                    iconCls : 'fa fa-eye fa-2x',
                    textAlign : 'left',
                  },
                  {
                    flex : 1,
                    text: 'Configuraciones',
                    itemId: "wRegConfig",
                    titulo: "..: Configuraciones :..",
                    margin: '3 3 1 3',
                    handler: 'onClickOpcionBotonMenu',
                    iconCls : 'fa fa-codepen fa-2x',
                    textAlign : 'left',

                  },
                  {
                    flex : 1,
                    text: 'Caja / Pagos',
                    itemId: "wListadoPagos",
                    titulo: "..: Caja :.." ,
                    margin: '3 3 1 3',
                    handler: 'onClickOpcionBotonMenu',
                    iconCls : 'fa fa-line-chart fa-2x',
                    textAlign : 'left',

                  },
                  {
                    flex : 1,
                    text: 'Servicios',
                    itemId: "wRegProducto",
                    titulo: "..: Servicios :..",
                    margin: '3 3 1 3',
                    handler: 'onClickOpcionBotonMenu',
                    iconCls : 'fa fa-lightbulb-o fa-2x',
                    textAlign : 'left',
                  },
                  {
                    flex : 1,
                    text: 'Productos',
                    itemId: "wRegProductoVenta",
                    titulo: "..: Productos :..",
                    margin: '3 3 1 3',
                    handler: 'onClickOpcionBotonMenu',
                    textAlign : 'left',
                    iconCls : 'fa fa-shopping-cart fa-2x',

                  },
                  {
                    flex : 1,
                    text: 'Gastos',
                    itemId: "wRegGastos",
                    titulo: "Gastos",
                    margin: '3 3 1 3',
                    handler: 'onClickOpcionBotonMenu',
                    textAlign : 'left',
                    iconCls : 'fa fa-cc fa-2x',

                  }

                ]
            }
          ]
       },//fin west
       {
        region: 'center',
        padding: 5,
        reference: 'tabPrincipal',
        itemId : 'tabPrincipal',
        defaults: {bodyPadding: 0},
        scrollable: true,
        layout:'fit',
          items: [
            {
              title: 'Nosotros',
              bodyPadding:'200 0 0 300',
              html: '<div style="text-aling:center;"><img src="resources/images/lgsis.png" width="300" height="150" >  </div>'

          }]
      },
      {
        region:'south',
        padding : 0,
        layout:'hbox',
        items:[
          {xtype:'panel', itemId:'panDetalleLocal',flex:3 },
          {xtype:'button',text :'CERRAR SESSION',flex:1,height:36.5,handler:'onclickSalirApp'},
        ]
      }
    ]
});
