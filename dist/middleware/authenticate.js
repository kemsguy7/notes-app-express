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
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // Import Secret type from jsonwebtoken
const user_1 = __importDefault(require("../models/user")); // Correct casing for the file name
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" }); // Remove unnecessary casting
    }
    try {
        const secret = process.env.JWT_SECRET_KEY; // Use Secret type for clarity
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        console.log(decoded);
        // Use Sequelize's findOne method to retrieve the user
        const user = yield user_1.default.findOne({
            where: { id: decoded.loginkey },
            attributes: ["id"],
        });
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        console.log(user);
        // req.user = user; // Attach the user to the request for further use
        next();
    }
    catch (error) {
        console.error(error);
        res.status(401).json({ message: "Error in authorization" }); // Fix typo in the error message
    }
});
exports.authenticate = authenticate;
