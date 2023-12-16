package cinema.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import cinema.entities.Language;
import cinema.services.LanguageService;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class LanguageController {

    @Autowired
    private LanguageService languageService;

    @GetMapping("/languages/{languageCode}")
    public Language getLanguageByCode(String languageCode) {
        return languageService.getLanguageByCode(languageCode);
    }

    @GetMapping("/languages/get-all")
    public List<Language> getAllLanguages() {
        return languageService.getAllLanguages();
    }
    

    @PostMapping("/languages/add-language")
    public Language saveLanguage(Language language) {
        return languageService.saveLanguage(language);
    }

    // Other API endpoints as needed
}
