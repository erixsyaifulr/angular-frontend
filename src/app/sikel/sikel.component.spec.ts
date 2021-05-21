import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SikelComponent } from './sikel.component';

describe('SikelComponent', () => {
  let component: SikelComponent;
  let fixture: ComponentFixture<SikelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SikelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SikelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
