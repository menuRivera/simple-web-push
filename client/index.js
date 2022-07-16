if (navigator.serviceWorker) {
    fetch('http://localhost:5000/api/vapid-public-key')
        .then(function (res) {
            res.json().then(function (data) {
                registerPush(data.key);
            });
        });
}


function registerPush(appPubkey) {
    navigator.serviceWorker.register('service-worker.js');
    navigator.serviceWorker.ready
        .then(function (registration) {
            return registration.pushManager.getSubscription()
                .then(function (subscription) {
                    if (subscription) return subscription

                    return registration.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: urlBase64ToUint8Array(appPubkey)
                    });
                })
                .then(function (subscription) {
                    return fetch('http://localhost:5000/api/subscription', {
                        method: 'post',
                        headers: { 'Content-type': 'application/json' },
                        body: JSON.stringify({ subscription: subscription })
                    }).then(res => console.log(res));
                });
        });
}

function urlBase64ToUint8Array(base64String) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
}