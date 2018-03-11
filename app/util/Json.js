Ext.define('juegosmecanicos.util.Json',
{
        statics:
        {
              decodeJSON: function(text) {

                    var result = Ext.JSON.decode(text, true);

                    if (!result) {
                        result = {};
                        result.success = false;
                        result.msg = text;
                    }

                    return result;
                }
        }

});
