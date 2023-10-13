package cinema.pojos;

import java.sql.Timestamp;
import java.time.Instant;

public class TicketRequest {
    public long showId;
    public long userId;
    public Timestamp timestamp = Timestamp.from(Instant.now());
    public int seats;
}
