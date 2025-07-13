// Shift.ts
interface Shift {
    start_date: string;
    end_date: string | null;
    user_identifier: string;
    logins: {
      place_name: string;
      login_time: string;
      logout_time: string;
      place_id: string;
    }[];
    total_completed_violations: number | null;
    created_at: string;
}

export default Shift;
