import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { LoginComponent } from '../app/components/login/login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize ingreso form', () => {
    expect(component.ingreso instanceof FormGroup).toBeTrue();
  });

  it('should validate required fields', () => {
    const form = component.ingreso;
    const correo = form.controls.inputCorreo;
    const clave = form.controls.inputClave;

    correo.setValue('');
    clave.setValue('');
    expect(correo.valid).toBeFalse();
    expect(clave.valid).toBeFalse();
    expect(form.valid).toBeFalse();

    correo.setValue('test@test.com');
    clave.setValue('password');
    expect(correo.valid).toBeTrue();
    expect(clave.valid).toBeTrue();
    expect(form.valid).toBeTrue();
  });

  // Agrega aquí más pruebas unitarias de acuerdo a tus necesidades
});
