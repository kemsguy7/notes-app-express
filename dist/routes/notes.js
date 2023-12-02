"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notes_1 = require("../controllers/notes");
const authenticate_1 = require("../middleware/authenticate");
const router = (0, express_1.Router)();
router.route("/").post(authenticate_1.authenticate, notes_1.createNote).get(notes_1.findAll);
//router.route('/:id').get(authenticate, findOne).patch(updateNote).delete(deleteNote);
router
    .route("/:id")
    .get(notes_1.findOne)
    .patch(authenticate_1.authenticate, notes_1.updateNote)
    .delete(authenticate_1.authenticate, notes_1.deleteNote);
exports.default = router;
