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
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('--- Database Users ---');
        const users = yield prisma.user.findMany();
        if (users.length === 0) {
            console.log('No users found in the database.');
            // Suggest creating an admin user if missing
            const email = 'admin@asafs.com';
            const password = 'adminpassword123';
            const hashedPassword = yield bcryptjs_1.default.hash(password, 12);
            console.log(`Creating default admin user: ${email} / ${password}`);
            yield prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    name: 'Administrator',
                    role: 'admin'
                }
            });
            console.log('Admin user created successfully.');
        }
        else {
            users.forEach(u => {
                console.log(`- ${u.name} (${u.email}) [${u.role}]`);
            });
        }
    });
}
main()
    .catch(e => {
    console.error(e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
