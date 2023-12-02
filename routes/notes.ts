import { Router } from "express";
import {
  createNote,
  findOne,
  updateNote,
  deleteNote,
  findAll,
} from "../controllers/notes";
import { authenticate } from "../middleware/authenticate";

const router = Router();

router.route("/").post(authenticate, createNote).get(findAll);

//router.route('/:id').get(authenticate, findOne).patch(updateNote).delete(deleteNote);
router
  .route("/:id")
  .get(findOne)
  .patch(authenticate, updateNote)
  .delete(authenticate, deleteNote);

export default router;
