package cinema.repositories;
import cinema.entities.Comment;
import jakarta.persistence.EntityManager;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


public interface CommentRepository extends JpaRepository<Comment, String> {
    Comment findByCommentId(Long commentId);
    List<Comment> findAll();
    // List<Comment> findByUserId(Long userId);
    // List<Comment> findByimdbId(String imdbId);
    Comment save(Comment comment);
    void delete(Comment comment);
    void deleteByCommentId(Long commentId);
}
