package cinema.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cinema.entities.User;
import cinema.repositories.UserRepository;
@Service
public class UserService {
    @Autowired UserRepository userRepository;
    public UserService(){}

    public List<User> getUsers(){
        return userRepository.findAll();
    }

    public User getUser(String name) {
        return userRepository.findByName(name);
    }
    
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public User findByEmail(String email) {
      return userRepository.findByEmail(email);
    }
}
