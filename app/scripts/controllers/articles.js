'use strict';

/**
 * @ngdoc function
 * @name wriApp.controller:articlesCtrl
 * @description
 * # articlesCtrl
 * Controller of the wriApp
 */
angular.module('wriApp')
    .controller('articlesCtrl', function ($scope, Articles, $rootScope) {
        
        var ctrl = this;
        $scope.selectedElementType = "article";
        $scope.selectedElement = null;
        $scope.viewerOpen = true;

        ctrl.showModale;

        (ctrl.init = function() {
            // Will load the data directly from the database
            Articles.getAll().then(function(articles) {
                ctrl.articles = articles;
                console.log(articles);
            });
        })();

        ctrl.addModale = function(name){
            ctrl.showModale = true;
        }

        ctrl.addArticle = function(name){
            var promptToUser = prompt("What is the name of your article ?");
            Articles.create({'name': promptToUser}).then(function(element){
                console.log(element);
                ctrl.init();
            });
        }
        
        ctrl.deleteArticle = function() {
            Articles.delete(29).then(function(el){
                ctrl.init();
            });
        }

        ctrl.sendArticle = function(article) {
          $scope.selectedElement = article;
          $scope.viewerOpen = false;
          console.log($scope.selectedElement);
        }

        $rootScope.$on('closeViewer', function() {
          $scope.viewerOpen = true;
        })
    });
