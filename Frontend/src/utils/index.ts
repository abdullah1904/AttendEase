const getDepartmentDetails = (deptId: number): string => {
    switch (deptId) {
        case 1: return "Administration";
        case 2: return "Computer Science";
        case 3: return "Electrical Engineering";
        case 4: return "Mechanical Engineering";
        case 5: return "Civil Engineering";
        case 6: return "Chemical Engineering";
        case 7: return "Software Engineering";
        case 8: return "Information Technology";
        case 9: return "Business Administration";
        case 10: return "Economics";
        case 11: return "Mathematics";
        case 12: return "Physics";
        case 13: return "Chemistry";
        case 14: return "Biology";
        case 15: return "English";
        case 16: return "Psychology";
        case 17: return "Sociology";
        case 18: return "Education";
        case 19: return "Architecture";
        case 20: return "Law";
        case 21: return "Pharmacy";
        case 22: return "Medical Sciences";
        case 23: return "Islamic Studies";
        case 24: return "Environmental Science";
        default: return "Unknown Department";
    }
};

const departmentOptions = [
    { label: 'Computer Science', value: 2 },
    { label: 'Electrical Engineering', value: 3 },
    { label: 'Mechanical Engineering', value: 4 },
    { label: 'Civil Engineering', value: 5 },
    { label: 'Chemical Engineering', value: 6 },
    { label: 'Software Engineering', value: 7 },
    { label: 'Information Technology', value: 8 },
    { label: 'Business Administration', value: 9 },
    { label: 'Economics', value: 10 },
    { label: 'Mathematics', value: 11 },
    { label: 'Physics', value: 12 },
    { label: 'Chemistry', value: 13 },
    { label: 'Biology', value: 14 },
    { label: 'English', value: 15 },
    { label: 'Psychology', value: 16 },
    { label: 'Sociology', value: 17 },
    { label: 'Education', value: 18 },
    { label: 'Architecture', value: 19 },
    { label: 'Law', value: 20 },
    { label: 'Pharmacy', value: 21 },
    { label: 'Medical Sciences', value: 22 },
    { label: 'Islamic Studies', value: 23 },
    { label: 'Environmental Science', value: 24 }
  ];
  

export {
    getDepartmentDetails,
    departmentOptions
}
