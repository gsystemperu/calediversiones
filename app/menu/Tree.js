Ext.define('juegosmecanicos.view.menu.Tree', {
    extend: 'Ext.tree.Panel',
    xtype: 'menutree',

    requires: [
       'juegosmecanicos.overrides.tree.ColumnOverride'
    ],

    border: 0,
    autoScroll: true,
    rootVisible: false
});
