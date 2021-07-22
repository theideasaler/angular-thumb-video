import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxThumbnailVideoComponent } from './ngx-thumbnail-video.component';

describe('NgxThumbnailVideoComponent', () => {
  let component: NgxThumbnailVideoComponent;
  let fixture: ComponentFixture<NgxThumbnailVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxThumbnailVideoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxThumbnailVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
