/*jshint esversion: 6 */

var app = require('http').createServer();
var io = require('socket.io')(app);
var LoggedUsers = require('./loggedusers.js');


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

    // New order - Send to all cooks
    socket.on('new_order', (message, user) => {
        /* if (user && user.type == 'waiter') {
            io.sockets.to('cooks').emit('new_order', message);
        } */

        io.sockets.to('cooks').emit('new_order', message);
    });

    // Order prepared - Send to responsible waiter
    socket.on('order_prepared', (order, from, to) => {
        const userInfoFrom = loggedUsers.userInfoByID(from.id);
        const userInfoTo = loggedUsers.userInfoByID(to.id);

        if (userInfoTo) {
            io.to(userInfoTo.socket.id).emit('order_prepared', order);
        } else {
            // Send message to cook who prepared teh order warning waiter is unavailible
            io.to(userInfoFrom.socket.id).emit('responsible_waiter_unavailable', to);
        }
    });

    // Finished meal - Send to all cashiers
    socket.on('finished_meal', (message, user) => {
        if (user && user.type == 'waiter') {
            io.sockets.to('cashiers').emit('finished_meal', message);
        }
    });

    // Message to working managers
    socket.on('message_to_managers', (message, from) => {
        const userInfoFrom = loggedUsers.userInfoByID(from.id);

        if (userInfoFrom) {
            // Emit with message and user who sent the message
            io.sockets.to('managers').emit('message_to_managers', message, from);
        }
    });

    // CHANNELS
    // JOIN
    socket.on('user_enter', user => {
        // JOIN WHEN SHIFT STARTS
        if (user) {
            // All users join the global 'channel' to receive notifications in case the account gets blocked/unblocked
            socket.join('global');
            loggedUsers.addUserInfo(user, socket.id);

            if (user.type === 'cashier') {
                console.log("Connected to cashiers ");
                socket.join('cashiers');
            }
            
            if (user.type === 'cook') {
                console.log("Connected to cooks");
                socket.join('cooks');
            }
            if (user.type === 'manager') {
                console.log("Connected to managers");
                socket.join('managers');
                socket.join('problems');
            }
            if (user.type === 'waiter') {
                console.log("Connected to waiters");
                socket.join('waiters');
            }
        }
    });

    // LEAVE
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

    socket.on('problems_Management', (msg, user) => {
        io.sockets.to('problems').emit('problems', { msg: msg, name: user.name});
    });
});
