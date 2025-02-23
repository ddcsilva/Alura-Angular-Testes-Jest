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

  it('deveria chamar o onChange quando o método classificar for chamado', () => {
    // Arrange
    const onChangeSpy = jest.spyOn(component, 'onChange');
    const classificacao = 4;

    // Act
    component.classificar(classificacao);

    // Assert
    expect(onChangeSpy).toHaveBeenCalled();
  });

  it('deveria chamar o onTouched quando o método classificar for chamado', () => {
    // Arrange
    const onTouchedSpy = jest.spyOn(component, 'onTouched');
    const classificacao = 4;

    // Act
    component.classificar(classificacao);

    // Assert
    expect(onTouchedSpy).toHaveBeenCalled();
  });

  it('não deveria atualizar a classificação quando a propriedade readOnly for verdadeira', () => {
    // Arrange
    const onChangeSpy = jest.spyOn(component, 'onChange');
    const classificacao = 5;
    component.readOnly = true;

    // Act
    component.classificar(classificacao);

    // Assert
    expect(onChangeSpy).not.toHaveBeenCalled;
    expect(component.classificacao).not.toBe(classificacao);
  });

  it('deveria ignorar valores inválidos e atribuir o valor 1 para a classificação', () => {
    // Arrange
    const valoresInvalidos = [-1, 0, 'abc', undefined];

    valoresInvalidos.forEach((valorInvalido) => {
      // Act
      component.writeValue(valorInvalido as any);

      // Assert
      expect(component.classificacao).toBe(1);
    });
  });

  it('deveria atualizar o DOM quando a classificação for alterada', () => {
    // Arrange
    const classificacao = 3;

    // Act
    component.classificar(classificacao);
    fixture.detectChanges();
    const estrelaPreenchida = fixture.nativeElement.querySelector('.filled');

    // Assert
    expect(estrelaPreenchida).toBeTruthy();
  });
});
