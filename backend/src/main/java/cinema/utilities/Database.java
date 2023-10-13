package cinema.utilities;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class Database {
  private Connection connection = null;
  private DotEnv dotenv = new DotEnv();
  public Connection connect_to_db(){
    try {
      connection = DriverManager.getConnection(dotenv.getJdbcURL(), dotenv.getJdbcUsername(), dotenv.getJdbcPassword());
        if (connection != null) {
          System.out.println("Connected to the PostgreSQL database");
          } else {
            System.out.println("Failed to connect to the database");
          }
      } catch (SQLException e) {
          e.printStackTrace();
      }
    return connection;
  }
  public void close(){
    try {
      connection.close();
    } catch (SQLException e) {
      e.printStackTrace();
    }
  }
}

