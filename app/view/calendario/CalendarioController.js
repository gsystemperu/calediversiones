Ext.define('juegosmecanicos.view.calendario.CalendarioController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.calendario',
    onClickGuardar: function (btn) {
        f = this.lookupReference('frmevento');
        txt = f.down('[name=jsondata]');
        g = f.down('#dgvAdelantos').getStore();
        dd = [];
        g.each(function (re) {
            if (re.get("monto") > 0) {
                r = {
                    "monto": re.get("monto"),
                    "fecha": re.get("fecha").toLocaleDateString()
                };
                dd.push(r);
            }
        });
        txt.setValue(JSON.stringify(dd));
        me = this;
        if (f.isValid()) {
            f.submit({
                waitMsg: 'Guardando información...',
                success: function (form, action) {
                    _dgv = me.lookupReference('dgvevento');
                    _dgv.getStore().reload();
                },
                failure: function () {
                    Ext.Msg.alert("Aviso", action.result.msg);
                }
            });

        } else {
            Ext.Msg.alert("Aviso", "Ingrese los datos para cargar la información");
        }


    },
    onClickAdelanto: function (p) {
        d = [];
        d = Ext.ComponentQuery.query('#dgvAdelantos')[0];
        t = Ext.ComponentQuery.query('[name=pos]')[0];
        po = t.getValue();
        s = d.getStore();
        r = {
            monto: 0,
            fecha: new Date()
        };
        po = po + 1;
        s.insert(po, r);
        d.getView().refresh();
        t.setValue(po)
    },
    onClickEvento: function (obj, record, element, rowIndex, e, eOpts) {
        f = this.lookupReference('frmevento');
        f.loadRecord(record);
        g = f.down('#dgvAdelantos');
        f.mask('.. buscando pagos');
        t = Ext.ComponentQuery.query('[name=pos]')[0];
        Ext.Ajax.request({
            url: juegosmecanicos.util.Rutas.pagosBuscar,
            params: {
                id: record.get('id')
            },
            success: function (response) {
                rs = juegosmecanicos.util.Json.decodeJSON(response.responseText);
                s = g.getStore();
                s.removeAll();
                to =0;
                if (rs) {
                    x = 0;
                    Ext.each(rs.data, function (r, i) {
                        ix = {
                            monto: r.monto,
                            fecha: r.fecha
                        };
                        s.insert(r.item, ix);
                        to = to + r.monto;
                        g.getView().refresh();
                        x = r.item;
                    });
                    t.setValue(x);
                }
                f.down('[name=adelantos]').setValue(to);
                f.unmask();

            }
        });
        
    },
    onSelectDia: function (obj, date, eOpts) {
        me.lookupReference('dgvevento').getStore().load({
            params: {
                fecha: Ext.Date.format(obj.getValue(), 'Y-m-d')
            }
        });
    },
    onClickCliente: function (b) {
        win = Ext.create('juegosmecanicos.view.pdv.PopupApoderado', {});
        win.show();
    },
    onClickNuevo: function (b) {
        f=this.lookupReference('frmevento');
        f.reset();
        f.down('#dgvAdelantos').getStore().removeAll();
        f.down('[name=pos]').setValue(0);
        Ext.ComponentQuery.query('[name=nomevento]')[0].focus(true);
    },
    onClickEliminarEvento: function (b) {
        r = b.getWidgetRecord();
         Ext.Msg.prompt('Seguridad', 'Ingresar la clave del administrador general !!!', function (btnx, text) {
             if (btnx == 'ok') {
                 Ext.Ajax.request({
                     url: juegosmecanicos.util.Rutas.validAdmin,
                     params: {
                         c: text.trim()
                     },
                     success: function (response) {
                         r = juegosmecanicos.util.Json.decodeJSON(response.responseText);
                         if (r.data[0].pasa == 0) {
                             Ext.Msg.alert('Error', 'Datos incorrectos no te permiso para eliminar el evento'); return false;
                         } else {
                             /*s = Ext.ComponentQuery.query('#dgvAdelantos')[0].getStore();
                             s.remove(r);
                             this.sumarPagos(s);*/
                     
                         }
                     }
                 });
             }
         });
    },
    onClickEliminarPago:function(btn){
        r = btn.getWidgetRecord();
        Ext.Msg.prompt('Seguridad', 'Ingresar la clave del administrador general !!!', function (btnx, text) {
            if (btnx == 'ok') {
                Ext.Ajax.request({
                    url: juegosmecanicos.util.Rutas.validAdmin,
                    params: {
                        c: text.trim()
                    },
                    success: function (response) {
                        r = juegosmecanicos.util.Json.decodeJSON(response.responseText);
                        if (r.data[0].pasa == 0) {
                            Ext.Msg.alert('Error', 'Datos incorrectos no te permiso para eliminar el pago'); return false;
                        } else {
                            s = Ext.ComponentQuery.query('#dgvAdelantos')[0].getStore();
                            s.remove(r);
                            this.sumarPagos(s);
                    
                        }
                    }
                });
            }
        });

    },
    sumarPagos:function(s){
       t =0;
       s.each(function (r) {
           t = t + r.get('monto');
       });
       Ext.ComponentQuery.query('[name=adelantos]')[0].setValue(t.toFixed(2));
    },
    onEditorCalcularPagos:function(editor,e){
        m = e.record.get('monto');
        e.record.set('monto', m.toFixed(2));
        s = Ext.ComponentQuery.query('#dgvAdelantos')[0].getStore();
        this.sumarPagos(s);
    },
    onClickImprimirContrato:function(b){
        r = b.getWidgetRecord();
        ul = juegosmecanicos.util.Rutas.imprimirContrato + r.get('id').toString();
        xpos = (screen.width / 2) - (1000 / 2);
        ypos = (screen.height / 2) - (600 / 2);
        my = window.open(ul, "mywindow",
            "location=1,status=1,scrollbars=1,  width=800,height=750");
        my.moveTo(xpos, ypos);
    }
});
