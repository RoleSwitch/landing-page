# landing-page

Technologies:
=============

Server:
-------
- Nodejs (platform)
- Express (framework)
- Socket.io (connection)
- Swig (render)
- Mongoose (db)
- Passport (auth)
- Redis (session)
- Chai (test)

Client:
-------
- jQuery (event)
- Socket.io (connection)
- Bootstrap (ui)
- FontAwesome (icons)

Tools:
------
- Uglifyjs (minify)
- Uglifycss (minify)
- Mocha (test)


Structure:
==========

/app
	/models
	/controllers
	/services
	app.js
/config
	/auth
	routes.js
	properties.js
/public
	/dev
		/css
		/img
		/js
	/prod
		/img
/test
	express.test.js
/views
	index.html
package.json
server.js


Auth:
=====
- local
- facebook
- google


signup 
	username
	email
	pass
	repeat pass

login
	local
		username or email
		pass
	connect with face
	connect with g+

local
	forget pass => send email with a key to restpass page


Developers:
	* https://console.developers.google.com
	* https://developers.facebook.com

colors : 
	mauve : #6f5499
	blue  : #00a8ff

