import { Component } from '@angular/core';
import { Case } from '../../model/case';
import { NgForm } from '@angular/forms';
import { Category } from '../../model/category';
import { CaseService } from '../../services/case.service';

@Component({
  selector: 'app-create-case',
  templateUrl: './create-case.component.html',
  styleUrl: './create-case.component.css'
})
export class CreateCaseComponent {

  case: Case = new Case();  // Initialize a new Case instance
  selectedFile: File | null = null;  // To store the selected image file
  categories: Category[] = [];  // Array to store categories
  categoryName: string = '';

  constructor(private caseService: CaseService) {}

  ngOnInit(): void {
    this.loadCategories();  // Load categories when the component initializes
  }

  // Method to fetch categories from the backend
  loadCategories(): void {
    this.caseService.getCategories().subscribe(
      (data: Category[]) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error fetching categories', error);
      }
    );
  }

  // Method to handle file selection
  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  // Method to handle form submission
  onSubmit(form: NgForm) {
    if (form.valid && this.selectedFile) {
      console.log('Selected category:', this.categoryName); // Add this line
      if (this.categoryName) {
        this.case.imagePath = this.selectedFile.name;
        this.caseService.createCase(this.case, this.categoryName).subscribe(
          (response) => {
            console.log('Case created successfully', response);
            // Redirect or clear the form after submission
          },
          (error) => {
            console.error('Error creating case', error);
          }
        );
      } else {
        console.error('Category is not selected.');
      }
    } else {
      if (!this.selectedFile) {
        console.error('Image is not selected.');
      } else {
        console.error('Form is invalid.');
      }
    }
  }
  
}
