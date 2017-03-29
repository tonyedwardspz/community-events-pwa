'use strict';


/**
* Attempts to update the view when called when page first loads, to manage
* naughty users arriving via a full url (bookmark etc.). It splits
* the new url in the browser address bar and calls the appropriate action
* @todo Improve this code in some way. It will get messy soon
*/
let loadContent = () => {
  try {
    let url = window.location.href.split('/');
    console.log('Load content - url: ', url);
    console.log(url[3]);

    if (url[3] === 'event'){
      app.eventController.show(url[4]);
    } else if (url[3] === 'events') {
      app.eventController.index();
    } else {
      app.dashboardController.index();
    }

  } catch (error) {
    console.warn('There was an error loading content', error);
  }
};
