const dev = {
    s3: {
        REGION: 'us-west-2',
        BUCKET: 'notes-app-2-api-dev-attachmentsbucket-1g3vc0lyemlpu'
    },
    apiGateway: {
        REGION: 'us-west-2',
        URL: 'https://nuweyjuh71.execute-api.us-west-2.amazonaws.com/dev'
    },
    cognito: {
        REGION: 'us-west-2',
        USER_POOL_ID: 'us-west-2_NIy0K9EKo',
        APP_CLIENT_ID: '6t45hmcb5mv7pdpgpgnrob8k9i',
        IDENTITY_POOL_ID: 'us-west-2:4d27308c-ea44-4df0-b13e-2219e2c27fb2'
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