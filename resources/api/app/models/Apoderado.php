<?php

use Phalcon\Mvc\Model;
use Phalcon\Mvc\Model\Resultset\Simple as Resultset;

class Apoderado extends \Phalcon\Mvc\Model
{
    public static function listarapoderado($parametros)
    {
        $obj     = new SQLHelpers();
        $param   = $parametros;
        $sql     =  $obj->executarJson('public','sp_apoderado_listar_dni',$param);
        return $sql;
    }

    public static function listartodos($parametros)
    {
        $obj     = new SQLHelpers();
        $param   = $parametros;
        $sql     =  $obj->executarJson('public','sp_apoderado_listar',$param);
        return $sql;
    }

    public static function guardarapoderado($parametros)
    {
        $obj     = new SQLHelpers();
        $param   = $parametros;
        $sql     =  $obj->executar('public','sp_apoderado_agregar',$param);
        return $sql;
    }

    public static function listarhijos($parametros)
    {
        $obj     = new SQLHelpers();
        $param   = $parametros;
        $sql     =  $obj->executar('public','sp_hijos_listar',$param);
        return $sql;
    }

    public static function buscarnino($parametros)
    {
        $obj     = new SQLHelpers();
        $param   = $parametros;
        $sql     =  $obj->executarJson('public','sp_hijos_buscar',$param);
        return $sql;
    }

 public static function buscarninomembresia($parametros)
    {
        $obj     = new SQLHelpers();
        $param   = $parametros;
        $sql     =  $obj->executarJson('public','sp_hijos_buscar',$param);
        return $sql;
    }

    public static function guardarhijo($parametros)
    {
        $obj     = new SQLHelpers();
        $param   = $parametros;
        $sql     =  $obj->executar('public','sp_hijo_actualizar_2',$param);
        return $sql;
    }
    public static function guardarhijomembresia($parametros)
    {
        $obj     = new SQLHelpers();
        $param   = $parametros;
        $sql     =  $obj->executar('public','sp_hijo_actualizar_2',$param);
        return $sql;
    }



    public static function eliminarhijo($parametros)
    {
        $obj     = new SQLHelpers();
        $param   = $parametros;
        $sql     =  $obj->executar('public','sp_nino_anular',$param);
        return $sql;
    }

    public static function ninostodos($parametros)
    {
        $obj     = new SQLHelpers();
        $param   = $parametros;
        $sql     =  $obj->executar('public','sp_hijos_todos',$param);
        return $sql;
    }

    public static function bajaMembresia($parametros)
    {
        $obj     = new SQLHelpers();
        $param   = $parametros;
        $sql     =  $obj->executar('public','sp_hijo_membresia_baja',$param);
        return $sql;
    }
    public static function listaSoloNinosMembresia($parametros)
    {
        $obj     = new SQLHelpers();
        $param   = $parametros;
        $sql     =  $obj->executarJson('public','sp_hijos_solo_membresia',$param);
        return $sql;
    }


}
