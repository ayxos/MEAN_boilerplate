var config = {
    ddbb: false,
    domain: {
        url: '', // /htmlEditor
        host: 'http://localhost', // http://DOMAIN.com/htmlEditor
        port: '8007' // null
    },
    env: 'dev', // dev or prod
    mongodb: {
        credentials: '', // username:password@
        host: 'localhost',
        port: ':27017', // :port
        dbName: 'siteName'
    },
    twitter: {
        consumerKey: 'xxx',
        consumerSecret: 'xxx'
    },
    public: {
        siteName: 'siteName',
        siteDescription: 'siteName',
        api: {
            articles: '/articles',
            users: '/users'
        },
        url: {
            authLocal: '/auth/local',
            admin: '/',
        }
    }
};

module.exports = config;