let addMessage = document.querySelector('.message'),
    addButton = document.querySelector('.add'),
    todo = document.querySelector('.todo');

//массив чтобы хранить переменную newTodo
let todoList = [];

if (localStorage.getItem('todo')) {
    //обращаемся к объекту JSON используем метод parse
    todoList = JSON.parse(localStorage.getItem('todo'));
    displayMessages();

}

addButton.addEventListener('click', function() {

    let newTodo = {
        todo: addMessage.value,
        checked: false,
        important: false
    };
    todoList.push(newTodo);
    displayMessages();
    //localStorage понимает только строку
    localStorage.setItem('todo', JSON.stringify(todoList));
});

function displayMessages() {
    let displayMessage = '';
    todoList.forEach(function(item, i) {
        //let displayMessage = `Наше дело: ${addMessage.value}`;
        //console.log('displayMessage: ', displayMessage);
        displayMessage += `
                <li> 
                <input type = 'checkbox' id='item_${i}' ${item.checked ? 'checked' : '' }>
                <label for = 'item_${i}' class ="${item.important ? 'important' : ''}">${item.todo}</label>
                </li>`;
        todo.innerHTML = displayMessage;

    });
}

//ловим события нажатия на галочку
//event.target это элемент, который вызвал событие, так можно отслеживать элементы вызывающие события
todo.addEventListener('change', function(event) {
    //console.log(event.target.getAttribute('id'));
    //сначала можно проанализировать элемент в консоле, а потом сделать из него переменную
    let idInput = event.target.getAttribute('id');
    let forLabel = todo.querySelector('[for=' + idInput + ']');
    let valueLabel = forLabel.innerHTML;
    console.log('valueLabel: ', valueLabel);

    // //запоминание того нажата галочка или нет
    todoList.forEach(function(item) {
        if (item.todo === valueLabel) {
            item.checked = !item.checked;
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    });
});

// contextmenu - это событие нажатия правой кнопкой мыши
todo.addEventListener('contextmenu', function(event) {
    //отмена стандартного поведения браузера
    event.preventDefault();
    todoList.forEach(function(item, i) {
        if (item.todo === event.target.innerHTML) {
            if (event.ctrlKey || event.metaKey) {
                //удаление элемента из массива
                todoList.splice(i, 1);
            } else {
                item.important = !item.important;
            }
            displayMessages();
            localStorage.setItem('todo', JSON.stringify(todoList));
        }

    });
});