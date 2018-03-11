<?php

use Phalcon\Mvc\Model;
use Phalcon\Mvc\Model\Resultset\Simple as Resultset;

class Producto extends \Phalcon\Mvc\Model
{

     public static function listar($ar)
    {
        $obj     = new SQLHelpers();
        $param   = $ar;
        $sql     = $obj->executarJson('public','sp_producto_listar',$param);
        return $sql;
    }
    public static function listarPorCategoria($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executarJson('public','sp_producto_listar',$param);
        return $sql;
    }
    public static function actualizar($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     = $obj->executar('public','sp_producto_actualizar',$param);
        return $sql;
    }
    public static function eliminar($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     = $obj->executarJson('public','sp_producto_eliminar',$param);
        return $sql;
    }

    


}
