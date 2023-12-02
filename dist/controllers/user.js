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
exports.deleteUser = exports.updateUser = exports.findSingle = exports.findAll = exports.login = exports.signup = void 0;
const user_1 = __importDefault(require("../models/user"));
const notes_1 = __importDefault(require("../models/notes"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const generateToken = (userId) => {
    return jsonwebtoken_1.default.sign({ userId }, process.env.JWT_SECRET_KEY || "", {
        expiresIn: "1h", // Token expires in 1 hour
    });
};
const secret = process.env.JWT_SECRET_KEY;
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullname, email, gender, phone, address, password } = req.body;
    //password = req.body.password;
    try {
        //check if user already exists by checking to see if the email exists in our database already
        const existingUser = yield user_1.default.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({
                status: "failed",
                message: "Email is already in use, try another email",
            });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10); //  salt round (10)
        const newUser = yield user_1.default.create({
            fullname,
            email,
            gender,
            phone,
            address,
            password: hashedPassword,
        });
        if (!newUser) {
            return res.status(400).json({
                status: "failed",
                message: "Invalid details, account cannot be created",
            });
        }
        return res.status(201).json({
            status: "success",
            message: "Account has been created",
        });
    }
    catch (error) {
        console.error("Error creating user:", error);
        return res
            .status(500)
            .json({ status: "error", message: "Internal server error" });
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // Find the user by email
        const user = yield user_1.default.findOne({
            where: { email },
            attributes: ["id", "email", "password"],
        });
        // If the user is not found, return an error
        if (!user) {
            return res
                .status(404)
                .json({ status: "failed", message: "User not found" });
        }
        // Compare the provided password with the hashed password in the database, If passwords match, the login is successful
        if (user &&
            bcrypt_1.default.compareSync(password, user.dataValues.password)) {
            const secret = process.env.secret;
            // create secret token for authenticated users
            const token = generateToken(user.dataValues.id || "");
            return res
                .status(200)
                .json({ status: "successful", token: token, user: user.dataValues });
        }
        else {
            // If passwords don't match, return an error
            return res
                .status(401)
                .json({ status: "failed", message: "Invalid password" });
        }
    }
    catch (error) {
        console.error("Error during login:", error);
        return res
            .status(500)
            .json({ status: "error", message: "Internal server error" });
    }
});
exports.login = login;
const findAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.findAll();
        res.status(200).json({ status: "success", users });
    }
    catch (error) {
        res.status(500).json({ message: "Failed", error });
    }
});
exports.findAll = findAll;
const findSingle = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        // const user = await User.findByPk(id);
        const user = yield user_1.default.findByPk(id, {
            include: [{ model: notes_1.default }],
        });
        res.status(200).json({ status: "success", user });
    }
    catch (error) {
        res.status(500).json({ message: "Failed", error });
    }
});
exports.findSingle = findSingle;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const user = yield user_1.default.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "Use Not Found" });
        }
        yield user.update(Object.assign({}, req.body));
        yield user.save();
        res.status(201).json({ user: user });
    }
    catch (error) {
        res.status(500).json({ message: "Failed", error });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const user = yield user_1.default.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }
        yield user.destroy();
        res.status(204).json({ user: user });
    }
    catch (error) {
        res.status(500).json({ message: "Failed", error });
    }
});
exports.deleteUser = deleteUser;
