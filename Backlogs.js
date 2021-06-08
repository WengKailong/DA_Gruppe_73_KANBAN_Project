/**
 * Data interface between server and backLogs.html
 * required global parameter is taskObjects[]
 */

function loadLogs() {
  /**
   * this function is to load BackLogs Array from task objects from server
   */
  setTimeout(() => {
    
    for (let i = logObjects.length; i > 0; i--) {
      let LogElement = logObjects[i-1];
      loadLogElement(LogElement);
      
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
      
     
      
        

        <div  class="col-2 h-100 d-flex align-items-center">
        <div id="urgency" class="urgency-border ${newLog.UrgencyColor}"></div>
        <div>${newLog.operationType}</div>
        </div>
        <div  class="col-1 h-100 d-flex align-items-center">${newLog.taskName}</div>
        <div  class="col-2 h-100 d-flex align-items-center">${newLog.creater}</div>
        <div id = "User-Information"  class=" col-3 d-flex align-items-center height-100">
          <img
            class=" h-50  d-inline-block rounded-circle"
            src="${newLog.userAvatar}"
            alt=""
          />

          <div class=" h-100 align-txt">
            <div class="raw h-100 align-txt h-25">${newLog.userName}</div>
            <div class="raw h-100 align-txt h-25" ><a href="${newLog.userEmail}">${newLog.userEmail}</a></div>
          </div>
        </div>
        
        

        <div class="col-2 h-100 align-txt">${newLog.logCategory}</div>
    
        <div class="board-text-short col-2 h-100 align-txt">${newLog.logDetails}</div>
      </div>`;
}
