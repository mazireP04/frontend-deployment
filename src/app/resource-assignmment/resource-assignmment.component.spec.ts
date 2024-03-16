import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceAssignmmentComponent } from './resource-assignmment.component';

describe('ResourceAssignmmentComponent', () => {
  let component: ResourceAssignmmentComponent;
  let fixture: ComponentFixture<ResourceAssignmmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResourceAssignmmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResourceAssignmmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
