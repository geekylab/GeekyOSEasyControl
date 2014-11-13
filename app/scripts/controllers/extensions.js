'use strict';

/**
 * @ngdoc function
 * @name geekyOsApp.controller:ExtensionsCtrl
 * @description
 * # ExtensionsCtrl
 * Controller of the geekyOsApp
 */
angular.module('clientApp')
    .controller('ExtensionsCtrl', function ($scope,
                                            Settings,
                                            DockerApi,
                                            alertService) {
        $scope.logs = [];
        $scope.containers = [];
        $scope.isGeekyOSInstalled = true;
        $scope.geekyOSStatus = false;
        $scope.checkGeekyOSStatusFlg = false;

        var fs = require('fs');
        var unzip = require('unzip');
        var exec = require('child_process').exec;
        var geekyVar = Settings.getGeekyVar();
        var installFile = geekyVar + '/installed';

        if (!fs.existsSync(installFile)) {
            $scope.isGeekyOSInstalled = false;
        }

        $scope.$watch('geekyOSStatus', function (status) {
            if (status) {
                if ($scope.isGeekyOSInstalled) {
                    $scope.refreshContainer();
                }
            }
        });

        $scope.refreshContainer = function () {
            DockerApi.listContainers()
                .success(function (data) {
                    $scope.containers = data;
                    console.debug(data);
                })
                .error(function () {
                    alertService.add('danger', 'Error : Cant get container list');
                });
        };


        //Container manager
        $scope.startContainer = function (container) {
            DockerApi.startContainer(container.Id)
                .success(function () {
                    $scope.refreshContainer();
                    alertService.add('success', 'Container started');
                })
                .error(function () {
                    alertService.add('danger', 'Container start error');
                    $scope.refreshContainer();
                });
        };

        $scope.stopContainer = function (container) {
            DockerApi.stopContainer(container.Id)
                .success(function () {
                    alertService.add('success', 'Container stoped');
                    $scope.refreshContainer();
                })
                .error(function () {
                    alertService.add('success', 'Container stop error');
                    $scope.refreshContainer();
                });
        };

        $scope.logsContainer = function (container) {
            $scope.logs = [];
            DockerApi.logsContainer(container.Id)
                .success(function (response) {
                    $scope.logs = response.split("\n");
                })
                .error(function () {
                    alertService.add('danger', 'Cant open container log');
                });
        };


        //Vagrant geekyOS install

        $scope.installGeekyOSOK = false;
        $scope.isInstalling = false;
        $scope.dependsSoft = [
            {name: 'Vagrant', version: '1.6 or newer', status: 0},
            {name: 'Virtualbox', version: '4.3 or newer', status: 0}
        ];


        var addLog = function (msg, replaceFlg) {
            if (replaceFlg) {
                var lastKey = $scope.logs.length - 1;
                $scope.logs[lastKey] = msg;
                $scope.$apply();
            } else {
                $scope.logs.push(msg);
            }
        };

        var runVagrant = function () {
            var projectPath = Settings.getGeekyOSVagrantRoot();
            var spawn = require('child_process').spawn,
                vagrant = spawn('vagrant', ['up'], {cwd: projectPath});

            vagrant.stdout.on('data', function (data) {
                addLog(data.toString('UTF-8'));
                $scope.$apply();
            });

            vagrant.stderr.on('data', function (data) {
                console.log('stderr: ' + data);
                addLog(data.toString('UTF-8'));
                $scope.$apply();
//                checkDockerApiRunning();
            });

            vagrant.on('close', function (code) {
                if (code == 0) {
                    addLog("start GeekyOS DONE!!! :)");
                } else {
                    addLog('err code' + code)
                }
                $scope.$apply();
            });

        };

        var unzipGeekyOs = function (geekyOSzipFile, outputPath) {
            if (fs.existsSync(geekyOSzipFile)) {
                fs.createReadStream(geekyOSzipFile)
                    .pipe(unzip.Extract({path: outputPath}))
                    .on('close', function () {
                        fs.openSync(outputPath + '/installed', 'w');
                        addLog('Starting GeekyOS.....');
                        $scope.$apply();
                        //runVagrant();
                    });
            }
        };

        $scope.checkedCount = 1;
        $scope.checkSoftWares = function () {
            var checkVagrantCommand = "vagrant -v | grep -w '1.[6-9]' 2>&1 >/dev/null";

            $scope.dependsSoft[0].status = 99;
            var child = exec(checkVagrantCommand, function (err, stdout, stderr) {
                if (!err) {
                    $scope.dependsSoft[0].status = 1;
                } else {
                    $scope.dependsSoft[0].status = 2;
                }
                $scope.$apply();
                $scope.checkedCount++;
            });


            var checkVBoxCommand = "VBoxManage -v | grep -w '4\.[3-9]' 2>&1 >/dev/null";
            $scope.dependsSoft[1].status = 99;
            var child = exec(checkVBoxCommand, function (err, stdout, stderr) {
                if (!err) {
                    $scope.dependsSoft[1].status = 1;
                } else {
                    $scope.dependsSoft[1].status = 2;
                }
                $scope.$apply();
                $scope.checkedCount++;
            });
        };

        $scope.$watch('checkedCount', function (v) {
            if (v == $scope.dependsSoft.length) {
                var isOK = true;
                angular.forEach($scope.dependsSoft, function (soft) {
                    if (soft.status != 1) {
                        isOK = false;
                    }
                });

                if (isOK) {
                    $scope.installGeekyOSOK = true;
                }
            }
        });

        $scope.checkSoftWaresClass = function (soft) {
            return {
                'list-group-item-success': soft.status == 1,
                'list-group-item-danger': soft.status == 2
            }
        };

        $scope.installGeekyOs = function () {
            $scope.isInstalling = true;
            $scope.logs = [];
            var request = require('request');
            var path = Settings.getGeekyVar();
            var downloadUrl = Settings.IMAGES_CDN;

            if (!fs.existsSync(path)) {
                addLog('Create geeky os base path....');
                fs.mkdirSync(path);
            }

            //todo : check is install
            if ($scope.isGeekyOSInstalled) {
                return addLog('Already installed');
            }


            // output
            var outFile = fs.createWriteStream(path + '/' + Settings.LOCAL_IMAGE_ZIP_NAME);

            // ダウンロード開始
            addLog('Start to download GeekyOS file');
            var fileSize = 0;
            request
                .get(downloadUrl)
                .on('response', function (response) {
                    console.log(response.statusCode) // 200
                    console.log(response.headers['content-type']) // 'image/png'

                    var filesize = response.headers['content-length'];
                    var total = 0;
                    addLog(total + '/' + filesize);
                    response.on('data', function (data) {
                        // compressed data as it is received
                        console.log('received ' + data.length + ' bytes of compressed data');
                        total += data.length;
                        addLog(total + '/' + filesize, true);
                    });

                    response.on('close', function (err) {
                        console.log("end");
                        addLog('Download Done!');
                    });

                })
                .pipe(outFile)
                .on('close', function (err) {
                    addLog('Download Done!');

                    addLog('Preparing GeekyOS ....');
                    $scope.$apply();
                    unzipGeekyOs(path + '/' + Settings.LOCAL_IMAGE_ZIP_NAME, path);
                });
        };

        //vagrant start
        $scope.checkGeekyOSStatus = function () {
            $scope.checkGeekyOSStatusFlg = true;
            var command = "vagrant status";
            var targetPath = Settings.getGeekyOSVagrantRoot();

            var child = exec(command, {cwd: targetPath}, function (err, stdout, stderr) {
                if (!err) {
                    console.log(stdout);
                    console.log(stdout.indexOf("running") != -1);
                    $scope.geekyOSStatus = stdout.indexOf("running") != -1;
                } else {
                    console.log("ng")
                    console.log(err);
                }
                $scope.$apply($scope.checkGeekyOSStatusFlg = false);
            });
        };

        $scope.checkGeekyOSStatus();

        $scope.startGeekyOS = function () {
            $scope.logs = [];
            var targetPath = Settings.getGeekyOSVagrantRoot();
            var spawn = require('child_process').spawn,
                vagrant = spawn('vagrant', ['up'], {cwd: targetPath});

            vagrant.stdout.on('data', function (data) {
                console.log(data.toString('UTF-8'));
                addLog(data.toString('UTF-8'));
                $scope.$apply();
            });

            vagrant.stderr.on('data', function (data) {
                console.log("error");
                addLog(data.toString('UTF-8'));
                $scope.$apply();
            });

            vagrant.on('close', function (code) {
                $scope.checkGeekyOSStatus();
            });
        };

        $scope.stopGeekyOS = function () {
            console.log("stop geeky os");
            var targetPath = Settings.getGeekyOSVagrantRoot();
            var spawn = require('child_process').spawn,
                vagrant = spawn('vagrant', ['halt'], {cwd: targetPath});

            vagrant.stdout.on('data', function (data) {
                addLog(data.toString('UTF-8'));
                $scope.$apply();
            });

            vagrant.stderr.on('data', function (data) {
                console.log("error");
                console.log(data.toString('UTF-8'));

            });

            vagrant.on('close', function (code) {
                $scope.checkGeekyOSStatus();
            });
        };

    })
    .controller('PluginsCtrl', function ($scope, $http, Settings) {
        var url = Settings.LOCAL_API_HOST + '/plugins';

        $scope.plugins = [];

        $http.get(url)
            .success(function (res) {
                $scope.plugins = res;
            });

        $scope.executePlugin = function (btn) {
            var url = Settings.LOCAL_API_HOST + btn.link;
            $http.get(url).
                success(function (data, status, headers, config) {
                    if (data.status) {
                        alert(data.message);
                    }
                })
                .error(function (data, status, headers, config) {
                    console.log("Sync Error");
                });
        };

    });
