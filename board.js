allTasks =[
    {
        id : 0,
        title : "test",
        category : "Management",
        description : `lorem Ipsum dolor sit amet, consectetur`,
        status: "todo",
        creator: "Timm Eichholz",
        avatar: "./img/profile.png",
        creationdate: ""
    },
    {
        id : 1,
        title : "test2",
        category : "Management",
        description : "lorem Ipsum dolor sit amet, consectetur",
        status: "done",
        creator: "Timm Eichholz",
        avatar: "./img/profile.png",
        creationdate: ""
    }
];

function writeTasks(id){
    document.getElementById(allTasks[id]['status']).innerHTML += `<div class="board-entry" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="fillModal(${id})">
    <div class="${allTasks[id]['category']}">
        <span class="board-date">${allTasks[id]['creationdata']}</span>
        <h3>${allTasks[id]['title']}</h3>
        <p class="board-text-short">${allTasks[id]['description']}</p>
        <div class="d-flex justify-content-around">
            <div class="category">Management</div><img class="avatar" src=${allTasks[id]['avatar']}
                alt=${allTasks[id]['creator']}>
        </div>
    </div>
</div>`

}

function boardInit(){
    
    for (let i = 0; i < allTasks.length; i++){
        console.log(i);
        writeTasks(i);
    }
}

function fillModal(id){
    document.getElementById('modal-title').innerHTML = allTasks[id]['title'];
    document.getElementById('modal-description').innerHTML = allTasks[id]['description'];
    let modalAvatar =  document.getElementById('modal-avatar');
    modalAvatar.src = allTasks[id]['avatar'];
    document.getElementById('modal-creator').innerHTML = allTasks[id]['creator'];
    document.getElementById('modal-category').innerHTML = allTasks[id]['category'];
    document.getElementById('modal-category').classList.add(allTasks[id]['category'])


}