'use strict';

/**
* Returns HTML for the provided twitter handle
* @param {String} handle The event / org twitter handle
* @return {String} The HTML string for the link
*/
let twitterLink = (handle) => {
  return `<a href="https://twitter.com/${handle}" target="_blank">https://twitter.com/${handle}</a>`;
};

/**
* Returns HTML for the provided link
* @param {String} url The url to be processed
* @param {String} title the event / org name for the title attribute
* @return {String} The HTML string for the link
*/
let webLink = (url, title) => {
  return `<a href="${url}" target="_blank" title="${title} website">${url}</a>`;
};

let formListeners = () => {
  app.shell.addEventListener('click', (e) => {
    if(e.target.id === 'save_user') {
      e.preventDefault();
      app.userController.update();
    }

    else if (e.target.id ==='edit-profile') {
      console.log('edit-profile');
      e.preventDefault();
      let els = document.querySelectorAll('input');
      els.forEach(elm => {
        elm.disabled = false;
      });
      document.getElementById('edit-profile').classList += ' disabled';
    }

    else if (e.target.id === 'update-profile') {
      console.log('update hit');
      e.preventDefault();
      let el = document.getElementById('popover');
      el.parentNode.removeChild(el);
      app.userController.show(app.user);
    }

    else if (e.target.id === 'show-map') {
      e.preventDefault();
      app.eventController.showMapEmbed(e.target.getAttribute('data-id'));
    }
  });
};
