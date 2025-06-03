import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogExplorerComponent } from './dog-explorer.component';

describe('DogExplorerComponent', () => {
  let component: DogExplorerComponent;
  let fixture: ComponentFixture<DogExplorerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DogExplorerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DogExplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
