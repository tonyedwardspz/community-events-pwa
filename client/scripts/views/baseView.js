'use strict';

/** Class containing common functionality that others can inherit */
class BaseView {
  constructor(){

  }

  offlineMessage(msg){
    return `<p class='offlien-message'>App currently working offline. Please
            connect to the network before you ${msg}.</p>`;
  }
}
