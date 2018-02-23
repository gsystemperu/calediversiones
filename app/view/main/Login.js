
Ext.define('juegosmecanicos.view.main.Login',{
  //  extend: 'Ext.panel.Panel',
    extend: 'Ext.container.Viewport',
    alias : 'main-login',
    requires: [
        'juegosmecanicos.view.main.LoginController',
        'juegosmecanicos.view.main.LoginModel'
    ],
    controller: 'main-login',
    viewModel: {
        type: 'main-login'
    },
    layout: {
      type: 'vbox',
      align: 'center',
      pack: 'center'
    },
    items: [{
        xtype: 'fieldset',
        fieldStyle:'background-color :red;',
        layout: 'anchor',
        items: [{
            xtype: 'component',
            anchor: '100%',
            html: [
                '<h3>Seleccionar la sede</h3>',
                '<p>Para cargar la información.</p>'
            ]
        },
        {
            xtype: 'combobox',
            reference: 'states',
            publishes: 'value',
            fieldLabel: 'Local',
            displayField: 'state',
            anchor: '-15',
            /*store: {
                type: 'states'
            },*/
            minChars: 0,
            queryMode: 'local',
            typeAhead: true
        }]
    }]
});
