import { GeneroLiterario, Livro } from '../componentes/livro/livro';
import { livros } from '../mock-livros';
import { ErroGeneroLiterario, LivroService } from './livro.service';

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

  it('deveria inicializar os gêneros literários corretamente', () => {
    // Arrange
    const generosEsperados: GeneroLiterario[] = [
      { id: 'romance', value: 'Romance' },
      { id: 'misterio', value: 'Mistério' },
      { id: 'fantasia', value: 'Fantasia' },
      { id: 'ficcao-cientifica', value: 'Ficção Científica' },
      { id: 'tecnicos', value: 'Técnicos' },
    ];

    // Assert
    expect(service.generos).toEqual(generosEsperados);
  });

  it('deveria lançar uma exceção ao adicionar um livro com gênero desconhecido', () => {
    // Arrange
    const novoLivro: Livro = {
      titulo: 'O Senhor dos Anéis',
      autoria: 'J. R. R. Tolkien',
      imagem: 'senhor-dos-aneis.jpg',
      genero: { id: 'epico', value: 'Épico' },
      dataLeitura: '2025-02-22',
      classificacao: 5,
    };

    // Assert
    expect(() => service.adicionarLivro(novoLivro)).toThrow(
      ErroGeneroLiterario
    );
  });
});
