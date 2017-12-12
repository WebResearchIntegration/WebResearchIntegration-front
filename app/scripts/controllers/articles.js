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
        
        // [DECLARED $scope VARIABLES]
        $scope.selectedElementType = "article";
        $scope.selectedElement = null;
        $scope.viewerClosed = true;
        $scope.isModeSelectionArticleOn = false;
        $scope.articlesList = [];
        // [END DECLARED $scope VARIABLES]

        ctrl.showModale;

        /**
         * Init method on load of the controller.
         * Will load all articles from the database.
         */
        (ctrl.init = function() {
            // Will load the data directly from the database
            Articles.getAll().then(function(articles) {
                ctrl.articles = articles;
                console.log(articles);
            });
        })();

        /**
         * Show modale by turning the controller value to true.
         */
        ctrl.addModale = function(name){
            ctrl.showModale = true;
        }

        /**
         * Create an article inside the list and refresh the list of articles.
         * @param {String} name the name of the created article
         */
        ctrl.addArticle = function(name){
            var promptToUser = prompt("What is the name of your article ?");
            Articles.create({'name': promptToUser}).then(function(element){
                console.log(element);
                ctrl.init();
            });
        }
        
        /**
         * Will delete an article by giving the right id.
         * @param {Number} id the correponsding of the database.
         */
        ctrl.deleteArticle = function(id) {
            Articles.delete(29).then(function(el){
                ctrl.init();
            });
        }

        /**
         * Two cases are available for this method.
         * Will send the article to the directive.
         * Send the article to the list of selected elements if selection mode is on.
         * @param {Article} article article from the array got from the database.
         */
        ctrl.sendArticle = function(article) {
            if($scope.isModeSelectionArticleOn) {
                article.isSelectedForReference = true;
                $scope.articlesList.push(article);
                console.log($scope.articlesList)
            } else {
                $scope.selectedElement = article;
                $scope.viewerClosed = false;
                console.log($scope.selectedElement);
            }
        }

        /**
         * Will enable the selection article reference mode on.
         */
        ctrl.enableModeSelectionArticle = function() {
            $scope.isModeSelectionArticleOn = true;
        }

        /**
         * will disable the selection article reference mode on.
         */
        ctrl.disableModeSelectionArticle = function() {
            $scope.isModeSelectionArticleOn = false;
            $scope.articlesList = [];
            ctrl.articles.forEach(element => {
                delete element.isSelectedForReference;
            });
        }

        /**
         * Will save references and send it to the back end side of the applciation.
         */
        ctrl.saveReferences = function() {
            if(!Array.isArray($scope.selectedElement.references)) {
                $scope.articlesList.push($scope.selectedElement.references);
                $scope.selectedElement.references = $scope.articlesList;
                ctrl.disableModeSelectionArticle();
                Articles.updateById($scope.selectedElement.id, $scope.selectedElement, function(updatedArticle) {
                    ctrl.init();
                });
            } else {
                $scope.selectedElement.references = $scope.selectedElement.references.concat($scope.articlesList);
                ctrl.disableModeSelectionArticle();
                Articles.updateById($scope.selectedElement.id, $scope.selectedElement, function(updatedArticle) {
                    ctrl.init();
                });
            }
        }

        /**
         * Will listen an event from children.
         * When triggered will open the viewer.
         * @event closeViewer
         */
        $rootScope.$on('closeViewer', function() {
          $scope.viewerClosed = true;
        });

        /**
         * Will listen an event from children.
         * When triggered will enable the reference mode on.
         * @event enableReferenceModeOn
         */
        $rootScope.$on('enableReferenceModeOn', function() {
            $scope.isModeSelectionArticleOn = true;
        });
    });
