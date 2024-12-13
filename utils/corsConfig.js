const corsOptions = {
    origin: [
      'http://localhost:5173', 
      'http://localhost:3000'   
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  };
  
  module.exports = corsOptions;