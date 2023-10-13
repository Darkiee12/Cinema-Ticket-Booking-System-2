package cinema.utilities;
import io.github.cdimascio.dotenv.Dotenv;

public class DotEnv{
  private Dotenv dotenv = Dotenv.configure()
        .directory("src\\main\\resources\\.env")
        .filename(".env") 
        .load();
  private final String jdbcURL = dotenv.get("DATABASE_URL");
  private final String jdbcUsername = dotenv.get("DATABASE_USERNAME");
  private final String jdbcPassword = dotenv.get("DATABASE_PASSWORD");
  private final String OMDB_API = dotenv.get("OMDB_API_KEY");
  public DotEnv(){}
  public String getJdbcURL(){
    return jdbcURL;
  }
  public String getJdbcUsername(){
    return jdbcUsername;
  }
  public String getJdbcPassword(){
    return jdbcPassword;
  }
  public String getOMDB_API(){
    return OMDB_API;
  }
}