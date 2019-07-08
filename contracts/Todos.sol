pragma solidity ^0.4.2;

contract Todos {
    bytes32[] todos;


    function addTodo(bytes32 todo) public {
        todos.push(todo);
    }

    function getTodos() view public returns (bytes32[]) {
        return todos;
    }
}
