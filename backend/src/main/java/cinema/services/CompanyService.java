package cinema.services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import cinema.entities.Company;
import cinema.repositories.CompanyRepository;
import java.util.List;

@Service
public class CompanyService {

    @Autowired
    private CompanyRepository companyRepository;

    public Company findById(int id) {
        return companyRepository.findById(id);
    }

    public List<Company> getAllCountries() {
        return companyRepository.findAll();
    }

    public Company saveCompany(Company company) {
        return companyRepository.save(company);
    }

    public List<Company> saveCompany(List<Company> company) {
        return companyRepository.save(company);
    }

}