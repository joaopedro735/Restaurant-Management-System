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
        if (user && user.type == 'waiter') {
            io.sockets.to('cooks').emit('new_order', message);
        }

        //io.sockets.to('cooks').emit('new_order', message);
    });

    // Order prepared - Send to responsible waiter
    socket.on('order_prepared', (message, order) => {
        const userInfoFrom = loggedUsers.userInfoByID(order.responsible_cook_id);
        const userInfoTo = loggedUsers.userInfoByID(order.responsible_waiter_id);

        if (userInfoTo) {
            io.to(userInfoTo.socketID).emit('order_prepared', {message: message, order: order});
        } else {
            let offLineMessage = 'The waiter responsible for the order is offline';
            // Send message to cook who prepared teh order warning waiter is unavailible
            io.to(userInfoFrom.socketID).emit('responsible_waiter_unavailable', offLineMessage);
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

    socket.on('meal_terminated_with_unfinished_orders', (message) => {
        io.to('cooks').emit('remove_unfinished_orders', message);
    });

    socket.on('meal_terminated', () => {
        io.to('cashiers').emit('new_invoice');
    });

    // CHANNELS
    // JOIN
    socket.on('user_enter', user => {
        // JOIN WHEN SHIFT STARTS OR AT LOGIN IF ON SHIFT
        if (user) {
            // All users join the global 'channel' to receive notifications in case the account gets blocked/unblocked
            socket.join('global');
            loggedUsers.addUserInfo(user, socket.id);

            if (user.type === 'cashier') {
                console.log(user.username + ' started shift (joined cashiers channel)');
                socket.join('cashiers');
            }

            if (user.type === 'cook') {
                console.log(user.username + ' started shift (joined cooks channel)');
                socket.join('cooks');
            }
            if (user.type === 'manager') {
                console.log(user.username + ' started shift (joined managers channel)');
                socket.join('managers');
                socket.join('problems');
            }
            if (user.type === 'waiter') {
                console.log(user.username + ' started shift (joined waiters channel)');
                socket.join('waiters');
            }
        }
    });

    // LEAVE
    socket.on('user_exit', user => {
        // LEAVE ALL WHEN SHIFT ENDS OR LOGOUT FROM APP
        if (user) {
            socket.leave('global');

            if(user.type === 'cashier') {
                console.log(user.username + ' ended shift (left cashiers channel)');
                socket.leave('cashiers');
            }

            if(user.type === 'cook') {
                console.log(user.username + ' ended shift (left cooks channel)');
                socket.leave('cooks');
            }

            if(user.type === 'manager') {
                console.log(user.username + ' ended shift (left managers channel)');
                socket.leave('managers');
            }

            if(user.type === 'waiter') {
                console.log(user.username + ' ended shift (left waiters channel)');
                socket.leave('waiters');
            }
        }
    });
    socket.on('begin_shift', function (worker) {
        if (worker !== undefined && worker !== null) {
            console.log("startSocket");
            socket.join('working_' + worker.type);
            socket.emit('shift_started', { msg: "Started working", name: "You"});
        }
    });
    socket.on('shift-end', function (worker) {
        if (worker !== undefined && worker !== null) {
            console.log('endSocket');
            socket.leave('working_' + worker.type);
            loggedUsers.removeUserInfoByID(worker.id);
            socket.emit('shift_ended', { msg: "Stopped working", name: "You" });
        }
    });

    socket.on('problems_Management', (msg, where) => {
        const user = loggedUsers.userInfoBySocketID(socket.id).user;
        io.sockets.to('problems').emit('problems', { msg: msg, name: user.name, where: where});
    });

    socket.on('disconnect', function () {
        console.log("disconnected");
        const user = loggedUsers.removeUserInfoBySocketID(socket.id);
    });
});
