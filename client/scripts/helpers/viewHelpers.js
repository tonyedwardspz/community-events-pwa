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
  });
};
