const tokens = {
    accessToken: "abcd",
}

function onApiError(err) {
    // TODO: handle api error here
    console.error(err)
    throw err
}

async function post(url, payload = {}) {
    return fetch(url, {
        method: "POST",
        headers: {
            Apikey: tokens.accessToken,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    }).then((res) => res.json())
}

async function get(url) {
    return fetch(url)
        .then((response) => response.json())
        .catch(onApiError)
}

export default {
    get: get,
    post: post,
}
