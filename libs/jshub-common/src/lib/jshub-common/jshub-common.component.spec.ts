import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JshubCommonComponent } from './jshub-common.component';

describe('JshubCommonComponent', () => {
  let component: JshubCommonComponent;
  let fixture: ComponentFixture<JshubCommonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JshubCommonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(JshubCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
