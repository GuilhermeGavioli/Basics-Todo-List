



const addTaskInput = document.getElementById("task-input")
const addButton = document.getElementById("add-task-btn")
const removeButton = document.getElementById("remove-task-btn") 
const updateButton = document.getElementById("update-task-btn")

const allTasksContainer = document.getElementById("tasks-container-list")


addButton.addEventListener('click', async () => { 
    const inputValue = Input.getInputValue()

    const validation = validateTask(inputValue)

    if (validation.status) {

        append(validation.task);
        Input.clearInput();
        return
    }

    alert("Invalid task: " + validation.message)
    

})

function removeTask(taskID) { 
    console.log(taskID)
    //remove task
    Array.from(allTasksContainer.children).map(element => {
        if (element.id == taskID) element.remove();
     })
    



}

function updateTask(taskID) { 


}

function validateTask(task) {
    if (!task) return { status: false, message: "Empty field or something else" };
    return {status: true, task, message: "ok"}
};

class Input {
    static getInputValue() { return addTaskInput.value }
    static clearInput() { return addTaskInput.value = "" }
}


function append(task) { 
    const createdLi = document.createElement("li");
    createdLi.setAttribute("id", Math.random().toString())

    const createdDeleteButton = document.createElement("button");
    createdDeleteButton.className = "w-10 h-10 bg-green-400"
    createdDeleteButton.innerText = "delete"

    const createdUpdateButton = document.createElement("button");
    createdUpdateButton.innerText = "update"

    createdLi.append(task);
    createdLi.append(createdDeleteButton);
    createdLi.append(createdUpdateButton);
    allTasksContainer.append(createdLi);


    createdDeleteButton.addEventListener("click", ()=> removeTask(createdLi.getAttribute("id")));
    createdUpdateButton.addEventListener("click", ()=> updateTask(createdLi.getAttribute("id")));
}


