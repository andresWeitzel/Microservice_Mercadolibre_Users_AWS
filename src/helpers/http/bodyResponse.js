
const requestSuccessful = async (message, input) => {
    return {
        statusCode: 200,
        body: JSON.stringify(
            {
                message: message,
                input: input,
            },
            null,
            2
        ),
    };
}

module.exports = { requestSuccessful }