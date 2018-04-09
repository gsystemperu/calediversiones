Ext.define('juegosmecanicos.store.DataTemp', {
    extend: 'Ext.data.Store',
    fields: ["id", "descripcion"],
    data: [{ id: 'test' }],
    proxy: { type: 'memory' }
});



/****************************************
| Stores temporales para generar el lote del pedido a enviar a china
*****************************************/

Ext.define('juegosmecanicos.store.tmpRegistroVenta', {
    extend: 'Ext.data.Store',
    fields: [
        { name :'id',type:'int'},
        { name: "idprod",type:'int'},
        { name: "descripcion",type:'string'},
        { name: "cantidad", type: 'float' },
        { name: "precio", type: 'float' },
        { name: "idnino", type: 'integer' },
        { name: "nino", type: 'string' },
        { name: "total", type: 'float' },
        { name: "hdesde", type: 'string' },
        { name: "hhasta", type: 'string' },
        { name: "hmenbresiadesde", type: 'string' },
        { name: "hmenbresiahasta", type: 'string' },
        { name: "membresia" , type: 'int'}
    ],
    proxy: { type: 'memory' }
});


Ext.define('juegosmecanicos.store.tmpRegistroHijo', {
    extend: 'Ext.data.Store',
    fields: [
        { name :'idhijo',type:'int'},
        { name :'nombres',type:'string'},
        { name: "apellidos",type:'string'},
        { name: "edad",type:'int'}
    ],
    proxy: { type: 'memory' }
});





/* Temporales para el registro de cuatos  */

Ext.define('juegosmecanicos.store.tmpProductos', {
    extend: 'Ext.data.Store',
    fields: [
        {name :"src",type:'string'},
        { name: "caption", type: 'string' },

    ],
    data :[
        { src:'resources/images/cuarto.png', nombre:'1',categoria:'Normal',estado:'Ocupado' },
        { src:'resources/images/cuarto.png', nombre:'2',categoria:'Normal',estado:'Libre'  },
         { src:'resources/images/cuarto.png', nombre:'3',categoria:'Normal',estado:'Ocupado' },
        { src:'resources/images/cuarto.png', nombre:'4',categoria:'Normal',estado:'Libre'  },
         { src:'resources/images/cuarto.png', nombre:'5',categoria:'Normal',estado:'Ocupado' },
        { src:'resources/images/cuarto.png', nombre:'6',categoria:'Normal',estado:'Libre'  },
         { src:'resources/images/cuarto.png', nombre:'7',categoria:'Normal',estado:'Ocupado' },
        { src:'resources/images/cuarto.png', nombre:'8',categoria:'Normal',estado:'Libre'  },
         { src:'resources/images/cuarto.png', nombre:'9',categoria:'Normal',estado:'Ocupado' },
        { src:'resources/images/cuarto.png', nombre:'10',categoria:'Normal',estado:'Libre'  },
         { src:'resources/images/cuarto.png', nombre:'11',categoria:'Normal',estado:'Ocupado' },
        { src:'resources/images/cuarto.png', nombre:'12',categoria:'Normal',estado:'Libre'  },
         { src:'resources/images/cuarto.png', nombre:'13',categoria:'Normal',estado:'Ocupado' },
        { src:'resources/images/cuarto.png', nombre:'14',categoria:'Normal',estado:'Libre'  },
        { src:'resources/images/cuarto.png', nombre:'15',categoria:'Normal',estado:'Ocupado' },
        { src:'resources/images/cuarto.png', nombre:'16',categoria:'Normal',estado:'Libre'  },
        { src:'resources/images/cuarto.png', nombre:'16',categoria:'Normal',estado:'Libre'  },
        { src:'resources/images/cuarto.png', nombre:'16',categoria:'Normal',estado:'Libre'  },
        { src:'resources/images/cuarto.png', nombre:'16',categoria:'Normal',estado:'Libre'  },
        { src:'resources/images/cuarto.png', nombre:'16',categoria:'Normal',estado:'Libre'  },
        { src:'resources/images/cuarto.png', nombre:'16',categoria:'Normal',estado:'Libre'  },
        { src:'resources/images/cuarto.png', nombre:'16',categoria:'Normal',estado:'Libre'  },
        { src:'resources/images/cuarto.png', nombre:'16',categoria:'Normal',estado:'Libre'  },
        { src:'resources/images/cuarto.png', nombre:'16',categoria:'Normal',estado:'Libre'  },
        { src:'resources/images/cuarto.png', nombre:'16',categoria:'Normal',estado:'Libre'  },
        { src:'resources/images/cuarto.png', nombre:'16',categoria:'Normal',estado:'Libre'  }





    ],
    proxy: { type: 'memory' }

});
