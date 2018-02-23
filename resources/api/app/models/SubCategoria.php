<?php

use Phalcon\Mvc\Model;
use Phalcon\Mvc\Model\Resultset\Simple as Resultset;

class SubCategoria extends \Phalcon\Mvc\Model
{
    public static function listar($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executarJson('public','sp_sub_categoria_listar',$param);
        return $sql;
    }
    

}
