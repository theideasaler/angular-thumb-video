import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxVideoControlsComponent } from './ngx-video-controls.component';

describe('NgxVideoControlsComponent', () => {
  let component: NgxVideoControlsComponent;
  let fixture: ComponentFixture<NgxVideoControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxVideoControlsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxVideoControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
