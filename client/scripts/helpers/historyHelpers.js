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
    let url = window.location.href.split('/');
    url.splice(0, 3);
    let newUrl  = '';
    url.map(u => newUrl += `/${u}`);
    console.log('Load content - url: ', url);
    console.log('Load content - new url: ', newUrl);

    // Load data here, then show appropriate page
    app.dataController.getData(() => {

      // If user is loged in, get that data too
      if (readCookie('user_id') && !readCookie('user_id').includes('null')) {
        app.dataController.getUser(readCookie('user_id'), user => {
          console.log('[Get user callback]', newUrl);

          if (newUrl === '/user') {
            app.userController.show();
          }
        });
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

      // else if (newUrl === '/user') {
      //   app.userController.show();
      // }
      else if (newUrl === '/user/login') {
        app.userController.login();
      }
      else if (newUrl === '/user') {
        app.userController.show();
      }

      else {
        app.dashboardController.index();
      }
    });
  } catch (error) {
    console.warn('There was an error loading content', error);
  }
};
