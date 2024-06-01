import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseHomeComponent } from './warehouse-home.component';

describe('WarehouseAddComponent', () => {
  let component: WarehouseHomeComponent;
  let fixture: ComponentFixture<WarehouseHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WarehouseHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarehouseHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
