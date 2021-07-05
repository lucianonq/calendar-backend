/*
    Rutas de Usuarios / Events
    /api/events
*/

const express = require('express');
const { check } = require('express-validator');
const router = express.Router();

const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require("../controllers/events");
const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require("../middlewares/validar-jwt");

router.use( validarJWT ); //esto hace que todos los enpoints pasen por validarJWT

//Obtener eventos
router.get( '/', getEventos );

//Crear un nuevo evento
router.post( 
    '/', 
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatorio').custom( isDate ),
        check('end', 'Fecha de finalizacion es obligatorio').custom( isDate ),
        validarCampos
    ],
    crearEvento 
);

//Actualizar Evento
router.put( '/:id', actualizarEvento );

//Borrar Evento
router.delete( '/:id', eliminarEvento );

module.exports = router;