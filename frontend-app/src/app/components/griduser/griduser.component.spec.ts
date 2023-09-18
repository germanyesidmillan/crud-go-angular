import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GriduserComponent } from './griduser.component';

describe('GriduserComponent', () => {
  let component: GriduserComponent;
  let fixture: ComponentFixture<GriduserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GriduserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GriduserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
