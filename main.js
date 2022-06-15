



const addTaskInput = document.getElementById("task-input")
const addButton = document.getElementById("add-task-btn")



const tasksContainer =  document.getElementById("tasks-container")
const allTasksContainer = document.getElementById("tasks-container-list")

const noTasksMessage = document.getElementById("no-tasks-message")





addButton.addEventListener('click', async (e) => { 
    e.preventDefault()
    const inputValue = Input.getInputValue()

    const validation = validateTask(inputValue)

    if (validation.status) {

        append(validation.task);
        tasksContainer.scrollTo(0, 10000); // scroll to bottom after added.
        checkIfThereAreTasks();
        Input.clearInput();
        return
    }

    alert("Invalid task: " + validation.message)
    

})

function changeTaskState(taskID) {
    Array.from(allTasksContainer.children).map(element => {
        if (element.getAttribute("taskid") == taskID) {

            if (element.getAttribute("isdone").toString() == "false") {
                element.setAttribute("isdone", "true");
                element.firstChild.style.backgroundColor = "green";
            }

            else if (element.getAttribute("isdone").toString() == "true") { 
                element.setAttribute("isdone", "false");
                element.firstChild.style.backgroundColor = "red";
            }
       
            
            
        }
     })
    // e.target.getAttribute("isDone") === "true" ? e.target.setAttribute("isDone", "false") : e.target.setAttribute("isDone", "true");
    // if (e.target.getAttribute("isDone") === "true") e.target.style.backgroundColor = "green"
    // if (e.target.getAttribute("isDone") === "false") e.target.style.backgroundColor = "red"
}


function removeTask(taskID) {
    //e target remove
    Array.from(allTasksContainer.children).map(element => {
        if (element.getAttribute("taskid") == taskID) element.remove();
    })
    checkIfThereAreTasks();
}

function updateTask(taskID) {
    Array.from(allTasksContainer.children).map(element => {
        console.log("here")
        if (element.getAttribute("taskid") == taskID) { 
            const validation = validateTask(addTaskInput.value)
            if (validation.status){
                element.children[1].innerText = addTaskInput.value
                return Input.clearInput();
            }
            alert("Invalid task: " + validation.message)



        }
     })


}

function validateTask(task) {
    if (task.trim() === "") return { status: false, message: "Empty field or something else" };
    if(task.length > 50 || task.length < 2) return { status: false, message: "Field is too long or too short." };
    return {status: true, task, message: "ok"}
};

function checkIfThereAreTasks() {
    console.log(allTasksContainer.children)
    if (allTasksContainer.children.length > 0) return noTasksMessage.style.visibility = "hidden"
    noTasksMessage.style.visibility = "visible"
}


class Input {
    static getInputValue() { return addTaskInput.value }
    static clearInput() { return addTaskInput.value = "" }
}



function append(task) {
    //change created word
    const createdLi = document.createElement("li");
    createdLi.className = "li-item"
    createdLi.setAttribute("taskId", Math.random().toString());
    createdLi.setAttribute("isdone", "false");
    
    const statusDiv = document.createElement("div");
    statusDiv.className = "status-div"

    const createdDeleteButton = document.createElement("button");
    createdDeleteButton.className = "delete-btn"
    createdDeleteButton.innerText = "X"
    
    
    
    const parDiv = document.createElement("div");
    parDiv.className = "par-div"
    parDiv.innerText = task
    
    
    const createdUpdateButton = document.createElement("button");
    createdUpdateButton.className = "update-btn"
    createdUpdateButton.innerText = "U"
    
    const pairOfButtons = document.createElement('div');
    pairOfButtons.className= "pairOfButtons"
    
    createdLi.append(statusDiv);
    createdLi.append(parDiv);
    pairOfButtons.append(createdUpdateButton);
    pairOfButtons.append(createdDeleteButton);
    createdLi.append(pairOfButtons);
    allTasksContainer.append(createdLi);

    createdLi.addEventListener("dblclick", () => changeTaskState(createdLi.getAttribute("taskId")))
    createdDeleteButton.addEventListener("click", ()=> removeTask(createdLi.getAttribute("taskId")));
    createdUpdateButton.addEventListener("click", ()=> updateTask(createdLi.getAttribute("taskId")));
}


