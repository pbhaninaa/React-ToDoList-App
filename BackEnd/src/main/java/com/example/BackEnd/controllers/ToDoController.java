package com.example.BackEnd.controllers;
import com.example.BackEnd.entities.ToDo;
import com.example.BackEnd.services.ToDoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("todos/")
public class ToDoController {
    @Autowired
    ToDoService service;
    @PostMapping("/save")
    public ToDo save(@RequestBody ToDo todo){
       return service.saveToDo(todo);    }
    @GetMapping("/getAll")
    public List<ToDo> getAll(){
        return service.getAll();
    }
    @GetMapping("/get/{id}")
    public ToDo GetTodoById(@PathVariable int id){
        return service.getById(id);
    }
    @DeleteMapping("/delete/{id}")
    public void  delete(@PathVariable int Id){
        System.out.println("We are inside delete ======================================================================================== ");
        service.deleteById(Id);
    }
    @DeleteMapping("/deleteAll")
    public void deleteAll(){
        service.deleteAll();
    }
//  @PostMapping("/update")
//  public Todo saveOrUpdate(@RequestBody Todo todo, int id , boolean status) {
//    if (todo.getId() > 0) {
//      return service.updateStatus(id,status);
//    } else {
//      return service.saveToDo(todo);
//    }
//  }


}
