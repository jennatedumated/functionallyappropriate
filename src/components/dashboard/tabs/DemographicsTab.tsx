import React from 'react';
import { User, MapPin, Phone, Mail, Calendar, FileText } from 'lucide-react';

const DemographicsTab: React.FC = () => {
  const studentInfo = {
    personalInfo: {
      fullName: 'John Michael Smith',
      preferredName: 'Johnny',
      dateOfBirth: '2015-03-15',
      age: '9 years old',
      grade: '3rd Grade',
      studentId: 'STU-2025-001',
      gender: 'Male',
      ethnicity: 'Hispanic/Latino',
    },
    contactInfo: {
      address: '123 Main Street, Anytown, ST 12345',
      phone: '(555) 123-4567',
      email: 'parent@email.com',
      emergencyContact: 'Maria Smith - (555) 987-6543',
    },
    educationalInfo: {
      program: 'Resource Support',
      primaryDisability: 'Specific Learning Disability',
      secondaryDisability: 'ADHD',
      iepDate: '2024-09-15',
      nextReview: '2025-09-15',
      evaluationDate: '2024-08-01',
      placement: 'General Education with Resource Support',
    },
    medicalInfo: {
      medications: ['Adderall XR 10mg - Morning', 'Melatonin 3mg - Bedtime'],
      allergies: ['Peanuts', 'Tree Nuts'],
      medicalConditions: ['ADHD', 'Mild Asthma'],
      accommodations: ['Extended time', 'Frequent breaks', 'Preferential seating'],
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="flex items-center space-x-2 mb-4">
            <User className="text-purple" size={20} />
            <h3 className="text-lg font-semibold">Personal Information</h3>
          </div>
          
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-text-secondary">Full Name</label>
                <p className="font-medium">{studentInfo.personalInfo.fullName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-text-secondary">Preferred Name</label>
                <p className="font-medium">{studentInfo.personalInfo.preferredName}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-text-secondary">Date of Birth</label>
                <p className="font-medium">{studentInfo.personalInfo.dateOfBirth}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-text-secondary">Age</label>
                <p className="font-medium">{studentInfo.personalInfo.age}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-text-secondary">Student ID</label>
                <p className="font-medium">{studentInfo.personalInfo.studentId}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-text-secondary">Grade</label>
                <p className="font-medium">{studentInfo.personalInfo.grade}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-text-secondary">Gender</label>
                <p className="font-medium">{studentInfo.personalInfo.gender}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-text-secondary">Ethnicity</label>
                <p className="font-medium">{studentInfo.personalInfo.ethnicity}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center space-x-2 mb-4">
            <MapPin className="text-purple" size={20} />
            <h3 className="text-lg font-semibold">Contact Information</h3>
          </div>
          
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-text-secondary flex items-center space-x-1">
                <MapPin size={14} />
                <span>Address</span>
              </label>
              <p className="font-medium">{studentInfo.contactInfo.address}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-text-secondary flex items-center space-x-1">
                <Phone size={14} />
                <span>Phone</span>
              </label>
              <p className="font-medium">{studentInfo.contactInfo.phone}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-text-secondary flex items-center space-x-1">
                <Mail size={14} />
                <span>Email</span>
              </label>
              <p className="font-medium">{studentInfo.contactInfo.email}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-text-secondary">Emergency Contact</label>
              <p className="font-medium">{studentInfo.contactInfo.emergencyContact}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="flex items-center space-x-2 mb-4">
            <FileText className="text-purple" size={20} />
            <h3 className="text-lg font-semibold">Educational Information</h3>
          </div>
          
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-text-secondary">Program</label>
                <p className="font-medium">{studentInfo.educationalInfo.program}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-text-secondary">Placement</label>
                <p className="font-medium text-sm">{studentInfo.educationalInfo.placement}</p>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-text-secondary">Primary Disability</label>
              <p className="font-medium">{studentInfo.educationalInfo.primaryDisability}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-text-secondary">Secondary Disability</label>
              <p className="font-medium">{studentInfo.educationalInfo.secondaryDisability}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-text-secondary">IEP Date</label>
                <p className="font-medium">{studentInfo.educationalInfo.iepDate}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-text-secondary">Next Review</label>
                <p className="font-medium">{studentInfo.educationalInfo.nextReview}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center space-x-2 mb-4">
            <Calendar className="text-purple" size={20} />
            <h3 className="text-lg font-semibold">Medical & Accommodations</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-text-secondary">Medications</label>
              <ul className="mt-1 space-y-1">
                {studentInfo.medicalInfo.medications.map((med, index) => (
                  <li key={index} className="text-sm bg-bg-secondary p-2 rounded">
                    {med}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <label className="text-sm font-medium text-text-secondary">Allergies</label>
              <div className="mt-1 flex flex-wrap gap-2">
                {studentInfo.medicalInfo.allergies.map((allergy, index) => (
                  <span key={index} className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                    {allergy}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-text-secondary">Accommodations</label>
              <ul className="mt-1 space-y-1">
                {studentInfo.medicalInfo.accommodations.map((acc, index) => (
                  <li key={index} className="text-sm flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple rounded-full"></div>
                    <span>{acc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemographicsTab;