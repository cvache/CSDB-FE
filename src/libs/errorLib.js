export function onError(error) {
    console.log(error)
    let message = error.toString();

    if (!(error instanceof Error) && error.message) {
        message = error.message;
    }

    alert(message);
}