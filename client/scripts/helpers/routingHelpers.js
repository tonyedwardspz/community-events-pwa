'use strict';

/**
* Attempts to update the view when called when page first loads, to manage
* naughty users arriving via a full url (bookmark etc.). It splits
* the new url in the browser address bar and calls the appropriate action
* @todo Improve this code in some way. It will get messy soon
*/
let loadContent = () => {
  console.log('[Load Content]');
  try {
    // Load data here, then show appropriate page
    app.dataController.getData(() => {
      directURL(getRoutingUrl()[0], getRoutingUrl()[1]);
    });
  } catch (error) {
    console.warn('There was an error loading content', error);
  }
};

let getRoutingUrl = () => {
  let url = window.location.href.split('/');
  url.splice(0, 3);
  let newUrl  = '';
  url.map(u => newUrl += `/${u}`);
  return [url, newUrl];
};


let loadLocalCache = () => {
  console.log('[Cache] Locaing local cache');

  if (app.localStorageAPI.isSupported()) {
    let data = app.localStorageAPI.getObject('cache');

    EventModel.processEventData(data.events);
    Organisation.processOrgData(data.organisations);
    Venue.processVenueData(data.venues);

    directURL(getRoutingUrl()[0], getRoutingUrl()[1]);
  }
};

let directURL = (url, newUrl) => {
  // If user is logged in, get that data too
  if (!app.user) {
    if (readCookie('user_id') && !readCookie('user_id').includes('null')) {
      app.dataController.getUser(readCookie('user_id'), user => {
        console.log('[Get user callback]', newUrl);

        if (newUrl === '/user') {
          app.userController.show();
        }
      });
    }
  }

  // redirect the user to the appropriate view, not that data has loaded
  if(newUrl === '/events'){
    app.eventController.index();
  } else if(newUrl.includes('/events/month')){
    app.eventController.showMonth(url[url.length - 1]);
  } else if(newUrl.includes('/events/tracked')) {
    app.eventController.tracked();
  } else if (newUrl.includes('/event')) {
    app.eventController.show(url[url.length -1]);
  }

  else if (newUrl === '/organisations') {
    app.organisationController.index();
  } else if(newUrl.includes('/organisation')) {
    app.organisationController.show(url[url.length - 1]);
  }

  else if (newUrl === '/user/login') {
    app.userController.login();
  } else if (newUrl === '/user') {
    app.userController.show();
  }

  else {
    app.dashboardController.index();
  }
};
