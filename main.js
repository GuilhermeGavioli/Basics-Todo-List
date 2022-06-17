



const addTaskInput = document.getElementById("task-input")
const addButton = document.getElementById("add-task-btn")


//info did
const infoDiv = document.getElementById("info-div")
const infoContainer = document.getElementById("infoContainer")

infoContainer.addEventListener("mouseover", () => {
    infoDiv.style.visibility = "visible"
})

infoContainer.addEventListener("mouseout", () => {
    infoDiv.style.visibility = "hidden"
})



const tasksContainer =  document.getElementById("tasks-container")
const allTasksContainer = document.getElementById("tasks-container-list")

const noTasksMessage = document.getElementById("no-tasks-message")

window.addEventListener("load", () => { 
    //getcookies
    Object.values(localStorage).map(object => {
        const parsedObj = JSON.parse(object)
        append(parsedObj.task, parsedObj.state, parsedObj.id);
    })

  

    
})

 


addButton.addEventListener('click', (e) => { 
    e.preventDefault()
    const inputValue = Input.getInputValue()

    const validation = validateTask(inputValue)

    if (validation.status) {
        const generatedID = Math.random().toString();
        append(validation.task,false, generatedID); // it returns the generated random id
        tasksContainer.scrollTo(0, 10000); // scroll to bottom after added.
        checkIfThereAreTasks(); // controls no tasks message
        Input.clearInput();
        
        localStorage.setItem(generatedID, JSON.stringify({ task: validation.task, state: false, id: generatedID }) );
   
        // localStorage.setItem(`task-cookie-${cont}`, [validation.task, false]);
    
        // document.cookie();
        return
    }

    alert("Invalid task: " + validation.message)
    

})

function changeTaskState(taskID) {
    Array.from(allTasksContainer.children).map(element => {
        if (element.getAttribute("taskid") == taskID) {
            // localStorage.removeItem(taskID)
            Object.values(localStorage).map(object => { 
                const parsedObj = JSON.parse(object);
                if (parsedObj.id === taskID) {
                    let taskText = parsedObj.task
                    localStorage.removeItem(taskID);
                    if (element.getAttribute("isdone").toString() == "false") {
                        element.setAttribute("isdone", "true");
                        element.firstChild.style.backgroundColor = "rgb(50, 230, 62)";
                        localStorage.setItem(taskID.toString(), JSON.stringify({ task: taskText, state: true, id: taskID }))
                    } else if (element.getAttribute("isdone").toString() == "true") { 
                        element.setAttribute("isdone", "false");
                        element.firstChild.style.backgroundColor = "#E64E32";
                        localStorage.setItem(taskID.toString(), JSON.stringify({ task: taskText, state: false, id: taskID }))
                    }
                 


                }
            });
            // localStorage.setItem(taskID)

       
            
            
        }
     })
    // e.target.getAttribute("isDone") === "true" ? e.target.setAttribute("isDone", "false") : e.target.setAttribute("isDone", "true");
    // if (e.target.getAttribute("isDone") === "true") e.target.style.backgroundColor = "green"
    // if (e.target.getAttribute("isDone") === "false") e.target.style.backgroundColor = "red"
}


function removeTask(taskID) {
    //e target remove
    Array.from(allTasksContainer.children).map(element => {
        if (element.getAttribute("taskid") == taskID) { 
            localStorage.removeItem(taskID)
            element.remove();
        };
    })
    checkIfThereAreTasks();
}


function updateTask(taskID) {
    Array.from(allTasksContainer.children).map(element => {


        
        
        
        if (element.getAttribute("taskid") == taskID) {
            const validation = validateTask(addTaskInput.value)
            if (validation.status) {
                

                Object.values(localStorage).map(object => {
                    const parsedObj = JSON.parse(object);
                    if (parsedObj.id === taskID) {
                        let taskState = parsedObj.state
                        localStorage.removeItem(taskID.toString())
                        localStorage.removeItem(taskID)
                        localStorage.setItem(taskID, JSON.stringify({ task: addTaskInput.value, state: taskState, id: taskID }))
                    }
                })
                
                

                element.children[1].innerText = addTaskInput.value
                return Input.clearInput();
            }
            alert("Invalid task: " + validation.message)



        }
     })


}

function validateTask(task) {
    if (task.trim() === "") return { status: false, message: "Empty field." };
    if(task.length > 50 || task.length < 2) return { status: false, message: "Field is too long or too short." };
    return {status: true, task, message: "ok"}
};

function checkIfThereAreTasks() {
    if (allTasksContainer.children.length > 0) return noTasksMessage.style.visibility = "hidden"
    noTasksMessage.style.visibility = "visible"
}


class Input {
    static getInputValue() { return addTaskInput.value }
    static clearInput() { return addTaskInput.value = "" }
}



function append(task, state, randomId) {
    //change created word
    const createdLi = document.createElement("li");
    createdLi.className = "li-item"
    createdLi.setAttribute("taskId", randomId);
    createdLi.setAttribute("isdone", state.toString());


    
    const statusDiv = document.createElement("div");
    statusDiv.className = "status-div"
 
    if (state.toString() === "true") statusDiv.style.backgroundColor = "rgb(50, 230, 62)";
    if (state.toString() === "false") statusDiv.style.backgroundColor = "#E64E32";
    

    const createdDeleteIcon = document.createElement("i");
    createdDeleteIcon.className = "fa-solid fa-delete-left";
    const createdDeleteButton = document.createElement("button");
    createdDeleteButton.className = "delete-btn"
    createdDeleteButton.append(createdDeleteIcon)
    
    
    const parDiv = document.createElement("div");
    parDiv.className = "par-div"
    parDiv.innerText = task
    
    
    const createdEditIcon = document.createElement("i");
    createdEditIcon.className = "fa-solid fa-pen-to-square";
    const createdUpdateButton = document.createElement("button");
    createdUpdateButton.className = "update-btn"
    createdUpdateButton.append(createdEditIcon);
    // createdUpdateButton.innerText = "U"
    
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
    createdUpdateButton.addEventListener("click", () => updateTask(createdLi.getAttribute("taskId")));
    checkIfThereAreTasks();
   

    
}


