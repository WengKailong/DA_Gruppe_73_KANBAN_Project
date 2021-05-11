
/**
 * this function is used to define the original value of all saved parameters for usage of all sites.
 * by executing this function, the database will be restored to its original state. 
 * 
 * CAUTION: only for testing purpose
 */

function resetDataBase() {
  // set default users
  let admin = new User(
    0, 'admin', 'admin', 'admin', 'admin@admin.com', 'profile.png'
  );

  let userObjects = [admin];
  saveToServer("userObjects", userObjects);

  // reset taskObjects to empty
  let taskObjects = [];
  saveToServer("taskObjects", taskObjects);

  // set default categories
  let categoryObjects = [
    "Development",
    "Sales",
    "Marketing",
    "Product",
    "Engineering",
  ];
  saveToServer("categoryObjects", categoryObjects);

  // set default lists
  let listObjects = [
    new List('todo', "TO DO"),
    new List('progress', "IN PROGRESS"),
    new List('testing', "TESTING"),
    new List('done', "DONE")
  ];
  saveToServer("listObjects", listObjects);

  // set initial global variables for ids
  let GLOBAL_VARIABLES = {
    currUserId: 1,
    currListId: 4, // Start with 4, because 0, 1, 2,3 are used for default list objects
    currTaskId: 0,
  };
  saveToServer("globalVariables", GLOBAL_VARIABLES);
}
