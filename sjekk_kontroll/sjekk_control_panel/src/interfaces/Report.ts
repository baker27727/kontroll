interface ReportInnerDetails {
    total_parking_time: number;
    total_parkings: number;
    average_parking_time: number;
    revenue?: number; // Optional because of the default value
  }
  
  interface Report {
    _id: string
    filename: string;
    filetype: 'car_log' | 'accounting';
    link: string; // Optional because of the default value, can be null
    notes: string;
    report_inner_details: ReportInnerDetails;
    created_at: string;
}


export default Report