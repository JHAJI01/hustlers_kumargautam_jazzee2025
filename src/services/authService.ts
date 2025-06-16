import { User } from '../types';

// Mock authentication service with Indian names
export class AuthService {
  private static users: User[] = [
    {
      id: '1',
      email: 'patient@example.com',
      name: 'Rahul Sharma',
      role: 'patient',
      phone: '+91-9876543210',
      isVerified: true,
      createdAt: new Date(),
    },
    {
      id: '2',
      email: 'doctor@example.com',
      name: 'Dr. Priya Patel',
      role: 'doctor',
      phone: '+91-9876543211',
      isVerified: true,
      createdAt: new Date(),
    },
    {
      id: '3',
      email: 'anita.singh@gmail.com',
      name: 'Anita Singh',
      role: 'patient',
      phone: '+91-9876543212',
      isVerified: true,
      createdAt: new Date(),
    },
    {
      id: '4',
      email: 'dr.rajesh@hospital.com',
      name: 'Dr. Rajesh Kumar',
      role: 'doctor',
      phone: '+91-9876543213',
      isVerified: true,
      createdAt: new Date(),
    },
  ];

  static async login(email: string, password: string): Promise<User> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const user = this.users.find(u => u.email === email);
    if (!user) {
      throw new Error('User not found. Please check your email address.');
    }

    // In a real app, verify password hash
    if (password !== 'password123') {
      throw new Error('Invalid password. Please try again.');
    }

    return user;
  }

  static async signup(userData: {
    email: string;
    password: string;
    name: string;
    role: 'patient' | 'doctor';
    phone?: string;
  }): Promise<User> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const existingUser = this.users.find(u => u.email === userData.email);
    if (existingUser) {
      throw new Error('An account with this email already exists. Please use a different email or try logging in.');
    }

    // Validate Indian phone number format
    if (userData.phone && !/^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/.test(userData.phone.replace(/[\s\-\(\)]/g, ''))) {
      throw new Error('Please enter a valid Indian phone number (e.g., +91-9876543210)');
    }

    const newUser: User = {
      id: Math.random().toString(36).substring(7),
      email: userData.email,
      name: userData.name,
      role: userData.role,
      phone: userData.phone,
      isVerified: userData.role === 'patient', // Auto-verify patients, manual for doctors
      createdAt: new Date(),
    };

    this.users.push(newUser);
    return newUser;
  }

  static async getCurrentUser(): Promise<User | null> {
    // Check localStorage for user session
    const userJson = localStorage.getItem('currentUser');
    if (userJson) {
      try {
        return JSON.parse(userJson);
      } catch (error) {
        // Clear invalid session data
        localStorage.removeItem('currentUser');
        return null;
      }
    }
    return null;
  }

  static async logout(): Promise<void> {
    localStorage.removeItem('currentUser');
    // In a real app, also invalidate server-side session
  }

  static setCurrentUser(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  static async resetPassword(email: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = this.users.find(u => u.email === email);
    if (!user) {
      throw new Error('No account found with this email address.');
    }
    
    // In a real app, send password reset email
    console.log(`Password reset email sent to ${email}`);
  }
}