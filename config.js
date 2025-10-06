// Configuration file for the TaskFlow application
const config = {
    // Server configuration
    server: {
        port: process.env.PORT || 3000,
        host: process.env.HOST || 'localhost'
    },
    
    // API configuration
    api: {
        baseUrl: process.env.API_BASE_URL || `http://localhost:${process.env.PORT || 3000}/api`,
        timeout: 10000, // 10 seconds
        retries: 3
    },
    
    // Frontend configuration
    frontend: {
        title: 'TaskFlow - Sistema de Gerenciamento',
        version: '1.0.0',
        theme: {
            primaryColor: '#6366f1',
            secondaryColor: '#64748b',
            successColor: '#10b981',
            warningColor: '#f59e0b',
            errorColor: '#ef4444'
        }
    },
    
    // Development configuration
    development: {
        enableCORS: true,
        enableLogging: true,
        enableHotReload: process.env.NODE_ENV !== 'production'
    }
};

module.exports = config;