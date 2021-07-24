export interface Walkin {
  GUID: string;
  walk_in_id: number;
  title: string;
  startdate: string;
  enddate: string;
  location?: string;
  jobroles: string[];
  internship?: string;
}

export interface Location {
  walk_in_id: number;
  city: string;
  pincode: number;
}

export interface WalkinRoleMap {
  walk_in_id: number;
  role_id: number;
  title: string;
}

export interface JobRole {
  role_id: number;
  title: string;
}

export interface Internship {
  walk_in_id: number;
  internship_id: number;
  degree: string;
}
