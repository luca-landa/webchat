//channel is the ruby subscription class to require
App.room = App.cable.subscriptions.create({channel: "RoomChannel", room: 5}, {
    connected: onConnected,
    disconnected: onDisconnected,
    received: onReceived,
    speak: onSpeak
});

$(document).on('keypress', '#chat-textfield', (event) => {
    if (event.keyCode === 13) {
    App.room.speak(event.target.value);
    event.target.value = '';
    event.preventDefault();
}
});

function onConnected() {

}

function onDisconnected() {

}

function onReceived(data) {
    $('#messages').append('<p>' + data['message'] + '</p>')
}

function onSpeak(message) {
    return this.perform('speak', {
        message: message
    });
}