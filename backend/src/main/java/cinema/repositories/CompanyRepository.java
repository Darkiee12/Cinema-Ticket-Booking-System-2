package cinema.repositories;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import cinema.entities.Company;

public interface CompanyRepository extends JpaRepository<Company, Integer> {
    Company findById(int Id);
    List<Company> findAll();
    Company save(Company company);
    List<Company> save(List<Company> company);
}
