import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerPagePage } from './trainer-page.page';

describe('TrainerPagePage', () => {
  let component: TrainerPagePage;
  let fixture: ComponentFixture<TrainerPagePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainerPagePage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainerPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
