import express from 'express';
import { getTasks, createTask, updateTask, deleteTask, getTask } from '../controllers/taskController.js';
import { validationResult, body, param } from "express-validator";
const router = express.Router();

const validaet = (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    next()
}

router.get("/", getTasks);

router.get("/:id", 
    [ 
    param("id").isMongoId().withMessage("ID inválido")
    ],
    validaet,
    getTask
);

router.post("/",
    [
      body("titulo").notEmpty().isString(),
      body("inicio").notEmpty().isISO8601().withMessage("Data inválida"),
      body("conclusao").notEmpty().isISO8601().withMessage("Data inválida"),
      body("custoEstimado").notEmpty().isNumeric(),
      body("statusTarefa").notEmpty().isString()  
    ], 
    validaet ,
    createTask
);

router.put("/:id",
    [
     param("id").isMongoId().withMessage("ID inválido"),
     body("titulo").notEmpty().isString(),
     body("inicio").notEmpty().isISO6391(),
     body("conclusao").notEmpty().isString(),
     body("custoEstimado").notEmpty().isNumeric(),
     body("statusTarefa").notEmpty().isString()
    ],
    validaet,
    updateTask
);

router.delete("/:id",
     [
      param("id").isMongoId().withMessage("ID inválido")
     ],
    validaet,
    deleteTask);

export default router;