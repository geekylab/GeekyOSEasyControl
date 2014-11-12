'use strict';

/**
 * @ngdoc service
 * @name clientApp.settings
 * @description
 * # Settings
 * Factory in the clientApp.
 */
angular.module('clientApp')
    .factory('Settings', function () {
        // Public API here
        return {
            IMAGES_CDN: 'https://github.com/coreos/coreos-vagrant/archive/master.zip',
            LOCAL_IMAGE_ZIP_NAME: 'GeekyOs.zip',
            LOCAL_VAGRANT_DIR_NAME: 'coreos-vagrant-master',
            API_HOST: 'http://menu.geekylab.net:8080',
            LOCAL_API_HOST: 'http://127.0.0.1:3000',
            getUserHome: function () {
                return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
            },
            getGeekyVar: function () {
                return this.getUserHome() + '/.geeky';
            },
            getGeekyOSVagrantRoot: function () {
                //return this.getGeekyVar() + '/' + this.LOCAL_VAGRANT_DIR_NAME;
                return "/home/johna/src/GeekyMenu/GeekyOSVagrant";
            }
        };
    });

angular.module('loginApp')
    .factory('Settings', function () {
        // Public API here
        return {
            IMAGES_CDN: 'https://github.com/coreos/coreos-vagrant/archive/master.zip',
            LOCAL_IMAGE_ZIP_NAME: 'GeekyOs.zip',
            LOCAL_VAGRANT_DIR_NAME: 'coreos-vagrant-master',
            API_HOST: 'http://127.0.0.1:3000',
            getUserHome: function () {
                return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
            },
            getGeekyVar: function () {
                return this.getUserHome() + '/.geeky';
            },
            getGeekyOSVagrantRoot: function () {
                //return this.getGeekyVar() + '/' + this.LOCAL_VAGRANT_DIR_NAME;
                return "/home/johna/src/GeekyMenu/GeekyOSVagrant";
            }
        };
    });
