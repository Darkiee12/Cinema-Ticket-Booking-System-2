package cinema.repositories;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import cinema.entities.Language;
public interface LanguageRepository extends JpaRepository<Language, String> {
      
    Language findByIso6391(String iso6391);
    Language save(Language language);
    List<Language> findAll();
}
