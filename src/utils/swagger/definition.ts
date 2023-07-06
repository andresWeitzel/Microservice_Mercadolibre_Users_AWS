
//FOR SPECIFIC DEFINITION SEE DOC
//https://www.npmjs.com/package/serverless-auto-swagger
{
"http": {
    "path": '/v1/users/id/{id}',
    "method": 'get',
    "cors": true
    "responseData": {
        // response with description and response body
        "200": {
            "description": "dasdaas"
          }

    //     // response with just a description
    //     400: {
    //         description: 'failed Post',
    //     },
    //     // shorthand for just a description
    //     502: 'server error',
    // }
}
}