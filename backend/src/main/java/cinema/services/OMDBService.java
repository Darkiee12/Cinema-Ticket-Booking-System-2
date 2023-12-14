// package cinema.services;
// import org.springframework.stereotype.Service;
// import org.springframework.web.reactive.function.client.WebClient;
// import cinema.utilities.DotEnv;
// import reactor.core.publisher.Mono;

// @Service
// public class OMDBService {
//     public static DotEnv dotenv = new DotEnv(); 
//     private final WebClient webClient;
//     private static final String OMDB_API_KEY = dotenv.getOMDB_API(); // Replace with your OMDB API key

//     public OMDBService() {
//         this.webClient = WebClient.create("http://www.omdbapi.com");
//     }

//     public Mono<String> searchMoviesByTitle(String title) {
//         String url = "/?apikey=" + OMDB_API_KEY + "&s=" + title;
        
//         return webClient.get()
//             .uri(url)
//             .retrieve()
//             .bodyToMono(String.class);
//     }
// }
