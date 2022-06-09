// users-module // 



let id = 0;

function getId() {
    return ++id
}

const users = [
    { id: getId(), name: 'Frodo Baggins', username: "fodo", password: "baggins" },
    { id: getId(), name: 'Samwise Gamgee', username: "samwise", password: "gamgee" },
    { id: getId(), name: 'Meriadoc Brandybuck', username: "meriadoc", password: "brandybuck" },
    { id: getId(), name: 'Peregrin Took', username: "Peregrin", password: "Took" },
    { id: getId(), name: 'Mithrandir', username: "Mithrandir", password: "Mithrandir" },
    { id: getId(), name: 'Boromir', username: "Boromir", password: "Boromir" },
    { id: getId(), name: 'Legolas', username: "Legolas", password: "Legolas" },
    { id: getId(), name: 'Gimli', username: "Gimli", password: "Gimli" },
    { id: getId(), name: 'Aragorn', username: "Aragorn", password: "Aragorn" },
];

// ARE THESE CORRECT MODULES?

module.exports = {

    async findAll() {
        return users
    },

    async findById(id) {
        const user = users.find(u => u.id == id)
        return user
    },

    async add({ name, username, password }) {
        const newUser = { id: getId(), name, username, password }
        users.push(newUser)
        return newUser
    },
}