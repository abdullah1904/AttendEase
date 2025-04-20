import { Student } from "./student";
import { Teacher } from "./teacher";

export interface Course{
    id: string,
    name: string,
    code: string,
    credits: number,
    department: string,
    teacher: Teacher,
    students: Student[],
}

export const courses: Course[] = [
  {
    id: "course-1",
    name: "Introduction to Programming",
    code: "CS101",
    credits: 3,
    department: "Computer Science",
    teacher: {
      id: 1,
      name: "Dr. Sarah Khan",
      email: "sarah.khan@university.edu",
      phone: "+92 300 1112233",
      department: "Computer Science"
    },
    students: [
      {
        id: "s1",
        name: "Ali Raza",
        email: "ali.raza@student.edu",
        phone: "+92 300 9876543",
        department: "Computer Science",
        section: "A",
        session: "2022-2026",
        overallAttendance: 92
      },
      {
        id: "s2",
        name: "Ayesha Noor",
        email: "ayesha.noor@student.edu",
        phone: "+92 301 1122334",
        department: "Computer Science",
        section: "A",
        session: "2022-2026",
        overallAttendance: 95
      }
    ]
  },
  {
    id: "course-2",
    name: "Object Oriented Programming",
    code: "CS202",
    credits: 4,
    department: "Computer Science",
    teacher: {
      id: 2,
      name: "Prof. Ahmed Sheikh",
      email: "ahmed.sheikh@university.edu",
      phone: "+92 333 4455667",
      department: "Computer Science"
    },
    students: [
      {
        id: "s3",
        name: "Bilal Tariq",
        email: "bilal.tariq@student.edu",
        phone: "+92 322 9988776",
        department: "Computer Science",
        section: "B",
        session: "2021-2025",
        overallAttendance: 88
      }
    ]
  },
  {
    id: "course-3",
    name: "Discrete Mathematics",
    code: "MTH105",
    credits: 3,
    department: "Mathematics",
    teacher: {
      id: 3,
      name: "Dr. Usman Ali",
      email: "usman.ali@university.edu",
      phone: "+92 312 1234567",
      department: "Mathematics"
    },
    students: [
      {
        id: "s4",
        name: "Fatima Zain",
        email: "fatima.zain@student.edu",
        phone: "+92 345 3344556",
        department: "Computer Science",
        section: "C",
        session: "2022-2026",
        overallAttendance: 97
      }
    ]
  },
  {
    id: "course-4",
    name: "Database Systems",
    code: "CS305",
    credits: 4,
    department: "Computer Science",
    teacher: {
      id: 4,
      name: "Dr. Hina Siddiqui",
      email: "hina.siddiqui@university.edu",
      phone: "+92 321 3344556",
      department: "Computer Science"
    },
    students: [
      {
        id: "s5",
        name: "Hamza Khan",
        email: "hamza.khan@student.edu",
        phone: "+92 300 4455667",
        department: "Computer Science",
        section: "A",
        session: "2022-2026",
        overallAttendance: 90
      },
      {
        id: "s6",
        name: "Mariam Akram",
        email: "mariam.akram@student.edu",
        phone: "+92 301 5566778",
        department: "Computer Science",
        section: "A",
        session: "2022-2026",
        overallAttendance: 93
      }
    ]
  },
  {
    id: "course-5",
    name: "Operating Systems",
    code: "CS310",
    credits: 4,
    department: "Computer Science",
    teacher: {
      id: 5,
      name: "Prof. Imran Rafiq",
      email: "imran.rafiq@university.edu",
      phone: "+92 345 6677889",
      department: "Computer Science"
    },
    students: [
      {
        id: "s7",
        name: "Ammar Javed",
        email: "ammar.javed@student.edu",
        phone: "+92 312 7766554",
        department: "Computer Science",
        section: "B",
        session: "2021-2025",
        overallAttendance: 85
      },
      {
        id: "s8",
        name: "Noor Hassan",
        email: "noor.hassan@student.edu",
        phone: "+92 300 1234321",
        department: "Computer Science",
        section: "B",
        session: "2021-2025",
        overallAttendance: 89
      }
    ]
  }
];
