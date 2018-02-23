<?php

use Phalcon\Mvc\Model;
use Phalcon\Mvc\Model\Resultset\Simple as Resultset;

class Cliente extends \Phalcon\Mvc\Model
{
    public static function listar($parametros)
    {
        $obj     = new SQLHelpers();
        $param   = $parametros;
        //print_r($param);die();
        $sql     =  $obj->executarJson('public','sp_cliente_listar',$param);
        return $sql;
    }

    public static function listarpornombre($parametros)
    {
        $obj     = new SQLHelpers();
        $param   = $parametros;
        $sql     =  $obj->executarJson('public','sp_cliente_listar',$param);
        return $sql;
    }

    public static function listadopadrehijos($parametros)
    {
        $obj     = new SQLHelpers();
        $param   = $parametros;
        $sql     =  $obj->executarJson('public','sp_reporte_padres_hijos_listar',$param);
        return $sql;
    }

    public static function actualizar($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     = $obj->executar('public','sp_cliente_actualizar',$param);
        return $sql;
    }

    public static function anular($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     = $obj->executar('public','sp_cliente_anular',$param);
        return $sql;
    }

}
