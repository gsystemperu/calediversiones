<?php

use Phalcon\Mvc\Model;
use Phalcon\Mvc\Model\Resultset\Simple as Resultset;

class Evento extends \Phalcon\Mvc\Model
{
    public static function listado($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executarJson('public','sp_eventos_listar',$param);
        return $sql;
    }
    
    public static function actualizar($data)
    {   
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executar('public','sp_evento_actualizar',$param);
        return $sql;
    }
    public static function pagos($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executarJson('public','sp_eventos_pagos_buscar',$param);
        return $sql;
    }
    public static function buscar($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executarJson('public','sp_eventos_buscar',$param);
        return $sql;
    }
    public static function eliminar($data)
    {   
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executar('public','sp_evento_eliminar',$param);
        return $sql;
    }
    public static function anularPago($data)
    {   
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executar('public','sp_anular_pago',$param);
        return $sql;
    }
    
}
