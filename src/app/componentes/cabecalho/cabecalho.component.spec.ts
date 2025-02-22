import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CabecalhoComponent } from './cabecalho.component';

describe('CabecalhoComponent', () => {
  let component: CabecalhoComponent;
  let fixture: ComponentFixture<CabecalhoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CabecalhoComponent],
    });

    fixture = TestBed.createComponent(CabecalhoComponent);
    component = fixture.componentInstance;
  });

  it('deveria ser criado', () => {
    // Assert
    expect(component).toBeTruthy();
  });

  it('deveria definir as propriedades alt e src', () => {
    // Assert
    expect(component.alt).toBeDefined();
    expect(component.src).toBeDefined();
  });

  it('deveria renderizar o conteúdo baseado nas propriedades alt e src', () => {
    // Arrange
    component.alt = 'Logo do Sistema';
    component.src = 'assets/logo.png';

    // Act & Assert
    expect(component).toMatchSnapshot();
  });
});
