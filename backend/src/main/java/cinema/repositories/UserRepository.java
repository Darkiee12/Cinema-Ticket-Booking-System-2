package cinema.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import cinema.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {

  User findByName(String name);
  User findByUserId(long user_id);

    
}
