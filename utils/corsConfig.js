const corsOptions = {
    origin: [
      'http://localhost:5173',  // Vite frontend
      'http://localhost:3000'   // Express backend
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  };
  
  module.exports = corsOptions;