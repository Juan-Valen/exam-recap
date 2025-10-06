const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app"); // app.js already connects to DB
const api = supertest(app);
const User = require("../models/userModel");
const { users, user } = require('./data.js');

// Clean the users collection before each test
beforeEach(async () => {
    await User.deleteMany({});
});

describe("User Routes", () => {
    describe("POST /api/users/signup", () => {
        it("✅ should signup a new user with valid credentials", async () => {
            const result = await api.post("/api/users/signup").send(users[0]);

            expect(result.status).toBe(201);
            expect(result.body).toHaveProperty("token");

            // Extra check: user is actually saved in DB
            const savedUser = await User.findOne({ username: users[0].username });
            expect(savedUser).not.toBeNull();
        });

        it("❌ should return an error with invalid password", async () => {
            const userData = users[1];
            userData.password = "short";

            const result = await api.post("/api/users/signup").send(userData);

            expect(result.status).toBe(400);
            expect(result.body).toHaveProperty("error");
        });
    });

    describe("POST /api/users/login", () => {
        it("✅ should login a user with valid credentials", async () => {
            // First signup
            await api.post("/api/users/signup").send(users[0]);

            // Then login
            const result = await api.post("/api/users/login").send(users[0]);

            expect(result.status).toBe(200);
            expect(result.body).toHaveProperty("token");
        });

        it("❌ should return an error with wrong password", async () => {
            const result = await api.post("/api/users/login").send({
                username: users[0].username,
                password: "wrongpassword",
            });

            expect(result.status).toBe(400);
            expect(result.body).toHaveProperty("error");
        });
    });
});

// Close DB connection after all tests
afterAll(async () => {
    await mongoose.connection.close();
});
