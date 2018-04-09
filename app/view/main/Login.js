
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
    height:430,
    items: [
        {
        xtype: 'form',
        padding : 5,
        frame:false,
        height:380,
        width : 400,
        layout: 'anchor',
        reference : 'frmlogin',
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
                '<h3>Seleccionar la sede para cargar la información.</h3>'
            ]
        },
        { xtype:'textfield',fieldLabel :'Usuario',value:'',reference:'usuario', name :'usuario',anchpr:'100%',allowBlank:false,labelAlign:'right',},
        { xtype:'textfield',fieldLabel: 'Clave' ,value:'',reference :'clave',name :'clave',anchpr:'100%', inputType: 'password',allowBlank:false ,labelAlign:'right'},
        {
            xtype: 'combobox',
            reference: 'cboLocales',
            fieldLabel: 'Local',
            labelAlign:'right',
            anchor: '-15',
            minChars: 0,
            queryMode: 'local',
            displayField : 'direccion',
            valueField : 'idlocal',
            editable : false,
            allowBlank :false,
            //store : Ext.create('storelocales')
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
