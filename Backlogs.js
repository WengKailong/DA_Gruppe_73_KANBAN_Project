

/**
 * Data interface between server and backLogs.html
 * required global parameter is taskObjects[]
 */

function loadLogs() {
  /**
   * this function is to load BackLogs Array from task objects from server
   */
  setTimeout(() => {
    for (let i = 0; i < taskObjects.length; i++) {
      let task = taskObjects[i];
      for (let j = 0; j < task.taskAsignedTo.length; j++) {
        let id = task.taskAsignedTo[j];
        let user = new User();
        user = user.getUserById(id, userObjects);

        if (task.taskUrgency == '1') {
          UrgencyColor = 'Heigh';
        } else { if (task.taskUrgency == '2') {
          UrgencyColor = 'Medium';
        } else {UrgencyColor = 'Low';} 
          
        }
        
        let newLog = new Log(task, user, UrgencyColor);
        loadLogElement(newLog);

        

      }
    }
  }, 200); 
}

function loadLogElement(newLog) {
  /**
   * this function is to load html code for single backlog record.
   * it needs to be adapted to the backlog.html design
   */
  let loadElement = document.getElementById("load-logs");

  

  
  

  
  
  

  




      loadElement.innerHTML += `
      
      <div class="container-fluid row mb-2 p-zero  bg-form-input" style="height: 70px">
      
     
      

        <div id = "User-Information"  class="${newLog.UrgencyColor} col-1 d-flex align-items-center height-100">
          <img
            class=" h-50  d-inline-block rounded-circle"
            src="${newLog.userAvatar}"
            alt=""
          />
        </div>
        
        <div class="col-3 h-100 align-txt">

        

        <div class="raw h-100 align-txt h-25">${newLog.userName}</div>

        <div class="raw h-100 align-txt h-25" ><a href="${newLog.userEmail}">${newLog.userEmail}</a></div></div>

        <div class="col-3 h-100 align-txt">${newLog.logCategory}</div>
    
        <div class="col-4 h-100 align-txt">${newLog.logDetails}</div>
      </div>`;
}
