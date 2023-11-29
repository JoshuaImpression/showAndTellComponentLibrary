export default function formatDate(inputDate) {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    if(inputDate) {
      let splitDate = inputDate.split('T');
      const dateString = splitDate[0];
    
      const date = new Date(dateString);
      const day = date.getDate();
      const monthIndex = date.getMonth();
      const year = date.getFullYear();
    
      let daySuffix;
      if (day === 1 || day === 21 || day === 31) {
        daySuffix = "st";
      } else if (day === 2 || day === 22) {
        daySuffix = "nd";
      } else if (day === 3 || day === 23) {
        daySuffix = "rd";
      } else {
        daySuffix = "th";
      }
    
      const formattedDate = `${day}${daySuffix} ${months[monthIndex]} ${year}`;
      return formattedDate;
    }
  }