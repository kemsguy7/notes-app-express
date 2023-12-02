"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNote = exports.updateNote = exports.findOne = exports.findAll = exports.createNote = void 0;
const notes_1 = __importDefault(require("../models/notes"));
const notes_2 = __importDefault(require("../models/notes"));
const createNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, duedate, status, userId } = req.body;
        console.log(title, description);
        //create a note
        const note = yield notes_1.default.create({ title, description, duedate, status, userId });
        res.status(201).json({ note: note });
    }
    catch (error) {
        res.status(500).json({ message: "Failed", error });
    }
});
exports.createNote = createNote;
const findAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notes = yield notes_1.default.findAll();
        res.status(200).json({ status: 'success', notes: notes_2.default });
    }
    catch (error) {
        res.status(500).json({ message: "Failed", error });
    }
});
exports.findAll = findAll;
const findOne = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const note = yield notes_1.default.findByPk(id);
        res.status(200).json({ status: 'success', note });
    }
    catch (error) {
        res.status(500).json({ message: "Failed", error });
    }
});
exports.findOne = findOne;
const updateNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const note = yield notes_1.default.findByPk(id);
        if (!note) {
            return res.status(404).json({ message: "Use Not Found" });
        }
        yield note.update(Object.assign({}, req.body));
        yield note.save();
        res.status(201).json({ user: note });
    }
    catch (error) {
        res.status(500).json({ message: "Failed", error });
    }
});
exports.updateNote = updateNote;
const deleteNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const note = yield notes_1.default.findByPk(id);
        if (!note) {
            return res.status(404).json({ message: "Use Not Found" });
        }
        yield note.destroy();
        res.status(204).json({ user: note });
    }
    catch (error) {
        res.status(500).json({ message: "Failed", error });
    }
});
exports.deleteNote = deleteNote;
