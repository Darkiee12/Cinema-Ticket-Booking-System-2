package cinema;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import cinema.utilities.Database;

@SpringBootApplication
public class App {

	public static void main(String[] args) {
		Database db = new Database();
		db.connect_to_db();
		SpringApplication.run(App.class, args);
	}
}
