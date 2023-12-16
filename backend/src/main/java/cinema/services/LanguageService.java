package cinema.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cinema.entities.Language;
import cinema.repositories.LanguageRepository;

@Service
public class LanguageService {

    @Autowired
    private LanguageRepository languageRepository;

    public Language getLanguageByCode(String languageCode) {
        return languageRepository.findByIso6391(languageCode);
    }

    public Language saveLanguage(Language language) {
        return languageRepository.save(language);
    }

    public List<Language> getAllLanguages() {
      return languageRepository.findAll();
    }
}