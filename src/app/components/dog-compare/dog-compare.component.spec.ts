import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogCompareComponent } from './dog-compare.component';

describe('DogCompareComponent', () => {
  let component: DogCompareComponent;
  let fixture: ComponentFixture<DogCompareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DogCompareComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DogCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
