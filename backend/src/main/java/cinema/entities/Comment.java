package cinema.entities;

import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.*;
import java.util.Date;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "comments")
@Getter
@Setter
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Long commentId;

    @Column(name = "content", columnDefinition = "TEXT")
    private String content;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "timestamp")
    private Date timestamp;

    @JsonIgnoreProperties("comments")
    @ManyToOne
    @JoinColumn(name = "imdb_id", referencedColumnName = "imdb_id")
    private Movie movie;

    @JsonIgnoreProperties("comments")
    @ManyToOne
    @JoinColumn(name = "ticket_id", referencedColumnName = "ticket_id")
    private Ticket ticket;
}
