import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2024 Minha Aplicação. Desenvolvida com ❤️ usando React e Vite.</p>
        <div className="footer-links">
          <a href="#sobre">Sobre</a>
          <a href="#contato">Contato</a>
          <a href="#ajuda">Ajuda</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer