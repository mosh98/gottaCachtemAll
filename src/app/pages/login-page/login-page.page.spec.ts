import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPagePage } from './login-page.page';

describe('LoginPagePage', () => {
  let component: LoginPagePage;
  let fixture: ComponentFixture<LoginPagePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginPagePage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
