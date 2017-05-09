'use strict';

/** A wrapper class of convienience methods around the LocalStorage Interface */
class LocalStorageAPI {
  constructor() {

  }

  isSupported() {
      return window.localStorage;
  }

  setItem(key, value) {
      return localStorage.setItem(key, value);
  }

  getItem(key) {
      return localStorage.getItem(key);
  }

  setObject(key, object) {
      return localStorage.setItem(key, JSON.stringify(object));
  }

  getObject(key) {
      return JSON.parse(localStorage.getItem(key));
  }

  removeItem(key) {
      return localStorage.removeItem(key);
  }

  clearAll() {
      return localStorage.clear();
  }
}
