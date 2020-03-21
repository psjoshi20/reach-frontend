

function dateStringOf(date) {
    const day = date.getDate();
    const year = date.getFullYear();
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    const month = months[date.getMonth()];
    const printDate = day + " " + month + " " + year;
  
    return printDate;
  }

  

  export default dateStringOf ;