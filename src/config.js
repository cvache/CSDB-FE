export default {
    MAX_ATTATCHMENT_SIZE: 5000000,
    s3: {
        REGION: "us-west-2",
        BUCKET: "cv-notes-app-uploads"
    },
    apiGateway: {
        REGION: 'us-west-2',
        URL: 'https://ukil9y3kzf.execute-api.us-west-2.amazonaws.com/prod'
    },
    cognito: {
        REGION: "us-west-2",
        USER_POOL_ID: "us-west-2_aZXcv3NTU",
        APP_CLIENT_ID: "4p8ehpuob06ddsqe1i8hvmmveh",
        IDENTITY_POOL_ID: "us-west-2:d94f9ab9-f4a5-4461-ad86-2dfc0b8dfff9"
    }
};