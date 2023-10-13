package cinema.entities;
import java.sql.Date;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
@Entity
@Table(name = "users")
public class User{
    @Id
    @Column(name = "user_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private Long userId;
    @Column(name = "name", columnDefinition = "CHARACTER VARYING(255) NOT NULL DEFAULT 'NA'")
    private String name;
    @Column(name = "gender")
    private String gender;
    @Column(name = "email")
    private String email;
    @Column (name = "phone_number", columnDefinition = "BIGINT")
    private Long phoneNumber;
    @Column (name = "date_of_birth")
    private Date dateOfBirth;
    @Column (name = "password")
    private String password;
    @Column (name = "role")
    @Enumerated(EnumType.STRING)
    private Role role;

    @JsonIgnore
    @OneToMany
    @JoinColumn(name = "user_id")
    private Set<Ticket> tickets;
}