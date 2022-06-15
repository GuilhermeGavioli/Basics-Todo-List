



const addTaskInput = document.getElementById("task-input")
const addButton = document.getElementById("add-task-btn")
const removeButton = document.getElementById("remove-task-btn") 
const updateButton = document.getElementById("update-task-btn")

const allTasksContainer = document.getElementById("tasks-container")


addButton.addEventListener('click', async () => { 
    const inputValue = Input.getInputValue()

    const validation = validateTask(inputValue)

    if (validation.status) {
        allTasksContainer.append(validation.task)
        Input.clearInput()


        return 
    }

    alert("Invalid task: " + validation.message)
    


})

removeButton.addEventListener('click', (taskID) => { 
    //add task

})
updateButton.addEventListener('click', (taskID) => { 
    //add task

})

function validateTask(task) {
    if (!task) return { status: false, message: "Empty field or something else" };
    return {status: true, task, message: "ok"}
};

class Input {
    static getInputValue() { return addTaskInput.value }
    static clearInput() { return addTaskInput.value = "" }
}


