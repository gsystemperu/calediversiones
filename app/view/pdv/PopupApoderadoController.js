Ext.define('juegosmecanicos.view.pdv.PopupApoderadoController', {
    extend: 'Ext.app.ViewController',
    requires: [
        'Ext.window.MessageBox',
        'Ext.window.Toast'
    ],
    alias: 'controller.PopupApoderadoController',
    agregarHijo: function (btn) {
        var _storegrid = this.lookupReference('dgvListaHijos').getStore();
        var _objeto = {
            idhijo      : 0,
            nombres     : '',
            apellidos   : '',
            edad        : ''
            };
        _storegrid.insert(0,_objeto);
    },

    agregarHijoGrilla: function (json) {
        var _storegrid = this.lookupReference('dgvListaHijos').getStore();
        Ext.each(json,function (record){

        var _objeto = {
                idhijo      : record.idhijo,
                nombres     : record.nombres,
                apellidos   : record.apellidos,
                edad        : record.edad
                };
            _storegrid.insert(0,_objeto);
        });
    },

    limpiarHijoGrilla: function() {
        var _storegrid = this.lookupReference('dgvListaHijos').getStore();
        _storegrid.removeAll();
    },

    accionKeyPresDniApoderado:function( txt, e, eOpts){
        me = this;
        if(e.getCharCode()==13){
           var dniApo =Ext.ComponentQuery.query('#dniapoderado')[0].getValue();
           me.lookupReference('frmGuardarApoderado').mask('Cargando...');
           if(dniApo != ''){

                Ext.Ajax.request({
                    url: juegosmecanicos.util.Rutas.buscarApoderado,
                    params: {
                        dni: dniApo
                    },
                    success: function(response){
                        var btnSel = me.lookupReference('btnSeleccionarApoderado');
                        var btnGuardarSel = me.lookupReference('btnGuardarSeleccionarApoderado');
                        var resultado = juegosmecanicos.util.Json.decodeJSON(response.responseText);

                        Ext.ComponentQuery.query('#idapoderado')[0].setValue(0);
                        Ext.ComponentQuery.query('#nombresapoderado')[0].setValue('');
                        Ext.ComponentQuery.query('#apellidosapoderado')[0].setValue('');
                        Ext.ComponentQuery.query('#telefonoapoderado')[0].setValue('');
                        Ext.ComponentQuery.query('#correoapoderado')[0].setValue('');

                        if(resultado.data){
                            Ext.ComponentQuery.query('#idapoderado')[0].setValue(resultado.data[0].idapo);
                            Ext.ComponentQuery.query('#nombresapoderado')[0].setValue(resultado.data[0].nombres);
                            Ext.ComponentQuery.query('#apellidosapoderado')[0].setValue(resultado.data[0].apellidos);
                            Ext.ComponentQuery.query('#telefonoapoderado')[0].setValue(resultado.data[0].telefono);
                            Ext.ComponentQuery.query('#correoapoderado')[0].setValue(resultado.data[0].correo);

                            /*if(resultado.data[0].hijos[0]){
                                me.limpiarHijoGrilla();
                                me.agregarHijoGrilla(resultado.data[0].hijos);
                            }else{
                                me.limpiarHijoGrilla();
                            }*/

                            btnSel.setHidden(false);
                            btnGuardarSel.setHidden(true);

                        }else {
                            Ext.Msg.alert('Apoderado nuevo', 'Registrar el cliente nuevo.');
                            Ext.ComponentQuery.query('#idapoderado')[0].setValue(0); //USUARIO NUEVO
                            btnSel.setHidden(true);
                            btnGuardarSel.setHidden(false);
                            //me.limpiarHijoGrilla();
                        }

                        me.lookupReference('frmGuardarApoderado').unmask();

                    }
                });
           }

        }
    },

    accionSeleccionarApoderado:function(btn){
        me = this;
        var _idapo = me.lookupReference('txfIdApoderado').getValue();
        if( Ext.ComponentQuery.query('#txtCodigoPersona')[0]){            
            var nom =Ext.ComponentQuery.query('#nombresapoderado')[0].getValue();
            var ape = Ext.ComponentQuery.query('#apellidosapoderado')[0].getValue();
            Ext.ComponentQuery.query('#txtNombrePersona')[0].setText('Apoderado: '+ nom + ' ' + ape);
            Ext.ComponentQuery.query('#txtCodigoPersona')[0].setValue(_idapo);
        }else{
            var nom =Ext.ComponentQuery.query('#nombresapoderado')[0].getValue();
            var ape = Ext.ComponentQuery.query('#apellidosapoderado')[0].getValue();
            Ext.ComponentQuery.query('[name=cliente]')[0].setValue(nom + ' '+ ape);
            Ext.ComponentQuery.query('[name=idclie]')[0].setValue(_idapo);
        }

        var view =  this.getView();
        view.close();
    },

    accionGuardarSeleccionarApoderado:function(btn){
        me = this;
        var _idapo = me.lookupReference('txfIdApoderado').getValue();
        //_store = Ext.ComponentQuery.query('#dgvListaHijos')[0].getStore();
        _dataDetalle = [];

        /*_store.each(function (record) {
            if (record.get('nombres') != 0) {
                _reg = {
                    "nombres": record.get('nombres'),
                    "apellidos": record.get('apellidos'),
                    "edad": record.get("edad")
                };
                _dataDetalle.push(_reg);
            }

        });*/

        Ext.ComponentQuery.query('#hdnHijos')[0].setValue(JSON.stringify(_dataDetalle));

        var _form =  Ext.ComponentQuery.query('#frmGuardarApoderado')[0];
        var nom =Ext.ComponentQuery.query('#nombresapoderado')[0].getValue();
        var ape = Ext.ComponentQuery.query('#apellidosapoderado')[0].getValue();

        if (_form.isValid()) {
            _form.submit({
                waitMsg: 'Guardando información...',
                success: function (form, action) {

                    var rsp = juegosmecanicos.util.Json.decodeJSON(action.response.responseText);

                    Ext.ComponentQuery.query('#txtNombrePersona')[0].setText('Apoderado: '+ nom + ' ' + ape);
                    Ext.ComponentQuery.query('#txtCodigoPersona')[0].setValue(rsp.error);
                    var view =  me.getView();
                    view.close();
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

    onClickRemoverHijo:function(btn){
        var rec = btn.getWidgetRecord();
        var store = Ext.ComponentQuery.query('#dgvListaHijos')[0].getStore();
        store.remove(rec);
      },


});
