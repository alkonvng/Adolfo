'use strict';

// Blogs controller
angular.module('blogs').controller('BlogsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Blogs','Articulos',
	function($scope, $stateParams, $location, Authentication, Blogs,Articulos) {
		$scope.authentication = Authentication;

		// Create new Blog
		$scope.create = function() {
			// Create new Blog object
			var blog = new Blogs ({
				name: this.name
			});

			// Redirect after save
			blog.$save(function(response) {
				$location.path('blogs/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Blog
		$scope.remove = function(blog) {
			if ( blog ) { 
				blog.$remove();

				for (var i in $scope.blogs) {
					if ($scope.blogs [i] === blog) {
						$scope.blogs.splice(i, 1);
					}
				}
			} else {
				$scope.blog.$remove(function() {
					$location.path('blogs');
				});
			}
		};

		// Update existing Blog
		$scope.update = function() {
			var blog = $scope.blog;

			blog.$update(function() {
				$location.path('blogs/' + blog._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Blogs

        $scope.find = function() {
            $scope.blogs = Blogs.query();
        };

		// Find existing Blog
		$scope.findOne = function() {
            $scope.blog = Blogs.get({
                blogId: $stateParams.blogId
            });
		};

        $scope.findArt = function(){


            console.log(' Que nos llega en find art' + $scope.blog);

        };

        // Encontrar todos los articulos del blog
        $scope.findLastArt = function(){
            /*$scope.blog = Blogs.get({
                blogId: $stateParams.blogId
            });
            var id = $scope.blog;
            console.log(id);
            $scope.articulo = Articulos.findById(id, function(err,found){
                if(err) return err;
                return found;
            });
            console.log($scope.articulo);*/
        };

        $scope.listArticles = function(){
            //.where('user').equals(Authentication.user._id)
            /*
            console.log(Authentication.user._id);
            console.log( Articulos.where({'name':'uno'}).count());
            $scope.articulos = Articulos.where({'user': Authentication.user._id});
            */
            console.log(Articulos.query());
        };

	}
]);
