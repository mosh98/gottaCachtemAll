import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CataloguePagePage } from './catalogue-page.page';

describe('CataloguePagePage', () => {
  let component: CataloguePagePage;
  let fixture: ComponentFixture<CataloguePagePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CataloguePagePage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CataloguePagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
