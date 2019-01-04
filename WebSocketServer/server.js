/*jshint esversion: 6 */

var app = require('http').createServer();

var io = require('socket.io')(app);

var LoggedUsers = require('./loggedusers.js');

var LoggedCashiers = require('./loggedcashiers.js');
var LoggedCooks = require('./loggedcooks.js');
var LoggedManagers = require('./loggedmanagers.js');
var LoggedWaiters = require('./loggedwaiters.js');

app.listen(8080, function(){
    console.log('listening on *:8080');
});

// ------------------------
// Estrutura dados - server
// ------------------------

// loggedUsers = the list (map) of logged users. 
// Each list element has the information about the user and the socket id
// Check loggedusers.js file

let loggedUsers = new LoggedUsers();

let loggedCashiers = new LoggedCashiers();
let loggedCooks = new LoggedCooks();
let loggedManagers = new LoggedManagers();
let loggedWaiters = new LoggedWaiters();

io.on('connection', function (socket) {
    console.log('Client connected (Socket ID: ' + socket.id + ')');

    // User blocked - Send to blocked user
    socket.on('user_blocked', (message, to) => {
        const userInfoTo = loggedUsers.userInfoByID(to.id);

        console.log(userInfoTo);

        if (userInfoTo) {
            io.to(userInfoTo.socketID).emit('user_blocked', message);
        }
    });

    // User unblocked - Send to unblocked user
    socket.on('user_unblocked', (message, to) => {
        const userInfoTo = loggedUsers.userInfoByID(to.id);

        console.log(userInfoTo);

        if (userInfoTo) {
            io.to(userInfoTo.socketID).emit('user_unblocked', message);
        }
    });

    // New order - Send to cooks
    socket.on('new_order', (messsage, user) => {
        if (user && user.type == 'waiter') {
            io.sockets.to('cooks').emit(messsage);
        }
    });

    // Order prepared - Send to responsible waiter
    socket.on('order_prepared', (order, from, to) => {
        const userInfoTo = loggedWaiters.userInfoByID(to.id);

        if (userInfoTo) {
            io.to(userInfoTo.socket.id).emit('order_prepared', order);
        } else {
            io.to(from.socket.id).emit('responsible_waiter_unavailable', to);
        }
    });

    // Finished meal - Send to cashiers
    socket.on('finished_meal', (messsage, user) => {
        if (user && user.type == 'waiter') {
            io.sockets.to('cashiers').emit(messsage);
        }
    });

    // CHANNELS
    socket.on('user_enter', user => {
        // JOIN WHEN SHIFT STARTS
        if (user) {
            // All users join the global 'channel' to receive notifications in case the account gets blocked/unblocked
            socket.join('global');
            loggedUsers.addUserInfo(user, socket.id);

            if (user.type === 'cashier') {
                socket.join('cashiers');
                loggedCashiers.addUserInfo(user, socket.id);
            }
            
            if (user.type === 'cook') {
                socket.join('cooks');
                loggedCooks.addUserInfo(user, socket.id);
            }
            if (user.type === 'manager') {
                socket.join('managers');
                loggedManagers.addUserInfo(user, socket.id);
            }
            if (user.type === 'waiter') {
                socket.join('waiters');
                loggedWaiters.addUserInfo(user, socket.id);
            }
        }
    });

    socket.on('user_exit', user => {
        // LEAVE ALL WHEN SHIFT ENDS
        if (user) {
            socket.leave('global');

            if(user.type === 'cashier') {
                socket.leave('cashier');
            }
            
            if(user.type === 'cook') {
                socket.leave('cooks');
            }
            
            if(user.type === 'manager') {
                socket.leave('managers');
            }
            
            if(user.type === 'waiter') {
                socket.leave('waiters');
            }
        }
    });
});
