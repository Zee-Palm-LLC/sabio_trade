// Email Storage Service - Manages email submission state across pages
// Uses in-memory storage (not localStorage)

let submittedEmail: string | null = null;

export class EmailStorageService {
  // Store email that was submitted
  static setSubmittedEmail(email: string): void {
    submittedEmail = email.trim().toLowerCase();
    console.log('EmailStorageService - Email stored:', submittedEmail);
  }

  // Get the submitted email
  static getSubmittedEmail(): string | null {
    return submittedEmail;
  }

  // Check if email was already submitted
  static hasEmailBeenSubmitted(): boolean {
    return submittedEmail !== null;
  }

  // Clear the submitted email (optional, for cleanup)
  static clearSubmittedEmail(): void {
    submittedEmail = null;
    console.log('EmailStorageService - Email cleared');
  }
}

