module.exports = {
  apps : [{
    name: 'Websocket Server',
    script: 'server.js',

    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    production : {
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
