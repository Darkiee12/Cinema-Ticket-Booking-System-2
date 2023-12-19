// package cinema.controllers;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// import jakarta.persistence.*;
// import java.sql.ResultSet;
// import java.sql.ResultSetMetaData;
// import java.util.ArrayList;
// import java.util.List;

// @RestController
// @RequestMapping("/api/data")
// public class SQLController {

//     @PersistenceContext
//     private EntityManager entityManager;

//     @GetMapping("/fetch/{query}")
//     public List<Object[]> fetchData(@PathVariable String query) {
//         List<Object[]> resultData = new ArrayList<>();

//         try {
//             // Execute your SQL script and retrieve the ResultSet
//             ResultSet rs = entityManager.createNativeQuery(query)

//             ResultSetMetaData metaData = rs.getMetaData();
//             int numberOfColumns = metaData.getColumnCount();

//             while (rs.next()) {
//                 Object[] rowData = new Object[numberOfColumns];
//                 for (int i = 1; i <= numberOfColumns; i++) {
//                     rowData[i - 1] = rs.getObject(i);
//                 }
//                 resultData.add(rowData);
//             }
//         } catch (Exception e) {
//             // Handle exceptions appropriately
//             e.printStackTrace();
//         }

//         return resultData;
//     }
// }