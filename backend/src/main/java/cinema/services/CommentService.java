package cinema.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import cinema.entities.Comment;
import cinema.repositories.CommentRepository;
import cinema.repositories.MovieRepository;
import cinema.repositories.TicketRepository;

import java.util.List;

@Service
public class CommentService {
    @Autowired CommentRepository commentRepository;
    @Autowired TicketRepository ticketRepository;
    @Autowired MovieRepository movieRepository;

    public CommentService() {}

    public List<Comment> getComments() {
        return commentRepository.findAll();
    }

    public Comment getCommentById(Long commentId) {
        return commentRepository.findByCommentId(commentId);
    }

    public Comment saveComment(Comment comment) {
        return commentRepository.save(comment);
    }

    public void deleteCommentById(Long commentId) {
        commentRepository.deleteByCommentId(commentId);
    }
}
