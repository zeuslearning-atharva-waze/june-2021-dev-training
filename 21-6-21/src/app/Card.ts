export class Card {
  courseDetails: {
    name: string;
    units: string;
    lessons: string;
    topics: string;
    startdate: string;
    enddate: string;
    students: string;
    isExpired: boolean;
  };
  image: string;
  subject: {
    name: string;
    grade: string;
  };
  classes: string[];
}
