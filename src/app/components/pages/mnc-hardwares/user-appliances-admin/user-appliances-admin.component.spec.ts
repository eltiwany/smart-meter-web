import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAppliancesAdminComponent } from './user-appliances-admin.component';

describe('UserAppliancesAdminComponent', () => {
  let component: UserAppliancesAdminComponent;
  let fixture: ComponentFixture<UserAppliancesAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAppliancesAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAppliancesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
