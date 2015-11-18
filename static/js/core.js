// create the module and name it scotchApp
var pokeApp = angular.module('pokeApp', ['ngRoute','ngTouch']);
var pokeApi = "http://pokeapi.co/api/v1/"
var pokeApiRaiz = "http://pokeapi.co"

pokeApp.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
    $routeProvider
        .when('/',{
            templateUrl: '_home.html',
            controller: 'mainController'
        })
        .when('/pokemon/:id',{
            templateUrl: '/_pokemon.html',
            controller: 'pokemonController'
        })
        .otherwise({
            redirectTo:'/'
        });
        $locationProvider.html5Mode(true);
}]);

//Controller da página inicial de login
pokeApp.controller('mainController', ['$scope','$http', function($scope,$http) {
    console.log('main controller');
}]);

//Controller da página de Cadastro
pokeApp.controller('pokemonController', ['$scope','$window','$routeParams','$http', function($scope,$window,$routeParams,$http) {
     

        $scope.nextPokemon = function () {
           var idInt = parseInt($routeParams.id) + 1;
            var idStr = idInt+"";
            var next = 1;

           if(idStr.length == 1)
            next = '00'+idStr;

           if(idStr.length == 2)
            next = '0'+idStr;

            if(idStr.length == 3)
            next = idStr;

             $window.location.href = "/#pokemon/"+next;
        };


        $scope.prevPokemon = function () {
           var idInt = parseInt($routeParams.id) -1;
           if(idInt == 0)
            return false;
            var idStr = idInt+"";
            var next = 1;

           if(idStr.length == 1)
            next = '00'+idStr;

           if(idStr.length == 2)
            next = '0'+idStr;;
             $window.location.href = "/#pokemon/"+next;
        };

      $scope.pokemon = {}
        $scope.pokemon.hasEvolution = false;
      $scope.evolutions = {}
      weakness = []
      $http.get(pokeApi+'pokemon/'+$routeParams.id).success(function(data){
        $scope.pokemon = data;

        if(data.evolutions.length > 0){
            console.log(data.evolutions[0].resource_uri)
            evo = parseInt($routeParams.id)+1;
            console.log(evo);
            str = evo+"";
           if(str.length == 1)
            evo = '00'+str;

           if(str.length == 2)
            evo = '0'+str

            if(str.length == 3)
            evo = str
              console.log(evo);

             $scope.pokemon.hasEvolution = true;
            $scope.pokemon.imageEvo = 'http://assets22.pokemon.com/assets/cms2/img/pokedex/full/'+evo+'.png'
        }

        
        
        for(i in data.types)
        {
            $http.get(pokeApiRaiz+''+data.types[i].resource_uri).success(function(data2){
                for(k in data2.weakness)
                {
                   
                    weakness.push(data2.weakness[k])
                }
          
                $scope.pokemon.weakness = weakness;
            })
        }

            id = $routeParams.id
           if($routeParams.id.length == 1)
            id = '00'+$routeParams.id;

           if($routeParams.id.length == 2)
            id = '0'+$routeParams.id;
      
        $scope.pokemon.image = 'http://assets22.pokemon.com/assets/cms2/img/pokedex/full/'+id+'.png'
        
      })
}]);



