
Ext.define('juegosmecanicos.view.main.Login',{
    extend: 'Ext.window.Window',
    alias : 'wlogin',
    requires: [
        'juegosmecanicos.view.main.LoginController',
    ],
    controller: 'login',
    layout: {
      type: 'vbox',
      align: 'center',
      pack: 'center'
    },
    autoShow:true,
    width:425,
    height:400,
    items: [
        {
        xtype: 'form',
        padding : 10,
        frame:false,
        height:350,
        width : 400,
        layout: 'anchor',
        items: [
            {
                xtype:'image',
                src: 'resources/images/empresa.jpeg',
                width: 184,
                height: 150,
                anchor: '100%'
            },
        {
            xtype: 'component',
            anchor: '100%',
            html: [
                '<h3>Seleccionar la sede</h3>',
                '<p>Para cargar la información.</p>'
            ]
        },
        {
            xtype: 'combobox',
            reference: 'cboLocales',
            fieldLabel: '<b>Locales</b>',
            anchor: '-15',
            minChars: 0,
            queryMode: 'local',
            displayField : 'direccion',
            valueField : 'idlocal',
            editable : false,
            store : Ext.create('juegosmecanicos.store.Locales')
        }
    ],
    bbar:[
        '->',
        {
            xtype:'button',
            text : 'Seleccionar',
            width : 150,
            handler : 'onClickSeleccionarSede'
        }
    ]
    
    }]
});
