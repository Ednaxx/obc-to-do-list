async function setTagAsDone(element, taskId) {
    event.preventDefault();
    try {
        let headers = new Headers({ 'Content-Type' : 'application/json' });
        let body = JSON.stringify({ task: { completed: element.checked } });
        let response = await fetch(`/tasks/${taskId}?_method=PUT`, { headers: headers, body: body, method: 'PUT' });
        let data = await response.json();
        let task = data.task;

        let parent = element.parentNode;


        if(task.completed) {
            element.checked = true;
            parent.classList.add("has-text-success");
            parent.classList.add("is-italic");
        }
        else {
            element.checked = false;
            parent.classList.remove("has-text-success");
            parent.classList.remove("is-italic");
        }
    } 
    catch (err) {
        alert("Erro ao atualizar a tarefa");
    }
}