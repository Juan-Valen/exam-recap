
const users = [
    {
        name: "Alice Johnson",
        username: "alicej",
        password: "$2b$10$abc123hashedpasswordvalue1",
        phone_number: "+14155552671",
        gender: "female",
        date_of_birth: "1990-04-15T00:00:00.000Z",
        role: "admin",
        address: {
            street: "123 Maple Street",
            city: "Springfield",
            state: "Illinois",
            zipCode: "62704"
        }
    },
    {
        name: "Bob Martinez",
        username: "bobmart",
        password: "$2b$10$def456hashedpasswordvalue2",
        phone_number: "+14155552672",
        gender: "male",
        date_of_birth: "1985-09-30T00:00:00.000Z",
        role: "user",
        address: {
            street: "456 Oak Avenue",
            city: "Austin",
            state: "Texas",
            zipCode: "73301"
        }
    }
]

const user = {
    name: "Charlie Kim",
    username: "charliek",
    password: "$2b$10$ghi789hashedpasswordvalue3",
    phone_number: "+14155552673",
    gender: "non-binary",
    date_of_birth: "1995-12-10T00:00:00.000Z",
    role: "moderator",
    address: {
        street: "789 Pine Lane",
        city: "Seattle",
        state: "Washington",
        zipCode: "98101"
    }
}

const properties = [
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
]

module.exports = { users, user, properties };
