import {
    addNewContact,
    getContact,
    getContactWithId,
    updateContact,
    deleteContact
} from '../controllers/crmController'
import {
    login,
    registration,
    loginrequired
} from '../controllers/userControllers'
const routes = (app) => {
    app.route('/contact')
        .get((req, res, next) => {
            //Middleware use a third party
            console.log(`Request from: ${req.originalUrl}`)
            console.log(`Request type: ${req.method} `)
            next()
        }, loginrequired, getContact)

        // post endpoint
        .post(loginrequired, addNewContact);

    app.route('/contact/:contactID')

        //get specific contact with id key
        .get(loginrequired, getContactWithId)

        //modefily specific contact with id key
        .put(loginrequired, updateContact)

        //delete specific contact with id key
        .delete(loginrequired, deleteContact)
    // registration route
    app.route('/auth/register')
        .post(registration)
    //login route
    app.route('/login')
        .post(login) 
}
export default routes;