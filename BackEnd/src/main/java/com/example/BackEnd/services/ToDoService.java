package com.example.BackEnd.services;
import com.example.BackEnd.entities.ToDo;
import com.example.BackEnd.repositories.ToDoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ToDoService {
    @Autowired
    ToDoRepository repository;

    public ToDo saveToDo(ToDo todo){
        return repository.save(todo);
    }
    public ToDo getById(int id){
        return repository.findById(id).get();
    }
    public List<ToDo> getAll(){
        return repository.findAll();
    }
    public void deleteById(int id){
          repository.deleteById(id);
    }

    public void deleteAll() {
        repository.deleteAll();
    }
//  @Transactional
//  public Todo updateStatus(int id, boolean newStatus) {
//    Todo existingTodo = repository.findById(id).orElse(null);
//
//    if (existingTodo != null) {
//      existingTodo.setStatus(newStatus);
//      return repository.save(existingTodo);
//    }
//
//    return null; // Handle case where Todo with the given ID is not found
//  }

}
