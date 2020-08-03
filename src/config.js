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
        BUCKET: 'notes-app-2-api-prod-attachmentsbucket-gdmu222gnqeg'
    },
    apiGateway: {
        REGION: 'us-west-2',
        URL: 'https://lbu9yishii.execute-api.us-west-2.amazonaws.com/prod'
    },
    cognito: {
        REGION: 'us-west-2',
        USER_POOL_ID: 'us-west-2_KRQlBFfk6',
        APP_CLIENT_ID: '2nm4944db8ps6jugovadsm9faj',
        IDENTITY_POOL_ID: 'us-west-2:0a84d65d-20b2-4936-9d1c-8a7b1018ad76'
    }
};

const config = process.env.REACT_APP_STAGE === 'prod'
    ? prod
    : dev;


export default {
    MAX_ATTATCHMENT_SIZE: 5000000,
    ...config
};