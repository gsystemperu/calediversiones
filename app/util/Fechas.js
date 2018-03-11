Ext.define('juegosmecanicos.util.Fechas',
{
        statics:
        {
              sumarMinutos: function(_minutos)
              {
                _fecha         = new Date();
                _horaCalculada = new Date(_fecha.getFullYear(),_fecha.getMonth(), _fecha.getDay(),_fecha.getHours(),_fecha.getMinutes() + _minutos, 0 , 0);
                return _horaCalculada;
              }
        }

});
