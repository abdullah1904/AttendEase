import { z } from "zod";

export interface Teacher {
    id: number,
    name: string,
    email: string,
    phone: string,
    department: string;
}

export const teacherSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z.string().min(1, { message: "Phone number is required" }),
    department: z.string().min(1, { message: "Department is required" })
});

export type TeacherFormValues = z.infer<typeof teacherSchema>


export const teachers: Teacher[] = [
    { id: 1, name: "Dr. Ahmed Raza", email: "ahmed.raza@university.edu", phone: "03001234567", department: "Computer Science" },
    { id: 2, name: "Prof. Sara Khan", email: "sara.khan@university.edu", phone: "03012345678", department: "Mathematics" },
    { id: 3, name: "Mr. Ali Zafar", email: "ali.zafar@university.edu", phone: "03023456789", department: "Physics" },
    { id: 4, name: "Ms. Hina Malik", email: "hina.malik@university.edu", phone: "03034567890", department: "Chemistry" },
    { id: 5, name: "Dr. Usman Tariq", email: "usman.tariq@university.edu", phone: "03045678901", department: "Biology" },
    { id: 6, name: "Prof. Zainab Shah", email: "zainab.shah@university.edu", phone: "03056789012", department: "English" },
    { id: 7, name: "Mr. Bilal Yousaf", email: "bilal.yousaf@university.edu", phone: "03067890123", department: "Economics" },
    { id: 8, name: "Ms. Ayesha Iqbal", email: "ayesha.iqbal@university.edu", phone: "03078901234", department: "Psychology" },
    { id: 9, name: "Dr. Faisal Mehmood", email: "faisal.mehmood@university.edu", phone: "03089012345", department: "Mechanical Engineering" },
    { id: 10, name: "Prof. Rabia Nadeem", email: "rabia.nadeem@university.edu", phone: "03090123456", department: "Electrical Engineering" },
    { id: 11, name: "Mr. Kamran Javed", email: "kamran.javed@university.edu", phone: "03101234567", department: "Civil Engineering" },
    { id: 12, name: "Ms. Noor Fatima", email: "noor.fatima@university.edu", phone: "03112345678", department: "Fine Arts" },
    { id: 13, name: "Dr. Imran Hashmi", email: "imran.hashmi@university.edu", phone: "03123456789", department: "Philosophy" },
    { id: 14, name: "Prof. Anum Zahra", email: "anum.zahra@university.edu", phone: "03134567890", department: "History" },
    { id: 15, name: "Mr. Shahid Nisar", email: "shahid.nisar@university.edu", phone: "03145678901", department: "Political Science" },
    { id: 16, name: "Ms. Maria Qureshi", email: "maria.qureshi@university.edu", phone: "03156789012", department: "Sociology" },
    { id: 17, name: "Dr. Naveed Akram", email: "naveed.akram@university.edu", phone: "03167890123", department: "Statistics" },
    { id: 18, name: "Prof. Farah Yasmeen", email: "farah.yasmeen@university.edu", phone: "03178901234", department: "Linguistics" },
    { id: 19, name: "Mr. Adnan Latif", email: "adnan.latif@university.edu", phone: "03189012345", department: "Geography" },
    { id: 20, name: "Ms. Sidra Bukhari", email: "sidra.bukhari@university.edu", phone: "03190123456", department: "Environmental Science" }
];