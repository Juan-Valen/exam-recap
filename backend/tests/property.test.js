const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app"); // Your Express app
const api = supertest(app);
const Property = require("../models/propertyModel");
const User = require("../models/userModel");
const { users, user, properties } = require('./data.js');

let token = null;

// Create a user and get a token before all tests
beforeAll(async () => {
    await User.deleteMany({});
});

describe("Property Controller", () => {
    beforeEach(async () => {
        await Property.deleteMany({});
        await Promise.all([
            api.post("/api/properties").set("Authorization", "Bearer " + token).send(properties[0]),
            api.post("/api/properties").set("Authorization", "Bearer " + token).send(properties[1]),
        ]);
    });

    afterAll(() => {
        mongoose.connection.close();
    });

    // Test GET /api/properties
    it("should return all properties as JSON when GET /api/properties is called", async () => {
        const response = await api
            .get("/api/properties")
            .set("Authorization", "Bearer " + token)
            .expect(200)
            .expect("Content-Type", /application\/json/);

        expect(response.body).toHaveLength(properties.length);
    });

    // Test POST /api/properties
    it("should create a new property when POST /api/properties is called", async () => {
        const newProperty = {
            title: "Miami Condo",
            type: "Condo",
            description: "Condo on top of Miami area.",
            price: 13252,
            location: {
                address: "miami street 1",
                city: "Miami",
                state: "MI",
                zipCode: "00230"
            },
            squareFeet: 1000,
            yearBuilt: 2024
        };

        await api
            .post("/api/properties")
            .set("Authorization", "Bearer " + token)
            .send(newProperty)
            .expect(201)
            .expect("Content-Type", /application\/json/);

        const propertiesAfterPost = await Property.find({});
        expect(propertiesAfterPost).toHaveLength(properties.length + 1);
        const propertyTitles = propertiesAfterPost.map((property) => property.title);
        expect(propertyTitles).toContain(newProperty.title);
    });

    // Test GET /api/properties/:id
    it("should return one property by ID when GET /api/properties/:id is called", async () => {
        const property = await Property.findOne();
        await api
            .get(`/api/properties/${property._id}`)
        .set("Authorization", "Bearer " + token)
            .expect(200)
            .expect("Content-Type", /application\/json/);
    });

    it("should return 404 for a non-existing property ID", async () => {
        const nonExistentId = new mongoose.Types.ObjectId();
        await api
            .get(`/api/properties/${nonExistentId}`)
        .set("Authorization", "Bearer " + token)
            .expect(404);
    });

    // Test PUT /api/properties/:id
    it("should update one property with partial data when PUT /api/properties/:id is called", async () => {
        const property = await Property.findOne();
        const updatedProperty = {
            price: 8000,
            type: "House",
        };

        await api
            .put(`/api/properties/${property._id}`)
        .set("Authorization", "Bearer " + token)
            .send(updatedProperty)
            .expect(200)
            .expect("Content-Type", /application\/json/);

        const updatedPropertyCheck = await Property.findById(property._id);
        expect(updatedPropertyCheck.price).toBe(updatedProperty.price);
        expect(updatedPropertyCheck.type).toBe(updatedProperty.type);
    });

    it("should return 400 for invalid property ID when PUT /api/properties/:id", async () => {
        const invalidId = "12345";
        await api
            .put(`/api/properties/${invalidId}`)
        .set("Authorization", "Bearer " + token)
            .send({}).expect(400);
    });

    // Test DELETE /api/properties/:id
    it("should delete one property by ID when DELETE /api/properties/:id is called", async () => {
        const property = await Property.findOne();
        await api
            .delete(`/api/properties/${property._id}`)
        .set("Authorization", "Bearer " + token)
            .expect(204);

        const deletedPropertyCheck = await Property.findById(property._id);
        expect(deletedPropertyCheck).toBeNull();
    });

    it("should return 400 for invalid property ID when DELETE /api/properties/:id", async () => {
        const invalidId = "12345";
        await api
            .delete(`/api/properties/${invalidId}`)
        .set("Authorization", "Bearer " + token)
            .expect(400);
    });
});
