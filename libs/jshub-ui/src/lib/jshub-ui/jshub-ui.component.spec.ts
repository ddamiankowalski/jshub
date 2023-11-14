import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JshubUiComponent } from './jshub-ui.component';

describe('JshubUiComponent', () => {
  let component: JshubUiComponent;
  let fixture: ComponentFixture<JshubUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JshubUiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(JshubUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
