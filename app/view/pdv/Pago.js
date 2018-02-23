Ext.define('juegosmecanicos.view.pdv.Pago', {
    extend: 'Ext.window.Window',
    alias: 'wPdvCobrarPago',
    title: 'Ingresar Pago',
    modal: true,
    width: 350,
    height: 280,
    iconCls: 'fa fa-money',
    layout: {
        type: 'anchor'
    },
    config: {
        mesa: 0,
        persona : 0,
        local : 0,
        detalle : '',
        empleado : 0
    },
    requires: ['juegosmecanicos.view.pdv.AccionesPago'],
    controller: 'accionespago',
    initComponent: function () {
        me = this;
        var _storeFormaPago = Ext.create('juegosmecanicos.store.FormaPagos');

        Ext.apply(me, {
            bodyPadding: 5,
            padding: '0 0 0 0',
            items: me.getItems(_storeFormaPago,me.getMesa(),me.getPersona(),me.getLocal(),me.getDetalle(), me.getEmpleado())

        });
        this.callParent(arguments);

    },
    getItems: function (_storeformapago,_numeromesa,_persona,_local,_detalle,_empleado) {
        Ext.util.Format.decimalSeparator = '.';
        var _totalventamesa = Ext.ComponentQuery.query('#txtTotalVenta'+_numeromesa.toString())[0].getValue();

        var _obj = [{
                xtype: 'form',
                itemId : 'frmGuardarPago',
                url: juegosmecanicos.util.Rutas.ventaGuardar,
                layout: {
                    type: 'anchor'
                },
                items: [
                    {
                        xtype:'hiddenfield',
                        name : 'idven',
                        value : 0
                    },
                    {
                        xtype:'hiddenfield',
                        name : 'numeromesa',
                        value : _numeromesa
                    },
                    {
                        xtype:'hiddenfield',
                        name : 'idper',
                        value : _persona
                    },
                    {
                        xtype:'hiddenfield',
                        name : 'idemp',
                        value : _empleado
                    },
                    {
                        xtype:'hiddenfield',
                        name : 'idlocal',
                        value : _local
                    },
                    {
                        xtype:'hiddenfield',
                        name : 'jsondetalle',
                        value : _detalle
                    },
                    /*{
                        xtype: 'image',
                        src: "resources/images/logo.png",
                        height: 70,
                        padding: '0 0 0 0'
                    },*/
                    {
                        xtype: 'combo',
                        fieldLabel: '<b>Metodo Pago</b>',
                        anchor: '100%',
                        store: _storeformapago,
                        valueField: 'idfpag',
                        displayField: 'descripcion',
                        queryMode: 'local',
                        editable: false,
                        emptyText: '-- Seleccionar --',
                        value: 1,
                        name : 'metodopago',
                        itemId : 'cboMetodoPago'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: '<b>Número Recibo</b>',
                        anchor: '100%',
                        name : 'numerorecibo',
                        itemId : 'numerorecibo',
                        enableKeyEvents : true,
                        listeners :{
                            keypress : 'accionKeyPresNumeroRecibo'
                        },
                    },
                    {
                        xtype: 'numberfield',
                        fieldLabel: '<b>Total Venta</b>',
                        anchor: '100%',
                        value : _totalventamesa,
                        readOnly: true,
                        fieldStyle: 'text-align: right;',
                        itemId : 'txtTotalVenta',
                        name : 'totalventa',
                        decimalSeparator: '.',
                        decimalPrecision:2,
                        step:'0.1'

                    },
                    {
                        xtype: 'numberfield',
                        fieldLabel: '<b>Recibido</b>',
                        anchor: '100%',
                        fieldStyle: 'text-align: right;',
                        allowDecimals: true,
                        decimalSeparator: '.',
                        decimalPrecision:2,
                        step:'0.1',
                        enableKeyEvents :true,
                        name : 'dinerorecibido',
                        itemId : 'txtTotalRecibido',
                        listeners :{
                            keypress : 'accionKeyPresRecibido'
                        },
                        allowBlank:false

                    },
                    {
                        xtype: 'numberfield',
                        fieldLabel: '<b>Devolver</b>',
                        anchor: '100%',
                        fieldStyle: 'text-align: right;',
                        readOnly:true,
                        itemId : 'txtTotalDevolver',
                        name : 'dinerodevuelto',
                        allowBlank:false,
                        decimalSeparator: '.',
                        decimalPrecision:2,
                        step:'0.1'
                    },
                    {
                        xtype: 'datefield',
                        fieldLabel: '<b>Fecha</b>',
                        anchor : '100%',
                        value : new Date(),
                        name : 'fechaventa',
                        editable :false
                    }
                ],
                buttons: [{
                        text: 'Cancelar',
                        itemId: 'btnCancelarPagoMesa'+ me.getMesa().toString(),
                        glyph: juegosmecanicos.util.Glyphs.getGlyph('cancelar'),
                        handler: 'accionCancelarPago'
                    },
                    {
                        text: 'Guardar',
                        itemId: 'btnGuardarPagoMesa'+ me.getMesa().toString(),
                        glyph: juegosmecanicos.util.Glyphs.getGlyph('diskete'),
                        handler: 'accionGuardarPagoMesa'
                    }
                ]
            }


        ];
        return _obj;
    },
    getAcciones: function () {}

});
