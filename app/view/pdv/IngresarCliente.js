Ext.define('juegosmecanicos.view.pdv.IngresarCliente',
{
    extend: 'Ext.window.Window',
    xtype : 'wIngresarCliente',
    require: ['Ext.form.*'],
    layout : {
      type:'anchor',
    },
    width : 400,
    height : 200,
    title : 'Registrar Cliente',
    initComponent:function(){
       me = this;
       Ext.apply(me, {
           bodyPadding : 10,
           modal : true,
           items : me.getItems(),
           bbar  : me.getButtons()
       });
       me.callParent(arguments);
    },
    getButtons:function(){
        return obj = [
          '->',
          {
            xtype:'button',
            text :'Cerrar',
              glyph: juegosmecanicos.util.Glyphs.getGlyph('cancelar'),

          },
           {
             xtype:'button',
             text :'Guardar',
               glyph: juegosmecanicos.util.Glyphs.getGlyph('ingresar'),
           }
        ]
    },
    getItems:function(){
      return obj = [
           {
             xtype:'textfield',
             fieldLabel :'Nombres',
             anchor : '100%'
           },
           {
             xtype:'textfield',
             fieldLabel :'Dni',
             anchor : '100%'
           },
           {
             xtype:'textfield',
             fieldLabel :'Telefono',
             anchor : '100%'
           }
      ];
    }
});
