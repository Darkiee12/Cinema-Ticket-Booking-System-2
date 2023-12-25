package cinema.controllers;

import cinema.entities.User;
import cinema.services.UserService;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping("/users/get-all")
    public List<User> getUsers() {
        return userService.getUsers();
    }

    @PostMapping("/users/signup")
    public ResponseEntity<Object> signUp(@RequestBody User user) {
        if (userService.findByEmail(user.getEmail()) != null) {
            return ResponseEntity.badRequest().body("Email already exists");
        }
        userService.saveUser(user);
        return ResponseEntity.ok().body("User added successfully");
    }

    @PostMapping("/users/login")
    public ResponseEntity<Object> login(@RequestBody Map<String, String> credential) {
        String email = credential.get("email");
        String password = credential.get("password");

        User user = userService.findByEmail(email);
        if (user == null || !user.getPassword().equals(password)) {
            return ResponseEntity.badRequest().body("Invalid email/password");
        } else {
            return ResponseEntity.ok().body(user);
        }
    }

}
