# Overview
Kevin Kotosky's implementation of the EBD petstore react assignment. 

# Pre-install set up
If node hasn't been used before please install Node. It can be downloaded at http://nodejs.org/download/. Specifically version 14.15.5 was used to build the app. (https://nodejs.org/download/release/v14.15.5/).

# Application set up
Please run ``` npm install ``` which will run through the dependencies documented in package.json and install the version listed in package-lock.json to create a node_modules folder.

# To run locally
Please run ``` npm start ```. This will start up a local instance of this application. Your default browser should automatically open, but if not navigate to ```http://localhost:3000/``` to see the application in action.

# To manipulate the fixture server and change responses
The fixture server is a locally run express server to make changes to the server responses for local development testing. Please uncomment and comment the neccessary lines in ./fixture-server/routes/pets/index.js (or your own provided route file). Please note that only one res.status line per route should be uncommented to ensure the server doesn't crash.

```
  // Success response
  res.status(200).json(returnVal);

  //Empty Case
  // res.status(200).json([]); <-- if uncommented without commenting the above, the fixture server will crash.
```

If a change is made to the server code the server must be restarted. Ctrl+C and a rerun of ```npm start``` through the command line will ensure the latest server code is running.


# Adding a new views to the application. 
A new folder should be added to the application titled appropriately for what type of data is managed through the contained views. (In the provided example "pets"). 

# State Management files
Folders then can be created for "actions" and "reducers" for managing the state of each view contained in the folder. Within these folders there should contain javascript files with names corresponding to each view. So the data logic and state management code is aptly named and easily accessible when editing each of the newly provided views.

In the provided example ...
create-actions/create-reducers -> pets-create view, 
view-actions/view-reducers -> pets-view view

Reducers will need to be imported and added to the combined reducer block in ./src/reducers/index.js. 

```
  const rootReducer = combineReducers({
    petHandling,
    petCreation,
    --> yourReducer() <--
  });
```

# Views
A folder can be created with the file naming structure of (primary data object)-action. In which the action represents the user action take on that screen or other appropriate naming. (e.g. Create / View / Delete / Update). Within each of these folders there should be two files, the .component.js file and the .scss file. These component will be the view for the page to render. 

# New non-view components
Any additional components necessary to build a view should be analyzed to determine how re-useable they are in the application. If a new component is likely to appear in other locations in the application (e.g. loading-spinner) its folder can be added to the ./src/ folder directly. If a component is only going to appear at a view level and on no other views its folder can be added to the parent component level. (e.g. ./src/pets/pets-create/my-new-pets-create-specific.component.js)

# Adding the view to React router
In ./src/ App.js starting at line 20 the routes and the corresponding path's are registered to the react router. Adding an appropriate path and lnking it to your component through the element attribute will alert react to load your component when the user visits the routes.

```
  <Route path="/your-create-route" element={<YourCreateComponent/>} />
```

# Adding the view to menu navigation
In ./src/app-bar/app-bar.component.js the following code block exists at line 66 (currently)
```
  <Link to="/create-pet" className="my-app-bar__menu-link"> 
    <Button className="my-app-bar__menu-item"> Pets </Button>
  </Link>
```

Adding a similar style link immediately to your component following the provided code block pattern will add a link to the corresponding button on the menu. The "to" attribute should be equal to the "path" attribute you provided when editing the React router Routes.

```
  <Link to="/your-create-route" className="my-app-bar__menu-link"> 
    <Button className="my-app-bar__menu-item"> Your Data Type </Button>
  </Link>
```

# Updating the fixture server.

New api-routes should be added in the ./fixture-server/routes/ folder. Appropriately named after the data type managed by the routes. For example ./fixture-server/routes/pets/index.js contains the routes for the /pets API. 

Once your new routes have been defined they should be registered to the server itself. This can be done after line 19 (currently). Following the same pattern as line 19. 
```
  app.use('/your-base-api-path', yourImportedRoutes);
```

The Fixture server should then be reachable at your provided routes.