import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumQuestionsComponent } from './forum-questions.component';

describe('ForumQuestionsComponent', () => {
  let component: ForumQuestionsComponent;
  let fixture: ComponentFixture<ForumQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForumQuestionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForumQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
