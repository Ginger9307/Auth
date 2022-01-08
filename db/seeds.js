const db = connect("mongodb://localhost:27017/studyJWT");

db.users.drop();

db.users.insertMany([
    { name: "Pochi", age: 10, favouriteSnack: "antimatter" },
    { name: "Mitzi", age: 2, temperament: "moody" }
])
