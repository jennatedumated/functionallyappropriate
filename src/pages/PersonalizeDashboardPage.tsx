import React, { useState } from 'react';
import { Upload, Plus, Check, Users, FileText, Settings, ArrowRight, Download, AlertCircle, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Student {
  id: number;
  firstName: string;
  lastName: string;
  ssid: string;
  address: string;
  grade: string;
  caseManager: string;
  parent1Name: string;
  parent1Email: string;
  parent1Phone: string;
  parent2Name?: string;
  parent2Email?: string;
  parent2Phone?: string;
}

const PersonalizeDashboardPage: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [showManualForm, setShowManualForm] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [dragActive, setDragActive] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    ssid: '',
    address: '',
    grade: '',
    caseManager: '',
    parent1Name: '',
    parent1Email: '',
    parent1Phone: '',
    parent2Name: '',
    parent2Email: '',
    parent2Phone: '',
  });

  const grades = [
    'Pre-K', 'Kindergarten', '1st Grade', '2nd Grade', '3rd Grade', '4th Grade', '5th Grade',
    '6th Grade', '7th Grade', '8th Grade', '9th Grade', '10th Grade', '11th Grade', '12th Grade'
  ];

  const mandatoryColumns = [
    'Student First Name',
    'Student Last Name', 
    'SSID (State Student ID)',
    'Address',
    'Grade',
    'Case Manager',
    'Parent 1 Name',
    'Parent 1 Email',
    'Parent 1 Phone Number'
  ];

  const optionalColumns = [
    'Parent 2 Name',
    'Parent 2 Email', 
    'Parent 2 Phone Number'
  ];

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newStudent: Student = {
      id: students.length + 1,
      firstName: formData.firstName,
      lastName: formData.lastName,
      ssid: formData.ssid,
      address: formData.address,
      grade: formData.grade,
      caseManager: formData.caseManager,
      parent1Name: formData.parent1Name,
      parent1Email: formData.parent1Email,
      parent1Phone: formData.parent1Phone,
      parent2Name: formData.parent2Name || undefined,
      parent2Email: formData.parent2Email || undefined,
      parent2Phone: formData.parent2Phone || undefined,
    };

    setStudents(prev => [...prev, newStudent]);
    
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      ssid: '',
      address: '',
      grade: '',
      caseManager: '',
      parent1Name: '',
      parent1Email: '',
      parent1Phone: '',
      parent2Name: '',
      parent2Email: '',
      parent2Phone: '',
    });

    // Show success message briefly
    setTimeout(() => {
      const successMsg = document.getElementById('success-message');
      if (successMsg) {
        successMsg.style.display = 'block';
        setTimeout(() => {
          successMsg.style.display = 'none';
        }, 3000);
      }
    }, 100);
  };

  const handleFileUpload = (file: File) => {
    setUploadStatus('uploading');
    
    // Simulate file processing
    setTimeout(() => {
      // Mock successful upload with sample students
      const mockStudents: Student[] = [
        {
          id: 1,
          firstName: 'John',
          lastName: 'Smith',
          ssid: 'ST001234567',
          address: '123 Main St, Anytown, ST 12345',
          grade: '3rd Grade',
          caseManager: 'Sarah Johnson',
          parent1Name: 'Maria Smith',
          parent1Email: 'maria.smith@email.com',
          parent1Phone: '(555) 123-4567',
        },
        {
          id: 2,
          firstName: 'Emily',
          lastName: 'Johnson',
          ssid: 'ST001234568',
          address: '456 Oak Ave, Anytown, ST 12345',
          grade: '4th Grade',
          caseManager: 'Sarah Johnson',
          parent1Name: 'David Johnson',
          parent1Email: 'david.johnson@email.com',
          parent1Phone: '(555) 234-5678',
          parent2Name: 'Lisa Johnson',
          parent2Email: 'lisa.johnson@email.com',
          parent2Phone: '(555) 234-5679',
        },
        {
          id: 3,
          firstName: 'Michael',
          lastName: 'Davis',
          ssid: 'ST001234569',
          address: '789 Pine Rd, Anytown, ST 12345',
          grade: '2nd Grade',
          caseManager: 'Sarah Johnson',
          parent1Name: 'Jennifer Davis',
          parent1Email: 'jennifer.davis@email.com',
          parent1Phone: '(555) 345-6789',
        },
      ];
      
      setStudents(mockStudents);
      setUploadStatus('success');
    }, 2000);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const downloadTemplate = () => {
    // Create CSV template
    const headers = [...mandatoryColumns, ...optionalColumns];
    const csvContent = headers.join(',') + '\n';
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bettersped_student_roster_template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const isFormValid = () => {
    return formData.firstName && formData.lastName && formData.ssid && 
           formData.address && formData.grade && formData.caseManager &&
           formData.parent1Name && formData.parent1Email && formData.parent1Phone;
  };

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple rounded-lg flex items-center justify-center">
                <Users className="text-white" size={20} />
              </div>
              <span className="text-xl font-semibold">BetterSped</span>
            </div>
            <div className="text-sm text-text-secondary">
              Step 1 of 2: Add Students
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            ⚠️ Warning: May cause extreme organization.
          </h1>
          <h2 className="text-2xl sm:text-3xl font-semibold text-purple mb-6">
            Welcome to BetterSped!
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Adding your student data is crucial for BetterSped to become a powerful tool for you. 
            Let's get your student roster set up so you can start managing IEPs, goals, and reports more efficiently.
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-purple text-white rounded-full flex items-center justify-center font-semibold">
                1
              </div>
              <span className="ml-2 font-medium text-purple">Add Students</span>
            </div>
            <div className="w-12 h-0.5 bg-border"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-border text-text-secondary rounded-full flex items-center justify-center font-semibold">
                2
              </div>
              <span className="ml-2 text-text-secondary">Enhance Profiles</span>
            </div>
          </div>
        </div>

        {/* Students Added Counter */}
        {students.length > 0 && (
          <div className="mb-8 p-4 bg-green/10 border border-green/20 rounded-xl">
            <div className="flex items-center justify-center space-x-2">
              <Check className="text-green" size={20} />
              <span className="font-medium text-green">
                {students.length} student{students.length !== 1 ? 's' : ''} added successfully!
              </span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Option 1: Upload Spreadsheet */}
          <div className="card">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-purple/20 rounded-lg flex items-center justify-center">
                <Upload className="text-purple" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-text-primary">
                  Option 1: Upload Your Student Roster
                </h3>
                <p className="text-sm text-green font-medium">(Recommended for multiple students)</p>
              </div>
            </div>
            
            <p className="text-text-secondary mb-6">
              Quickly import student data by uploading a spreadsheet. BetterSped will create a profile 
              for each student based on the provided information.
            </p>

            {/* Mandatory Columns */}
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <div className="flex items-start space-x-2 mb-3">
                <AlertCircle className="text-red-600 dark:text-red-400 mt-0.5" size={20} />
                <div>
                  <h4 className="font-semibold text-red-700 dark:text-red-300">Crucial Note:</h4>
                  <p className="text-sm text-red-600 dark:text-red-400">
                    Your spreadsheet must include the following columns for BetterSped to properly create student profiles:
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {mandatoryColumns.map((column, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-sm font-medium text-red-700 dark:text-red-300">{column}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-3 border-t border-red-200 dark:border-red-800">
                <p className="text-sm text-red-600 dark:text-red-400">
                  <strong>Optional columns:</strong> {optionalColumns.join(', ')}
                </p>
              </div>
            </div>

            {/* File Upload Area */}
            <div
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                dragActive 
                  ? 'border-purple bg-purple/5' 
                  : uploadStatus === 'success'
                  ? 'border-green bg-green/5'
                  : 'border-border hover:border-purple/50'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {uploadStatus === 'uploading' ? (
                <div className="space-y-4">
                  <div className="w-12 h-12 border-4 border-purple border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="text-purple font-medium">Processing your file...</p>
                </div>
              ) : uploadStatus === 'success' ? (
                <div className="space-y-4">
                  <Check className="w-12 h-12 text-green mx-auto" />
                  <p className="text-green font-medium">File uploaded successfully!</p>
                  <p className="text-sm text-text-secondary">{students.length} students imported</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <Upload className="w-12 h-12 text-text-secondary mx-auto" />
                  <div>
                    <p className="text-lg font-medium text-text-primary mb-2">
                      Drop your spreadsheet here or click to browse
                    </p>
                    <p className="text-sm text-text-secondary">
                      Accepted formats: .csv, .xlsx, .xls
                    </p>
                  </div>
                  <input
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    onChange={handleFileInput}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="inline-flex items-center px-6 py-3 bg-purple text-white font-semibold rounded-lg hover:bg-purple/90 transition-colors cursor-pointer"
                  >
                    <Upload className="mr-2" size={20} />
                    Upload Student Roster
                  </label>
                </div>
              )}
            </div>

            <div className="mt-4 flex justify-center">
              <button
                onClick={downloadTemplate}
                className="inline-flex items-center text-sm text-purple hover:underline"
              >
                <Download className="mr-1" size={16} />
                Download Template Spreadsheet
              </button>
            </div>
          </div>

          {/* Option 2: Manual Entry */}
          <div className="card">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-purple/20 rounded-lg flex items-center justify-center">
                <Plus className="text-purple" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-text-primary">
                  Option 2: Add a Single Student Manually
                </h3>
              </div>
            </div>
            
            <p className="text-text-secondary mb-6">
              Enter student details one by one using the form below.
            </p>

            {!showManualForm ? (
              <button
                onClick={() => setShowManualForm(true)}
                className="w-full py-4 border-2 border-dashed border-border hover:border-purple/50 rounded-lg text-text-secondary hover:text-purple transition-all"
              >
                <Plus className="w-8 h-8 mx-auto mb-2" />
                <span className="font-medium">Click to add a student manually</span>
              </button>
            ) : (
              <form onSubmit={handleAddStudent} className="space-y-4">
                {/* Success Message */}
                <div id="success-message" className="hidden p-3 bg-green/10 border border-green/20 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Check className="text-green" size={16} />
                    <span className="text-green font-medium">
                      Student {formData.firstName} {formData.lastName} added successfully!
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-bg-primary focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-bg-primary focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">
                      SSID (State Student ID) *
                    </label>
                    <input
                      type="text"
                      value={formData.ssid}
                      onChange={(e) => handleInputChange('ssid', e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-bg-primary focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">
                      Grade *
                    </label>
                    <select
                      value={formData.grade}
                      onChange={(e) => handleInputChange('grade', e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-bg-primary focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent"
                      required
                    >
                      <option value="">Select Grade</option>
                      {grades.map(grade => (
                        <option key={grade} value={grade}>{grade}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">
                    Address *
                  </label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-bg-primary focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent"
                    rows={2}
                    placeholder="Street, City, State, ZIP"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">
                    Case Manager *
                  </label>
                  <input
                    type="text"
                    value={formData.caseManager}
                    onChange={(e) => handleInputChange('caseManager', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-bg-primary focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent"
                    placeholder="Your name or assigned case manager"
                    required
                  />
                </div>

                {/* Parent 1 Information */}
                <div className="border-t border-border pt-4">
                  <h4 className="font-medium text-text-primary mb-3">Parent/Guardian 1 Information *</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-1">
                        Name *
                      </label>
                      <input
                        type="text"
                        value={formData.parent1Name}
                        onChange={(e) => handleInputChange('parent1Name', e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-bg-primary focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-1">
                          Email *
                        </label>
                        <input
                          type="email"
                          value={formData.parent1Email}
                          onChange={(e) => handleInputChange('parent1Email', e.target.value)}
                          className="w-full px-3 py-2 border border-border rounded-lg bg-bg-primary focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-1">
                          Phone *
                        </label>
                        <input
                          type="tel"
                          value={formData.parent1Phone}
                          onChange={(e) => handleInputChange('parent1Phone', e.target.value)}
                          className="w-full px-3 py-2 border border-border rounded-lg bg-bg-primary focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent"
                          placeholder="(555) 123-4567"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Parent 2 Information */}
                <div className="border-t border-border pt-4">
                  <h4 className="font-medium text-text-primary mb-3">Parent/Guardian 2 Information (Optional)</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        value={formData.parent2Name}
                        onChange={(e) => handleInputChange('parent2Name', e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-bg-primary focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          value={formData.parent2Email}
                          onChange={(e) => handleInputChange('parent2Email', e.target.value)}
                          className="w-full px-3 py-2 border border-border rounded-lg bg-bg-primary focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-1">
                          Phone
                        </label>
                        <input
                          type="tel"
                          value={formData.parent2Phone}
                          onChange={(e) => handleInputChange('parent2Phone', e.target.value)}
                          className="w-full px-3 py-2 border border-border rounded-lg bg-bg-primary focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent"
                          placeholder="(555) 123-4567"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4">
                  <button
                    type="button"
                    onClick={() => setShowManualForm(false)}
                    className="flex items-center text-text-secondary hover:text-text-primary transition-colors"
                  >
                    <X className="mr-1" size={16} />
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!isFormValid()}
                    className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all ${
                      isFormValid()
                        ? 'bg-purple text-white hover:bg-purple/90'
                        : 'bg-bg-secondary text-text-secondary cursor-not-allowed'
                    }`}
                  >
                    <Plus className="mr-2" size={20} />
                    Add Student
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Next Steps Section */}
        {students.length > 0 && (
          <div className="card mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-purple/20 rounded-lg flex items-center justify-center">
                <Settings className="text-purple" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-text-primary">
                What's Next for Your Student Profiles?
              </h3>
            </div>
            
            <p className="text-text-secondary mb-6">
              Once your students are added, you can further enrich each profile with critical details. 
              For each student, you will be able to:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <button className="p-4 border border-border rounded-lg hover:border-purple/30 transition-all text-left">
                <div className="flex items-center space-x-3 mb-2">
                  <FileText className="text-purple" size={20} />
                  <span className="font-medium">Upload Most Recent IEP</span>
                </div>
                <p className="text-sm text-text-secondary">
                  Import existing IEP documents to automatically populate goals and accommodations
                </p>
              </button>
              
              <button className="p-4 border border-border rounded-lg hover:border-purple/30 transition-all text-left">
                <div className="flex items-center space-x-3 mb-2">
                  <Users className="text-purple" size={20} />
                  <span className="font-medium">Add More Student Details</span>
                </div>
                <p className="text-sm text-text-secondary">
                  Include primary disability, IEP due dates, reevaluation dates, specific accommodations, and service hours
                </p>
              </button>
            </div>

            <div className="text-center">
              <Link
                to="/app/dashboard"
                className="inline-flex items-center px-8 py-4 bg-purple text-white text-lg font-semibold rounded-xl hover:bg-purple/90 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Go to Dashboard
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </div>
          </div>
        )}

        {/* Students List */}
        {students.length > 0 && (
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Added Students ({students.length})</h3>
            <div className="space-y-3">
              {students.map((student) => (
                <div key={student.id} className="flex items-center justify-between p-3 bg-bg-secondary rounded-lg">
                  <div>
                    <h4 className="font-medium">{student.firstName} {student.lastName}</h4>
                    <p className="text-sm text-text-secondary">
                      {student.grade} • Case Manager: {student.caseManager}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 bg-green/20 text-green text-xs rounded-full">
                      Added
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action for Empty State */}
        {students.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-text-secondary mx-auto mb-4 opacity-30" />
            <h3 className="text-xl font-semibold text-text-primary mb-2">
              Ready to get started?
            </h3>
            <p className="text-text-secondary mb-6">
              Add your first student using either the spreadsheet upload or manual entry above.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalizeDashboardPage;