export var patientRecords = [
  {
    id: 1,
    basicInfo: {
      name: 'Youssef Hamdi',
      maritalStatus: 'single',
      smoking: 'yes',
      bloodType: 'O+',
      familyHistory: 'Irrelevant',
      alcohol: 'No',
      drugAllergy: 'Sulpha',
      foodAllergy: 'beans',
    },
    insurerInfo: {},
    prescriptions: [
      {
        id: '012',
        dateAndTime: 'Tue, Feb 05 2024, 3:35 PM',
        prescribedDrugs: [
          {
            name: 'Aspirin',
            activeIngredient: 'Salicylate',
            directions: '1 x 3 x 7',
            quantity: '7',
          },
          {
            name: 'Panadol',
            activeIngredient: 'Paracetamol',
            directions: '1 x 3 x 7',
            quantity: '7',
          },
        ],
        diagnosis: {
          generalDiagnosis: 'IHD',
          detailedDiagnosis: 'Acute Myocardial Infarction',
          generalCondition: 'average',
        },
        generalComment:
          'Patient is Stable and need treatment for less than 21 days.',
      },
      {
        id: '014',
        dateAndTime: 'Mon, Mar 24 2024, 5:47 PM',
        prescribedDrugs: [
          {
            name: 'Aspirin',
            activeIngredient: 'Salicylate',
            directions: '1 x 3 x 7',
            quantity: '7',
          },
        ],
        diagnosis: {
          generalDiagnosis: 'IHD',
          detailedDiagnosis: 'Acute Myocardial Infarction',
          generalCondition: 'average',
        },
      },
    ],
    labs: [],
    scans: [],
    vitalData: [],
    treatmentPlans: [],
    reports: [],
  },
  {
    id: 2,
    basicInfo: {
      name: 'Ahmed Hamdi',
      maritalStatus: 'Married',
      smoking: 'No',
      bloodType: 'A+',
      familyHistory: 'Irrelevant',
      alcohol: 'No',
      drugAllergy: '',
      foodAllergy: '',
    },
    insurerInfo: [],
    prescriptions: [
      {
        id: '012',
        dateAndTime: 'Tue, Feb 05 2024, 3:35 PM',
        prescribedDrugs: [
          {
            name: 'Aspirin',
            activeIngredient: 'Salicylate',
            directions: '1 x 3 x 7',
            quantity: '7',
          },
          {
            name: 'Panadol',
            activeIngredient: 'Paracetamol',
            directions: '1 x 3 x 7',
            quantity: '7',
          },
        ],
        diagnosis: {
          generalDiagnosis: 'IHD',
          detailedDiagnosis: 'Acute Myocardial Infarction',
          generalCondition: 'average',
        },
      },
      {
        id: '014',
        dateAndTime: 'Tue, Feb 05 2024, 3:35 PM',
        prescribedDrugs: [
          {
            name: 'Aspirin',
            activeIngredient: 'Salicylate',
            directions: '1 x 3 x 7',
            quantity: '7',
          },
        ],
        diagnosis: {
          generalDiagnosis: 'IHD',
          detailedDiagnosis: 'Acute Myocardial Infarction',
          generalCondition: 'average',
        },
      },
    ],
    labs: [],
    scans: [],
    vitalData: [],
    treatmentPlans: [],
    reports: [],
  },
];

export const settings = {
  physician: {
    user: {
      email: 'youssef7amdi@self.com',
      mobile: '01111630525',
    },
    profile: {
      fullName: 'Youssef Hamdi',
      nationalId: '16561516861565',
      gender: 'male',
      birthDate: new Date(2000, 9, 27).toUTCString(),
    },
    professional: {
      title: 'Cardiology',
      about: 'cardiologist',
      education: 'alazhar university',
      profilePicture: 'link',
    },
    shift: {
      name: 'shift Name',
      description: 'shift Description',
      days: 'sat, mon, wed',
      starts: '8 AM',
      ends: '3 PM',
      examinationPeriod: '10 Min',
    },
    service: {
      name: 'service Name',
      description: 'service Description',
      price: '300 LE',
    },
    syndicate: {},
  },
  clinic: {
    basicInfo: {
      clinicTitle: 'title',
      name: 'clinic Name',
      about: 'clinic information',
      phone: 'clinic phone',
      logo: 'logo',
    },
    address: {
      country: 'Egypt',
      city: 'Giza',
      district: 'Galatma',
      street: 'street',
      landmark: 'landmark',
      buildingNumber: 'building No..',
      floorNumber: 'Floor No..',
      apartmentNumber: 'Apartment No..',
    },
    legal: {},
    media: {},
  },
  manageCards: {},
};
