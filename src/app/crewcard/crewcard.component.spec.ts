import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrewcardComponent } from './crewcard.component';

describe('CrewcardComponent', () => {
  let component: CrewcardComponent;
  let fixture: ComponentFixture<CrewcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrewcardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrewcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
