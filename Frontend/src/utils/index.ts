
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

export {
    getDepartmentDetails
}
