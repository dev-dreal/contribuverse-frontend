import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'rich-text-editor',
  standalone: true,
  imports: [CommonModule, QuillModule, ReactiveFormsModule],
  templateUrl: './rich-text-editor.component.html',
  styleUrl: './rich-text-editor.component.scss',
})
export class RichTextEditorComponent {
  quillConfiguration = QuillConfiguration;

  @Input() control!: FormControl;

  ngOnInit() {
    this.control = this.control ?? new FormControl();
  }
}

export const QuillConfiguration = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }, { align: [] }, { font: [] }],
    ['link'],
    ['image', 'video'],
    ['clean'],
  ],
};
