import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentMangerComponent } from './document-manger.component';

describe('DocumentMangerComponent', () => {
  let component: DocumentMangerComponent;
  let fixture: ComponentFixture<DocumentMangerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentMangerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentMangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
