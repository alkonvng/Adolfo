'use strict';

// Configuring the Articles module
angular.module('blogs').run(['Menus',
	function(Menus) {
		// Set top bar menu items
        Menus.addMenuItem('topbar', 'Blogs', 'blogs', 'dropdown', '/blogs(/create)?');
        Menus.addSubMenuItem('topbar', 'blogs', 'List blogs', 'blogs');
        Menus.addSubMenuItem('topbar', 'blogs', 'New blogs', 'blogs/create');
        Menus.addSubMenuItem('topbar','blogs','Mi Blog','/blogs/:blogId');

	}
]);
