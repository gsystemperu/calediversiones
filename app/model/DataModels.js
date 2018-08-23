Ext.define('juegosmecanicos.model.DataModels',
{extend: 'Ext.data.Model',
fields: [{ name: 'id', type: 'int' }]});

// @Model : Categoria
Ext.define('juegosmecanicos.model.Categoria', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'idcate', type: 'int' },
        { name: 'descripcion', type: 'string' }
      ]
});


// @Model : sub categoria
Ext.define('juegosmecanicos.model.SubCategoria', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'idsubcate', type: 'int' },
        { name: 'idcate', type: 'int' },
        { name: 'descripcion', type: 'string' }
      ]
});


// @Model : Producto
Ext.define('juegosmecanicos.model.Producto', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'idprod', type: 'int' },
        { name: 'nombre', type: 'string' },
        { name: 'idcate', type: 'int' },
        { name: 'categoria', type: 'string' },
        { name: 'idsubcate', type: 'int' },
        { name: 'subcategoria', type: 'string' },
        { name: 'precioventa', type: 'float' },
        { name: 'stock', type: 'int' },
        { name: 'imagen', type: 'boolean' },
        { name: 'llevacontrol', type: 'boolean' },
        { name: 'minutos', type: 'int' },
        { name: 'orden', type: 'int' },
        { name: 'codigobarra', type: 'string' },
        { name: 'esmembresia', type: 'boolean' },
        { name: 'contarvisita', type: 'boolean' }

      ]
});


// @Model : Persona
Ext.define('juegosmecanicos.model.Persona', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'idtra', type: 'int' },
        { name: 'nombres', type: 'string' },
        { name: 'dni', type: 'string' },
        { name: 'direccion', type: 'string' },
        { name: 'celular', type: 'string' },
        { name: 'telefono', type: 'string' },
        { name: 'estado', type: 'int' },
      ]
});

// @Model : Cliente
Ext.define('juegosmecanicos.model.Cliente', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'idclie', type: 'int' },
        { name: 'nombres', type: 'string' },
        { name: 'dni', type: 'string' },
        { name: 'estado', type: 'int' }
      ]
});

// @Model : Local
Ext.define('juegosmecanicos.model.Local', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'idlocal', type: 'int' },
        { name: 'direccion', type: 'string' },
        { name: 'telefono', type: 'string' },
        { name: 'celular', type: 'string' },
        { name: 'estado', type: 'string' },
        { name: 'descripcion', type: 'string' },
        { name: 'usuario', type: 'string' }

      ]
});

// @Model : Forma Pago
Ext.define('juegosmecanicos.model.FormaPago', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'idfpag', type: 'int' },
        { name: 'descripcion', type: 'string' },
        { name: 'estado', type: 'int' }

      ]
});


// @Model : Forma Listado Caja
Ext.define('juegosmecanicos.model.Pedidos', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'idven', type: 'int' },
        { name: 'idclie', type: 'int' },
        { name: 'idlocal', type: 'int' },
        { name: 'dinerorecibido', type: 'float' },
        { name: 'dinerovuelto', type: 'float' },
        { name: 'formapago', type: 'string' },
        { name: 'numerorecibo', type: 'string' },
        { name: 'idemp', type: 'int' },
        { name: 'empleado', type: 'string' },
        { name: 'idest', type: 'int' },
        { name: 'estadopagostr', type: 'string' },
        { name: 'fechaventa', type: 'string' },
        { name: 'totalventa', type: 'float' },
        { name: 'cliente', type: 'string' },
        { name: 'milocal', type: 'string' }


      ]
});

// @Model : Detalle de Pedido
Ext.define('juegosmecanicos.model.DetallePedido', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'idprod', type: 'int' },
        { name: 'nombre', type: 'string' },
        { name: 'cantidad', type: 'int' },
        { name: 'precio', type: 'float' },
        { name: 'total', type: 'float' },
        { name: 'nino', type: 'string' },
        { name: 'hdesde', type: 'string' },
        { name: 'hhasta', type: 'string' },
        { name: 'minutos', type: 'integer' }
      ]
});

// @Model : Hijo de apoderados
Ext.define('juegosmecanicos.model.Apoderado', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'idhijo', type: 'int' },
        { name: 'nombres', type: 'string' },
        { name: 'apellidos', type: 'string' },
        { name: 'edad', type: 'int' },
        { name: 'idapoderado', type: 'int' },
        { name: 'estado', type: 'int' }
      ]
});



// @Model : Niño Busqueda
Ext.define('juegosmecanicos.model.Nino', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'id', type: 'int' },
        { name: 'nombres', type: 'string' },
        { name: 'apellidos', type: 'string' },
        { name: 'edad', type: 'int' },
        { name: 'estado', type: 'int' },
        { name: 'ultimavisita', type: 'int' },
        { name: 'usumenbre', type: 'int' },
        { name: 'membresiadesde', type: 'string' },
        { name: 'membresiahasta', type: 'string' },
        { name: 'idmembre', type: 'int' },


      ]
});

// @Model : Niños Todos
Ext.define('juegosmecanicos.model.NinoTodos', {
    extend: 'Ext.data.Model',
    fields: [
        { name: '_id', type: 'int' },
        { name: '_nombres', type: 'string' },
        { name: '_apellidos', type: 'string' },
        { name: '_ultimavisita', type: 'int' }
      ]
});



// @Model : Control de niños juegando
Ext.define('juegosmecanicos.model.Control', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'idven', type: 'int' },
        { name: 'idnino', type: 'int' },
        { name: 'nino', type: 'string' },
        { name: 'edad', type: 'int' },
        { name: 'hdesde', type: 'string' },
        { name: 'hhasta', type: 'string' }
      ]
});



// @Model : Control Apoderados Listado Todos
Ext.define('juegosmecanicos.model.Apoderados', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'idapo', type: 'int' },
        { name: 'nombres', type: 'string' },
        { name: 'apellidos', type: 'string' },
        { name: 'dni', type: 'string' },
        { name: 'telefono', type: 'string' },
        { name: 'correo', type: 'string' }
      ]
});


// @Model : Control de gastos
Ext.define('juegosmecanicos.model.Gasto', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'idgasto', type: 'int' },
        { name: 'fecha', type: 'string' },
        { name: 'descripcion', type: 'string' },
        { name: 'montogasto', type: 'float' }
      ]
});



// @Model : sub categoria
Ext.define('juegosmecanicos.model.Evento', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'id', type: 'int' },
        { name: 'idclie', type: 'int' },
        { name: 'cliente', type: 'string' },
        { name: 'fecha', type: 'string' },
        { name: 'dfecha', type: 'date' },
        { name: 'horainicio', type: 'string' },
        { name: 'horatermino', type: 'string' },
        { name: 'nomevento', type: 'string' },
        { name: 'adelantos', type: 'float' },
        { name: 'total', type: 'float' },
        { name: 'idlocal', type: 'int' },
        { name: 'fechaadelanto', type: 'string' },
        { name: 'adelanto2', type: 'float' },
        { name: 'fechaadelanto2', type: 'string' },
        { name: 'adelanto3', type: 'string' },
        { name: 'fechaadelanto3', type: 'string' },
        { name: 'adelanto4', type: 'string' },
        { name: 'fechaadelanto4', type: 'string' },
        { name: 'direccion', type: 'string' }
      ]
});

