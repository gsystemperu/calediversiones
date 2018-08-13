<?php

use Phalcon\Mvc\Model;
use Phalcon\Mvc\Model\Resultset\Simple as Resultset;

class Evento extends \Phalcon\Mvc\Model
{
    public static function listado($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
    //    print_r($data);die();
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
}
