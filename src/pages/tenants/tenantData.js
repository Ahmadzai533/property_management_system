// src/data/tenantData.js
export const generateTenants = (count) => {
  const firstNames = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emma', 'James', 'Lisa', 'Robert', 'Maria'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
  const properties = ['Sunset Tower', 'Ocean View', 'Park Residence', 'City Center', 'Green Valley', 'Riverside'];
  const units = ['A101', 'B202', 'C303', 'D404', 'E505', 'F606', 'G707', 'H808'];
  const statuses = ['Active', 'Active', 'Active', 'Inactive', 'Pending', 'Expired'];
  const genders = ['Male', 'Female'];
  const countries = ['USA', 'Canada', 'UK', 'Australia', 'Germany'];
  const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];
  const districts = ['Downtown', 'Uptown', 'Midtown', 'Westside', 'Eastside'];
  const relationships = ['Spouse', 'Parent', 'Sibling', 'Friend'];

  return Array.from({ length: count }, (_, i) => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const property = properties[Math.floor(Math.random() * properties.length)];
    const unit = units[Math.floor(Math.random() * units.length)];
    const monthlyRent = Math.floor(Math.random() * 2000) + 500;
    const leaseStart = `2024-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`;
    const leaseEnd = `2025-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`;
    
    return {
      id: `TEN-${String(i + 1).padStart(4, '0')}`,
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.com`,
      phone: `+1 ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      avatar: `https://i.pravatar.cc/150?img=${i + 1}`,
      property,
      unit,
      leaseStart,
      leaseEnd,
      monthlyRent,
      status,
      gender: genders[Math.floor(Math.random() * genders.length)],
      dateOfBirth: `199${Math.floor(Math.random() * 9)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
      nationalId: `ID-${String(Math.floor(Math.random() * 1000000)).padStart(6, '0')}`,
      country: countries[Math.floor(Math.random() * countries.length)],
      city: cities[Math.floor(Math.random() * cities.length)],
      district: districts[Math.floor(Math.random() * districts.length)],
      streetAddress: `${Math.floor(Math.random() * 999) + 1} Main St`,
      postalCode: `${String(Math.floor(Math.random() * 90000) + 10000)}`,
      floor: Math.floor(Math.random() * 20) + 1,
      leaseNumber: `L-${String(Math.floor(Math.random() * 100000)).padStart(5, '0')}`,
      contractDuration: `${Math.floor(Math.random() * 24) + 12} months`,
      securityDeposit: Math.floor(monthlyRent * 1.5),
      advancePayment: Math.floor(monthlyRent * 1),
      emergencyContact: {
        name: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
        relationship: relationships[Math.floor(Math.random() * relationships.length)],
        phone: `+1 ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`
      },
      payments: Array.from({ length: 6 }, (_, j) => ({
        id: `PAY-${j + 1}`,
        date: `2024-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
        amount: monthlyRent,
        status: ['Paid', 'Paid', 'Paid', 'Pending', 'Overdue'][Math.floor(Math.random() * 5)],
        method: ['Bank Transfer', 'Credit Card', 'Cash', 'Check'][Math.floor(Math.random() * 4)]
      })),
      invoices: Array.from({ length: 3 }, (_, j) => ({
        id: `INV-${j + 1}`,
        date: `2024-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
        amount: monthlyRent,
        status: ['Paid', 'Pending', 'Overdue'][Math.floor(Math.random() * 3)]
      })),
      documents: [
        { name: 'Lease Agreement', type: 'PDF', date: '2024-01-15' },
        { name: 'Government ID', type: 'Image', date: '2024-01-10' },
        { name: 'Proof of Income', type: 'PDF', date: '2024-01-05' }
      ],
      maintenanceRequests: Array.from({ length: 3 }, (_, j) => ({
        id: `MR-${j + 1}`,
        title: ['Plumbing Issue', 'Electrical Problem', 'HVAC Repair', 'Painting Request'][Math.floor(Math.random() * 4)],
        date: `2024-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
        status: ['Pending', 'In Progress', 'Completed', 'Cancelled'][Math.floor(Math.random() * 4)],
        priority: ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)]
      }))
    };
  });
};