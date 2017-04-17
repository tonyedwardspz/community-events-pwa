'use strict';

class BaseView {
  constructor(){

  }

  offlineMessage(msg){
    return `<p class='offlien-message'>App currently working offline. Please
            connect to the network before you ${msg}.</p>`;
  }

  static footer() {
    return `<footer><p>This is the footer</p></footer>`;
  }
}
