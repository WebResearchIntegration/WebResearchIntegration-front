'use strict';

/**
 * @ngdoc function
 * @name wriApp.controller:authorsCtrl
 * @description
 * # authorsCtrl
 * Controller of the wriApp
 */
angular.module('wriApp')
    .controller('authorsCtrl', function ($rootScope, $scope, Authors, Selector) {
        
        var ctrl = this;

        // [PUBLIC VARIABLES]
        ctrl.authors;

        // [INIT]
        init();

        // [PUBLIC METHODS]
        ctrl.addAuthor = addAuthor;

        ///////////////////

        // [METHODS: begin]
            /**
             * @name init
             * @desc will load data directly from database
             * @return {void} 
             */
            function init() {
                Authors.getAll().then(function(authors) {
                    ctrl.authors = authors;
                });
            }

            /**
             * @name addAuthor
             * @desc Send event to create a new author in viewer
             * @return {void} 
             */
            function addAuthor() {
                var newAuthor = {
                    name : "",
                    birthDate : "",
                    gender : "M",
                    rating : "",
                    photoUrl : "",
                    email : "",
                    linkedIn : "",
                    description : "",
                    articles : []
                };
                $scope.$emit('authors:new', newAuthor);
            }
        // [METHODS: end]
        
        // [PRIVATE METHODS: begin]

        // [PRIVATE METHODS: end]


        // [EVENTS]
        $rootScope.$on("authors:refresh", function(event){
            // event.stopPropagation();
            init();
        });

        // [WATCHERS]
        $scope.$watch(function(){
            return Selector.isEnabled;
        }, function(newVal, oldVal){
            if (Selector.getSelectionType() == "authors"){
                Selector.reinitSelection(ctrl.authors); 
            }
        });

        $scope.$watch(function(){
            return Selector.itemsAlreadySelectedSize;
        }, function(newVal, oldVal){
            if (Selector.getSelectionType() == "authors") {
                Selector.setSelectionInCtrl(ctrl.authors);
            }
        });


        // [FILTER / ORDER]
        $rootScope.$on('sendFilters', function(event, data) {
            if(data === 'reset'){
                $scope.filter = {};  
                $scope.order = {};
            } else {
                $scope.filter = data;
            }
        });

        $rootScope.$on('sendOrderBy', function(event, data) {
            $scope.order = data;
        });

    });
