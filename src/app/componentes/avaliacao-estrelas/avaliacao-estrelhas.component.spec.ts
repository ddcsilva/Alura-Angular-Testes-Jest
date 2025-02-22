import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvaliacaoEstrelasComponent } from './avaliacao-estrelas.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { forwardRef } from '@angular/core';

describe('AvaliacaoEstrelasComponent', () => {
  let component: AvaliacaoEstrelasComponent;
  let fixture: ComponentFixture<AvaliacaoEstrelasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AvaliacaoEstrelasComponent],
      providers: [
        {
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => AvaliacaoEstrelasComponent),
          multi: true,
        },
      ],
    });

    fixture = TestBed.createComponent(AvaliacaoEstrelasComponent);
    component = fixture.componentInstance;
    component.readOnly = false;
  });

  it('deveria criar o componente', () => {
    // Assert
    expect(component).toBeTruthy();
  });

  it('deveria atribuir um valor para a classificação quando o método writeValue for chamado', () => {
    // Arrange
    const classificacao = 3;

    // Act
    component.writeValue(classificacao);

    // Assert
    expect(component.classificacao).toBe(classificacao);
  });
});
