const dev = {
    s3: {
        REGION: 'us-west-2',
        BUCKET: 'crowdsourced-image-db-dev-attachmentsbucket-jvrdfg45ql7i'
    },
    apiGateway: {
        REGION: 'us-west-2',
        URL: 'https://xcio0v982k.execute-api.us-west-2.amazonaws.com/dev'
    },
    cognito: {
        REGION: 'us-west-2',
        USER_POOL_ID: 'us-west-2_CDeKAgfgH',
        APP_CLIENT_ID: '5oas5ccodf3gbcqlbtj8cjdmkv',
        IDENTITY_POOL_ID: 'us-west-2:0aab714c-abd1-4933-9cc0-3f35d9b41897'
    }
};

const prod = {
    s3: {
        REGION: 'us-west-2',
        BUCKET: 'crowdsourced-image-db-prod-attachmentsbucket-e2h83ewyfpv9'
    },
    apiGateway: {
        REGION: 'us-west-2',
        URL: 'https://as7hiwjykd.execute-api.us-west-2.amazonaws.com/prod'
    },
    cognito: {
        REGION: 'us-west-2',
        USER_POOL_ID: 'us-west-2_XRMjcLqxG',
        APP_CLIENT_ID: '5e00ccid1fdjnns913q3meokl7',
        IDENTITY_POOL_ID: 'us-west-2:f832ee7a-e1dd-452c-9d6b-b7fd6f42c621'
    }
};

const config = process.env.REACT_APP_STAGE === 'prod'
    ? prod
    : dev;


export default {
    MAX_ATTATCHMENT_SIZE: 5000000,
    ...config
};