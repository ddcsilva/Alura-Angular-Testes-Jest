import { Livro } from '../componentes/livro/livro';
import { livros } from '../mock-livros';
import { LivroService } from './livro.service';

describe('LivroService', () => {
  let service: LivroService;

  beforeEach(() => {
    service = new LivroService();
  });

  it('deveria ser criado', () => {
    // Assert
    expect(service).toBeTruthy();
  });

  it('deveria adicionar um novo livro', () => {
    // Arrange
    const novoLivro: Livro = {
      titulo: 'O Senhor dos Anéis',
      autoria: 'J. R. R. Tolkien',
      imagem: 'senhor-dos-aneis.jpg',
      genero: { id: 'fantasia', value: 'Fantasia' },
      dataLeitura: '2025-02-22',
      classificacao: 5,
    };

    // Act
    service.adicionarLivro(novoLivro);

    // Assert
    const livrosPorGenero = service.obterLivrosPorGenero('fantasia');
    expect(livrosPorGenero).toContain(novoLivro);
  });

  it('deveria recuperar corretamente os livros por gênero', () => {
    // Arrange
    const livrosEsperados = livros.filter(
      (livro) => livro.genero.id === 'romance'
    );

    // Act
    const livrosPorGenero = service.obterLivrosPorGenero('romance');

    // Assert
    expect(livrosPorGenero).toEqual(livrosEsperados);
  });
});
