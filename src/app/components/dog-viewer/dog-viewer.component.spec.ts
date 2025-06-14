import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogViewerComponent } from './dog-viewer.component';

describe('DogViewerComponent', () => {
  let component: DogViewerComponent;
  let fixture: ComponentFixture<DogViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DogViewerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DogViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
