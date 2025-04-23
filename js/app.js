document.addEventListener('DOMContentLoaded', () => {
    //const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    let tasks = [];
    let isEditing = false;
    let editingId = null;
    /*
        taskForm.addEventListener('click', (e) => {
            const vti = taskInput.value.trim();
            if (vti !== '') {
                if (isEditing) {
                    tasks = tasks.map(task =>
                        task.id === editingId ? {
                            ...task, text: vti
                        } : task);
                    isEditing = false;
                    editingId = null;
                    taskForm.innerText = "Agregar";
                }
                else {
                    const task = {
                        id: Date.now(),
                        text: vti,
                        complete: false
                    };
                     tasks.push(task);
                    console.log(tasks);
                }
                renderTasks();
                taskInput.value = '';
            }
        });
    */
    function renderTasks() {
        console.log("Runing");
        fetch('server/user/session_info.php')
            .then(res => res.json())
            .then(data => {
                if (data.user_id) {
                    console.log('Sesión activa para usuario:', data.user_id);
                    fetch('server/task/index.php?user_id=' + data.user_id)
                        .then(response => response.json())
                        .then(tks => {
                            console.log(tks);
                            tks.forEach(
                                task => {
                                    console.log(task);

                                    const li = document.createElement('li');
                                    if (task.completed) {
                                        li.className = 'task-ready';
                                        li.innerHTML =
                                            '<span>' + task.title + '</span>';
                                    }
                                    else {
                                        li.innerHTML =
                                            '<span>' + task.title + '</span>' +
                                            '<div>' +
                                            '<button class="complete-btn" onclick="completeTask(' + task.id + ')">' +
                                            'Completar </button>' +
                                            '<button class="edit-btn" onclick="editTask(' + task.id + ')">' +
                                            'Editar </button>' +
                                            '<button class="delete-btn" onclick="deleteTask(' + task.id + ')">' +
                                            'Eliminar </button>' +
                                            '</div>';
                                    }
                                    taskList.appendChild(li);
                                }
                            );
                        });
                } else {
                    console.warn(data.error);
                    window.location.href = 'login.php';
                }
            });





        taskList.innerHTML = '';
        tasks.forEach(
            task => {
                console.log(task);

                const li = document.createElement('li');
                if (task.complete) {
                    li.className = 'task-ready';
                    li.innerHTML =
                        '<span>' + task.text + '</span>';
                }
                else {
                    li.innerHTML =
                        '<span>' + task.text + '</span>' +
                        '<div>' +
                        '<button class="complete-btn" onclick="completeTask(' + task.id + ')">' +
                        'Completar </button>' +
                        '<button class="edit-btn" onclick="editTask(' + task.id + ')">' +
                        'Editar </button>' +
                        '<button class="delete-btn" onclick="deleteTask(' + task.id + ')">' +
                        'Eliminar </button>' +
                        '</div>';
                }
                taskList.appendChild(li);
            }

        );
    }

    window.deleteTask = function (id) {
        tasks = tasks.filter(task => task.id !== id);
        renderTasks();
    }

    window.editTask = function (id) {
        console.log(id);
        const et = tasks.find(t => t.id === id);
        if (et) {
            taskInput.value = et.text;
            taskForm.innerText = "Guardar";
            isEditing = true;
            editingId = et.id;
        }
    }

    window.completeTask = function (id) {
        tasks = tasks.map(task =>
            task.id === id ? {
                ...task, complete: true
            } : task);
        renderTasks();
    }

    renderTasks();
});
