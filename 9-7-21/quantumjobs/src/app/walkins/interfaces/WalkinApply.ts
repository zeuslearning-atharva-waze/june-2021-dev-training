export interface Datetime {
  date: string;
  starttime: string;
  endtime: string;
}

export interface Venue {
  location_id: number;
  address_line_1: string;
  address_line_2: string;
  pincode: number;
  city: string;
  phone_number: number;
  walk_in_id: number;
}
