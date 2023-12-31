const month: { [key: string]: string } = {
  "01": "Jan",
  "02": "Feb",
  "03": "Mar",
  "04": "Apr",
  "05": "May",
  "06": "June",
  "07": "July",
  "08": "Aug",
  "09": "Sept",
  "10": "Oct",
  "11": "Nov",
  "12": "Dec",
};

export function dateConverter(date: string): string {
  const [yyyy, mm, dd] = date.split("-");
  return `${dd} ${month[mm]} ${yyyy}`;
}
