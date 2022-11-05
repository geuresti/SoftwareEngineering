export default class MockUserDao{
    create(userdata){
        userdata._id = 1;
        return userdata;
        //Save the user data into the DB
    }
    read(id){
        return null;
    }
    readBy(criteria){
        if(criteria.login === 'test@loyola.edu'){
            return {name:'Test User', login:'test@loyola.edu'};
        }
        return null;
    }
}