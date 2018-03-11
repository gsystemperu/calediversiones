Ext.define('juegosmecanicos.view.pdv.AccionesPago', {
    extend: 'Ext.app.ViewController',
    requires: [
        'Ext.window.MessageBox',
        'Ext.window.Toast'
    ],
    alias: 'controller.accionespago',
    accionKeyPresRecibido:function( txt, e, eOpts){
        if(e.getCharCode()==13){
                var txtTotalVenta    = Ext.ComponentQuery.query('#txtTotalVenta')[0].getValue();
                var txtTotalRecibido = Ext.ComponentQuery.query('#txtTotalRecibido')[0].getValue();
                var txtTotalDevolver = Ext.ComponentQuery.query('#txtTotalDevolver')[0];
                txtTotalDevolver.setValue (  txtTotalRecibido -txtTotalVenta  );
        }
    },
    accionKeyPresNumeroRecibo:function( txt, e, eOpts){
        me = this;
        if(e.getCharCode()==13){
           var metodoPago =Ext.ComponentQuery.query('#cboMetodoPago')[0].getValue();
           if(metodoPago !=1){
             Ext.ComponentQuery.query('#txtTotalRecibido')[0].setValue( Ext.ComponentQuery.query('#txtTotalVenta')[0].getValue() );
             var txtTotalVenta    = Ext.ComponentQuery.query('#txtTotalVenta')[0].getValue();
             var txtTotalRecibido = Ext.ComponentQuery.query('#txtTotalRecibido')[0].getValue();
             var txtTotalDevolver = Ext.ComponentQuery.query('#txtTotalDevolver')[0];
             txtTotalDevolver.setValue (  txtTotalRecibido -txtTotalVenta  );
           }else{
             Ext.Msg.alert("GSsytem Peru","Seleccione el método de pago, efectivo es incorrecto");
             return false;
           }
        }
    },
    accionGuardarPagoMesa : function(btn){
        me = this;
        var _form =  Ext.ComponentQuery.query('#frmGuardarPago')[0];
        var _btn = btn.itemId.toString();
        var numeromesa = _btn.substr(_btn.length - 1 , _btn.length + 2);
        var _metodoPago = Ext.ComponentQuery.query('#cboMetodoPago')[0].getValue();
        var _empleado   = 0;//Ext.ComponentQuery.query('#cboEmpleado'+ numeromesa.toString())[0].getValue();
        if(_empleado == null){ Ext.Msg.alert("GSystem Peru","Error, seleccione el nombre del empleado");return false; }
        if(_metodoPago !=1 && Ext.ComponentQuery.query('#numerorecibo')[0].getValue() == ''){
           Ext.Msg.alert("GSystem Peru","Error, ingrese el numero de recibo del POS");
           return false;
        }
        if (_form.isValid()) {
            _form.submit({
                waitMsg: 'Guardando informacion...',
                success: function (form, action) {
                     Ext.ComponentQuery.query('#dgvDetallePedidoMesa'+numeromesa.toString())[0].getStore().removeAll();
                     Ext.ComponentQuery.query('#txtTotalVenta'+numeromesa.toString())[0].setValue('');
                     if(Ext.ComponentQuery.query('#txtNombrePersona')[0])
                        Ext.ComponentQuery.query('#txtNombrePersona')[0].setText('');
                        
                     var ojson = juegosmecanicos.util.Json.decodeJSON(action.response.responseText);
                     if (parseInt(ojson.error)!=0) {
                       var _view = me.getView();
                       _view.close();
                       
                       //Impresion
                       //=========
                       var _url = 'resources/api/impresion/imprimirboleta/'+ ojson.error.toString();
                       xpos = (screen.width / 2) - (1000 / 2);
                       ypos = (screen.height / 2) - (600 / 2);
                       my = window.open(_url, "mywindow",
                           "location=1,status=1,scrollbars=1,  width=1000,height=600");
                       my.moveTo(xpos, ypos);
                       
                    }
                },
                failure: function () {
                    Ext.Msg.alert("Aviso", action.result.msg);
                    _view.close();
                }
            });
        } else {
           Ext.Msg.alert("GSytem Peru",'Ingresar los datos de la venta!');
           return false;
        }
    },
    accionCancelarPago:function(btn){
          var view =  this.getView();
          view.close();
    }

});
