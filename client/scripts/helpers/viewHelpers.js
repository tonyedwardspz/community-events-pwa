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

/**
* Inserts a new node into the dom after the reference node
* @param {HMTL} newNode The new node to be inserted
* @param {HMTL} referenceNode The point of reference in the dom
*/
let insertAfter = (newNode, referenceNode) => {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
};

/**
* Sets up listeners for various forms.
*/
let formListeners = () => {
  app.shell.addEventListener('click', (e) => {
    if(e.target.id === 'save_user') {
      e.preventDefault();
      app.userController.update();
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

    else if (e.target.id === 'track-event') {
      e.preventDefault();
      app.userController.trackEvent(e.target.getAttribute('data-id'));
    }

    else if (e.target.id === 'untrack-event') {
      e.preventDefault();
      app.userController.untrackEvent(e.target.getAttribute('data-id'));
    }

    else if (e.target.getAttribute('data-action') === 'track-org') {
      e.preventDefault();
      app.organisationController.follow(e.target.getAttribute('data-id'));
    }
  });
};

/**
* Debounce method for preventing multiple sequential calls, used with listeners
* @param {Callback} fn The url to be processed
* @param {String} wait the event / org name for the title attribute
*/
function debounce(fn, wait) {
	let timeout;
	return () => {
		let ctx = this;
    let args = arguments;
		clearTimeout(timeout);
		timeout = setTimeout(function() {
		    fn.apply(ctx, args);
		}, wait || 100);
	};
}

let switchClass = (el, old, nw) => {
  try {
    el.classList.add(nw);
    el.classList.remove(old);
  } catch (e) {
    console.log('Unable to switch css class: ', el);
  }
};
