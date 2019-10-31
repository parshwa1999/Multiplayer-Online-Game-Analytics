define([
  '../../windows/in-game/in-game-view.js',
  '../../scripts/services/hotkeys-service.js'
], function (
  InGameView,
  HotkeysService
  ) {

  class InGameController {

    constructor() {
      this.inGameView = new InGameView();

      this._gameEventHandler = this._gameEventHandler.bind(this);
      this._infoUpdateHandler = this._infoUpdateHandler.bind(this);
      this._eventListener = this._eventListener.bind(this);
      this._updateHotkey = this._updateHotkey.bind(this);
    }

    run() {
      // listen to events from the event bus from the main window,
      // the callback will be run in the context of the current window
      let mainWindow = overwolf.windows.getMainWindow();
      mainWindow.ow_eventBus.addListener(this._eventListener);

      // Update hotkey view and listen to changes:
      this._updateHotkey();
      HotkeysService.addHotkeyChangeListener(this._updateHotkey);
    }

    async _updateHotkey() {
      const hotkey = await HotkeysService.getToggleHotkey();
      this.inGameView.updateHotkey(hotkey);
    }

    _eventListener(eventName, data) {
      switch (eventName) {
        case 'event': {
          this._gameEventHandler(data);
          break;
        }
        case 'info': {
          this._infoUpdateHandler(data);
          break;
        }
      }
    }

    // Logs events
    _gameEventHandler(event) {
      let isHightlight = false;
      // switch (event.name) {
      //   case 'kill':
      //   case 'death':
      //   case 'matchStart':
      //   case 'matchEnd':
      //     isHightlight = true;
      // }
      
      this.inGameView.logEvent(JSON.stringify(event), isHightlight);
      // // 1. Create a new XMLHttpRequest object
      // let xhr = new XMLHttpRequest();

      // // 2. Configure it: GET-request for the URL /article/.../load
      // xhr.open('GET', 'http://10.20.24.24:3000/posts');

      // // 3. Send the request over the network
      // xhr.send();

      // // 4. This will be called after the response is received
      // xhr.onload = function() {
      //   if (xhr.status != 200) { // analyze HTTP status of the response
      //     alert(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
      //   } else { // show the result
      //     alert(`Done, got ${xhr.response.length} bytes`); // responseText is the server
      //   }
      // };

      // xhr.onprogress = function(event) {
      //   if (event.lengthComputable) {
      //     alert(`Received ${event.loaded} of ${event.total} bytes`);
      //   } else {
      //     alert(`Received ${event.loaded} bytes`); // no Content-Length
      //   }

      // };

      // xhr.onerror = function() {
      //   alert("Request failed");
      // };
      let xhr = new XMLHttpRequest();

      let json = JSON.stringify(event);

      xhr.open("POST", 'http://10.20.24.24:3000/posts');
      xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

      xhr.send(json);
      console.log("ERT");
    }

    // Logs info updates
    _infoUpdateHandler(infoUpdate) {

      this.inGameView.logInfoUpdate(JSON.stringify(infoUpdate), false);
      let xhr = new XMLHttpRequest();

      let json = JSON.stringify(event);

      xhr.open("POST", 'http://10.20.24.24:3000/posts');
      xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

      xhr.send(json);
      console.log("ERT3");
    }
  }


  return InGameController;
});
