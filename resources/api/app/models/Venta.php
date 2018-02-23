<?php

use Phalcon\Mvc\Model;
use Phalcon\Mvc\Model\Resultset\Simple as Resultset;

class Venta extends \Phalcon\Mvc\Model
{

     public static function listar()
    {
        $obj     = new SQLHelpers();
        $param   = array();
        $sql     =  $obj->executarJson('public','sp_producto_listar',$param);
        return $sql;
    }
    public static function guardar($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executar('public','sp_venta_agregar',$param);
        return $sql;
    }
    public static function detalleventaimpresion($data){
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executar('public','sp_venta_detalle_datos_impresion',$param);
        return $sql;
    }

    public static function listadopedidoscaja($data){
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executarJson('public','sp_ventas_caja_listar',$param);
        return $sql;
    }
    public static function detallePedido($data){
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executarJson('public','sp_ventas_detalle',$param);
        return $sql;
    }
    public static function cambiarestadoventa($data){
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executar('public','sp_ventas_cambiar_estado',$param);
        return $sql;
    }

    /*
        @ Query de Control de los niños jugando
          muestra un intervalo de 1 minito por javascript
    */
    public static function controlninos($data){
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executarJson('public','sp_control_ingresos_ninos',$param);
        return $sql;
    }

    public static function anularventa($data){
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executar('public','sp_ventas_anular',$param);
        return $sql;
    }
    public static function datoscliente($data){
       $obj     = new SQLHelpers();
       $param   = $data;
       $sql     =  $obj->executar('public','sp_venta_datos_impresion',$param);
       return $sql;
   }
   public static function totalventacaja($data){
       $obj     = new SQLHelpers();
       $param   = $data;
       $sql     =  $obj->executar('public','sp_ventas_total_caja',$param);
       return $sql;
   }

   public static function actualizargasto($data){
       $obj     = new SQLHelpers();
       $param   = $data;
       $sql     =  $obj->executar('public','sp_gasto_actualizar',$param);
       return $sql;
   }

   public static function listargasto($data){
       $obj     = new SQLHelpers();
       $param   = $data;
       $sql     =  $obj->executarJson('public','sp_gastos_listar',$param);
       return $sql;
   }
   public static function eliminargasto($data){
       $obj     = new SQLHelpers();
       $param   = $data;
       $sql     =  $obj->executar('public','sp_gasto_eliminar',$param);
       return $sql;
   }





}
