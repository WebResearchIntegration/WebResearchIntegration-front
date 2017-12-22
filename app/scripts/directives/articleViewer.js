'use strict';

/**
 * @ngdoc directive
 * @name wriApp.directive:articleViewer
 * @description
 * # articleViewer
 */
angular.module('wriApp')
  .directive('articleViewer', articleViewerDirective);

function articleViewerDirective() {
  return {
    restrict: 'E',
    templateUrl: '/views/directives/article-viewer.html',
    scope: {
      article: '='
    },
    bindToController: true,
    controllerAs: 'articleViewer',
    controller: articleViewerCtrl
  };  
}

function articleViewerCtrl($rootScope, $scope) {

  var ctrl = this;

  // [PUBLIC VARIABLES]
    // All attributes are binded after $onInit(). They will be accessible as ctrl.[attributeName]
    ctrl.showAbstract;      // boolean to know if we show abstract or not
    ctrl.showProbSoluce;    // boolean to know if we show problematic and soluce or not
    
  // [INIT]
    // ctrl.$onInit = onInit; /* Angular 1.5+ does not bind attributes until calling $onInit() */

    // [PUBLIC METHODS]
    ctrl.applyKeywordFilter = applyKeywordFilter;
    ctrl.loadArticle = loadArticle;
    ctrl.showReference = showReference;
    ctrl.toggleAbstract = toggleAbstract;
    ctrl.turnEditMode = turnEditMode;
  
  ////////////

  // [METHODS : begin]
    /**
     * @name applyKeywordFilter
     * @desc Will load article in viewer
     * @param {String}  keyword   article to load in article viewer
     * @memberOf Directives.articleViewer
     */
    function applyKeywordFilter(keyword){
      console.log("apply filter keywords on articles : ", keyword);
    }
    /**
     * @name loadArticle
     * @desc Will load article in viewer
     * @param {Object}  article   article to load in article viewer
     * @memberOf Directives.articleViewer
     */
    function loadArticle(article) {
      
      // Main informations
      if(!_.isEmpty(article.problematic) && !_.isEmpty(article.problematic)){
        ctrl.showProbSoluce = true;
        ctrl.showAbstract = false;
      }
      else {
        ctrl.showProbSoluce = false;
        ctrl.showAbstract = true;
      }
      
      // References
      if(!_.isArray(ctrl.article.references)){
        transformIntoArr(ctrl.article.references);
      }
    }
    
    /**
     * @name showReference
     * @desc Will load the reference in the second viewer in readonly mode
     * @param {Object}  article   article to load in second viewer
     * @memberOf Directives.articleViewer
     */
    function showReference(article) {
      console.log("send reference to second viewer", article);
    }
    
    /**
     * @name toggleAbstract
     * @desc Will toggle abstract in the viewer
     * @memberOf Directives.articleViewer
     */
    function toggleAbstract() {
      ctrl.showAbstract = !ctrl.showAbstract;
    }
    
    /**
     * @name turnEditMode
     * @desc Will turn on edit mode for article
     * @memberOf Directives.articleViewer
     */
    function turnEditMode() {
      console.log("edit :" , ctrl.article);
    }
    

    /**
     * @name sendEnableReferenceEdition
     * @desc Will turn on selector mode for references of the article
     * @memberOf Directives.articleViewer
     */
    $scope.sendEnableReferenceEdition = function() {
      console.log("selection mode on");
      $rootScope.$emit('enableReferenceModeOn');
    };
  // [METHODS : end]

  // [PRIVATE FUNCTIONS : begin]
    /**
     * @name transformIntoArr
     * @desc Will update article property passed as param into an array
     * @param {Object}  property   property to transform into an array
     * @param {Boolean}  onlyObject   check if the current property has to be an object
     * @memberOf Directives.articleViewer
     */
    function transformIntoArr(property, onlyObject) {
      onlyObject = onlyObject || false;
      var returnArr = [];
      if (!_.isEmpty(property)){
        if (onlyObject && _.isObject(property)){
          returnArr.push(property);
        }
        else if (!onlyObject){
          returnArr.push(property);
        }
      }
      property = returnArr;
    }
  // [PRIVATE FUNCTIONS : end]

  // [EVENTS]
    $scope.$watch( function(){
      return ctrl.article;
    }, function(newArticle, previousArticle){
      if (ctrl.article != null){
        loadArticle(ctrl.article);
      }
    }, true);
}