Ext.define('juegosmecanicos.util.Fechas',
{
        statics:
        {
              sumarMinutos: function(_minutos)
              {
                _fecha         = new Date();
                _horaCalculada = new Date(_fecha.getFullYear(),_fecha.getMonth(), _fecha.getDay(),_fecha.getHours(),_fecha.getMinutes() + _minutos, 0 , 0);
                return _horaCalculada;
              },
              sumar30dias:function(){
                var n = new Date();
                nmo  = n.setDate(n.getDate() + 30 );
                nmo  = new Date(nmo);
                return nmo;
              },
              formatFechaDB:function(fecha){
                fe = fecha.toString().split('-');
                r = Ext.Date.format(new Date(parseInt(fe[0]),parseInt(fe[1])-1,parseInt(fe[2])+1), 'Y-m-d');
                return r;
              }
        }

});
