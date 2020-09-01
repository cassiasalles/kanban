var KanbanTest = new jKanban({
    element: '#myKanban',
    gutter: '10px',

    // renomeando atividades
    click: function (el) {
        $('#inputElement').val(el.textContent);
        $('#myModalElements').modal('show');
        $("#saveChange").click(function () {
            el.textContent = $('#inputElement').val();
            $('#myModalElements').modal('hide')
        })
    },
    // boards predefinidos
    boards: [
        {
            'id': '_todo',
            'title': 'To Do',
            'class': 'info',
            'item': [
                {
                    'id': 'task-1',
                    'title': 'Try drag me',
                },
                {
                    'id': 'task-2',
                    'title': 'Click me!!',
                }
            ]
        },
        {
            'id': '_working',
            'title': 'Working',
            'class': 'warning',
            'item': [
                {
                    'title': 'Do Something!',
                },
                {
                    'title': 'Run?',
                }
            ]
        },
        {
            'id': '_done',
            'dragTo': ['_working'],
            'title': 'Done',
            'class': 'success',
            'item': [
                {
                    'title': 'All right',
                },
                {
                    'title': 'Ok!',
                }
            ]
        }
    ]
});

// adicionando nova atividade no board "to do"
var toDoButton = document.getElementById('addToDo');
toDoButton.addEventListener('click', function () {
    KanbanTest.addElement(
        '_todo',
        {
            'title': 'Test Add',
        }
    );
});

// abrindo modal para preencher informações sobre o novo board a ser criado
var addBoardDefault = document.getElementById('addDefault');
addBoardDefault.addEventListener('click', function () {
    $("#inputNewBoard").val("");
    $("#inputNewBoardId").val("");
    $('#myModalNewBoard').modal('show');
});
// criando o novo board
var newBoard = document.getElementById('newBoard');
newBoard.addEventListener('click', function () {
    $('#myModalNewBoard').modal('hide')
    var boardName = $("#inputNewBoard").val();
    var boardId = $("#inputNewBoardId").val();
    KanbanTest.addBoards(
        [{
            'id': boardId,
            'title': boardName,
            'dragTo': ['_todo', '_working'],
            'class': 'error',
            'item': [
                {
                    'title': 'Default Item',
                },
                {
                    'title': 'Default Item 2',
                },
                {
                    'title': 'Default Item 3',
                }
            ]
        }]
    )
});
// criando uma lista dos boards existentes
$('#myModal').on('shown.bs.modal', function () {
    document.getElementById("myList").innerHTML = '';
    var boardsList = KanbanTest.options.boards;
    boardsList.forEach(item => {
        $('#myList').append($("<a class='list-group-item'></a>")
            .attr("id", item.id)
            .text(item.title));
    });
})
// excluindo o board selecionado na lista
var list = document.getElementById('myList');
list.addEventListener("dblclick", function (item) {
    KanbanTest.removeBoard(item.target.id)
    $('#myModal').modal('hide')
});