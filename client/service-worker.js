self.addEventListener('push', function (event) {
    console.log('PUSH');
    console.log(event);
    event.waitUntil(
        registration.showNotification('SAMPLE TITLE', {
            body: event.data ? event.data.text() : 'no payload',
            // icon: 'icon.png',
        })
    );
});

self.addEventListener('notificationclick', function (event) {
    event.notification.close();
    // event.waitUntil(clients.openWindow('weather/advisory'));
});