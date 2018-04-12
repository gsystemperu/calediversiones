<?php

use Phalcon\Mvc\Model;
use Phalcon\Mvc\Model\Resultset\Simple as Resultset;

class Config extends \Phalcon\Mvc\Model
{
    public static function datosimpresora($data)
    {

        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     = $obj->executar('public','sp_configuracion',$param);
        return $sql;
    }

    public static function guardar($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     = $obj->executar('public','sp_configuracion_actualizar',$param);
        return $sql;
    }

    public static function mostrar()
    {
        $obj     = new SQLHelpers();
        $param   = array();
        $sql     = $obj->executarJSON('public','sp_config_mostrar',$param);
        return $sql;
    }
    public static function validarAdminClave($data){
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     = $obj->executarJSON('public','sp_config_validar_clave_admin',$param);
        return $sql;
    }
    public static function accesoAlSistema($data){
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     = $obj->executarJSON('public','sp_login_sistema',$param);
        return $sql;
    }
    public static function actualizarClaveEliminar($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     = $obj->executar('public','sp_configuracion_actualizar_eliminar_venta',$param);
        return $sql;
    }
    public static function actualizarClaveSuperAdmin($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     = $obj->executar('public','sp_configuracion_actualizar_super_admin',$param);
        return $sql;
    }




}
