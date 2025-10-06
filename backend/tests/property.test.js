const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app"); // Your Express app
const api = supertest(app);
const Property = require("../models/propertyModel");

const propertys = [
    {
        title: "Florida Condo",
        type: "Condo",
        description: "Condo on top of Florida area.",
        price: 4920,
        location: {
            address: "florida street 1",
            city: "Florida",
            state: "FL",
            zipCode: "00230"
        },
        squareFeet: 1000,
        yearBuilt: 2024
    },
    {
        title: "New York Condo",
        type: "Condo",
        description: "Condo on top of New York area.",
        price: 156730,
        location: {
            address: "new york street 1",
            city: "New York",
            state: "NY",
            zipCode: "00230"
        },
        squareFeet: 1000,
        yearBuilt: 2024
    },
];

describe("Property Controller", () => {
    beforeEach(async () => {
        await Property.deleteMany({});
        await Property.insertMany(propertys);
    });

    afterAll(() => {
        mongoose.connection.close();
    });

    // Test GET /api/propertys
    it("should return all propertys as JSON when GET /api/propertys is called", async () => {
        const response = await api
            .get("/api/propertys")
            .expect(200)
            .expect("Content-Type", /application\/json/);

        expect(response.body).toHaveLength(propertys.length);
    });

    // Test POST /api/propertys
    it("should create a new property when POST /api/propertys is called", async () => {
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
            .post("/api/propertys")
            .send(newProperty)
            .expect(201)
            .expect("Content-Type", /application\/json/);

        const propertysAfterPost = await Property.find({});
        expect(propertysAfterPost).toHaveLength(propertys.length + 1);
        const propertyTitles = propertysAfterPost.map((property) => property.title);
        expect(propertyTitles).toContain(newProperty.title);
    });

    // Test GET /api/propertys/:id
    it("should return one property by ID when GET /api/propertys/:id is called", async () => {
        const property = await Property.findOne();
        await api
            .get(`/api/propertys/${property._id}`)
            .expect(200)
            .expect("Content-Type", /application\/json/);
    });

    it("should return 404 for a non-existing property ID", async () => {
        const nonExistentId = new mongoose.Types.ObjectId();
        await api.get(`/api/propertys/${nonExistentId}`).expect(404);
    });

    // Test PUT /api/propertys/:id
    it("should update one property with partial data when PUT /api/propertys/:id is called", async () => {
        const property = await Property.findOne();
        const updatedProperty = {
            price: 8000,
            type: "House",
        };

        await api
            .put(`/api/propertys/${property._id}`)
            .send(updatedProperty)
            .expect(200)
            .expect("Content-Type", /application\/json/);

        const updatedPropertyCheck = await Property.findById(property._id);
        expect(updatedPropertyCheck.price).toBe(updatedProperty.price);
        expect(updatedPropertyCheck.type).toBe(updatedProperty.type);
    });

    it("should return 400 for invalid property ID when PUT /api/propertys/:id", async () => {
        const invalidId = "12345";
        await api.put(`/api/propertys/${invalidId}`).send({}).expect(400);
    });

    // Test DELETE /api/propertys/:id
    it("should delete one property by ID when DELETE /api/propertys/:id is called", async () => {
        const property = await Property.findOne();
        await api.delete(`/api/propertys/${property._id}`).expect(204);

        const deletedPropertyCheck = await Property.findById(property._id);
        expect(deletedPropertyCheck).toBeNull();
    });

    it("should return 400 for invalid property ID when DELETE /api/propertys/:id", async () => {
        const invalidId = "12345";
        await api.delete(`/api/propertys/${invalidId}`).expect(400);
    });
});
