import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormularioComponent } from './formulario.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { LivroService } from '../../services/livro.service';

describe('FormularioComponent', () => {
  let component: FormularioComponent;
  let fixture: ComponentFixture<FormularioComponent>;
  let service: LivroService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormularioComponent, ReactiveFormsModule, RouterTestingModule],
      providers: [LivroService, FormBuilder],
    });

    service = TestBed.inject(LivroService);
    fixture = TestBed.createComponent(FormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deveria inicializar o formulário com valores vazios', () => {
    // Assert
    expect(component.formulario.value).toEqual({
      titulo: '',
      autoria: '',
      imagem: '',
      genero: '',
      dataLeitura: '',
      classificacao: null,
    });
  });

  it('deveria adicionar um novo livro', () => {
    // Arrange
    const novoLivro = {
      titulo: 'É assim que acaba',
      autoria: 'Colleen Hoover',
      imagem:
        'https://images-na.ssl-images-amazon.com/images/I/51Z4t9bZ7HL._SX331_BO1,204,203,200_.jpg',
      genero: 'romance',
      dataLeitura: '2021-09-15',
      classificacao: 5,
    };

    const adicionarLivroSpy = jest.spyOn(service, 'adicionarLivro');
    const routerSpy = jest.spyOn(component['router'], 'navigate');

    // Act
    component.formulario.setValue(novoLivro);
    component.adicionarLivro();

    // Assert
    expect(adicionarLivroSpy).toHaveBeenCalledWith({
      ...novoLivro,
      genero: component.generos.find((g) => g.id === novoLivro.genero),
    });

    expect(component.formulario.value).toEqual({
      titulo: null,
      autoria: null,
      imagem: null,
      genero: null,
      dataLeitura: null,
      classificacao: null,
    });

    expect(routerSpy).toHaveBeenCalledWith(['lista-livros']);
  });
});
