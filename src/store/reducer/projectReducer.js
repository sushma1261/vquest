const initState = {

    users:[
        {id: "user1", name: "Sushma", password: "123"},
        {id: "user2", name: "Preethi", password: "1234"},
        {id: "user3", name: "Ramya", password: "12345"},
        {id: "user4", name: "Naveena", password: "123456"},
    ]
}

const projectReducer = (state = initState, action) => {
    return state;
}

export default projectReducer;
