package cinema.utilities;
import java.sql.Time;
public class ExtendTime {
    public static Time getEndTime(Time startTime, int duration) {
        int durationInMilliseconds = duration * 60 * 1000;
        long startimeInMilliseconds = startTime.getTime();
        return new Time(durationInMilliseconds + startimeInMilliseconds);
  }
}
