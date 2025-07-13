const parseDate = (dateString) => {
    // Date string format: "DD.MM.YYYY HH:mm"
    const [datePart, timePart] = dateString.split(' ');
    const [day, month, year] = datePart.split('.').map(Number);
    const [hours, minutes] = timePart.split(':').map(Number);
  
    // Create and return the Date object (note: months are 0-indexed in JS, so subtract 1 from month)
    return new Date(year, month - 1, day, hours, minutes);
  };
  